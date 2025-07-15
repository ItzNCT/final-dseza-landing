import React from "react";
import { ChevronRight, Calendar, Tag, Share2, Facebook, Twitter, Mail, Copy } from "lucide-react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { useArticleDetail } from "@/api/hooks";
import { extractImageUrl } from "@/utils/drupal";
import { processRichTextContent, extractFirstImageFromRichText } from "@/utils/richTextProcessor";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

/**
 * ArticleDetailPage component for displaying detailed article content
 */
const ArticleDetailPage: React.FC = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const { uuid } = useParams<{ uuid: string }>();
  const { data, isLoading, isError, error } = useArticleDetail(uuid || '');

  // Debug logging
  // console.log('ArticleDetailPage Debug:', { uuid, isLoading, isError, error, data });

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = data?.data?.attributes?.title || "Bài viết";
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          toast({
            title: "Đã sao chép!",
            description: "Đường dẫn bài viết đã được sao chép vào clipboard.",
          });
        });
        break;
    }
  };

  // Get featured image URL from included data or rich text
  const getFeaturedImageUrl = () => {
    // First try to get from field_anh_dai_dien
    if (data?.data?.relationships?.field_anh_dai_dien?.data && data?.included) {
      const imageUrl = extractImageUrl(data.data.relationships.field_anh_dai_dien, data.included);
      if (imageUrl) return imageUrl;
    }

    // If no featured image field, try to extract from rich text content
    const richTextContent = getRichTextContent();
    if (richTextContent && data?.included) {
      const firstImage = extractFirstImageFromRichText(richTextContent, data.included);
      if (firstImage) return firstImage;
    }

    return null;
  };

  // Get raw rich text content for processing
  const getRichTextContent = (): string => {
    if (!data?.data?.relationships?.field_noi_dung_bai_viet?.data || !data?.included) {
      return data?.data?.attributes?.body?.processed || data?.data?.attributes?.body?.value || '';
    }
    
    const paragraphIds = data.data.relationships.field_noi_dung_bai_viet.data.map((rel: any) => rel.id);
    const paragraphs = data.included
      .filter((item: any) => paragraphIds.includes(item.id))
      .sort((a: any, b: any) => {
        const aIndex = paragraphIds.indexOf(a.id);
        const bIndex = paragraphIds.indexOf(b.id);
        return aIndex - bIndex;
      });
    
    let content = '';
    
    paragraphs.forEach((paragraph: any) => {
      if (paragraph.type === 'paragraph--rich_text_block') {
        if (paragraph.attributes?.field_rich_text?.processed) {
          content += paragraph.attributes.field_rich_text.processed;
        } else if (paragraph.attributes?.field_text?.processed) {
          content += paragraph.attributes.field_text.processed;
        } else if (paragraph.attributes?.field_content?.processed) {
          content += paragraph.attributes.field_content.processed;
        } else if (paragraph.attributes?.field_body?.processed) {
          content += paragraph.attributes.field_body.processed;
        }
      }
    });
    
    return content;
  };

  // Get categories from included data
  const getCategories = () => {
    if (!data?.data?.relationships?.field_chuyen_muc?.data || !data?.included) {
      return [];
    }
    
    const categoryIds = data.data.relationships.field_chuyen_muc.data.map((rel: any) => rel.id);
    const categories = data.included
      .filter((item: any) => item.type === 'taxonomy_term--news_category' && categoryIds.includes(item.id))
      .map((item: any) => ({
        id: item.id,
        name: item.attributes.name
      }));
    
    return categories;
  };

  // Get meta description
  const getMetaDescription = () => {
    const metatags = data?.data?.attributes?.metatag || [];
    const descriptionTag = metatags.find((tag: any) => tag.attributes?.name === 'description');
    return descriptionTag?.attributes?.content || '';
  };

  // Check if article is featured event
  const isFeaturedEvent = () => {
    return data?.data?.attributes?.field_su_kien_tieu_bieu || false;
  };

  // Get paragraphs content or fallback to body
  const getArticleContent = () => {
    if (!data?.data?.relationships?.field_noi_dung_bai_viet?.data || !data?.included) {
      // No paragraphs available - use body field if available
      const bodyContent = data?.data?.attributes?.body?.processed || data?.data?.attributes?.body?.value || '';
      if (bodyContent) {
        return processRichTextContent(bodyContent, data?.included);
      }
      return `<p class="${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'} italic">Nội dung bài viết đang được cập nhật...</p>`;
    }
    
    const paragraphIds = data.data.relationships.field_noi_dung_bai_viet.data.map((rel: any) => rel.id);
    const paragraphs = data.included
      .filter((item: any) => paragraphIds.includes(item.id))
      .sort((a: any, b: any) => {
        // Sort by the order in the relationships
        const aIndex = paragraphIds.indexOf(a.id);
        const bIndex = paragraphIds.indexOf(b.id);
        return aIndex - bIndex;
      });
    
    let content = '';
    
    paragraphs.forEach((paragraph: any) => {
      switch (paragraph.type) {
        case 'paragraph--rich_text_block':
          // Get raw rich text content
          let richTextContent = '';
          if (paragraph.attributes?.field_rich_text?.processed) {
            richTextContent = paragraph.attributes.field_rich_text.processed;
          } else if (paragraph.attributes?.field_text?.processed) {
            richTextContent = paragraph.attributes.field_text.processed;
          } else if (paragraph.attributes?.field_content?.processed) {
            richTextContent = paragraph.attributes.field_content.processed;
          } else if (paragraph.attributes?.field_body?.processed) {
            richTextContent = paragraph.attributes.field_body.processed;
          } else {
            // Log all available attributes for debugging
            console.log('Rich text paragraph attributes:', Object.keys(paragraph.attributes || {}));
          }
          
          // Process rich text content with image handling
          if (richTextContent) {
            content += processRichTextContent(richTextContent, data.included);
          }
          break;
          
        case 'paragraph--image_block':
          // Handle image blocks with proper image extraction
          const imageUrl = getImageFromParagraph(paragraph);
          if (imageUrl) {
            const imageCaption = paragraph.attributes?.field_caption || paragraph.attributes?.field_alt_text || '';
            content += `
              <figure class="my-6 text-center">
                <img src="${imageUrl}" alt="${imageCaption}" class="max-w-full h-auto rounded-lg shadow-md mx-auto" loading="lazy" />
                ${imageCaption ? `<figcaption class="text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'} mt-2 italic">${imageCaption}</figcaption>` : ''}
              </figure>
            `;
          } else {
            content += `<div class="image-block-placeholder my-4 p-4 ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'} text-center ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'} rounded border-2 border-dashed ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}">[Hình ảnh đang được tải...]</div>`;
          }
          break;
          
        default:
          // Handle other paragraph types as needed
          console.log('Unknown paragraph type:', paragraph.type, 'attributes:', Object.keys(paragraph.attributes || {}));
          content += `<div class="unknown-paragraph-type my-2 p-2 ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg/50' : 'bg-dseza-light-secondary-bg'} ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'} rounded ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'} text-sm">[Nội dung ${paragraph.type}]</div>`;
          break;
      }
    });
    
    return content || `<p class="${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'} italic">Nội dung paragraphs trống.</p>`;
  };

  // Helper function to extract image from paragraph
  const getImageFromParagraph = (paragraph: any): string | null => {
    if (!paragraph.relationships?.field_image?.data || !data?.included) {
      return null;
    }
    
    return extractImageUrl(paragraph.relationships.field_image, data.included);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
        {/* Header */}
        <TopBar />
        <LogoSearchBar />
        <NavigationBar />
        
        <main className="flex-1 pt-52"> {/* Added flex-1 and increased padding to accommodate full header */}
          {/* Breadcrumb Skeleton */}
          <div className={`py-4 ${theme === 'dark' ? 'bg-dseza-dark-secondary/50' : 'bg-dseza-light-secondary/50'}`}>
            <div className="container mx-auto px-4">
              <Skeleton className="h-4 w-96" />
            </div>
          </div>

          {/* Article Content Skeleton */}
          <div className="container mx-auto px-4 py-8">
            <article className="max-w-4xl mx-auto">
              {/* Title Skeleton */}
              <header className="mb-8">
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <div className="flex gap-4 mb-6">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </header>

              {/* Image Skeleton */}
              <Skeleton className="w-full h-96 rounded-lg mb-8" />

              {/* Content Skeleton */}
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </article>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
        {/* Header */}
        <TopBar />
        <LogoSearchBar />
        <NavigationBar />
        
        <main className="flex-1 pt-52"> {/* Added flex-1 and increased padding to accommodate full header */}
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                Không thể tải bài viết
              </h1>
              <p className={`mb-8 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                {error?.message || "Đã có lỗi xảy ra khi tải bài viết. Vui lòng thử lại sau."}
              </p>
              <Button 
                onClick={() => window.history.back()}
                className={theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80'}
              >
                Quay lại
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
        {/* Header */}
        <TopBar />
        <LogoSearchBar />
        <NavigationBar />
        
        <main className="flex-1 pt-52"> {/* Added flex-1 and increased padding to accommodate full header */}
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Không tìm thấy bài viết
              </h1>
              <p className={`mb-8 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                Bài viết bạn tìm kiếm không tồn tại hoặc đã bị xóa.
              </p>
              {/* Debug: Show current UUID */}
              <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                Article UUID: {uuid}
              </p>
              <div className="space-y-4">
                <Button 
                  onClick={() => window.history.back()}
                  className={theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80'}
                >
                  Quay lại
                </Button>
                
                {/* Debug: API Information */}
                <div className={`text-sm border p-4 rounded-lg ${theme === 'dark' ? 'text-dseza-dark-secondary-text border-dseza-dark-border bg-dseza-dark-secondary-bg/50' : 'text-dseza-light-secondary-text border-dseza-light-border bg-dseza-light-secondary-bg/50'}`}>
                  <p className="font-semibold mb-2">Debug Information:</p>
                  <p>Base URL: https://dseza-backend.lndo.site</p>
                  <p>Full URL: https://dseza-backend.lndo.site/jsonapi/node/bai-viet/{uuid}</p>
                  <p className="mt-2">Bạn có thể kiểm tra API trực tiếp tại:</p>
                  <div className="mt-2 space-y-1">
                    <a 
                      href="https://dseza-backend.lndo.site/jsonapi/node/bai-viet" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block transition-colors ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary/80' : 'text-dseza-light-primary hover:text-dseza-light-primary/80'}`}
                    >
                      📋 Danh sách tất cả bài viết
                    </a>
                    <a 
                      href={`https://dseza-backend.lndo.site/jsonapi/node/bai-viet/${uuid}?include=field_anh_dai_dien.field_media_image`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block transition-colors ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary/80' : 'text-dseza-light-primary hover:text-dseza-light-primary/80'}`}
                    >
                      🔍 Chi tiết bài viết UUID: {uuid}
                    </a>
                  </div>
                </div>
                
                {/* Debug: Test with sample IDs */}
                <div className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  <p>Thử test với các ID mẫu:</p>
                  <div className="flex gap-2 justify-center mt-2">
                    <a href="/bai-viet/1" className={`transition-colors ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary/80' : 'text-dseza-light-primary hover:text-dseza-light-primary/80'}`}>ID: 1</a>
                    <a href="/bai-viet/2" className={`transition-colors ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary/80' : 'text-dseza-light-primary hover:text-dseza-light-primary/80'}`}>ID: 2</a>
                    <a href="/bai-viet/3" className={`transition-colors ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary/80' : 'text-dseza-light-primary hover:text-dseza-light-primary/80'}`}>ID: 3</a>
                    <a href="/bai-viet/4" className={`transition-colors ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary/80' : 'text-dseza-light-primary hover:text-dseza-light-primary/80'}`}>ID: 4</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const article = data.data;
  const featuredImageUrl = getFeaturedImageUrl();
  const categories = getCategories();
  const metaDescription = getMetaDescription();
  const isFeatured = isFeaturedEvent();
  const articleContent = getArticleContent();

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
      {/* Header - Complete header structure */}
      <TopBar />
      <LogoSearchBar />
      <NavigationBar />
      
      {/* Main Content */}
      <main className="flex-1 pt-52"> {/* Added flex-1 and increased padding to accommodate full header */}
        {/* Breadcrumb */}
        <div className={`py-2 ${theme === 'dark' ? 'bg-dseza-dark-secondary/50' : 'bg-dseza-light-secondary/50'}`}>
          <div className="container mx-auto px-4">
            <nav className={`flex items-center space-x-2 text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <a 
                href="/" 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Trang chủ
              </a>
              <ChevronRight className="h-4 w-4" />
              <a 
                href="/tin-tuc" 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {isFeatured ? 'Tin tức' : (categories.length > 0 ? categories[0].name : 'Tin tức')}
              </a>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium line-clamp-1 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {article.attributes.title}
              </span>
            </nav>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-8">
          <article className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {article.attributes.title}
              </h1>
              
              {/* Featured Badge */}
              {isFeatured && (
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${theme === 'dark' ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-100 text-yellow-800'}`}>
                  <span>✨ Sự kiện tiêu điểm</span>
                </div>
              )}
              
              {/* Meta Description */}
              {metaDescription && (
                <p className={`text-lg mb-4 italic ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  {metaDescription}
                </p>
              )}
              
              {/* Meta Information */}
              <div className={`flex flex-wrap items-center gap-4 mb-6 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Ngày đăng: {formatDate(article.attributes.created)}</span>
                </div>
                {categories.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <span>Chuyên mục: </span>
                    <div className="flex gap-1">
                      {categories.map((category, index) => (
                        <Badge 
                          key={category.id} 
                          variant="secondary" 
                          className={`text-xs ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg text-dseza-dark-main-text' : 'bg-dseza-light-secondary-bg text-dseza-light-main-text'}`}
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </header>

            {/* Images are now handled within paragraphs content */}

            {/* Article Content */}
            <div className={`prose prose-lg max-w-none mt-8 ${theme === 'dark' ? 'prose-invert' : ''}`}>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(articleContent)
                }}
              />
            </div>

            {/* Share Section */}
            <div className={`mt-12 pt-8 border-t ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
              <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                <Share2 className="h-5 w-5" />
                Chia sẻ bài viết:
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('facebook')}
                  className={`flex items-center gap-2 transition-colors ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-blue-900/20 hover:border-blue-500' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-blue-50 hover:border-blue-300'}`}
                >
                  <Facebook className="h-4 w-4 text-blue-600" />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('twitter')}
                  className={`flex items-center gap-2 transition-colors ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-sky-900/20 hover:border-sky-500' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-sky-50 hover:border-sky-300'}`}
                >
                  <Twitter className="h-4 w-4 text-sky-500" />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('email')}
                  className={`flex items-center gap-2 transition-colors ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-gray-700/20 hover:border-gray-500' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-gray-50 hover:border-gray-300'}`}
                >
                  <Mail className="h-4 w-4 text-gray-600" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('copy')}
                  className={`flex items-center gap-2 transition-colors ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-green-900/20 hover:border-green-500' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-green-50 hover:border-green-300'}`}
                >
                  <Copy className="h-4 w-4 text-green-600" />
                  Sao chép link
                </Button>
              </div>
            </div>
          </article>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ArticleDetailPage;
