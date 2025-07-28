
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import { useTranslation } from "@/utils/translations";
import { useLanguage } from "@/context/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAllNews, type NewsItem } from "@/hooks/useAllNews";
import { useNewsCategories, type NewsCategory } from "@/hooks/useNewsCategories";
import { getImageWithFallback } from "@/utils/drupal";

// Format date function matching PC version
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
};

/**
 * Individual news article card component
 */
const NewsCard: React.FC<NewsItem & { titleEn?: string; summaryEn?: string }> = ({
  featured_image,
  published_date,
  title,
  titleEn,
  summary,
  summaryEn,
  id
}) => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  // Use translated content if available
  const displayTitle = language === 'en' && titleEn ? titleEn : title;
  const displayExcerpt = language === 'en' && summaryEn ? summaryEn : summary;

  // Theme-specific styles using dseza variables
  const cardBg = theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-dseza-light-secondary-bg";
  const cardBorder = theme === "dark" ? "border-dseza-dark-border" : "border-dseza-light-border";
  const cardHover = theme === "dark" ? "hover:bg-dseza-dark-hover-bg" : "hover:bg-dseza-light-hover-bg";
  const titleText = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const excerptText = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const secondaryText = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const titleHoverColor = theme === "dark" ? "hover:text-dseza-dark-primary-accent" : "hover:text-dseza-light-primary-accent";

  return (
    <a
      href={`/bai-viet/${id}`}
      className={cn(
        "group block rounded-xl overflow-hidden",
        "border transition-all duration-300 ease-in-out",
        cardBg,
        cardBorder,
        cardHover,
        "hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
      )}
    >
      <div className="flex gap-4 p-4">
        {/* Article Image */}
        <div className="w-24 h-16 relative flex-shrink-0 overflow-hidden">
          <img
            src={getImageWithFallback(featured_image)}
            alt={displayTitle}
            loading="lazy"
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        </div>

        {/* Article Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          {/* Date */}
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays className={cn("h-3.5 w-3.5", secondaryText)} />
            <p className={cn("text-xs font-inter font-normal", secondaryText)}>
              {formatDate(published_date)}
            </p>
          </div>

          {/* Title */}
          <h3 className={cn(
            "font-montserrat font-semibold text-sm line-clamp-2 mb-2 transition-colors duration-300",
            titleText,
            titleHoverColor
          )}>
            {displayTitle}
          </h3>

          {/* Excerpt */}
          <p className={cn(
            "font-inter text-xs line-clamp-2",
            excerptText
          )}>
            {displayExcerpt}
          </p>
        </div>
      </div>
    </a>
  );
};

/**
 * Loading placeholder for news cards matching card structure
 */
