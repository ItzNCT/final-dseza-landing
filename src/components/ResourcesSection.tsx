// src/components/ResourcesSection.tsx
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { Image as ImageIcon, Video as VideoIcon, File as FileIcon, Play, Download, ExternalLink, X, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/utils/translations";
import { useImages } from "@/hooks/useImages";
import { useVideos } from "@/hooks/useVideos";
import { useDocuments } from "@/hooks/useDocuments";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useLanguageRoutes } from "@/utils/routes";
import { DRUPAL_BASE_URL } from '@/config';

// Modal component for video playback
const VideoModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}> = ({ isOpen, onClose, videoUrl, title }) => {
  const { theme } = useTheme();
  
  if (!isOpen) return null;

  // Extract video ID from YouTube URL for embedding
  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    if (videoIdMatch) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    return url;
  };

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
      <div className={cn(
        "relative w-full max-w-4xl rounded-lg overflow-hidden",
        theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-white"
      )}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className={cn(
            "text-lg font-semibold",
            theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text"
          )}>
            {title}
          </h3>
          <button
            onClick={onClose}
            className={cn(
              "p-2 rounded hover:bg-opacity-10 hover:bg-gray-500",
              theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text"
            )}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="aspect-video">
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

// ResourceItemSkeleton component for loading state
const ResourceItemSkeleton = () => {
  const { theme } = useTheme();
  
  return (
    <div className="block rounded-lg overflow-hidden shadow-md">
      <div className="overflow-hidden">
        <Skeleton className="h-64 w-full" />
      </div>
      <div className={cn(
        "p-4",
        theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-white"
      )}>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

// Error display component
const ErrorDisplay: React.FC<{
  title: string;
  message: string;
  onRetry?: () => void;
  showDebug?: boolean;
}> = ({ title, message, onRetry, showDebug = false }) => {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const panelContentBg = theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-dseza-light-secondary-bg";

  return (
    <div className={cn("p-12 text-center rounded-lg border-2 border-dashed", 
      panelContentBg,
      theme === "dark" ? "border-red-800" : "border-red-200"
    )}>
      <AlertCircle className={cn("w-16 h-16 mx-auto mb-4", 
        theme === "dark" ? "text-red-400" : "text-red-500"
      )} />
      <h3 className={cn("text-xl font-semibold mb-2", textColor)}>
        {title}
      </h3>
      <p className={cn("text-base mb-4", secondaryTextColor)}>
        {message}
      </p>
      
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className={cn(
            "mb-4",
            theme === "dark" ? "border-red-600 text-red-400 hover:bg-red-900/20" : "border-red-300 text-red-600 hover:bg-red-50"
          )}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Thử lại
        </Button>
      )}

      {showDebug && (
        <div className={cn("text-xs text-left border p-3 rounded mt-4", 
          theme === "dark" ? "border-red-800 bg-red-900/10 text-red-300" : "border-red-200 bg-red-50 text-red-700"
        )}>
          <p className="font-semibold mb-2">🔍 Thông tin debug:</p>
          <p>Base URL: {DRUPAL_BASE_URL || '(proxy)'}</p>
          <p>API Endpoint: {DRUPAL_BASE_URL || ''}/jsonapi/node/resource</p>
          <p className="mt-2">Bạn có thể kiểm tra API trực tiếp tại:</p>
          <div className="mt-2 space-y-1">
            <a 
              href={`${DRUPAL_BASE_URL || ''}/jsonapi/node/resource`} 
              target="_blank"
              rel="noopener noreferrer"
              className={cn("block transition-colors underline",
                theme === "dark" ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-800"
              )}
            >
              📋 Danh sách tất cả tài nguyên
            </a>
            <a 
              href={`${DRUPAL_BASE_URL || ''}/jsonapi/node/resource/97c6db25-8859-4ef8-a9ef-a563eb6599fa`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("block transition-colors underline",
                theme === "dark" ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-800"
              )}
            >
              🔍 Kiểm tra tài nguyên mẫu
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Resources section with tabbed interface for Images, Videos, and Documents
 */
const ResourcesSection: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { createUrl, language } = useLanguageRoutes();
  const [activeTab, setActiveTab] = useState<'images' | 'videos' | 'documents'>('images');
  const [selectedVideo, setSelectedVideo] = useState<{url: string, title: string} | null>(null);

  // Fetch data from all hooks
  const { images, isLoading: imagesLoading, isError: imagesError, error: imagesErrorData, refetch: refetchImages } = useImages();
  const { videos, isLoading: videosLoading, isError: videosError, error: videosErrorData, refetch: refetchVideos } = useVideos();
  const { documents, isLoading: documentsLoading, isError: documentsError, error: documentsErrorData, refetch: refetchDocuments } = useDocuments();

  // Show toast notifications for errors
  React.useEffect(() => {
    if (imagesError && imagesErrorData) {
      toast({
        title: "Lỗi tải hình ảnh",
        description: imagesErrorData.message || "Không thể tải danh sách hình ảnh tài nguyên.",
        variant: "destructive",
      });
    }
  }, [imagesError, imagesErrorData, toast]);

  React.useEffect(() => {
    if (videosError && videosErrorData) {
      toast({
        title: "Lỗi tải video",
        description: videosErrorData.message || "Không thể tải danh sách video tài nguyên.",
        variant: "destructive",
      });
    }
  }, [videosError, videosErrorData, toast]);

  React.useEffect(() => {
    if (documentsError && documentsErrorData) {
      toast({
        title: "Lỗi tải tài liệu",
        description: documentsErrorData.message || "Không thể tải danh sách tài liệu tài nguyên.",
        variant: "destructive",
      });
    }
  }, [documentsError, documentsErrorData, toast]);

  // Theme-specific styles
  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const accentColor = theme === "dark" ? "text-dseza-dark-primary-accent" : "text-dseza-light-primary-accent";
  const accentBgColor = theme === "dark" ? "bg-dseza-dark-primary-accent" : "bg-dseza-light-primary-accent";
  const tabDefaultBg = theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-dseza-light-secondary-bg";
  const panelContentBg = theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-dseza-light-secondary-bg";

  // Hover styles for tabs
  const tabInactiveHoverBg = theme === "dark" ? "hover:bg-dseza-dark-hover-bg/70" : "hover:bg-dseza-light-hover-bg/70";
  const tabInactiveHoverTextColor = `hover:${accentColor}`;
  const tabActiveHover = "hover:scale-103 hover:shadow-md";

  // Hover styles for "View All" button
  const viewAllButtonHoverBg = theme === "dark" ? "hover:bg-dseza-dark-primary-accent/10" : "hover:bg-dseza-light-primary-accent/10";
  const viewAllButtonHoverText = `hover:${accentColor}`;
  const viewAllButtonBaseBorder = theme === "dark" ? "border-dseza-dark-border" : "border-dseza-light-border";

  // Get current data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case 'images':
        return { 
          data: images, 
          isLoading: imagesLoading, 
          isError: imagesError, 
          error: imagesErrorData,
          refetch: refetchImages
        };
      case 'videos':
        return { 
          data: videos, 
          isLoading: videosLoading, 
          isError: videosError, 
          error: videosErrorData,
          refetch: refetchVideos
        };
      case 'documents':
        return { 
          data: documents, 
          isLoading: documentsLoading, 
          isError: documentsError, 
          error: documentsErrorData,
          refetch: refetchDocuments
        };
      default:
        return { data: [], isLoading: false, isError: false, error: null, refetch: () => {} };
    }
  };

  const { data: currentData, isLoading: currentLoading, isError: currentError, error: currentErrorData, refetch: currentRefetch } = getCurrentData();

  const renderTabButton = (tabName: 'images' | 'videos' | 'documents', IconComponent: React.ElementType, labelKey: string) => (
    <button
      className={cn(
        "flex items-center px-4 py-2 rounded-md font-inter font-semibold text-base transition-all duration-300 ease-in-out",
        activeTab === tabName
          ? `${accentBgColor} text-white ${tabActiveHover}`
          : `${tabDefaultBg} ${secondaryTextColor} ${tabInactiveHoverBg} ${tabInactiveHoverTextColor}`
      )}
      onClick={() => setActiveTab(tabName)}
    >
      <IconComponent className="w-5 h-5 mr-2" />
      {t(labelKey)}
    </button>
  );

  const handleVideoClick = (videoUrl: string, title: string) => {
    if (!videoUrl) {
      toast({
        title: "Không có video",
        description: "Video này chưa có URL để phát.",
        variant: "destructive",
      });
      return;
    }
    setSelectedVideo({ url: videoUrl, title });
  };

  const handleImageClick = (imageUrl: string) => {
    if (imageUrl === '/placeholder.svg') {
      toast({
        title: "Không có hình ảnh",
        description: "Hình ảnh này chưa được tải lên.",
        variant: "destructive",
      });
      return;
    }
    window.open(imageUrl, '_blank');
  };

  const handleDocumentClick = (fileUrl: string) => {
    if (fileUrl === '#') {
      toast({
        title: "Không có tài liệu",
        description: "Tài liệu này chưa có file để tải xuống.",
        variant: "destructive",
      });
      return;
    }
    window.open(fileUrl, '_blank');
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <section className={cn(
      "py-12 px-4 sm:px-6 lg:px-8",
      theme === "dark" ? "bg-[#1D262E]" : "bg-[#FFFFFF]"
    )}>
      <div className="container mx-auto">
        <h2 className={cn(
          "font-montserrat font-bold text-3xl md:text-4xl mb-8",
          textColor,
          "text-center lg:text-left" 
        )}>
          {t('resourcesSection.sectionTitle')}
        </h2>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {renderTabButton('images', ImageIcon, 'resourcesSection.tabImages')}
          {renderTabButton('videos', VideoIcon, 'resourcesSection.tabVideos')}
          {renderTabButton('documents', FileIcon, 'resourcesSection.tabDocuments')}
        </div>
        
        {/* Content Area based on active tab */}
        <div className="mb-8 min-h-[300px]">
          {/* Loading State */}
          {currentLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <ResourceItemSkeleton key={index} />
              ))}
            </div>
          )}

          {/* Error State */}
          {currentError && (
            <ErrorDisplay
              title={`Lỗi tải ${activeTab === 'images' ? 'hình ảnh' : activeTab === 'videos' ? 'video' : 'tài liệu'}`}
              message={currentErrorData?.message || `Có lỗi xảy ra khi tải dữ liệu ${activeTab === 'images' ? 'hình ảnh' : activeTab === 'videos' ? 'video' : 'tài liệu'} tài nguyên.`}
              onRetry={currentRefetch}
              showDebug={true}
            />
          )}

          {/* Images Tab */}
          {activeTab === 'images' && !currentLoading && !currentError && (
            <>
              {currentData && currentData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {currentData.map((image) => (
                    <div
                      key={image.id}
                      className="block group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
                      onClick={() => handleImageClick(image.imageUrl)}
                    >
                      <div className="overflow-hidden">
                        <AspectRatio ratio={4/3} className="bg-gray-200 dark:bg-gray-700">
                          {image.imageUrl && image.imageUrl !== '/placeholder.svg' ? (
                            <img
                              src={image.imageUrl}
                              alt={image.title}
                              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder.svg';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-12 h-12 text-gray-400" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                            <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </AspectRatio>
                      </div>
                      <div className={cn(
                        "p-4",
                        theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-white"
                      )}>
                        <h3 className={cn(
                          "font-inter font-semibold text-lg mb-1 transition-colors duration-300", 
                          textColor,
                          `group-hover:${accentColor}`
                        )}>
                          {image.title}
                        </h3>
                        <p className={cn(
                          "font-inter text-sm transition-colors duration-300", 
                          secondaryTextColor,
                          `group-hover:${accentColor}`
                        )}>
                          {t('resourcesSection.dateLabel')}: {formatDate(image.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={cn("p-12 text-center rounded-lg", panelContentBg)}>
                  <ImageIcon className={cn("w-16 h-16 mx-auto mb-4", secondaryTextColor)} />
                  <h3 className={cn("text-xl font-semibold mb-2", textColor)}>
                    {t('resourcesSection.noImages') || 'Chưa có hình ảnh nào'}
                  </h3>
                  <p className={cn("text-base", secondaryTextColor)}>
                    {t('resourcesSection.noImagesDesc') || 'Chưa có hình ảnh tài nguyên nào được đăng tải.'}
                  </p>
                </div>
              )}
            </>
          )}
          
          {/* Videos Tab */}
          {activeTab === 'videos' && !currentLoading && !currentError && (
            <>
              {currentData && currentData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {currentData.map((video) => (
                    <div
                      key={video.id}
                      className="block group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
                      onClick={() => handleVideoClick(video.videoUrl, video.title)}
                    >
                      <div className="overflow-hidden relative">
                        <AspectRatio ratio={16/9} className="bg-gray-200 dark:bg-gray-700">
                          {video.thumbnailUrl && video.thumbnailUrl !== '/placeholder.svg' ? (
                            <img
                              src={video.thumbnailUrl}
                              alt={video.title}
                              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder.svg';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <VideoIcon className="w-12 h-12 text-gray-400" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                            <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </AspectRatio>
                      </div>
                      <div className={cn(
                        "p-4",
                        theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-white"
                      )}>
                        <h3 className={cn(
                          "font-inter font-semibold text-lg mb-1 transition-colors duration-300", 
                          textColor,
                          `group-hover:${accentColor}`
                        )}>
                          {video.title}
                        </h3>
                        <p className={cn(
                          "font-inter text-sm transition-colors duration-300", 
                          secondaryTextColor,
                          `group-hover:${accentColor}`
                        )}>
                          {t('resourcesSection.dateLabel')}: {formatDate(video.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={cn("p-12 text-center rounded-lg", panelContentBg)}>
                  <VideoIcon className={cn("w-16 h-16 mx-auto mb-4", secondaryTextColor)} />
                  <h3 className={cn("text-xl font-semibold mb-2", textColor)}>
                    {t('resourcesSection.noVideos') || 'Chưa có video nào'}
                  </h3>
                  <p className={cn("text-base", secondaryTextColor)}>
                    {t('resourcesSection.noVideosDesc') || 'Chưa có video tài nguyên nào được đăng tải.'}
                  </p>
                </div>
              )}
            </>
          )}
          
          {/* Documents Tab */}
          {activeTab === 'documents' && !currentLoading && !currentError && (
            <>
              {currentData && currentData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentData.map((document) => (
                    <div
                      key={document.id}
                      className="block group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
                      onClick={() => handleDocumentClick(document.fileUrl)}
                    >
                      <div className={cn(
                        "p-6 text-center",
                        theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-white"
                      )}>
                        <div className="mb-4">
                          <FileIcon className={cn("w-16 h-16 mx-auto transition-colors duration-300", 
                            secondaryTextColor, `group-hover:${accentColor}`)} />
                        </div>
                        <h3 className={cn(
                          "font-inter font-semibold text-lg mb-2 transition-colors duration-300", 
                          textColor,
                          `group-hover:${accentColor}`
                        )}>
                          {document.title}
                        </h3>
                        <p className={cn(
                          "font-inter text-sm mb-3 transition-colors duration-300", 
                          secondaryTextColor,
                          `group-hover:${accentColor}`
                        )}>
                          {t('resourcesSection.dateLabel')}: {formatDate(document.date)}
                        </p>
                        <div className="flex items-center justify-center text-sm">
                          <Download className="w-4 h-4 mr-1" />
                          <span>{t('resourcesSection.downloadLabel') || 'Tải xuống'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={cn("p-12 text-center rounded-lg", panelContentBg)}>
                  <FileIcon className={cn("w-16 h-16 mx-auto mb-4", secondaryTextColor)} />
                  <h3 className={cn("text-xl font-semibold mb-2", textColor)}>
                    {t('resourcesSection.noDocuments') || 'Chưa có tài liệu nào'}
                  </h3>
                  <p className={cn("text-base", secondaryTextColor)}>
                    {t('resourcesSection.noDocumentsDesc') || 'Chưa có tài liệu nào được đăng tải.'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* View All Resources button - Only show when there are resources and not loading */}
        {currentData && currentData.length > 0 && !currentLoading && !currentError && (
          <div className="text-center">
            <Button
              variant="outline"
              className={cn(
                "font-inter font-semibold text-base",
                viewAllButtonBaseBorder,
                textColor,
                viewAllButtonHoverBg,
                viewAllButtonHoverText,
                "hover:scale-105 hover:shadow-md transition-all duration-300 ease-in-out"
              )}
              onClick={() => {
                const targetPath = language === 'en' ? 'resources' : 'tai-nguyen';
                navigate(createUrl(targetPath));
              }}
            >
              {t('resourcesSection.viewAll')}
            </Button>
          </div>
        )}
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.url || ''}
        title={selectedVideo?.title || ''}
      />
    </section>
  );
};

export default ResourcesSection;