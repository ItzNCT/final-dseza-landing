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