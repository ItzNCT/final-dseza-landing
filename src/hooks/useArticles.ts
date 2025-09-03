import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { extractImageUrl, useDrupalApi } from "@/utils/drupal";
import { extractFirstImageFromRichText } from "@/utils/richTextProcessor";
import { useAllNewsCategories } from "./useNewsCategories";
import { useLanguage } from "@/context/LanguageContext";

// Định nghĩa cấu trúc cho một bài viết
export interface Article {
  id: string;
  title: string;
  summary: string;
  imageUrl?: string;
  path: string;
  published_date: string;
  categories: string[];
  is_featured?: boolean;
}

// Custom hook để lấy danh sách bài viết theo category
export const useArticles = () => {
  const { category, subcategory } = useParams<{ category: string; subcategory?: string; }>();
  const { data: categoriesData } = useAllNewsCategories(); // Use ALL categories instead of just event categories
  const { apiGet } = useDrupalApi(); // Use language-aware API client
  const { language } = useLanguage(); // Get current language

  const fetchArticles = async (): Promise<Article[]> => {
    // Xác định target category cho filter
    const targetCategory = subcategory || category;

    if (!targetCategory) {
      return []; // Nếu không có category, trả về mảng rỗng
    }

    // Xây dựng API options với JSON:API
    const apiOptions = {
      filter: {
        status: { value: '1' } // Chỉ lấy bài viết đã publish
      },
      sort: '-created', // Sắp xếp theo ngày tạo mới nhất
      page: { limit: 20 }, // Giới hạn 20 bài viết
      include: 'field_anh_dai_dien.field_media_image,field_chuyen_muc' // Include images và categories
    };

    // Nếu targetCategory là 'su-kien', 'events', hoặc 'tin-tuc' thì lấy tất cả tin tức (không filter)
    const showAllNews = targetCategory === 'su-kien' || targetCategory === 'tin-tuc' || targetCategory === 'events';

    // URL mapping để convert từ URL slug sang category name thực tế
    const urlToCategoryMap: { [key: string]: string } = {
      'dau-tu-hop-tac-quoc-te': 'Đầu tư – Hợp tác quốc tế',
      'dao-tao-uom-tao-khoi-nghiep': 'Đào tạo, Ươm tạo khởi nghiệp',
      'chuyen-doi-so': 'Chuyển đổi số',
      'hoat-dong-ban-quan-ly': 'Hoạt động Ban quản lý',
      'tin-khac': 'Tin khác',
      'tin-tuc-khac': 'Tin khác',
      'other-news': 'Tin khác',
      'doanh-nghiep': 'Doanh nghiệp',
      'thong-bao': 'Thông báo',
      'thong-tin-bao-chi': 'Thông tin báo chí',
      'press-information': 'Thông tin báo chí',
      'hoat-dong': 'Hoạt động',
      'su-kien': 'Tin tức & Sự kiện',
      'events': 'Tin tức & Sự kiện',
      'tin-tuc': 'Tin tức',
      // Investment-related categories
      'quy-trinh-linh-vuc-dau-tu': 'Quy trình lĩnh vực đầu tư',
      'linh-vuc-khuyen-khich-dau-tu': 'Lĩnh vực thu hút đầu tư',
      'linh-vuc-thu-hut-dau-tu': 'Lĩnh vực thu hút đầu tư', // Alternative slug
      'danh-cho-nha-dau-tu': 'Dành cho nhà đầu tư', // Parent category
      
      // Investment environment subcategories
      'moi-truong-dau-tu': 'Môi trường đầu tư', // Parent category
      'ha-tang-giao-thong': 'Hạ tầng giao thông',
      'khoa-hoc-cong-nghe-moi-truong': 'Khoa học công nghệ - Môi trường',
      'logistics': 'Logistics',
      'ha-tang-xa-hoi': 'Hạ tầng xã hội',
      'nguon-nhan-luc': 'Nguồn nhân lực',
      'cai-cach-hanh-chinh': 'Cải cách hành chính',
      // English slugs for Investment Environment categories mapping to Vietnamese category names
      'transportation-infrastructure': 'Hạ tầng giao thông',
      'science-technology-environment': 'Khoa học công nghệ - Môi trường',
      'social-infrastructure': 'Hạ tầng xã hội',
      'human-resources': 'Nguồn nhân lực',
      'industrial-park-infrastructure': 'Hạ tầng khu công nghiệp',
      // English slugs for Investor-related categories
      'investment-sector-procedures': 'Quy trình lĩnh vực đầu tư',
      'investment-incentive-sectors': 'Lĩnh vực thu hút đầu tư',
      'administrative-reform': 'Cải cách hành chính',
    };

    // Lấy category name từ mapping, hoặc nếu không có trong map thì tìm trong categoriesData
    let categoryNameToFilter = urlToCategoryMap[targetCategory];
    
    // Nếu không tìm thấy trong hardcode map, thử tìm trong real categories data
    if (!categoryNameToFilter && categoriesData) {
      const foundCategory = categoriesData.find(cat => 
        cat.name.toLowerCase().includes(targetCategory.replace(/-/g, ' ').toLowerCase()) ||
        targetCategory.replace(/-/g, ' ').toLowerCase().includes(cat.name.toLowerCase())
      );
      if (foundCategory) {
        categoryNameToFilter = foundCategory.name;
      }
    }

    if (!showAllNews && categoryNameToFilter) {
      // Debug: Log category filtering info
      console.log(`🔍 Filtering articles for category: "${categoryNameToFilter}" (from slug: "${targetCategory}")`);
      // Add category filter to API options
      apiOptions.filter['field_chuyen_muc.name'] = categoryNameToFilter;
    } else if (!showAllNews) {
      console.log(`⚠️ No category name found for filtering. Target category: "${targetCategory}"`);
    }

    try {
      console.log(`📡 API call for category "${targetCategory}" with options:`, apiOptions);
      console.log(`🔍 showAllNews: ${showAllNews}, categoryNameToFilter: "${categoryNameToFilter}"`);
      
      const data = await apiGet('/jsonapi/node/bai-viet', apiOptions);
      console.log(`📊 API returned ${data.data?.length || 0} articles for category "${targetCategory}"`);
      console.log(`📋 Raw API response:`, data);
      
      // Map dữ liệu trả về thành cấu trúc Article
      let articles = data.data?.map((item: any) => {
        // Lấy categories từ relationships
        let categories: string[] = [];
        if (item.relationships?.field_chuyen_muc?.data?.length > 0 && data.included) {
          item.relationships.field_chuyen_muc.data.forEach((categoryRelation: any) => {
            const categoryItem = data.included.find((inc: any) => 
              inc.type === 'taxonomy_term--news_category' && inc.id === categoryRelation.id
            );
            if (categoryItem) {
              categories.push(categoryItem.attributes.name);
            }
          });
        }

        // Lấy featured image bằng extractImageUrl
        let featuredImage = extractImageUrl(item.relationships?.field_anh_dai_dien, data.included);
        
        // Nếu không có featured image, thử extract từ body content
        if (!featuredImage && item.attributes?.body?.processed) {
          featuredImage = extractFirstImageFromRichText(item.attributes.body.processed, data.included);
        }

        // Tạo path từ ID hoặc UUID
        const articlePath = `/bai-viet/${item.id}`;

        return {
          id: item.id,
          title: item.attributes.title,
          summary: item.attributes?.body?.summary || 
                   item.attributes?.body?.value?.substring(0, 200) + '...' || 
                   'Nhấn để xem chi tiết nội dung bài viết...',
          imageUrl: featuredImage,
          path: articlePath,
          published_date: item.attributes.created,
          categories: categories,
          is_featured: item.attributes?.field_su_kien_tieu_bieu || false,
        };
      }) || [];
      
            // Client-side filtering fallback nếu server-side filtering không hoạt động
      if (!showAllNews && articles.length > 0) {
        // Helper function to normalize text for comparison
        const normalizeText = (text: string): string => {
          return text.toLowerCase()
                     .trim()
                     .replace(/\s+/g, ' ') // normalize spaces
                     .replace(/[–—-]/g, '-') // normalize dashes
                     .replace(/[^\w\s-]/g, ''); // remove special chars except word chars, spaces, and dashes
        };

        // If we have a specific category name to filter by
        if (categoryNameToFilter) {
          const originalCount = articles.length;
          
          // Filter articles that contain the target category name in their categories array
          articles = articles.filter(article => {
            const hasMatchingCategory = article.categories.some(category => {
              const normalizedArticleCategory = normalizeText(category);
              const normalizedTargetCategory = normalizeText(categoryNameToFilter);
              
              // Multiple matching strategies
              return (
                // Exact match
                normalizedArticleCategory === normalizedTargetCategory ||
                // Contains match (both directions)
                normalizedArticleCategory.includes(normalizedTargetCategory) ||
                normalizedTargetCategory.includes(normalizedArticleCategory) ||
                // Word boundary match
                normalizedArticleCategory.split(' ').some(word => 
                  normalizedTargetCategory.split(' ').includes(word) && word.length > 2
                )
              );
            });
            
            return hasMatchingCategory;
          });
          
          console.log(`🎯 Client-side filtered: ${originalCount} → ${articles.length} articles for "${categoryNameToFilter}"`);
          
          // Debug: Log first few articles and their categories
          if (articles.length > 0) {
            console.log(`✅ Sample filtered articles:`, articles.slice(0, 3).map(a => ({
              title: a.title,
              categories: a.categories
            })));
          } else {
            console.log(`❌ No articles found for category "${categoryNameToFilter}"`);
          }
        } else if (targetCategory && targetCategory !== 'su-kien' && targetCategory !== 'tin-tuc') {
          // Fallback: filter by URL slug if no category name mapping found
          const originalCount = articles.length;
          const targetSlugWords = targetCategory.replace(/-/g, ' ').toLowerCase().split(' ');
          
          articles = articles.filter(article => {
            return article.categories.some(category => {
              const categoryWords = category.toLowerCase().split(' ');
              return targetSlugWords.some(slugWord => 
                categoryWords.some(catWord => catWord.includes(slugWord) && slugWord.length > 2)
              );
            });
          });
          
          console.log(`🔄 Slug-based filtered: ${originalCount} → ${articles.length} articles for "${targetCategory}"`);
        }
      }
       
      return articles;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw new Error("Failed to fetch articles");
    }
  };

  return useQuery<Article[], Error>({
    queryKey: ['articles', category, subcategory, language], // Include language in query key
    queryFn: fetchArticles,
    enabled: !!(category), // Chỉ fetch khi có category
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
};