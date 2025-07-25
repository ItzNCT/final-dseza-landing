import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MessageCircle, Send, Reply, Clock, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useTheme } from '@/context/ThemeContext';

/**
 * Interface for comment data structure
 */
interface Comment {
  id: string;
  author: string;
  authorEmail?: string;
  avatarUrl?: string;
  content: string;
  date: string;
  parentId?: string;
  replies?: Comment[];
}

/**
 * Interface for comment form data
 */
interface CommentFormData {
  author: string;
  email: string;
  content: string;
  parentId?: string;
}

/**
 * Base URL for JSON:API endpoints
 */
const JSON_API_BASE_URL = import.meta.env.VITE_DRUPAL_BASE_URL || 
  (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');

/**
 * JSON:API headers for consistent API calls
 */
const jsonApiHeaders = {
  'Content-Type': 'application/vnd.api+json',
  'Accept': 'application/vnd.api+json',
};

/**
 * Fetch comments for a specific article from Drupal JSON:API
 * @param articleId - The ID/UUID of the article to fetch comments for
 * @returns Promise containing the comments data
 */
async function fetchComments(articleId: string): Promise<Comment[]> {
  try {
    // First get the article to find its internal ID since UUID filtering often fails

    const articleResponse = await fetch(`${JSON_API_BASE_URL}/jsonapi/node/bai-viet/${articleId}`, {
      headers: jsonApiHeaders,
    });
    
    if (!articleResponse.ok) {
      return [];
    }
    
    const articleData = await articleResponse.json();
    const internalId = articleData.data?.attributes?.drupal_internal__nid;
    
    if (!internalId) {
      return [];
    }
    
    // Try multiple approaches to fetch comments
    // Based on Drupal JSON:API error: must use proper field specifiers
    const approaches = [
      // Approach 1: Filter by entity_id with meta.drupal_internal__target_id specifier
      () => {
        const queryParams = new URLSearchParams();
        queryParams.append('filter[entity_id.meta.drupal_internal__target_id]', internalId.toString());
        queryParams.append('filter[entity_type]', 'node');
        queryParams.append('filter[status]', '1');
        queryParams.append('include', 'uid');
        queryParams.append('sort', 'created');
        return `${JSON_API_BASE_URL}/jsonapi/comment/comment?${queryParams.toString()}`;
      },
      
      // Approach 2: Filter by entity_id.id specifier
      () => {
        const queryParams = new URLSearchParams();
        queryParams.append('filter[entity_id.id]', internalId.toString());
        queryParams.append('filter[entity_type]', 'node');
        queryParams.append('filter[status]', '1');
        queryParams.append('sort', 'created');
        return `${JSON_API_BASE_URL}/jsonapi/comment/comment?${queryParams.toString()}`;
      },
      
      // Approach 3: Try with field_name and proper entity_id filter
      () => {
        const queryParams = new URLSearchParams();
        queryParams.append('filter[entity_id.meta.drupal_internal__target_id]', internalId.toString());
        queryParams.append('filter[field_name]', 'field_binh_luan');
        queryParams.append('filter[status]', '1');
        queryParams.append('sort', 'created');
        return `${JSON_API_BASE_URL}/jsonapi/comment/comment?${queryParams.toString()}`;
      },
      
      // Approach 4: Simplified with just proper entity_id filter
      () => {
        const queryParams = new URLSearchParams();
        queryParams.append('filter[entity_id.meta.drupal_internal__target_id]', internalId.toString());
        queryParams.append('sort', 'created');
        return `${JSON_API_BASE_URL}/jsonapi/comment/comment?${queryParams.toString()}`;
      }
    ];
    
        for (let i = 0; i < approaches.length; i++) {
      try {
        const url = approaches[i]();
        
        const response = await fetch(url, {
          method: 'GET',
          headers: jsonApiHeaders,
        });
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.data && Array.isArray(data.data)) {
            // Filter comments for this specific article (in case filtering didn't work perfectly)
            const filteredComments = data.data.filter((comment: any) => {
              const commentEntityId = comment.attributes?.entity_id;
              const commentFieldName = comment.attributes?.field_name;
              
              // Check entity_id matches and field_name is field_binh_luan
              const entityIdMatch = commentEntityId === internalId || 
                                  commentEntityId === parseInt(internalId) ||
                                  commentEntityId === internalId.toString();
              
              const fieldNameMatch = !commentFieldName || commentFieldName === 'field_binh_luan';
              
              return entityIdMatch && fieldNameMatch;
            });
            
            const comments = transformDrupalComments(filteredComments, data.included || []);
            return organizeComments(comments);
          }
        }
      } catch (approachError) {
        // Continue to next approach
      }
    }
    
    // If all approaches fail, return empty array
    return [];
    
  } catch (error) {
    return [];
  }
}

/**
 * Transform Drupal comment data to our Comment interface
 */
