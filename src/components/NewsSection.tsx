// src/components/NewsSection.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/utils/translations";
import { useLanguage } from "@/context/LanguageContext";
import { useHomepageData } from "@/hooks/useHomepageData";
import { useNewsCategories, type NewsCategory } from "@/hooks/useNewsCategories";
import { useAllNews } from "@/hooks/useAllNews";
import { getImageWithFallback, generateArticleUrl } from "@/utils/drupal";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsCardProps {
  date: string;
  title: string;
  titleEn?: string;
  excerpt: string;
  excerptEn?: string;
  image: string;
  isLarge?: boolean;
  url?: string;
}

// Format date function with language support
const formatDate = (dateString: string, language: 'vi' | 'en' = 'vi'): string => {
  try {
    const date = new Date(dateString);
    const locale = language === 'en' ? 'en-US' : 'vi-VN';
    const options: Intl.DateTimeFormatOptions = language === 'en' 
      ? { month: 'long', day: 'numeric', year: 'numeric' }
      : { day: '2-digit', month: '2-digit', year: 'numeric' };
    
    return date.toLocaleDateString(locale, options);
  } catch (error) {
    return dateString;
  }
};

// NewsCardSkeleton component for loading state
const NewsCardSkeleton = ({ isLarge = false }: { isLarge?: boolean }) => {
  const { theme } = useTheme();
  const cardBg = theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-dseza-light-secondary-bg";

  return (
    <div className={cn("rounded-xl overflow-hidden h-full", cardBg)}>
      <div className="h-0 pb-[56.25%] relative">
        <Skeleton className="absolute inset-0 w-full h-full" />
      </div>
      <div className="p-4 sm:p-5">
        <Skeleton className="h-3 w-24 mb-1" />
        <Skeleton className={cn("mb-2", isLarge ? "h-8 w-full" : "h-6 w-full")} />
        <Skeleton className={cn(isLarge ? "h-4 w-full mb-2" : "h-4 w-3/4")} />
        {isLarge && <Skeleton className="h-4 w-2/3" />}
      </div>
    </div>
  );
};

/**
 * Individual news card component
 */
const NewsCard: React.FC<NewsCardProps> = ({ date, title, titleEn, excerpt, excerptEn, image, isLarge, url = "#" }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  // Theme-specific styles
  const cardBg = theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-dseza-light-secondary-bg";
  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const titleHoverColor = theme === "dark" ? "hover:text-dseza-dark-primary-accent" : "hover:text-dseza-light-primary-accent";

  // Use title and excerpt directly since they're already from the correct language API endpoint
  const displayTitle = title; // title is already in the correct language from API endpoint
  const displayExcerpt = excerpt; // excerpt is already in the correct language from API endpoint
  
  // Debug can be removed in production
  if (title.length > 10 && Math.random() < 0.1) { // Only log occasionally to avoid spam
    console.log('🔍 NewsCard rendering correctly:', {
      language,
      displayTitle: displayTitle?.substring(0, 30) + '...'
    });
  }

  return (
    <Link
      to={url}
      className={cn(
        "group block rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-1 h-full",
        cardBg,
        theme === "dark" ? "hover:shadow-[0_8px_16px_rgba(0,0,0,0.3)]" : "hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
      )}
    >
      <div className="h-0 pb-[56.25%] relative overflow-hidden">
        <img
          src={image}
          alt={displayTitle}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
      </div>
      <div className="p-4 sm:p-5">
        <p className={cn("text-xs mb-1", secondaryTextColor)}>{date}</p>
        <h3 className={cn(
          "font-montserrat font-semibold mb-2 line-clamp-2 transition-colors duration-300",
          textColor, 
          titleHoverColor,
          isLarge ? "text-xl sm:text-2xl" : "text-base"
        )}>
          {displayTitle}
        </h3>
        <p className={cn("text-sm line-clamp-3", secondaryTextColor)}>
          {displayExcerpt}
        </p>
      </div>
    </Link>
  );
};



/**
 * News section with category filters
 * Note: Only displays articles that belong to event child categories
 * (categories that are children of "Sự kiện" parent category)
 */
