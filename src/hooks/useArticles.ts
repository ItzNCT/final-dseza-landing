import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { extractImageUrl } from "@/utils/drupal";
import { extractFirstImageFromRichText } from "@/utils/richTextProcessor";
import { useNewsCategories } from "./useNewsCategories";

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

// URL của Drupal API
const DRUPAL_BASE_URL = import.meta.env.VITE_DRUPAL_BASE_URL || 
  import.meta.env.VITE_API || 
  (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');

// Custom hook để lấy danh sách bài viết theo category
export const useArticles = () => {
  const { category, subcategory } = useParams<{ category: string; subcategory?: string; }>();
  const { data: categoriesData } = useNewsCategories();

  const fetchArticles = async (): Promise<Article[]> => {
    // Xác định target category cho filter
    const targetCategory = subcategory || category;

    if (!targetCategory) {
      return []; // Nếu không có category, trả về mảng rỗng
    }

    // Xây dựng URL với JSON:API
    let url = `${DRUPAL_BASE_URL}/jsonapi/node/bai-viet`
      + '?filter[status][value]=1'  // Chỉ lấy bài viết đã publish
      + '&sort=-created'             // Sắp xếp theo ngày tạo mới nhất
      + '&page[limit]=20'            // Giới hạn 20 bài viết
      + '&include=field_anh_dai_dien.field_media_image,field_chuyen_muc'; // Include images và categories

    // Nếu targetCategory là 'su-kien' hoặc 'tin-tuc' thì lấy tất cả tin tức (không filter)
    const showAllNews = targetCategory === 'su-kien' || targetCategory === 'tin-tuc';

    if (!showAllNews) {
      // URL mapping để convert từ URL slug sang category name thực tế
      const urlToCategoryMap: { [key: string]: string } = {
        'dau-tu-hop-tac-quoc-te': 'Đầu tư – Hợp tác quốc tế',
        'dao-tao-uom-tao-khoi-nghiep': 'Đào tạo, Ươm tạo khởi nghiệp',
        'chuyen-doi-so': 'Chuyển đổi số',
        'hoat-dong-ban-quan-ly': 'Hoạt động Ban quản lý',
        'tin-khac': 'Tin khác',
        'doanh-nghiep': 'Doanh nghiệp',
        'thong-bao': 'Thông báo',
        'hoat-dong': 'Hoạt động',
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

      // Thêm filter cho category cụ thể
      if (categoryNameToFilter) {
        url += `&filter[field_chuyen_muc.name]=${encodeURIComponent(categoryNameToFilter)}`;
      }
    }

    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch articles: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Map dữ liệu trả về thành cấu trúc Article
      const articles = data.data?.map((item: any) => {
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
      
      return articles;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw new Error("Failed to fetch articles");
    }
  };

  return useQuery<Article[], Error>({
    queryKey: ['articles', category, subcategory],
    queryFn: fetchArticles,
    enabled: !!(category), // Chỉ fetch khi có category
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
};