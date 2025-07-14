// src/utils/drupal.ts

const DRUPAL_BASE = import.meta.env.VITE_DRUPAL_BASE_URL || 
  (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');

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
  if (!imageRelationship?.data?.id || !included) return undefined;
  
  // Find media item in included data
  const mediaItem = included.find(item => 
    item.type === 'media--image' && item.id === imageRelationship.data.id
  );
  
  if (!mediaItem?.relationships?.field_media_image?.data?.id) return undefined;
  
  // Find file item in included data  
  const fileItem = included.find(item => 
    item.type === 'file--file' && item.id === mediaItem.relationships.field_media_image.data.id
  );
  
  if (!fileItem?.attributes?.uri?.url) return undefined;
  
  // Return resolved absolute URL
  return resolveDrupalUrl(fileItem.attributes.uri.url);
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