import { useLanguage } from "@/context/LanguageContext";

/**
 * URL mapping between English and Vietnamese paths
 * Based on backend URL dictionary for multilingual routing
 */
const URL_MAPPING = {
  // English to Vietnamese mapping
  'en-to-vi': {
    // Core sections
    'contact': 'lien-he',
    'about': 'gioi-thieu',
    'news': 'tin-tuc',
    'events': 'su-kien',
    'documents': 'van-ban',
    'business': 'doanh-nghiep', 
    'utilities': 'tien-ich',
    'introduction': 'gioi-thieu',
    
    // Introduction section paths
    'general-introduction': 'gioi-thieu-chung',
    'welcome-letter': 'thu-ngo',
    'overview-of-da-nang': 'tong-quan-ve-da-nang',
    'overview-of-management-board': 'tong-quan-ve-ban-quan-ly',
    'functions-and-tasks': 'chuc-nang-nhiem-vu',
    'organizational-structure': 'co-cau-to-chuc',
    'departments': 'cac-phong-ban',
    'subordinate-units': 'don-vi-truc-thuoc',
    'functional-zones': 'cac-khu-chuc-nang',
    
    // Functional zones
    'da-nang-hi-tech-park': 'khu-cong-nghe-cao-da-nang',
    'da-nang-free-trade-zone': 'khu-thuong-mai-tu-do-da-nang',
    'it-concentration-zone': 'khu-tap-trung-cong-nghe-thong-tin',
    'hoa-khanh-industrial-park': 'khu-cong-nghiep-hoa-khanh',
    'hoa-khanh-expanded-industrial-park': 'khu-cong-nghiep-hoa-khanh-mo-rong',
    'da-nang-industrial-park': 'khu-cong-nghiep-da-nang',
    'da-nang-seafood-service-industrial-park': 'khu-cong-nghiep-dich-vu-thuy-san-da-nang',
    'hoa-cam-industrial-park': 'khu-cong-nghiep-hoa-cam',
    'lien-chieu-industrial-park': 'khu-cong-nghiep-lien-chieu',
    'hoa-ninh-industrial-park': 'khu-cong-nghiep-hoa-ninh',
    
    // News & Events section
    'outstanding-achievements': 'thanh-tuu-noi-bat',
    'announcements': 'thong-bao',
    'press-information': 'thong-tin-bao-chi',
    'investment-international-cooperation': 'dau-tu-hop-tac-quoc-te',
    'enterprises': 'doanh-nghiep',
    'digital-transformation': 'chuyen-doi-so',
    'training-startup-incubation': 'dao-tao-uom-tao-khoi-nghiep',
    'management-board-activities': 'hoat-dong-ban-quan-ly',
    'other-news': 'tin-tuc-khac',
    'work-schedule': 'lich-cong-tac',
    'see-more': 'xem-them',
    
    // Investment Environment
    'for-investors': 'danh-cho-nha-dau-tu',
    'investment-environment': 'moi-truong-dau-tu',
    'investment-sector-procedures': 'thu-tuc-linh-vuc-dau-tu',
    'investment-incentive-sectors': 'linh-vuc-khuyong-dau-tu',
    'transportation-infrastructure': 'ha-tang-giao-thong',
    'science-technology-environment': 'khoa-hoc-cong-nghe-moi-truong',
    'logistics': 'logistics',
    'social-infrastructure': 'ha-tang-xa-hoi',
    'human-resources': 'nguon-nhan-luc',
    
    // Business section
    'reports-data': 'bao-cao-du-lieu',
    'investment-monitoring-evaluation-reports': 'bao-cao-theo-doi-danh-gia-dau-tu',
    'report-forms-templates': 'mau-bieu-bao-cao',
    'enterprise-information': 'thong-tin-doanh-nghiep',
    'procedures-records-environmental-data': 'thu-tuc-ho-so-du-lieu-moi-truong',
    'enterprise-statistics': 'thong-ke-doanh-nghiep',
    'recruitment': 'tuyen-dung',
    
    // Investment handbook
    'investment-handbook': 'cam-nang-dau-tu',
    
    // Documents section
    'legal-documents': 'van-ban-phap-ly',
    'central-legal-regulations': 'van-ban-phap-ly-trung-uong',
    'local-legal-regulations': 'van-ban-phap-ly-dia-phuong',
    'directive-management-documents': 'van-ban-chi-dao-dieu-hanh',
    'administrative-reform-documents': 'van-ban-cai-cach-hanh-chinh',
    'guidelines-feedback': 'huong-dan-gop-y',
    'guideline-documents': 'van-ban-huong-dan',
    'draft-document-feedback': 'gop-y-du-thao-van-ban',
    
    // Administrative reform
    'administrative-reform': 'cai-cach-hanh-chinh',
    
    // Utilities section
    'qa': 'hoi-dap',
    'frequently-asked-questions': 'cau-hoi-thuong-gap',
    'faq': 'hoi-dap',
    
    // Additional common paths
    'home': 'trang-chu',
    'search': 'tim-kiem',
    'sitemap': 'so-do-site',
    'legal': 'phap-ly',
    'privacy': 'rieng-tu',
    'cookies': 'cookies',
    'accessibility': 'tro-giup',
    'feedback': 'phan-hoi'
  } as Record<string, string>,
  
  // Vietnamese to English mapping (reverse of above)
  'vi-to-en': {} as Record<string, string>
};