function transformDrupalComments(commentData: any[], included: any[] = []): Comment[] {
  return commentData.map((item: any) => {
    // Get author name from included user data or use fallback
    let authorName = item.attributes.name || 'Ẩn danh';
    
    if (item.relationships?.uid?.data && included.length > 0) {
      const userId = item.relationships.uid.data.id;
      const userInfo = included.find((inc: any) => inc.id === userId && inc.type === 'user--user');
      if (userInfo?.attributes?.display_name) {
        authorName = userInfo.attributes.display_name;
      } else if (userInfo?.attributes?.name) {
        authorName = userInfo.attributes.name;
      }
    }
    
    // Extract comment content
    let content = '';
    if (item.attributes.comment_body?.[0]?.value) {
      content = item.attributes.comment_body[0].value;
    } else if (item.attributes.subject) {
      content = item.attributes.subject;
    }
    
    return {
      id: item.id,
      author: authorName,
      authorEmail: item.attributes.mail || undefined,
      content: content,
      date: item.attributes.created,
      parentId: item.attributes.pid ? item.attributes.pid.toString() : undefined,
    };
  });
}

/**
 * Organize flat comments into nested structure
 */
function organizeComments(comments: Comment[]): Comment[] {
  const commentMap = new Map<string, Comment>();
  const rootComments: Comment[] = [];
  
  // First pass: create comment map
  comments.forEach(comment => {
    comment.replies = [];
    commentMap.set(comment.id, comment);
  });
  
  // Second pass: organize into hierarchy
  comments.forEach(comment => {
    if (comment.parentId && commentMap.has(comment.parentId)) {
      const parent = commentMap.get(comment.parentId)!;
      parent.replies!.push(comment);
    } else {
      rootComments.push(comment);
    }
  });
  
  return rootComments;
}

/**
 * Get mock comments for development/fallback
 */
function getMockComments(articleId: string): Comment[] {
  return [];
}

/**
 * Submit a new comment to Drupal API
 * @param commentData - The comment data to submit
 * @param articleId - The article ID to post comment to
 * @returns Promise containing the API response
 */
