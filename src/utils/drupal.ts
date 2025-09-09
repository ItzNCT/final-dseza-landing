// src/utils/drupal.ts
import { api } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { DRUPAL_BASE_URL as DRUPAL_BASE } from '@/config';

// Type definitions for API options
interface ApiGetOptions {
  sort?: string;
  include?: string;
  filter?: Record<string, any>;
  page?: {
    limit?: number;
    offset?: number;
  };
}

interface ApiResponse<T = any> {
  data: T;
  included?: any[];
  meta?: any;
  links?: any;
}

/**
 * Resolve Drupal relative paths to absolute URLs
 * @param path - Relative or absolute path from Drupal
 * @returns Absolute URL string
 * 
 * @example
 * ```typescript
 * resolveDrupalUrl('/sites/default/files/image.jpg')        // → 'https://dseza-backend.lndo.site/sites/default/files/image.jpg'
 * resolveDrupalUrl('https://example.com/image.jpg')         // → 'https://example.com/image.jpg' (unchanged)
 * resolveDrupalUrl('sites/default/files/image.jpg')         // → 'https://dseza-backend.lndo.site/sites/default/files/image.jpg'
 * ```
 */
export function resolveDrupalUrl(path = ''): string {
  if (!path) return '';
  
  // Nếu đã là absolute (http/https) thì trả nguyên
  if (/^https?:\/\//i.test(path)) return path;
  
  // Nếu path đã có slash đầu, chỉ cần gắn base
  return `${DRUPAL_BASE}${path.startsWith('/') ? path : '/' + path}`;
}

/**
 * Convert Drupal internal URLs to frontend routes
 * @param uri - URI from Drupal field_link (e.g., "internal:/path" or "external:https://example.com")
 * @returns Resolved URL string suitable for frontend navigation
 * 
 * @example
 * ```typescript
 * resolveDrupalLinkUri('internal:/tin-tuc/article-slug')     // → '/tin-tuc/article-slug'
 * resolveDrupalLinkUri('internal://gioi-thieu/about')        // → '/gioi-thieu/about'
 * resolveDrupalLinkUri('https://example.com')                // → 'https://example.com' (unchanged)
 * ```
 */
export function resolveDrupalLinkUri(uri = ''): string {
  if (!uri) return '';
  
  // Handle external URLs (already absolute)
  if (/^https?:\/\//i.test(uri)) {
    return uri;
  }
  
  // Handle internal URLs - remove "internal:" or "internal://" prefix
  if (uri.startsWith('internal://')) {
    return '/' + uri.replace('internal://', '');
  }
  
  if (uri.startsWith('internal:/')) {
    return '/' + uri.replace('internal:/', '');
  }
  
  // Handle other Drupal URI schemes if needed
  if (uri.startsWith('entity:') || uri.startsWith('route:')) {
    // For now, return empty string or handle as needed
    console.warn('Unsupported URI scheme:', uri);
    return '';
  }
  
  // Default: treat as relative path
  return uri.startsWith('/') ? uri : '/' + uri;
}

/**
 * Extract image URL from Drupal JSON:API included data
 * @param imageRelationship - The relationship object from main data
 * @param included - The included array from JSON:API response
 * @returns Resolved absolute image URL or undefined
 * 
 * @example
 * ```typescript
 * // In mapper function:
 * const news = data?.data.map((item) => ({
 *   id: item.id,
 *   title: item.attributes.title,
 *   image: extractImageUrl(item.relationships.field_anh_dai_dien, data.included),
 *   // ... other fields
 * }));
 * ```
 */
export function extractImageUrl(imageRelationship: any, included: any[]): string | undefined {
  console.log('🔍 extractImageUrl called with:', { imageRelationship, includedCount: included?.length || 0 });
  
  if (!imageRelationship?.data?.id || !included) {
    console.log('❌ Missing imageRelationship.data.id or included array');
    return undefined;
  }
  
  console.log('🎯 Looking for media item with ID:', imageRelationship.data.id);
  console.log('🎯 Media type expected:', imageRelationship.data.type);
  
  // Find media item in included data - try multiple media types
  let mediaItem = included.find(item => 
    item.type === 'media--image' && item.id === imageRelationship.data.id
  );
  
  if (!mediaItem) {
    // Try other possible media types
    mediaItem = included.find(item => 
      (item.type === 'media--media' || item.type.startsWith('media--')) && 
      item.id === imageRelationship.data.id
    );
    console.log('🔄 Trying alternative media type, found:', mediaItem?.type);
  }
  
  if (!mediaItem) {
    console.log('❌ Media item not found in included data');
    console.log('📋 Available media items:', included.filter(item => item.type.startsWith('media--')).map(item => ({ id: item.id, type: item.type })));
    return undefined;
  }
  
  console.log('✅ Found media item:', mediaItem);
  console.log('🔗 Media relationships:', mediaItem.relationships);
  
  // Try different possible field names for file relationships
  const possibleFileFields = ['field_media_image', 'field_media_file', 'thumbnail'];
  let fileRelationship = null;
  let fieldUsed = '';
  
  for (const field of possibleFileFields) {
    if (mediaItem.relationships?.[field]?.data?.id) {
      fileRelationship = mediaItem.relationships[field].data;
      fieldUsed = field;
      break;
    }
  }
  
  if (!fileRelationship) {
    console.log('❌ No file relationship found in media item');
    console.log('📋 Available relationship fields:', Object.keys(mediaItem.relationships || {}));
    return undefined;
  }
  
  console.log(`✅ Found file relationship in ${fieldUsed}:`, fileRelationship);
  
  // Find file item in included data  
  const fileItem = included.find(item => 
    item.type === 'file--file' && item.id === fileRelationship.id
  );
  
  if (!fileItem) {
    console.log('❌ File item not found in included data');
    console.log('📋 Available file items:', included.filter(item => item.type === 'file--file').map(item => ({ id: item.id, filename: item.attributes?.filename })));
    return undefined;
  }
  
  console.log('✅ Found file item:', fileItem);
  
  if (!fileItem?.attributes?.uri?.url) {
    console.log('❌ File item missing uri.url');
    console.log('📋 File attributes:', fileItem.attributes);
    return undefined;
  }
  
  const resolvedUrl = resolveDrupalUrl(fileItem.attributes.uri.url);
  console.log('🎯 Final resolved URL:', resolvedUrl);
  
  // Return resolved absolute URL
  return resolvedUrl;
}

/**
 * Get image URL with fallback
 * @param imageUrl - Primary image URL (can be undefined)
 * @param fallbackUrl - Fallback image URL (default: '/placeholder.svg')
 * @returns Image URL with fallback
 * 
 * @example
 * ```typescript
 * <img src={getImageWithFallback(article.featured_image)} alt={article.title} />
 * <img src={getImageWithFallback(event.image, '/default-event.svg')} alt={event.title} />
 * ```
 */
export function getImageWithFallback(imageUrl?: string, fallbackUrl = '/placeholder.svg'): string {
  return imageUrl || fallbackUrl;
}

/**
 * Get current language from localStorage (fallback approach)
 * This is used when LanguageContext is not available in the component tree
 */
function getCurrentLanguage(): 'vi' | 'en' {
  if (typeof window === 'undefined') return 'vi';
  
  const storedLang = localStorage.getItem('i18nextLng');
  if (storedLang === 'vi' || storedLang === 'en') {
    return storedLang;
  }
  
  // Fallback to Vietnamese
  return 'vi';
}

/**
 * Add language prefix to JSON:API endpoints
 * @param endpoint - The original endpoint (e.g., '/jsonapi/node/article')
 * @param language - Language code ('vi' or 'en')
 * @returns Language-prefixed endpoint (e.g., '/vi/jsonapi/node/article')
 */
function addLanguagePrefix(endpoint: string, language: 'vi' | 'en'): string {
  // Ensure endpoint starts with /
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
  
  // Add language prefix for JSON:API endpoints
  if (cleanEndpoint.startsWith('/jsonapi/')) {
    return `/${language}${cleanEndpoint}`;
  }
  
  // For non-JSON:API endpoints, return as-is
  return cleanEndpoint;
}

/**
 * Language-aware API call function
 * Automatically adds language prefix to JSON:API endpoints
 * @param endpoint - API endpoint
 * @param options - API options
 * @param language - Optional language override
 * @returns Promise with API response
 */
export async function apiGetWithLanguage<T = any>(
  endpoint: string, 
  options: ApiGetOptions = {},
  language?: 'vi' | 'en'
): Promise<ApiResponse<T>> {
  const currentLang = language || getCurrentLanguage();
  const languageAwareEndpoint = addLanguagePrefix(endpoint, currentLang);
  
  console.log(`🌐 API call with language: ${currentLang}`);
  console.log(`📡 Original endpoint: ${endpoint}`);
  console.log(`🔗 Language-aware endpoint: ${languageAwareEndpoint}`);
  
  return api.get<T>(languageAwareEndpoint, options);
}

/**
 * Hook to get language-aware API client
 * Uses LanguageContext to automatically add language prefix to API calls
 * @returns Object with API methods that automatically use current language
 * 
 * @example
 * ```typescript
 * const MyComponent = () => {
 *   const { apiGet } = useDrupalApi();
 *   
 *   const fetchArticles = async () => {
 *     // This will automatically call /vi/jsonapi/node/article or /en/jsonapi/node/article
 *     const response = await apiGet('/jsonapi/node/article', {
 *       include: 'field_anh_dai_dien'
 *     });
 *     return response;
 *   };
 * };
 * ```
 */
export function useDrupalApi() {
  const { language } = useLanguage();
  
  /**
   * Language-aware API GET method
   * @param endpoint - API endpoint
   * @param options - API options
   * @returns Promise with API response
   */
  const apiGet = async <T = any>(
    endpoint: string, 
    options: ApiGetOptions = {}
  ): Promise<ApiResponse<T>> => {
    return apiGetWithLanguage<T>(endpoint, options, language);
  };
  
  return {
    apiGet,
    language,
    // Add other API methods here if needed (POST, PATCH, DELETE, etc.)
  };
}

/**
 * Generate article URL with language prefix and SEO-friendly alias
 * @param article - News article with id and optional path_alias
 * @param language - Current language ('vi' or 'en')
 * @returns SEO-friendly URL or fallback to /bai-viet/{id}
 * 
 * @example
 * ```typescript
 * // With alias
 * generateArticleUrl({ id: '123', path_alias: '/tin-tuc/article-slug' }, 'en')
 * // Returns: '/en/tin-tuc/article-slug'
 * 
 * // Without alias (fallback)
 * generateArticleUrl({ id: '123', path_alias: null }, 'vi')
 * // Returns: '/bai-viet/123'
 * ```
 */
export function generateArticleUrl(article: { id: string; path_alias?: string | null }, language: 'vi' | 'en' = 'vi'): string {
  const languagePrefix = language === 'en' ? '/en' : '';
  
  // Use path alias if available, otherwise fallback to /bai-viet/{id}
  if (article.path_alias) {
    return `${languagePrefix}${article.path_alias}`;
  }
  
  return `${languagePrefix}/bai-viet/${article.id}`;
} 