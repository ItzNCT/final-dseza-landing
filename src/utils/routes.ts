import { useLanguage } from "@/context/LanguageContext";

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
   * Switch current URL to different language
   * @param targetLang - Target language
   * @param currentPath - Current path (from useLocation().pathname)
   * @returns URL with switched language
   */
  const switchLanguageUrl = (targetLang: "vi" | "en", currentPath: string): string => {
    // Remove current language prefix from path
    const pathParts = currentPath.split('/');
    if (pathParts.length > 1 && (pathParts[1] === 'vi' || pathParts[1] === 'en')) {
      pathParts[1] = targetLang;
      return pathParts.join('/');
    }
    // If no language prefix found, add it
    return `/${targetLang}${currentPath}`;
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