import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { extractImageUrl, useDrupalApi } from "@/utils/drupal";
import { getEventChildCategoryIds } from "./useAllNews";
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
  categoryIds?: string[];
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

    // Nếu targetCategory là 'su-kien' hoặc 'events' thì filter theo các chuyên mục con của taxonomy "Sự kiện"
    const isEventsRoot = targetCategory === 'su-kien' || targetCategory === 'events';

    // URL mapping để convert từ URL slug sang category name thực tế (đa ngôn ngữ cho các mục quan trọng)
    const urlToCategoryMap: { [key: string]: string | { vi: string; en: string } } = {
      'dau-tu-hop-tac-quoc-te': { vi: 'Đầu tư – Hợp tác quốc tế', en: 'Investment – International Cooperation' },
      // English slug for the above category
      'investment-international-cooperation': { vi: 'Đầu tư – Hợp tác quốc tế', en: 'Investment – International Cooperation' },
      'dao-tao-uom-tao-khoi-nghiep': { vi: 'Đào tạo, Ươm tạo khởi nghiệp', en: 'Training, Startup Incubation' },
      'chuyen-doi-so': { vi: 'Chuyển đổi số', en: 'Digital Transformation' },
      'hoat-dong-ban-quan-ly': { vi: 'Hoạt động Ban quản lý', en: 'Management Board Activities' },
      // Tin khác / Other News (nguyên nhân lỗi): cần map theo ngôn ngữ hiện tại
      'tin-khac': { vi: 'Tin khác', en: 'Other News' },
      'tin-tuc-khac': { vi: 'Tin khác', en: 'Other News' },
      'other-news': { vi: 'Tin khác', en: 'Other News' },
      'doanh-nghiep': { vi: 'Doanh nghiệp', en: 'Enterprises' },
      'thong-bao': { vi: 'Thông báo', en: 'Announcements' },
      'thong-tin-bao-chi': { vi: 'Thông tin báo chí', en: 'Press Information' },
      'press-information': { vi: 'Thông tin báo chí', en: 'Press Information' },
      'hoat-dong': { vi: 'Hoạt động', en: 'Activities' },
      'su-kien': { vi: 'Tin tức & Sự kiện', en: 'News & Events' },
      'events': { vi: 'Tin tức & Sự kiện', en: 'News & Events' },
      'tin-tuc': { vi: 'Tin tức', en: 'News' },
      // Investment-related categories
      'quy-trinh-linh-vuc-dau-tu': { vi: 'Quy trình lĩnh vực đầu tư', en: 'Investment Sector Procedures' },
      'linh-vuc-khuyen-khich-dau-tu': { vi: 'Lĩnh vực thu hút đầu tư', en: 'Investment Incentive Sectors' },
      'linh-vuc-thu-hut-dau-tu': { vi: 'Lĩnh vực thu hút đầu tư', en: 'Investment Incentive Sectors' }, // Alternative slug
      'danh-cho-nha-dau-tu': { vi: 'Dành cho nhà đầu tư', en: 'For Investors' }, // Parent category
      
      // Investment environment subcategories
      'moi-truong-dau-tu': { vi: 'Môi trường đầu tư', en: 'Investment Environment' }, // Parent category
      'ha-tang-giao-thong': { vi: 'Hạ tầng giao thông', en: 'Transportation Infrastructure' },
      'khoa-hoc-cong-nghe-moi-truong': { vi: 'Khoa học công nghệ - Môi trường', en: 'Science Technology - Environment' },
      'logistics': { vi: 'Logistics', en: 'Logistics' },
      'ha-tang-xa-hoi': { vi: 'Hạ tầng xã hội', en: 'Social Infrastructure' },
      'nguon-nhan-luc': { vi: 'Nguồn nhân lực', en: 'Human Resources' },
      'cai-cach-hanh-chinh': { vi: 'Cải cách hành chính', en: 'Administrative Reform' },
      // English slugs for Investment Environment categories mapping
      'transportation-infrastructure': { vi: 'Hạ tầng giao thông', en: 'Transportation Infrastructure' },
      'science-technology-environment': { vi: 'Khoa học công nghệ - Môi trường', en: 'Science Technology - Environment' },
      'social-infrastructure': { vi: 'Hạ tầng xã hội', en: 'Social Infrastructure' },
      'human-resources': { vi: 'Nguồn nhân lực', en: 'Human Resources' },
      'industrial-park-infrastructure': { vi: 'Hạ tầng khu công nghiệp', en: 'Industrial Park Infrastructure' },
      // English slugs for Investor-related categories
      'investment-sector-procedures': { vi: 'Quy trình lĩnh vực đầu tư', en: 'Investment Sector Procedures' },
      'investment-incentive-sectors': { vi: 'Lĩnh vực thu hút đầu tư', en: 'Investment Incentive Sectors' },
      'administrative-reform': { vi: 'Cải cách hành chính', en: 'Administrative Reform' },
    };

    // Lấy category name từ mapping (ưu tiên map đa ngôn ngữ), hoặc nếu không có trong map thì tìm trong categoriesData
    let categoryNameToFilter: string | undefined;
    let targetCategoryId: string | undefined;
    
    const normalize = (text: string): string => {
      return (text || '')
        .toLowerCase()
        .trim()
        .replace(/[–—]/g, '-')
        .replace(/\s+/g, ' ');
    };
    const slugify = (text: string): string => {
      return normalize(text)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
    };
    const mapped = urlToCategoryMap[targetCategory];
    if (typeof mapped === 'string') {
      categoryNameToFilter = mapped;
    } else if (mapped && typeof mapped === 'object') {
      categoryNameToFilter = mapped[language];
    }
    
    // Nếu không tìm thấy trong hardcode map, thử tìm trong real categories data bằng so khớp CHÍNH XÁC (không dùng contains)
    if (categoriesData) {
      const normalizedSlug = targetCategory.toLowerCase();
      // Tìm theo tên tiếng VI/EN tương đương hoặc theo slug của tên
      const foundCategory = categoriesData.find(cat => {
        const viName = normalize(cat.name || '');
        const enName = normalize(cat.nameEn || '');
        return (
          (categoryNameToFilter && (normalize(categoryNameToFilter) === viName || normalize(categoryNameToFilter) === enName)) ||
          slugify(cat.name || '') === normalizedSlug ||
          slugify(cat.nameEn || '') === normalizedSlug
        );
      });
      if (foundCategory) {
        // Lưu cả tên (đúng ngôn ngữ hiện tại) và ID của taxonomy để lọc chính xác
        categoryNameToFilter = language === 'en' && foundCategory.nameEn ? foundCategory.nameEn : foundCategory.name;
        targetCategoryId = foundCategory.id;
      }
    }

    if (!isEventsRoot) {
      if (targetCategoryId) {
        // Ưu tiên filter theo ID nếu có để chính xác với taxonomy
        console.log(`🔍 Filtering by taxonomy ID: ${targetCategoryId} (slug: "${targetCategory}")`);
        apiOptions.filter['field_chuyen_muc.id'] = targetCategoryId;
      } else if (categoryNameToFilter) {
        // Fallback theo tên (chính xác) nếu chưa tìm được ID
        console.log(`🔍 Filtering articles for category (by name): "${categoryNameToFilter}" (from slug: "${targetCategory}")`);
        apiOptions.filter['field_chuyen_muc.name'] = categoryNameToFilter;
      } else {
        console.log(`⚠️ No category mapping found for filtering. Target category: "${targetCategory}"`);
      }
    }

    try {
      console.log(`📡 API call for category "${targetCategory}" with options:`, apiOptions);
      console.log(`🔍 isEventsRoot: ${isEventsRoot}, categoryNameToFilter: "${categoryNameToFilter}"`);
      
      // Nếu là trang gốc "Tin tức & Sự kiện", filter theo danh sách term con của "Sự kiện" bằng ID để chính xác
      if (isEventsRoot) {
        const childIds = await getEventChildCategoryIds(language);
        if (childIds.length > 0) {
          // JSON:API không hỗ trợ filter IN theo mảng trực tiếp qua client helper này,
          // nên ta không set filter server-side ở đây mà sẽ lọc client-side phía dưới.
          console.log('🎯 Using client-side filter for event child categories:', childIds);
        }
      }

      const data = await apiGet('/jsonapi/node/bai-viet', apiOptions);
      console.log(`📊 API returned ${data.data?.length || 0} articles for category "${targetCategory}"`);
      console.log(`📋 Raw API response:`, data);
      
      // Map dữ liệu trả về thành cấu trúc Article
      let articles = data.data?.map((item: any) => {
        // Lấy categories từ relationships
        let categories: string[] = [];
        let categoryIds: string[] = [];
        if (item.relationships?.field_chuyen_muc?.data?.length > 0 && data.included) {
          item.relationships.field_chuyen_muc.data.forEach((categoryRelation: any) => {
            const categoryItem = data.included.find((inc: any) => 
              inc.type === 'taxonomy_term--news_category' && inc.id === categoryRelation.id
            );
            if (categoryItem) {
              categories.push(categoryItem.attributes.name);
              categoryIds.push(categoryRelation.id);
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
          categoryIds: categoryIds,
          is_featured: item.attributes?.field_su_kien_tieu_bieu || false,
        };
      }) || [];
      
            // Client-side filtering fallback nếu server-side filtering không hoạt động
      if (!isEventsRoot && articles.length > 0) {
        if (targetCategoryId) {
          const before = articles.length;
          articles = articles.filter(article => Array.isArray(article.categoryIds) && article.categoryIds.includes(targetCategoryId!));
          console.log(`✅ Client-side ID filter: ${before} → ${articles.length} (categoryId=${targetCategoryId})`);
        } else if (categoryNameToFilter) {
          const before = articles.length;
          // Tạo tập tên cho cả VI và EN để so khớp chính xác
          const allowedNames = new Set<string>();
          allowedNames.add(normalize(categoryNameToFilter));
          if (categoriesData) {
            const found = categoriesData.find(cat => normalize(cat.name) === normalize(categoryNameToFilter) || normalize(cat.nameEn || '') === normalize(categoryNameToFilter));
            if (found) {
              if (found.name) allowedNames.add(normalize(found.name));
              if (found.nameEn) allowedNames.add(normalize(found.nameEn));
            }
          }
          articles = articles.filter(article => article.categories.some(cat => allowedNames.has(normalize(cat))));
          console.log(`✅ Client-side name filter: ${before} → ${articles.length} for "${categoryNameToFilter}"`);
        }
      }

      // Nếu là trang gốc "Tin tức & Sự kiện", lọc client-side theo các category con của "Sự kiện"
      if (isEventsRoot && articles.length > 0) {
        try {
          const childIds = await getEventChildCategoryIds(language);
          if (childIds.length > 0) {
            const before = articles.length;
            articles = articles.filter(article => 
              Array.isArray(article.categoryIds) && article.categoryIds.some(id => childIds.includes(id))
            );
            console.log(`✅ Filtered Events root by child IDs: ${before} → ${articles.length}`);
          }
        } catch (e) {
          console.warn('⚠️ Could not load event child categories for filtering:', e);
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