const NewsCardSkeleton: React.FC = () => {
  const { theme } = useTheme();
  const cardBg = theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-dseza-light-secondary-bg";
  const cardBorder = theme === "dark" ? "border-dseza-dark-border" : "border-dseza-light-border";

  return (
    <div className={cn("rounded-xl overflow-hidden border", cardBg, cardBorder)}>
      <div className="flex gap-4 p-4">
        {/* Image skeleton */}
        <div className="w-24 h-16 flex-shrink-0">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>
        {/* Content skeleton */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-3.5 w-3.5 rounded-full" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>
    </div>
  );
};

/**
 * Mobile-specific news section with filtering tabs
 */
const MobileNewsSection: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Fetch real data from API
  const { data: allNewsData, isLoading: newsLoading, isError: newsError } = useAllNews();
  const { data: categoriesData, isLoading: categoriesLoading, isError: categoriesError } = useNewsCategories();

  // Theme-specific styles using dseza variables to match PC version
  const sectionBg = theme === "dark" ? "bg-[#1D262E]" : "bg-[#FFFFFF]";
  const titleText = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const accentColor = theme === "dark" ? "text-dseza-dark-primary-accent" : "text-dseza-light-primary-accent";
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const buttonText = theme === "dark" ? "text-dseza-dark-primary-accent" : "text-dseza-light-primary-accent";
  const buttonBorder = theme === "dark" ? "border-dseza-dark-primary-accent" : "border-dseza-light-primary-accent";
  const buttonHoverBg = theme === "dark" ? "hover:bg-dseza-dark-primary-accent/10" : "hover:bg-dseza-light-primary-accent/10";

  // Build categories array with "All News" plus dynamic categories from API
  const categories: NewsCategory[] = [
    {
      id: "all",
      name: "Tất cả tin tức", 
      nameEn: "All News",
      tid: 0,
      weight: -1
    },
    ...(categoriesData || [])
  ];

  // Filter news based on selected category (matching PC version logic)
  const filteredNews = React.useMemo(() => {
    if (!allNewsData) return [];
    if (activeCategory === "all") return allNewsData;
    
    // Find the selected category
    const selectedCategory = categories.find(cat => cat.id === activeCategory);
    if (!selectedCategory) return [];
    
    // Filter by checking if the selected category ID exists in the article's category IDs
    return allNewsData.filter(article => {
      // Check if the selected category ID is in the article's category IDs
      return article.all_category_ids && article.all_category_ids.includes(selectedCategory.id);
    });
  }, [allNewsData, activeCategory, categories]);

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  return (
    <section className={cn(
      sectionBg,
      "py-8 px-4 w-full"
    )}>
      {/* Section Title */}
      <h2 className={cn(
        "font-montserrat font-bold text-2xl text-left mb-6", // Changed to left align to match PC
        titleText
      )}>
        {t('news.title') || "TIN TỨC"}
      </h2>

      {/* Category Filter Buttons (instead of tabs for simpler mobile UX) */}
      <div className="overflow-x-auto scrollbar-hide pb-2 mb-6">
        <div className="flex space-x-2 min-w-max">
          {categoriesLoading ? (
            // Show skeleton for category tabs while loading
            <>
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-28" />
            </>
          ) : (
            categories.map(category => (
              <button
                key={category.id}
                className={cn(
                  "px-4 py-2 rounded-md transition-colors duration-200 font-inter text-sm whitespace-nowrap flex-shrink-0",
                  activeCategory === category.id ? accentColor : secondaryTextColor,
                  activeCategory === category.id ? "font-medium" : "font-normal",
                  "hover:text-opacity-90"
                )}
                onClick={() => handleCategoryChange(category.id)}
              >
                {language === 'en' && category.nameEn ? category.nameEn : category.name}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Loading State */}
      {(newsLoading || categoriesLoading) && (
        <div className="flex flex-col space-y-4">
          {Array.from({ length: 3 }).map((_, index) => <NewsCardSkeleton key={index} />)}
        </div>
      )}
      
      {/* Error State */}
      {(newsError || categoriesError) && !newsLoading && !categoriesLoading && (
        <div className="text-center py-8">
          <p className={cn("text-lg", titleText)}>
            {t('common.errorLoading') || 'Có lỗi xảy ra khi tải dữ liệu tin tức.'}
          </p>
        </div>
      )}

      {/* News Articles List */}
      {!newsLoading && !categoriesLoading && !newsError && !categoriesError && (
        <div className="flex flex-col space-y-4">
          {filteredNews.length > 0 ? (
            filteredNews.slice(0, 6).map((article) => (
              <NewsCard
                key={article.id}
                {...article}
                titleEn={article.title} // API doesn't have separate English titles yet
                summaryEn={article.summary} // API doesn't have separate English excerpts yet
              />
            ))
          ) : (
            // No articles found for this category
            <div className="text-center py-8">
              <p className={cn("text-lg", titleText)}>
                {activeCategory === "all" 
                  ? (t('news.noNews') || 'Chưa có tin tức nào được đăng tải.')
                  : 'Không có bài viết nào trong chuyên mục này.'
                }
              </p>
            </div>
          )}
        </div>
      )}

      {/* View More Button */}
      {filteredNews.length > 6 && !newsLoading && !newsError && !categoriesLoading && !categoriesError && (
        <div className="flex justify-center mt-6">
          <a
            href={`#view-more-${activeCategory}`}
            className={cn(
              "py-2.5 px-6 rounded-full font-inter font-medium text-sm",
              "border transition-colors duration-200",
              buttonText,
              buttonBorder,
              buttonHoverBg,
              "hover:scale-105 hover:shadow-md"
            )}
          >
            {t('homepage.viewAll') || "XEM TẤT CẢ"}
          </a>
        </div>
      )}
    </section>
  );
};

export default MobileNewsSection;