const NewsSection: React.FC = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("all");
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { data: allNewsData, isLoading: newsLoading, isError: newsError } = useAllNews(language);
  const { data: categoriesData, isLoading: categoriesLoading, isError: categoriesError } = useNewsCategories();

  // Debug logs (can be removed in production)
  console.log('📰 NewsSection language & data loaded:', {
    language,
    articlesCount: allNewsData?.length || 0
  });

  // Theme-specific styles
  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const accentColor = theme === "dark" ? "text-dseza-dark-primary-accent" : "text-dseza-light-primary-accent";
  const buttonText = theme === "dark" ? "text-[#19DBCF]" : "text-[#416628]";
  const buttonBorder = theme === "dark" ? "border-[#19DBCF]" : "border-[#416628]";
  const buttonHoverBg = theme === "dark" ? "hover:bg-[#19DBCF]/10" : "hover:bg-[#416628]/10";

  // Build categories array with "All News" plus dynamic categories from API
  const categories: NewsCategory[] = [
    {
      id: "all",
      name: language === 'en' ? "All News" : "Tất cả tin tức", 
      nameEn: "All News",
      tid: 0,
      weight: -1
    },
    ...(categoriesData || [])
  ];

  // Filter news based on selected category
  // Note: allNewsData already contains only articles from event child categories
  const filteredNews = React.useMemo(() => {
    if (!allNewsData) return [];
    if (activeCategory === "all") return allNewsData;
    
    // Find the selected category
    const selectedCategory = categories.find(cat => cat.id === activeCategory);
    if (!selectedCategory) return [];
    
    // Filter by checking if the selected category ID exists in the article's category IDs
    // This is more reliable than name matching
    return allNewsData.filter(article => {
      // Check if the selected category ID is in the article's category IDs
      return article.all_category_ids && article.all_category_ids.includes(selectedCategory.id);
    });
  }, [allNewsData, activeCategory, categories]);



  return (
    <section className={cn(
      "py-12 px-4 sm:px-6 lg:px-8",
      theme === "dark" ? "bg-[#1D262E]" : "bg-[#FFFFFF]"
    )}>
      <div className="container mx-auto">
        <h2 className={cn(
          "font-montserrat font-bold text-3xl md:text-4xl mb-4 text-left",
          textColor
        )}>
          {t('news.title')}
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-start mb-8 gap-2">
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
                  "px-4 py-2 rounded-md transition-colors duration-200 font-inter text-sm sm:text-base",
                  activeCategory === category.id ? accentColor : secondaryTextColor,
                  activeCategory === category.id ? "font-medium" : "font-normal",
                  "hover:text-opacity-90"
                )}
                onClick={() => setActiveCategory(category.id)}
              >
                {language === 'en' && category.nameEn ? category.nameEn : category.name}
              </button>
            ))
          )}
        </div>

        {/* Loading State */}
        {(newsLoading || categoriesLoading) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Large news card skeleton */}
            <div className="lg:col-span-2">
              <NewsCardSkeleton isLarge={true} />
            </div>
            {/* Smaller news cards skeleton */}
            <div className="lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              <NewsCardSkeleton />
              <NewsCardSkeleton />
            </div>
          </div>
        )}

        {/* Error State */}
        {(newsError || categoriesError) && (
          <div className="text-center py-12">
            <p className={cn("text-lg", textColor)}>
              {t('common.errorLoading') || 'Có lỗi xảy ra khi tải dữ liệu tin tức.'}
            </p>
          </div>
        )}

        {/* Data State */}
        {filteredNews.length > 0 && !newsLoading && !newsError && !categoriesLoading && !categoriesError && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Large news card */}
            <div className="lg:col-span-2">
              <NewsCard
                date={formatDate(filteredNews[0].published_date, language)}
                title={filteredNews[0].title}
                titleEn={filteredNews[0].titleEn}
                excerpt={filteredNews[0].summary}
                excerptEn={filteredNews[0].summaryEn}
                image={getImageWithFallback(filteredNews[0].featured_image)}
                url={generateArticleUrl(filteredNews[0], language)}
                isLarge={true}
              />
            </div>

            {/* Smaller news cards */}
            <div className="lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {filteredNews.slice(1, 3).map(article => (
                <NewsCard
                  key={article.id}
                  date={formatDate(article.published_date, language)}
                  title={article.title}
                  titleEn={article.titleEn}
                  excerpt={article.summary}
                  excerptEn={article.summaryEn}
                  image={getImageWithFallback(article.featured_image)}
                  url={generateArticleUrl(article, language)}
                  isLarge={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* No Data State */}
        {allNewsData && filteredNews.length === 0 && !newsLoading && !newsError && !categoriesLoading && !categoriesError && (
          <div className="text-center py-12">
            <p className={cn("text-lg", textColor)}>
              {t('news.noNews') || 'Chưa có tin tức nào được đăng tải.'}
            </p>
          </div>
        )}

        {/* View All Button - Only show when there are articles */}
        {filteredNews.length > 0 && !newsLoading && !newsError && !categoriesLoading && !categoriesError && (
          <div className="flex justify-center mt-8">
            <Link
              to={`${language === 'en' ? '/en' : ''}/tin-tuc/su-kien`}
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
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;