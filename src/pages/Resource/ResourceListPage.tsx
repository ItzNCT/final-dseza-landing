import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/utils/translations";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useImages } from "@/hooks/useImages";
import { useVideos } from "@/hooks/useVideos";
import { useDocuments } from "@/hooks/useDocuments";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import MobileLayout from "@/components/mobile/MobileLayout";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  Image as ImageIcon,
  Video as VideoIcon,
  File as FileIcon,
  Play,
  Download,
  ExternalLink,
  AlertCircle,
  RefreshCw,
  LayoutList,
  ChevronRight,
} from "lucide-react";

// Local skeleton for loading grid items
const GridItemSkeleton: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div className="block rounded-lg overflow-hidden shadow-md">
      <div className="overflow-hidden">
        <Skeleton className="h-64 w-full" />
      </div>
      <div className={cn("p-4", theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-white")}>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

// Error block per section
const ErrorBlock: React.FC<{
  title: string;
  message: string;
  onRetry?: () => void;
}> = ({ title, message, onRetry }) => {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const panelBg = theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-dseza-light-secondary-bg";
  return (
    <div className={cn("p-10 text-center rounded-lg border-2 border-dashed", panelBg, theme === "dark" ? "border-red-800" : "border-red-200")}>
      <AlertCircle className={cn("w-10 h-10 mx-auto mb-3", theme === "dark" ? "text-red-400" : "text-red-500")} />
      <h4 className={cn("text-lg font-semibold mb-2", textColor)}>{title}</h4>
      <p className={cn("text-sm mb-4", secondaryTextColor)}>{message}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className={cn(theme === "dark" ? "border-red-600 text-red-400 hover:bg-red-900/20" : "border-red-300 text-red-600 hover:bg-red-50")}
        >
          <RefreshCw className="w-4 h-4 mr-2" /> Thử lại
        </Button>
      )}
    </div>
  );
};

