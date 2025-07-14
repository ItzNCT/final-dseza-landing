import React from "react";
import { ChevronRight, Calendar, MapPin, Share2, Facebook, Twitter, Mail, Copy } from "lucide-react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { cn } from "@/lib/utils";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

/**
 * EventDetailPage component for displaying detailed event content
 */
const EventDetailPage: React.FC = () => {
  const { toast } = useToast();
  const { uuid } = useParams<{ uuid: string }>();
  // TODO: Implement useEventDetail hook similar to useArticleDetail
  const data = null;
  const isLoading = false;
  const isError = false;
  const error = null;

  // Debug logging
  // console.log('EventDetailPage Debug:', { uuid, isLoading, isError, error, data });

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = "Sự kiện";
    
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
      <div className="min-h-screen bg-background">
        {/* Header */}
        <TopBar />
        <LogoSearchBar />
        <NavigationBar />
        
        <main className="pt-52">
          {/* Breadcrumb Skeleton */}
          <div className="bg-muted/30 py-4">
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
      <div className="min-h-screen bg-background">
        {/* Header */}
        <TopBar />
        <LogoSearchBar />
        <NavigationBar />
        
        <main className="pt-52">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4 text-destructive">
                Không thể tải sự kiện
              </h1>
              <p className="text-muted-foreground mb-8">
                {error?.message || "Đã có lỗi xảy ra khi tải sự kiện. Vui lòng thử lại sau."}
              </p>
              <Button onClick={() => window.history.back()}>
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
      <div className="min-h-screen bg-background">
        {/* Header */}
        <TopBar />
        <LogoSearchBar />
        <NavigationBar />
        
        <main className="pt-52">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">
                Không tìm thấy sự kiện
              </h1>
              <p className="text-muted-foreground mb-8">
                Sự kiện bạn tìm kiếm không tồn tại hoặc đã bị xóa.
              </p>
              {/* Debug: Show current UUID */}
              <p className="text-sm text-muted-foreground mb-4">
                Event UUID: {uuid}
              </p>
              <div className="space-y-4">
                <Button onClick={() => window.history.back()}>
                  Quay lại
                </Button>
                
                {/* Debug: API Information */}
                <div className="text-sm text-muted-foreground border p-4 rounded-lg bg-muted/50">
                  <p className="font-semibold mb-2">Debug Information:</p>
                  <p>Base URL: https://dseza-backend.lndo.site</p>
                  <p>Full URL: https://dseza-backend.lndo.site/jsonapi/node/su-kien/{uuid}</p>
                  <p className="mt-2">Bạn có thể kiểm tra API trực tiếp tại:</p>
                  <div className="mt-2 space-y-1">
                    <a 
                      href="https://dseza-backend.lndo.site/jsonapi/node/su-kien" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline block"
                    >
                      📋 Danh sách tất cả sự kiện
                    </a>
                    <a 
                      href={`https://dseza-backend.lndo.site/jsonapi/node/su-kien/${uuid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline block"
                    >
                      🔍 Chi tiết sự kiện UUID: {uuid}
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <TopBar />
      <LogoSearchBar />
      <NavigationBar />
      
      {/* Main Content */}
      <main className="pt-52">
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <a href="/" className="hover:text-primary transition-colors">
                Trang chủ
              </a>
              <ChevronRight className="h-4 w-4" />
              <a href="/su-kien" className="hover:text-primary transition-colors">
                Sự kiện
              </a>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium line-clamp-1">
                Sự kiện
              </span>
            </nav>
          </div>
        </div>

        {/* Event Content */}
        <div className="container mx-auto px-4 py-8">
          <article className="max-w-4xl mx-auto">
            {/* Event Header */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Chi tiết sự kiện
              </h1>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Thời gian: Đang cập nhật</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Địa điểm: Đang cập nhật</span>
                </div>
              </div>
            </header>

            {/* Event Content */}
            <div className="prose prose-lg max-w-none mt-8">
              <p>Nội dung sự kiện đang được cập nhật...</p>
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Chia sẻ sự kiện:
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('facebook')}
                  className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
                >
                  <Facebook className="h-4 w-4 text-blue-600" />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('twitter')}
                  className="flex items-center gap-2 hover:bg-sky-50 hover:border-sky-300"
                >
                  <Twitter className="h-4 w-4 text-sky-500" />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('email')}
                  className="flex items-center gap-2 hover:bg-gray-50 hover:border-gray-300"
                >
                  <Mail className="h-4 w-4 text-gray-600" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('copy')}
                  className="flex items-center gap-2 hover:bg-green-50 hover:border-green-300"
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