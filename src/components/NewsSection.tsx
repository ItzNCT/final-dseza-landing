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
import { getImageWithFallback } from "@/utils/drupal";
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

// Format date function
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

  // Use appropriate title and excerpt based on language
  const displayTitle = language === 'en' && titleEn ? titleEn : title;
  const displayExcerpt = language === 'en' && excerptEn ? excerptEn : excerpt;

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
 */
const NewsSection: React.FC = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("all");
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { data: allNewsData, isLoading: newsLoading, isError: newsError } = useAllNews();
  const { data: categoriesData, isLoading: categoriesLoading, isError: categoriesError } = useNewsCategories();

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
      name: "Tất cả tin tức", 
      nameEn: "All News",
      tid: 0,
      weight: -1
    },
    ...(categoriesData || [])
  ];

  // Filter news based on selected category
  const filteredNews = React.useMemo(() => {
    if (!allNewsData) return [];
    if (activeCategory === "all") return allNewsData;
    
    // Find the selected category
    const selectedCategory = categories.find(cat => cat.id === activeCategory);
    if (!selectedCategory) return [];
    
    // Filter by checking if the selected category name exists in any of the article's categories
    return allNewsData.filter(article => {
      // Check both primary category and all categories
      const primaryMatch = article.category?.trim() === selectedCategory.name?.trim();
      const allCategoriesMatch = article.all_categories?.some(cat => 
        cat?.trim() === selectedCategory.name?.trim()
      );
      
      return primaryMatch || allCategoriesMatch;
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
                date={formatDate(filteredNews[0].published_date)}
                title={filteredNews[0].title}
                titleEn={filteredNews[0].title} // API doesn't have separate English titles yet
                excerpt={filteredNews[0].summary}
                excerptEn={filteredNews[0].summary} // API doesn't have separate English excerpts yet
                image={getImageWithFallback(filteredNews[0].featured_image)}
                url={`/bai-viet/${filteredNews[0].id}`}
                isLarge={true}
              />
            </div>

            {/* Smaller news cards */}
            <div className="lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {filteredNews.slice(1, 3).map(article => (
                <NewsCard
                  key={article.id}
                  date={formatDate(article.published_date)}
                  title={article.title}
                  titleEn={article.title} // API doesn't have separate English titles yet
                  excerpt={article.summary}
                  excerptEn={article.summary} // API doesn't have separate English excerpts yet
                  image={getImageWithFallback(article.featured_image)}
                  url={`/bai-viet/${article.id}`}
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
      </div>
    </section>
  );
};

export default NewsSection;