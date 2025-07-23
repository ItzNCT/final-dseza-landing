
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { useTranslation } from "@/utils/translations";
import { useLanguage } from "@/context/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAllNews, type NewsItem } from "@/hooks/useAllNews";
import { useNewsCategories, type NewsCategory } from "@/hooks/useNewsCategories";
import { getImageWithFallback } from "@/utils/drupal";

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

  // Theme-specific styles
  const cardBg = theme === "dark" ? "bg-[#263745]" : "bg-white";
  const cardBorder = theme === "dark" ? "border-[#3A4A5B]" : "border-gray-200";
  const cardHover = theme === "dark" ? "hover:bg-[#2D3E4F]" : "hover:bg-gray-50";
  const titleText = theme === "dark" ? "text-white" : "text-gray-900";
  const excerptText = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const secondaryText = theme === "dark" ? "text-gray-400" : "text-gray-500";

  return (
    <a
      href={`/bai-viet/${id}`}
      className={cn(
        "block rounded-xl overflow-hidden",
        "border transition-all duration-300 ease-in-out",
        cardBg,
        cardBorder,
        cardHover,
        "hover:shadow-lg active:scale-95"
      )}
    >
      <div className="flex gap-4 p-4">
        {/* Article Image */}
        <div className="w-24 h-16 relative flex-shrink-0">
          <img
            src={getImageWithFallback(featured_image)}
          alt={displayTitle}
          loading="lazy"
            className="w-full h-full object-cover rounded-lg"
        />
      </div>

        {/* Article Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          {/* Date */}
          <div className="flex items-center gap-2 mb-2">
          <Calendar className={cn("h-3.5 w-3.5", secondaryText)} />
          <p className={cn("text-xs font-inter font-normal", secondaryText)}>
              {new Date(published_date).toLocaleDateString('vi-VN')}
          </p>
        </div>

          {/* Title */}
          <h3 className={cn(
            "font-montserrat font-semibold text-sm line-clamp-2 mb-2",
            titleText
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
 * Loading placeholder for news cards
 */
const NewsCardSkeleton: React.FC = () => {
  const { theme } = useTheme();
  const cardBg = theme === "dark" ? "bg-[#2C3640]" : "bg-[#F2F2F2]";

  return (
    <div className={cn("rounded-xl overflow-hidden", cardBg, "shadow-lg")}>
      <Skeleton className="w-full aspect-video" />
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Skeleton className="h-3.5 w-3.5 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-7 w-full mb-2" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4 mt-1" />
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

  // Theme-specific styles for the section container
  const sectionBg = theme === "dark" ? "bg-[#1E272F]" : "bg-white";
  const titleText = theme === "dark" ? "text-white" : "text-black";
  const buttonText = theme === "dark" ? "text-[#19DBCF]" : "text-[#416628]";
  const buttonBorder = theme === "dark" ? "border-[#19DBCF]" : "border-[#416628]";
  const buttonHoverBg = theme === "dark" ? "hover:bg-[#19DBCF]/10" : "hover:bg-[#416628]/10";

  // Build categories array with "All News" plus dynamic categories from API
  const categories: NewsCategory[] = [
    {
      id: "all",
      name: "Tất cả tin tức", 
      nameEn: "All News"
    },
    ...(categoriesData || [])
  ];

  // Normalize text for better matching (remove extra spaces, normalize case)
  const normalizeText = (text: string | null | undefined): string => {
    if (!text) return '';
    return text.trim().toLowerCase().replace(/\s+/g, ' ');
  };

  // Filter news based on selected category (same logic as desktop)
  const filteredNews = React.useMemo(() => {
    if (!allNewsData) return [];
    if (activeCategory === "all") return allNewsData;
    
    // Find the selected category
    const selectedCategory = categories.find(cat => cat.id === activeCategory);
    if (!selectedCategory) return [];
    
    const selectedCategoryName = normalizeText(selectedCategory.name);
    
    // Filter by checking if the selected category name exists in any of the article's categories
    return allNewsData.filter(article => {
      // Check primary category match
      const primaryMatch = normalizeText(article.category) === selectedCategoryName;
      
      // Check all categories match
      const allCategoriesMatch = article.all_categories?.some(cat => 
        normalizeText(cat) === selectedCategoryName
      );
      
      // Also check by category ID if available
      let categoryIdMatch = false;
      if (article.all_category_ids && article.all_category_ids.length > 0) {
        categoryIdMatch = article.all_category_ids.includes(selectedCategory.id);
      }
      
      return primaryMatch || allCategoriesMatch || categoryIdMatch;
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
          "font-montserrat font-bold text-2xl text-center mb-6", // Giữ nguyên căn lề trái
          titleText
      )}>
        {t('news.title') || "TIN TỨC"}
      </h2>

      {/* Tabs navigation for filtering news */}
      <Tabs
        defaultValue={activeCategory}
        value={activeCategory}
        onValueChange={handleCategoryChange}
        className="w-full"
      >
        {/* Custom TabsList wrapper to allow horizontal scrolling */}
        <div className="overflow-x-auto scrollbar-hide pb-2 mb-6">
          <TabsList className="bg-transparent p-0 h-auto flex space-x-3 min-w-max">
            {categoriesLoading ? (
              // Show skeleton for category tabs while loading
              <>
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-28" />
              </>
            ) : (
              categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className={cn(
                  "py-2 px-4 rounded-full font-inter text-sm font-medium whitespace-nowrap flex-shrink-0",
                  "transition-colors duration-200 ease-in-out",
                  // Active state
                  "data-[state=active]:font-semibold",
                  "data-[state=active]:bg-dseza-light-primary data-[state=active]:text-white", // Light mode active
                  "dark:data-[state=active]:bg-dseza-dark-primary dark:data-[state=active]:text-dseza-dark-main-bg", // Dark mode active
                  // Inactive state
                  "data-[state=inactive]:bg-dseza-light-secondary-bg data-[state=inactive]:text-dseza-light-secondary-text", // Light mode inactive
                  "dark:data-[state=inactive]:bg-dseza-dark-secondary-bg dark:data-[state=inactive]:text-dseza-dark-secondary-text", // Dark mode inactive
                  // Hover on inactive state
                  "hover:data-[state=inactive]:bg-dseza-light-hover hover:data-[state=inactive]:text-dseza-light-main-text", // Light mode hover on inactive
                  "dark:hover:data-[state=inactive]:bg-dseza-dark-hover dark:hover:data-[state=inactive]:text-dseza-dark-main-text", // Dark mode hover on inactive
                  "focus-visible:ring-offset-0 focus-visible:ring-0" // Reset focus ring
                )}
              >
                {language === 'en' && category.nameEn ? category.nameEn : category.name}
              </TabsTrigger>
              ))
            )}
          </TabsList>
        </div>

        {/* Tab content sections */}
        {categories.map((category) => (
          <TabsContent
            key={category.id}
            value={category.id}
            className="mt-0 focus-visible:outline-none focus-visible:ring-0"
          >
            {/* Loading State */}
            {(newsLoading || categoriesLoading) && (
              <div className="flex flex-col space-y-5">
                {Array.from({ length: 3 }).map((_, index) => <NewsCardSkeleton key={index} />)}
              </div>
            )}
            
            {/* Error State */}
            {(newsError || categoriesError) && !newsLoading && !categoriesLoading && (
              <div className="text-center py-8">
                <p className={cn("text-sm", titleText)}>
                  Đã xảy ra lỗi khi tải tin tức. Vui lòng thử lại sau.
                </p>
              </div>
            )}

            {/* News Articles List (Vertical Stack) */}
            {!newsLoading && !categoriesLoading && !newsError && !categoriesError && (
            <div className="flex flex-col space-y-5">
                {filteredNews.length > 0 ? (
                  filteredNews.slice(0, 6).map((article) => ( // Limit to 6 articles for mobile
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
                    <p className={cn("text-sm", titleText)}>
                      Không có bài viết nào trong chuyên mục này.
                    </p>
                  </div>
              )}
            </div>
            )}

            {/* View More Button */}
            {filteredNews.length > 6 && (
            <div className="flex justify-center mt-6">
              <a
                  href={`/tin-tuc/${category.id}`}
                className={cn(
                  "py-2.5 px-6 rounded-full font-inter font-medium text-sm",
                  "border transition-colors duration-200",
                  buttonText,
                  buttonBorder,
                  buttonHoverBg
                )}
              >
                {t('homepage.viewAll') || "XEM TẤT CẢ"}
              </a>
            </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default MobileNewsSection;
