import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Star, ArrowRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { generateArticleLink } from "@/utils/generateArticleLink";

interface MobileArticleCardProps {
  article: {
    id: string;
    title: string;
    summary: string;
    imageUrl?: string;
    published_date: string;
    path: string;
    categories: string[];
    is_featured?: boolean;
  };
  categoryDisplay?: string;
}

/**
 * Mobile-optimized article card component
 * 
 * Features horizontal layout with thumbnail on the left and content on the right
 * Optimized for touch interactions and small screens
 */
const MobileArticleCard: React.FC<MobileArticleCardProps> = ({ 
  article, 
  categoryDisplay 
}) => {
  const { theme } = useTheme();
  const { language } = useLanguage();

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

  const url = generateArticleLink(article, language);
  return (
    <Link 
      to={url} 
      className="block group"
    >
      <article className={`relative overflow-hidden rounded-lg shadow-sm border transition-all duration-200 group-hover:shadow-md group-active:scale-[0.98] ${
        theme === 'dark' 
          ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border hover:border-dseza-dark-primary/30' 
          : 'bg-white border-dseza-light-border hover:border-dseza-light-primary/30'
      }`}>
        
        {/* Horizontal Layout Container */}
        <div className="flex p-4 gap-3">
          
          {/* Thumbnail - Left Side */}
          <div className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
            <img 
              src={article.imageUrl || '/placeholder.svg'} 
              alt={article.title} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
            
            {/* Featured indicator on image */}
            {article.is_featured && (
              <div className="absolute top-1 right-1">
                <div className={`p-1 rounded-full ${
                  theme === 'dark' 
                    ? 'bg-yellow-900/80' 
                    : 'bg-yellow-100/90'
                }`}>
                  <Star className={`h-2.5 w-2.5 ${
                    theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'
                  }`} />
                </div>
              </div>
            )}
          </div>

          {/* Content - Right Side */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            
            {/* Top Content */}
            <div className="space-y-2">
              
              {/* Category and Date Row */}
              <div className="flex items-center justify-between gap-2">
                {/* Category Badge */}
                {(categoryDisplay || article.categories[0]) && (
                  <Badge 
                    variant="secondary" 
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      theme === 'dark' 
                        ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border-dseza-dark-primary/30' 
                        : 'bg-dseza-light-primary/20 text-dseza-light-primary border-dseza-light-primary/30'
                    }`}
                  >
                    {categoryDisplay || article.categories[0]}
                  </Badge>
                )}
                
                {/* Date */}
                <div className={`flex items-center text-xs flex-shrink-0 ${
                  theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                }`}>
                  <Calendar className="h-3 w-3 mr-1" />
                  <time dateTime={article.published_date}>
                    {formatDate(article.published_date)}
                  </time>
                </div>
              </div>

              {/* Title */}
              <h2 className={`text-sm font-semibold line-clamp-2 leading-tight transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'text-dseza-dark-main-text group-hover:text-dseza-dark-primary' 
                  : 'text-dseza-light-main-text group-hover:text-dseza-light-primary'
              }`}>
                {article.title}
              </h2>

              {/* Summary */}
              <p className={`text-xs line-clamp-2 leading-relaxed ${
                theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
              }`}>
                {article.summary}
              </p>
            </div>

            {/* Bottom Row - Read More */}
            <div className="flex items-center justify-between mt-3 pt-2">
              <span className={`text-xs font-medium transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'text-dseza-dark-primary group-hover:text-dseza-dark-primary/80' 
                  : 'text-dseza-light-primary group-hover:text-dseza-light-primary/80'
              }`}>
                Đọc thêm
              </span>
              
              <ArrowRight className={`h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 ${
                theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'
              }`} />
            </div>
          </div>
        </div>

        {/* Featured badge overlay */}
        {article.is_featured && (
          <div className="absolute top-2 left-2">
            <Badge 
              variant="secondary" 
              className={`px-2 py-0.5 text-xs font-medium ${
                theme === 'dark' 
                  ? 'bg-yellow-900/80 text-yellow-300 border-yellow-400/30' 
                  : 'bg-yellow-100/90 text-yellow-800 border-yellow-300/30'
              }`}
            >
              <Star className="h-2.5 w-2.5 mr-1" />
              Tiêu biểu
            </Badge>
          </div>
        )}
      </article>
    </Link>
  );
};

export default MobileArticleCard; 