// Build reverse mapping
Object.entries(URL_MAPPING['en-to-vi']).forEach(([en, vi]) => {
  URL_MAPPING['vi-to-en'][vi] = en;
});

/**
 * Translate path segments from one language to another
 * @param path - Path to translate (e.g., "/lien-he" or "/contact")
 * @param fromLang - Source language
 * @param toLang - Target language
 * @returns Translated path
 */
const translatePath = (path: string, fromLang: 'vi' | 'en', toLang: 'vi' | 'en'): string => {
  if (fromLang === toLang) return path;
  
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const segments = cleanPath.split('/');
  
  const mappingKey = fromLang === 'en' ? 'en-to-vi' : 'vi-to-en';
  const mapping = URL_MAPPING[mappingKey];
  
  // Translate each segment
  const translatedSegments = segments.map(segment => {
    return mapping[segment] || segment; // Keep original if no mapping found
  });
  
  return '/' + translatedSegments.join('/');
};

/**
 * Generate a language-prefixed URL
 * @param path - The path without language prefix (e.g., "/tin-tuc")
 * @param lang - Optional language override, defaults to current context language
 * @returns Language-prefixed URL (e.g., "/vi/tin-tuc")
 */
export const createLanguageUrl = (path: string, lang?: "vi" | "en"): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Use provided language or get from current context
  const currentLang = lang || (typeof window !== 'undefined' ? 
    (localStorage.getItem('i18nextLng') as "vi" | "en") || 'vi' : 'vi');
  
  return `/${currentLang}/${cleanPath}`;
};

/**
 * Hook to get language-aware URL generator
 * @returns Object with functions to generate URLs
 */
export const useLanguageRoutes = () => {
  const { language } = useLanguage();

  /**
   * Generate URL with current language
   * @param path - The path without language prefix
   * @returns Language-prefixed URL
   */
  const createUrl = (path: string): string => {
    return createLanguageUrl(path, language);
  };

  /**
   * Generate URL for specific language
   * @param path - The path without language prefix
   * @param targetLang - Target language
   * @returns Language-prefixed URL
   */
  const createUrlForLanguage = (path: string, targetLang: "vi" | "en"): string => {
    return createLanguageUrl(path, targetLang);
  };

  /**
   * Switch current URL to different language with proper path translation
   * @param targetLang - Target language
   * @param currentPath - Current path (from useLocation().pathname)
   * @returns URL with switched language and translated path
   */
  const switchLanguageUrl = (targetLang: "vi" | "en", currentPath: string): string => {
    // Extract current language from path
    const currentLang = extractLanguageFromPath(currentPath);
    
    if (!currentLang) {
      // No language prefix found, add target language prefix
      return `/${targetLang}${currentPath}`;
    }
    
    if (currentLang === targetLang) {
      // Already in target language
      return currentPath;
    }
    
    // Extract path without language prefix
    const pathWithoutLang = extractPathWithoutLanguage(currentPath);
    
    // Translate path from current language to target language
    const translatedPath = translatePath(pathWithoutLang, currentLang, targetLang);
    
    // Combine target language prefix with translated path
    return `/${targetLang}${translatedPath}`;
  };

  return {
    createUrl,
    createUrlForLanguage,
    switchLanguageUrl,
    language
  };
};

/**
 * Extract the path without language prefix from current URL
 * @param fullPath - Full pathname (e.g., "/vi/tin-tuc/category")
 * @returns Path without language prefix (e.g., "/tin-tuc/category")
 */
export const extractPathWithoutLanguage = (fullPath: string): string => {
  const pathParts = fullPath.split('/');
  if (pathParts.length > 1 && (pathParts[1] === 'vi' || pathParts[1] === 'en')) {
    return '/' + pathParts.slice(2).join('/');
  }
  return fullPath;
};

/**
 * Extract language from URL
 * @param fullPath - Full pathname (e.g., "/vi/tin-tuc/category")
 * @returns Language code or null if not found
 */
export const extractLanguageFromPath = (fullPath: string): "vi" | "en" | null => {
  const pathParts = fullPath.split('/');
  if (pathParts.length > 1) {
    const lang = pathParts[1];
    if (lang === 'vi' || lang === 'en') {
      return lang;
    }
  }
  return null;
}; 