// Inline video modal
const VideoModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}> = ({ isOpen, onClose, videoUrl, title }) => {
  const { theme } = useTheme();
  if (!isOpen) return null;

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
      <div className={cn("relative w-full max-w-4xl rounded-lg overflow-hidden", theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-white")}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className={cn("text-lg font-semibold", theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text")}>{title}</h3>
          <button
            onClick={onClose}
            className={cn("p-2 rounded hover:bg-opacity-10 hover:bg-gray-500", theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text")}
          >
            ✕
          </button>
        </div>
        <div className="aspect-video">
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

const ResourceListPage: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  const { images, isLoading: imagesLoading, isError: imagesError, error: imagesErr, refetch: refetchImages } = useImages();
  const { videos, isLoading: videosLoading, isError: videosError, error: videosErr, refetch: refetchVideos } = useVideos();
  const { documents, isLoading: docsLoading, isError: docsError, error: docsErr, refetch: refetchDocs } = useDocuments();

  const [selectedVideo, setSelectedVideo] = React.useState<{ url: string; title: string } | null>(null);

  // Page title & description (SEO)
  const pageTitle = language === "en" ? "Resources" : t("resourcesSection.sectionTitle");
  const getPageDescription = React.useCallback(() => {
    return language === "en"
      ? "Browse consolidated images, videos, and documents from DSEZA."
      : "Xem danh sách tổng hợp hình ảnh, video và tài liệu từ DSEZA.";
  }, [language, t]);

  React.useEffect(() => {
    if (imagesError && imagesErr) {
      toast({ title: "Lỗi tải hình ảnh", description: imagesErr.message || "Không thể tải danh sách hình ảnh.", variant: "destructive" });
    }
  }, [imagesError, imagesErr, toast]);

  React.useEffect(() => {
    if (videosError && videosErr) {
      toast({ title: "Lỗi tải video", description: videosErr.message || "Không thể tải danh sách video.", variant: "destructive" });
    }
  }, [videosError, videosErr, toast]);

  React.useEffect(() => {
    if (docsError && docsErr) {
      toast({ title: "Lỗi tải tài liệu", description: docsErr.message || "Không thể tải danh sách tài liệu.", variant: "destructive" });
    }
  }, [docsError, docsErr, toast]);

  // SEO meta like ArticleListPage
  React.useEffect(() => {
    document.title = `${pageTitle} | DSEZA`;

    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (metaDesc) {
      metaDesc.setAttribute('content', getPageDescription());
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = getPageDescription();
      document.head.appendChild(meta);
    }

    // Set language on html tag
    document.documentElement.lang = language;

    // Open Graph
    const updateOrCreateMetaTag = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (metaTag) {
        metaTag.setAttribute('content', content);
      } else {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        metaTag.setAttribute('content', content);
        document.head.appendChild(metaTag);
      }
    };

    updateOrCreateMetaTag('og:title', `${pageTitle} | DSEZA`);
    updateOrCreateMetaTag('og:description', getPageDescription());
    updateOrCreateMetaTag('og:type', 'website');
    updateOrCreateMetaTag('og:url', window.location.href);
    updateOrCreateMetaTag('og:site_name', 'DSEZA - Da Nang Hi-Tech Park and Industrial Zones');

    // Twitter card
    const updateOrCreateTwitterMetaTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };
    updateOrCreateTwitterMetaTag('twitter:card', 'summary_large_image');
    updateOrCreateTwitterMetaTag('twitter:title', `${pageTitle} | DSEZA`);
    updateOrCreateTwitterMetaTag('twitter:description', getPageDescription());

    // Canonical
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonicalLink) {
      canonicalLink.href = window.location.href;
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = window.location.href;
      document.head.appendChild(canonicalLink);
    }
  }, [pageTitle, language, getPageDescription]);

  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const accentColor = theme === "dark" ? "text-dseza-dark-primary-accent" : "text-dseza-light-primary-accent";
  const cardBg = theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-white";
  const panelBg = theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-dseza-light-secondary-bg";

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
    } catch {
      return dateString;
    }
  };

  const handleImageClick = (imageUrl: string) => {
    if (!imageUrl || imageUrl === "/placeholder.svg") {
      toast({ title: "Không có hình ảnh", description: "Hình ảnh này chưa được tải lên.", variant: "destructive" });
      return;
    }
    window.open(imageUrl, "_blank");
  };

  const handleVideoClick = (videoUrl: string, title: string) => {
    if (!videoUrl) {
      toast({ title: "Không có video", description: "Video này chưa có URL để phát.", variant: "destructive" });
      return;
    }
    setSelectedVideo({ url: videoUrl, title });
  };

  const handleDocumentClick = (fileUrl: string) => {
    if (!fileUrl || fileUrl === "#") {
      toast({ title: "Không có tài liệu", description: "Tài liệu này chưa có file để tải xuống.", variant: "destructive" });
      return;
    }
    window.open(fileUrl, "_blank");
  };

  // Mobile layout
  if (isMobile) {
    return (
      <MobileLayout>
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
          <main className="flex-1 px-4 py-6">
            {/* Mobile Breadcrumb */}
            <div className={cn(
              "py-1 px-2 rounded-lg mb-3",
              theme === 'dark' ? 'bg-dseza-dark-secondary-bg/50' : 'bg-dseza-light-secondary-bg/50'
            )}>
              <nav className={cn(
                "flex items-center space-x-1 text-xs",
                theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
              )}>
                <Link
                  to="/"
                  className={cn(
                    "transition-colors hover:underline",
                    theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'
                  )}
                >
                  {language === 'en' ? 'Home' : 'Trang chủ'}
                </Link>
                <ChevronRight className="h-2.5 w-2.5" />
                <span className={cn(
                  "font-medium",
                  theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                )}>
                  {pageTitle}
                </span>
              </nav>
            </div>
            {/* Header */}
            <div className="text-center py-3">
              <h1 className={cn("text-xl font-bold mb-2", textColor)}>{pageTitle}</h1>
              <div className={cn("w-12 h-0.5 mx-auto mb-2 rounded-full", theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary')} />
              <p className={cn("text-xs", secondaryTextColor)}>{getPageDescription()}</p>
            </div>

            {/* Counts */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge variant="secondary" className={cn("px-2 py-0.5 text-xs", theme === 'dark' ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border-dseza-dark-primary/30' : 'bg-dseza-light-primary/20 text-dseza-light-primary border-dseza-light-primary/30')}>
                <ImageIcon className="h-3 w-3 mr-1" />{images?.length || 0}
              </Badge>
              <Badge variant="secondary" className={cn("px-2 py-0.5 text-xs", theme === 'dark' ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border-dseza-dark-primary/30' : 'bg-dseza-light-primary/20 text-dseza-light-primary border-dseza-light-primary/30')}>
                <VideoIcon className="h-3 w-3 mr-1" />{videos?.length || 0}
              </Badge>
              <Badge variant="secondary" className={cn("px-2 py-0.5 text-xs", theme === 'dark' ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border-dseza-dark-primary/30' : 'bg-dseza-light-primary/20 text-dseza-light-primary border-dseza-light-primary/30')}>
                <FileIcon className="h-3 w-3 mr-1" />{documents?.length || 0}
              </Badge>
            </div>

            {/* Sections reuse existing grids with 1-2 cols */}
            <section className="space-y-8">
              {/* Images */}
              <div>
                <div className="flex items-center mb-3">
                  <ImageIcon className={cn("w-5 h-5 mr-2", secondaryTextColor)} />
                  <h2 className={cn("text-lg font-semibold", textColor)}>{t("resourcesSection.tabImages")}</h2>
                </div>
                {imagesLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (<GridItemSkeleton key={i} />))}
                  </div>
                ) : imagesError ? (
                  <ErrorBlock title="Lỗi tải hình ảnh" message={imagesErr?.message || "Có lỗi xảy ra khi tải dữ liệu hình ảnh."} onRetry={refetchImages} />
                ) : images && images.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {images.map((image: any) => (
                      <div key={image.id} className={cn("overflow-hidden rounded-lg shadow-md transition-all duration-200 active:scale-[0.98]", theme === 'dark' ? 'bg-dseza-dark-secondary border border-dseza-dark-border' : 'bg-white border border-dseza-light-border')} onClick={() => handleImageClick(image.imageUrl)}>
                        <AspectRatio ratio={4/3} className="bg-gray-200 dark:bg-gray-700">
                          <img
                            src={image.imageUrl || '/placeholder.svg'}
                            alt={image.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                          />
                        </AspectRatio>
                        <div className="p-3">
                          <h3 className={cn("text-base font-semibold mb-1", textColor)}>{image.title}</h3>
                          <p className={cn("text-xs", secondaryTextColor)}>{t('resourcesSection.dateLabel')}: {formatDate(image.date)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={cn("p-6 text-center rounded-lg", theme === 'dark' ? 'bg-dseza-dark-secondary-bg/50' : 'bg-dseza-light-secondary-bg/50')}>
                    <ImageIcon className={cn("w-10 h-10 mx-auto mb-2", secondaryTextColor)} />
                    <p className={cn("text-sm", secondaryTextColor)}>{t("resourcesSection.noImages") || "Chưa có hình ảnh nào"}</p>
                  </div>
                )}
              </div>

              {/* Videos */}
              <div>
                <div className="flex items-center mb-3">
                  <VideoIcon className={cn("w-5 h-5 mr-2", secondaryTextColor)} />
                  <h2 className={cn("text-lg font-semibold", textColor)}>{t("resourcesSection.tabVideos")}</h2>
                </div>
                {videosLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (<GridItemSkeleton key={i} />))}
                  </div>
                ) : videosError ? (
                  <ErrorBlock title="Lỗi tải video" message={videosErr?.message || "Có lỗi xảy ra khi tải dữ liệu video."} onRetry={refetchVideos} />
                ) : videos && videos.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {videos.map((video: any) => (
                      <div key={video.id} className={cn("overflow-hidden rounded-lg shadow-md transition-all duration-200 active:scale-[0.98]", theme === 'dark' ? 'bg-dseza-dark-secondary border border-dseza-dark-border' : 'bg-white border border-dseza-light-border')} onClick={() => handleVideoClick(video.videoUrl, video.title)}>
                        <AspectRatio ratio={16/9} className="bg-gray-200 dark:bg-gray-700">
                          <img
                            src={video.thumbnailUrl || '/placeholder.svg'}
                            alt={video.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                          />
                        </AspectRatio>
                        <div className="p-3">
                          <h3 className={cn("text-base font-semibold mb-1", textColor)}>{video.title}</h3>
                          <p className={cn("text-xs", secondaryTextColor)}>{t('resourcesSection.dateLabel')}: {formatDate(video.date)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={cn("p-6 text-center rounded-lg", theme === 'dark' ? 'bg-dseza-dark-secondary-bg/50' : 'bg-dseza-light-secondary-bg/50')}>
                    <VideoIcon className={cn("w-10 h-10 mx-auto mb-2", secondaryTextColor)} />
                    <p className={cn("text-sm", secondaryTextColor)}>{t("resourcesSection.noVideos") || "Chưa có video nào"}</p>
                  </div>
                )}
              </div>

              {/* Documents */}
              <div>
                <div className="flex items-center mb-3">
                  <FileIcon className={cn("w-5 h-5 mr-2", secondaryTextColor)} />
                  <h2 className={cn("text-lg font-semibold", textColor)}>{t("resourcesSection.tabDocuments")}</h2>
                </div>
                {docsLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (<GridItemSkeleton key={i} />))}
                  </div>
                ) : docsError ? (
                  <ErrorBlock title="Lỗi tải tài liệu" message={docsErr?.message || "Có lỗi xảy ra khi tải dữ liệu tài liệu."} onRetry={refetchDocs} />
                ) : documents && documents.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {documents.map((doc: any) => (
                      <div key={doc.id} className={cn("overflow-hidden rounded-lg shadow-md transition-all duration-200 active:scale-[0.98]", theme === 'dark' ? 'bg-dseza-dark-secondary border border-dseza-dark-border' : 'bg-white border border-dseza-light-border')} onClick={() => handleDocumentClick(doc.fileUrl)}>
                        <div className="p-4 text-center">
                          <FileIcon className={cn("w-12 h-12 mx-auto mb-2", secondaryTextColor)} />
                          <h3 className={cn("text-base font-semibold mb-1", textColor)}>{doc.title}</h3>
                          <p className={cn("text-xs mb-1", secondaryTextColor)}>{t('resourcesSection.dateLabel')}: {formatDate(doc.date)}</p>
                          <div className="inline-flex items-center text-xs">
                            <Download className="w-3 h-3 mr-1" />
                            <span>{t('resourcesSection.downloadLabel') || 'Tải xuống'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={cn("p-6 text-center rounded-lg", theme === 'dark' ? 'bg-dseza-dark-secondary-bg/50' : 'bg-dseza-light-secondary-bg/50')}>
                    <FileIcon className={cn("w-10 h-10 mx-auto mb-2", secondaryTextColor)} />
                    <p className={cn("text-sm", secondaryTextColor)}>{t("resourcesSection.noDocuments") || "Chưa có tài liệu nào"}</p>
                  </div>
                )}
              </div>
            </section>
          </main>
          <Footer />
        </div>
        {/* Video Modal */}
        <VideoModal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} videoUrl={selectedVideo?.url || ""} title={selectedVideo?.title || ""} />
      </MobileLayout>
    );
  }

  // Desktop layout
  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
      <TopBar />
      <LogoSearchBar />
      <NavigationBar />

      <main className="flex-1 pt-52">
        {/* Breadcrumb */}
        <div className={cn("py-3 border-b", theme === 'dark' ? 'bg-dseza-dark-secondary/50 border-dseza-dark-border' : 'bg-dseza-light-secondary/50 border-dseza-light-border')}>
          <div className="container mx-auto px-4">
            <nav className={cn("flex items-center space-x-2 text-sm", secondaryTextColor)}>
              <Link to="/" className={cn("transition-colors hover:underline", theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary')}>
                {language === 'en' ? 'Home' : 'Trang chủ'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={cn("font-medium", textColor)}>{pageTitle}</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <div className="container mx-auto px-4 py-8">
          <div className="mb-10 text-center">
            <h1 className={cn("text-4xl md:text-5xl font-bold mb-4", textColor)}>{pageTitle}</h1>
            <div className={cn("w-24 h-1 mx-auto mb-4 rounded-full", theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary')} />
            <p className={cn("text-lg max-w-2xl mx-auto", secondaryTextColor)}>{getPageDescription()}</p>
            {/* Summary badges */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <Badge variant="secondary" className={cn("px-3 py-1 text-sm", theme === 'dark' ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border-dseza-dark-primary/30' : 'bg-dseza-light-primary/20 text-dseza-light-primary border-dseza-light-primary/30')}>
                <ImageIcon className="h-4 w-4 mr-1" />{images?.length || 0}
              </Badge>
              <Badge variant="secondary" className={cn("px-3 py-1 text-sm", theme === 'dark' ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border-dseza-dark-primary/30' : 'bg-dseza-light-primary/20 text-dseza-light-primary border-dseza-light-primary/30')}>
                <VideoIcon className="h-4 w-4 mr-1" />{videos?.length || 0}
              </Badge>
              <Badge variant="secondary" className={cn("px-3 py-1 text-sm", theme === 'dark' ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border-dseza-dark-primary/30' : 'bg-dseza-light-primary/20 text-dseza-light-primary border-dseza-light-primary/30')}>
                <FileIcon className="h-4 w-4 mr-1" />{documents?.length || 0}
              </Badge>
            </div>
          </div>

          {/* Sections */}
          <section className="space-y-12">
            {/* Images */}
            <div>
              <div className="flex items-center mb-4">
                <ImageIcon className={cn("w-5 h-5 mr-2", secondaryTextColor)} />
                <h2 className={cn("font-inter font-semibold text-2xl", textColor)}>{t("resourcesSection.tabImages")}</h2>
              </div>
              {imagesLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {Array.from({ length: 8 }).map((_, i) => (<GridItemSkeleton key={i} />))}
                </div>
              ) : imagesError ? (
                <ErrorBlock title="Lỗi tải hình ảnh" message={imagesErr?.message || "Có lỗi xảy ra khi tải dữ liệu hình ảnh."} onRetry={refetchImages} />
              ) : images && images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {images.map((image: any) => (
                    <div key={image.id} className={cn("h-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 group hover:shadow-2xl hover:-translate-y-2 cursor-pointer", theme === 'dark' ? 'bg-dseza-dark-secondary border border-dseza-dark-border' : 'bg-white border border-dseza-light-border')} onClick={() => handleImageClick(image.imageUrl)}>
                      <div className="relative overflow-hidden h-48">
                        <img src={image.imageUrl || '/placeholder.svg'} alt={image.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-5">
                        <h3 className={cn("text-lg font-semibold mb-1", textColor)}>{image.title}</h3>
                        <p className={cn("text-sm", secondaryTextColor)}>{t('resourcesSection.dateLabel')}: {formatDate(image.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={cn("p-10 text-center rounded-lg", theme === 'dark' ? 'bg-dseza-dark-secondary-bg/50' : 'bg-dseza-light-secondary-bg/50')}>
                  <ImageIcon className={cn("w-16 h-16 mx-auto mb-3", secondaryTextColor)} />
                  <p className={cn("text-base", secondaryTextColor)}>{t("resourcesSection.noImages") || "Chưa có hình ảnh nào"}</p>
                </div>
              )}
            </div>

            {/* Videos */}
            <div>
              <div className="flex items-center mb-4">
                <VideoIcon className={cn("w-5 h-5 mr-2", secondaryTextColor)} />
                <h2 className={cn("font-inter font-semibold text-2xl", textColor)}>{t("resourcesSection.tabVideos")}</h2>
              </div>
              {videosLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {Array.from({ length: 8 }).map((_, i) => (<GridItemSkeleton key={i} />))}
                </div>
              ) : videosError ? (
                <ErrorBlock title="Lỗi tải video" message={videosErr?.message || "Có lỗi xảy ra khi tải dữ liệu video."} onRetry={refetchVideos} />
              ) : videos && videos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {videos.map((video: any) => (
                    <div key={video.id} className={cn("h-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 group hover:shadow-2xl hover:-translate-y-2 cursor-pointer", theme === 'dark' ? 'bg-dseza-dark-secondary border border-dseza-dark-border' : 'bg-white border border-dseza-light-border')} onClick={() => handleVideoClick(video.videoUrl, video.title)}>
                      <div className="relative overflow-hidden h-48">
                        <img src={video.thumbnailUrl || '/placeholder.svg'} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                          <div className={cn("p-2 rounded-full", theme === 'dark' ? 'bg-dseza-dark-primary text-dseza-dark-main-text' : 'bg-dseza-light-primary text-white')}>
                            <Play className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className={cn("text-lg font-semibold mb-1", textColor)}>{video.title}</h3>
                        <p className={cn("text-sm", secondaryTextColor)}>{t('resourcesSection.dateLabel')}: {formatDate(video.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={cn("p-10 text-center rounded-lg", theme === 'dark' ? 'bg-dseza-dark-secondary-bg/50' : 'bg-dseza-light-secondary-bg/50')}>
                  <VideoIcon className={cn("w-16 h-16 mx-auto mb-3", secondaryTextColor)} />
                  <p className={cn("text-base", secondaryTextColor)}>{t("resourcesSection.noVideos") || "Chưa có video nào"}</p>
                </div>
              )}
            </div>

            {/* Documents */}
            <div>
              <div className="flex items-center mb-4">
                <FileIcon className={cn("w-5 h-5 mr-2", secondaryTextColor)} />
                <h2 className={cn("font-inter font-semibold text-2xl", textColor)}>{t("resourcesSection.tabDocuments")}</h2>
              </div>
              {docsLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Array.from({ length: 9 }).map((_, i) => (<GridItemSkeleton key={i} />))}
                </div>
              ) : docsError ? (
                <ErrorBlock title="Lỗi tải tài liệu" message={docsErr?.message || "Có lỗi xảy ra khi tải dữ liệu tài liệu."} onRetry={refetchDocs} />
              ) : documents && documents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {documents.map((doc: any) => (
                    <div key={doc.id} className={cn("h-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 group hover:shadow-2xl hover:-translate-y-2 cursor-pointer", theme === 'dark' ? 'bg-dseza-dark-secondary border border-dseza-dark-border' : 'bg-white border border-dseza-light-border')} onClick={() => handleDocumentClick(doc.fileUrl)}>
                      <div className="p-6 text-center">
                        <FileIcon className={cn("w-16 h-16 mx-auto mb-3", secondaryTextColor)} />
                        <h3 className={cn("text-lg font-semibold mb-2", textColor)}>{doc.title}</h3>
                        <p className={cn("text-sm mb-3", secondaryTextColor)}>{t('resourcesSection.dateLabel')}: {formatDate(doc.date)}</p>
                        <div className="inline-flex items-center text-sm">
                          <Download className="w-4 h-4 mr-1" />
                          <span>{t('resourcesSection.downloadLabel') || 'Tải xuống'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={cn("p-10 text-center rounded-lg", theme === 'dark' ? 'bg-dseza-dark-secondary-bg/50' : 'bg-dseza-light-secondary-bg/50')}>
                  <FileIcon className={cn("w-16 h-16 mx-auto mb-3", secondaryTextColor)} />
                  <p className={cn("text-base", secondaryTextColor)}>{t("resourcesSection.noDocuments") || "Chưa có tài liệu nào"}</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />

      {/* Video Modal */}
      <VideoModal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} videoUrl={selectedVideo?.url || ""} title={selectedVideo?.title || ""} />
    </div>
  );
};

export default ResourceListPage;


