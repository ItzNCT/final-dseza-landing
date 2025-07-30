import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MessageSquare, CheckCircle, Clock, User } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Badge } from "@/components/ui/badge";

interface MobileQnACardProps {
  qna: {
    id: string;
    title: string;
    content?: string;
    excerpt?: string;
    author?: string;
    status?: string;
    created_date?: string;
    answer_count?: number;
    category?: string;
    is_answered?: boolean;
    view_url?: string;
  };
  showFullContent?: boolean;
}

/**
 * Mobile-optimized Q&A card component
 * 
 * Features horizontal layout with question info and status indicators
 * Optimized for touch interactions and small screens
 */
const MobileQnACard: React.FC<MobileQnACardProps> = ({ 
  qna, 
  showFullContent = false 
}) => {
  const { theme } = useTheme();

  // Format date for mobile display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Get status color and text
  const getStatusInfo = (status?: string, isAnswered?: boolean) => {
    if (isAnswered || status === 'answered') {
      return {
        icon: CheckCircle,
        text: 'Đã trả lời',
        color: theme === 'dark' ? 'text-green-400 bg-green-900/20' : 'text-green-600 bg-green-100'
      };
    }
    
    if (status === 'pending') {
      return {
        icon: Clock,
        text: 'Chờ phản hồi',
        color: theme === 'dark' ? 'text-yellow-400 bg-yellow-900/20' : 'text-yellow-600 bg-yellow-100'
      };
    }

    return {
      icon: MessageSquare,
      text: 'Mới',
      color: theme === 'dark' ? 'text-blue-400 bg-blue-900/20' : 'text-blue-600 bg-blue-100'
    };
  };

  const statusInfo = getStatusInfo(qna.status, qna.is_answered);
  const StatusIcon = statusInfo.icon;

  const CardContent = () => (
    <div className={`rounded-lg border shadow-sm transition-all duration-200 hover:shadow-md ${
      theme === 'dark' 
        ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border hover:border-dseza-dark-primary/30' 
        : 'bg-white border-dseza-light-border hover:border-dseza-light-primary/30'
    }`}>
      
      {/* Main Content */}
      <div className="p-4 space-y-3">
        
        {/* Header Row - Status and Date */}
        <div className="flex items-center justify-between gap-2">
          {/* Status Badge */}
          <Badge 
            variant="secondary" 
            className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusInfo.color}`}
          >
            <StatusIcon className="h-3 w-3 mr-1" />
            {statusInfo.text}
          </Badge>
          
          {/* Date */}
          {qna.created_date && (
            <div className={`flex items-center text-xs flex-shrink-0 ${
              theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
            }`}>
              <Calendar className="h-3 w-3 mr-1" />
              <time dateTime={qna.created_date}>
                {formatDate(qna.created_date)}
              </time>
            </div>
          )}
        </div>

        {/* Question Content */}
        <div className="space-y-2">
          <h3 className={`text-sm font-semibold line-clamp-2 leading-tight ${
            theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
          }`}>
            {qna.title}
          </h3>
          
          {/* Content/Excerpt */}
          {(qna.content || qna.excerpt) && (
            <p className={`text-xs leading-relaxed ${
              showFullContent ? '' : 'line-clamp-2'
            } ${
              theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
            }`}>
              {qna.excerpt || qna.content}
            </p>
          )}
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between text-xs">
          {/* Author */}
          {qna.author && (
            <div className={`flex items-center ${
              theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
            }`}>
              <User className="h-3 w-3 mr-1" />
              <span>{qna.author}</span>
            </div>
          )}
          
          {/* Answer Count */}
          {qna.answer_count !== undefined && (
            <div className={`flex items-center ${
              theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
            }`}>
              <MessageSquare className="h-3 w-3 mr-1" />
              <span>{qna.answer_count} phản hồi</span>
            </div>
          )}
          
          {/* Category */}
          {qna.category && (
            <Badge 
              variant="outline" 
              className={`text-xs ${
                theme === 'dark' 
                  ? 'border-dseza-dark-border text-dseza-dark-secondary-text' 
                  : 'border-dseza-light-border text-dseza-light-secondary-text'
              }`}
            >
              {qna.category}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );

  // If there's a view URL, wrap in Link, otherwise just return the card
  if (qna.view_url && !showFullContent) {
    return (
      <Link 
        to={qna.view_url}
        className="block group active:scale-[0.98] transition-transform duration-150"
      >
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};

export default MobileQnACard; 