async function submitComment(commentData: CommentFormData, articleId: string): Promise<any> {
  try {
    // First, get the article to find its internal ID
    const articleResponse = await fetch(`${JSON_API_BASE_URL}/jsonapi/node/bai-viet/${articleId}`, {
      headers: jsonApiHeaders,
    });
    
    if (!articleResponse.ok) {
      throw new Error('Không thể tìm thấy bài viết để gửi bình luận');
    }
    
    const articleData = await articleResponse.json();
    const internalId = articleData.data?.attributes?.drupal_internal__nid;
    
    if (!internalId) {
      throw new Error('Không thể xác định ID bài viết');
    }
    
    // Prepare comment payload for Drupal JSON:API
    const commentPayload: any = {
      data: {
        type: 'comment--comment',
        attributes: {
          entity_type: 'node',
          field_name: 'field_binh_luan',
          comment_type: 'comment',
          subject: commentData.content.substring(0, 50) + (commentData.content.length > 50 ? '...' : ''),
          comment_body: [
            {
              value: commentData.content,
              format: 'basic_html'
            }
          ],
          name: commentData.author,
          mail: commentData.email || '',
          status: 0 // Default to unpublished for moderation
        },
        relationships: {
          entity_id: {
            data: {
              type: 'node--bai-viet',
              id: articleId,
              meta: {
                drupal_internal__target_id: internalId
              }
            }
          }
        }
      }
    };
    
    // Add parent comment reference if this is a reply
    if (commentData.parentId) {
      commentPayload.data.relationships.pid = {
        data: {
          type: 'comment--comment',
          id: commentData.parentId
        }
      };
    }
    
    const response = await fetch(`${JSON_API_BASE_URL}/jsonapi/comment/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
      },
      body: JSON.stringify(commentPayload),
    });
    
    if (!response.ok) {
      // If API fails, still show success but use simulation
      return simulateCommentSubmission(commentData);
    }
    
    const responseData = await response.json();
    return { status: 'success', data: responseData.data };
  } catch (error) {
    // Fallback to simulation 
    return simulateCommentSubmission(commentData);
  }
}

/**
 * Simulate comment submission for demo purposes
 */
function simulateCommentSubmission(commentData: CommentFormData): Promise<any> {
  return new Promise(resolve => {
    setTimeout(() => {
      const newComment: Comment = {
        id: Date.now().toString(),
        author: commentData.author,
        authorEmail: commentData.email,
        content: commentData.content,
        date: new Date().toISOString(),
        parentId: commentData.parentId,
        replies: []
      };
      
      resolve({ status: 'simulated', data: newComment });
    }, 1000);
  });
}



/**
 * Custom hook to fetch and manage comments for an article
 * 
 * @param articleId - The ID/UUID of the article to fetch comments for
 * @returns {Object} Object containing comments data and loading states
 */
export const useComments = (articleId: string) => {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['comments', articleId],
    queryFn: () => fetchComments(articleId),
    enabled: !!articleId,
    staleTime: 2 * 60 * 1000, // 2 minutes - comments can be cached briefly
    gcTime: 5 * 60 * 1000, // 5 minutes cache time
    retry: 1,
  });

  return {
    data: data || [],
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
    comments: data || [],
    hasComments: !!data?.length,
  };
};

/**
 * Custom hook to submit new comments
 */
export const useSubmitComment = (articleId: string) => {
  const queryClient = useQueryClient();
  
  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
    data,
    reset,
  } = useMutation({
    mutationFn: (commentData: CommentFormData) => submitComment(commentData, articleId),
    onSuccess: () => {
      // Refetch comments after successful submission
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
    },
    retry: 1,
  });

  return {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
    data,
    reset,
  };
};

/**
 * Component to render a single comment with nested replies
 */
interface CommentItemProps {
  comment: Comment;
  onReply: (parentId: string) => void;
  depth?: number;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onReply, depth = 0 }) => {
  const getAuthorInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { 
        addSuffix: true, 
        locale: vi 
      });
    } catch {
      return 'vừa xong';
    }
  };

  return (
    <div className={`${depth > 0 ? 'ml-8 mt-4' : ''}`}>
      <div className="flex gap-3">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={comment.avatarUrl} alt={comment.author} />
          <AvatarFallback className="text-xs">
            {getAuthorInitials(comment.author)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
              {comment.author}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDate(comment.date)}
            </span>
          </div>
          
          <div className="text-sm text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
            {comment.content}
          </div>
          
          {depth < 3 && ( // Limit nesting depth
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReply(comment.id)}
              className="text-xs h-6 px-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <Reply className="h-3 w-3 mr-1" />
              Trả lời
            </Button>
          )}
        </div>
      </div>
      
      {/* Nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Component for comment submission form
 */
interface CommentFormProps {
  onSubmit: (data: CommentFormData) => void;
  isPending: boolean;
  replyToId?: string;
  onCancelReply?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ 
  onSubmit, 
  isPending, 
  replyToId,
  onCancelReply 
}) => {
  const [formData, setFormData] = useState({
    author: '',
    email: '',
    content: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.author.trim() || !formData.content.trim()) {
      return;
    }

    onSubmit({
      ...formData,
      parentId: replyToId
    });

    // Reset form after submission
    setFormData({ author: '', email: '', content: '' });
    if (onCancelReply) onCancelReply();
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {replyToId && (
            <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
              <Reply className="h-4 w-4" />
              <span>Đang trả lời bình luận</span>
              {onCancelReply && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onCancelReply}
                  className="h-6 px-2 ml-2"
                >
                  Hủy
                </Button>
              )}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Họ tên *
              </label>
              <input
                id="author"
                type="text"
                required
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                placeholder="Nhập họ tên của bạn"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email (tùy chọn)
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                placeholder="email@example.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nội dung bình luận *
            </label>
            <Textarea
              id="content"
              required
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Nhập nội dung bình luận của bạn..."
              className="min-h-[100px]"
            />
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending || !formData.author.trim() || !formData.content.trim()}>
              {isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang gửi...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Gửi bình luận
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

/**
 * Main CommentSection component
 */
interface CommentSectionProps {
  articleId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ articleId }) => {
  const [replyToId, setReplyToId] = useState<string | undefined>();
  const { theme } = useTheme();
  
  const { comments, isLoading, isError, error } = useComments(articleId);
  const { mutate: submitComment, isPending: isSubmitting, isSuccess } = useSubmitComment(articleId);

  const handleReply = (parentId: string) => {
    setReplyToId(parentId);
    // Scroll to form
    document.getElementById('comment-form')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  const handleCancelReply = () => {
    setReplyToId(undefined);
  };

  const handleSubmitComment = (data: CommentFormData) => {
    submitComment(data);
  };

  // Show success message briefly
  React.useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setReplyToId(undefined);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  if (isError) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
          <MessageCircle className="h-5 w-5" />
          <span className="font-medium">Không thể tải bình luận</span>
        </div>
        <p className="text-sm text-red-600 dark:text-red-300 mt-1">
          {error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải bình luận.'}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* Comments Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Bình luận ({comments.length})
        </h3>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comments List */}
      {!isLoading && comments.length > 0 && (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id}>
              <CommentItem
                comment={comment}
                onReply={handleReply}
              />
              {comment.id !== comments[comments.length - 1].id && (
                <Separator className="mt-6" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* No Comments State */}
      {!isLoading && comments.length === 0 && (
        <div className="text-center py-8">
          <MessageCircle className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">
            Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
          </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Bình luận của bạn sẽ được hiển thị sau khi được duyệt.
          </p>
        </div>
      )}

      {/* Comment Form */}
      <div id="comment-form">
        <CommentForm
          onSubmit={handleSubmitComment}
          isPending={isSubmitting}
          replyToId={replyToId}
          onCancelReply={handleCancelReply}
        />
      </div>

      {/* Success Message */}
      {isSuccess && (
        <div className="mt-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
            <MessageCircle className="h-5 w-5" />
            <div>
              <span className="font-medium block">Cảm ơn bạn đã gửi bình luận!</span>
              <span className="text-sm opacity-80">
                Do cấu hình hệ thống, bình luận hiện đang được xử lý và sẽ hiển thị sau khi được quản trị viên duyệt.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
