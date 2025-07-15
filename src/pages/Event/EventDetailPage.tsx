import React from "react";
import { ChevronRight, Calendar, MapPin, Share2, Facebook, Twitter, Mail, Copy } from "lucide-react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useEventDetail } from "@/api/hooks";

/**
 * EventDetailPage component for displaying detailed event content
 */
const EventDetailPage: React.FC = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const { uuid } = useParams<{ uuid: string }>();
  const { data, isLoading, isError, error } = useEventDetail(uuid!);

  // Debug logging
  // console.log('EventDetailPage Debug:', { uuid, isLoading, isError, error, data });

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = data?.data?.attributes?.title || "Sự kiện";
    
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
            description: "Đường dẫn sự kiện đã được sao chép vào clipboard.",
          });
        });
        break;
    }
  };

  // Extract event data from API response
  const eventData = data?.data?.attributes;
  const eventTitle = eventData?.title || "";
  const eventDate = eventData?.created || "";
  const eventContent = eventData?.body?.processed || eventData?.body?.value || "";
  const eventFeatured = eventData?.field_su_kien_tieu_bieu || false;

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
        
        <main className="flex-1 pt-52">
          {/* Breadcrumb Skeleton */}
          <div className={`py-4 ${theme === 'dark' ? 'bg-dseza-dark-secondary/50' : 'bg-dseza-light-secondary/50'}`}>
            <div className="container mx-auto px-4">
              <Skeleton className="h-4 w-96" />
            </div>
          </div>

          {/* Event Content Skeleton */}
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
        
        <main className="flex-1 pt-52">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                Không thể tải sự kiện
              </h1>
              <p className={`mb-8 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                {error?.message || "Đã có lỗi xảy ra khi tải sự kiện. Vui lòng thử lại sau."}
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

  if (!data) {
    return (
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
        {/* Header */}
        <TopBar />
        <LogoSearchBar />
        <NavigationBar />
        
        <main className="flex-1 pt-52">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Không tìm thấy sự kiện
              </h1>
              <p className={`mb-8 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                Sự kiện bạn tìm kiếm không tồn tại hoặc đã bị xóa.
              </p>
              {/* Debug: Show current UUID */}
              <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                Event UUID: {uuid}
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
                      href="https://dseza-backend.lndo.site/jsonapi/node/bai-viet?filter[field_su_kien_tieu_bieu][value]=1" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block transition-colors ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary/80' : 'text-dseza-light-primary hover:text-dseza-light-primary/80'}`}
                    >
                      📋 Danh sách sự kiện tiêu điểm
                    </a>
                    <a 
                      href={`https://dseza-backend.lndo.site/jsonapi/node/bai-viet/${uuid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block transition-colors ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary/80' : 'text-dseza-light-primary hover:text-dseza-light-primary/80'}`}
                    >
                      🔍 Chi tiết bài viết UUID: {uuid}
                    </a>
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

  // TODO: Implement event detail rendering when data is available
  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
      {/* Header */}
      <TopBar />
      <LogoSearchBar />
      <NavigationBar />
      
      {/* Main Content */}
      <main className="flex-1 pt-52">
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
                href="/su-kien" 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Sự kiện
              </a>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium line-clamp-1 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {eventTitle || "Sự kiện"}
              </span>
            </nav>
          </div>
        </div>

        {/* Event Content */}
        <div className="container mx-auto px-4 py-8">
          <article className="max-w-4xl mx-auto">
            {/* Event Header */}
            <header className="mb-8">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {eventTitle || "Chi tiết sự kiện"}
              </h1>
              
              {eventFeatured && (
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${theme === 'dark' ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-100 text-yellow-800'}`}>
                  <span>✨ Sự kiện nổi bật</span>
                </div>
              )}
              
              {/* Meta Information */}
              <div className={`flex flex-wrap items-center gap-4 mb-6 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                {eventDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(eventDate)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Địa điểm: Đang cập nhật</span>
                </div>
              </div>
            </header>

            {/* Event Content */}
            <div className={`prose prose-lg max-w-none mt-8 ${theme === 'dark' ? 'prose-invert' : ''}`}>
              {eventContent ? (
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(eventContent) }} />
              ) : (
                <p className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>
                  Nội dung sự kiện đang được cập nhật...
                </p>
              )}
            </div>

            {/* Share Section */}
            <div className={`mt-12 pt-8 border-t ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
              <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                <Share2 className="h-5 w-5" />
                Chia sẻ sự kiện:
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

export default EventDetailPage; 