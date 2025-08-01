import DOMPurify from 'dompurify';

/**
 * Process rich text content and fix image URLs
 * @param rawHtml - Raw HTML content from rich text editor
 * @param includedData - Included data from JSON:API response for image resolution
 * @returns Processed HTML with proper image URLs and styling
 */
export function processRichTextContent(rawHtml: string, includedData?: any[]): string {
  if (!rawHtml) return '';

  // First, sanitize the content
  let processedHtml = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'a', 'img', 'figure', 'figcaption', 'blockquote',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'span',
      'drupal-entity', 'drupal-media' // Drupal specific tags
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'width', 'height', 'class', 'id',
      'data-entity-type', 'data-entity-uuid', 'data-align', 'data-caption'
    ]
  });

  // Process Drupal media entities
  processedHtml = processDrupalMediaEntities(processedHtml, includedData);

  // Fix relative image URLs to absolute URLs
  processedHtml = fixImageUrls(processedHtml);

  // Add responsive styling to images
  processedHtml = addImageStyling(processedHtml);

  // Wrap images in proper containers
  processedHtml = wrapImagesInContainers(processedHtml);

  // Add responsive styling to tables
  processedHtml = addTableStyling(processedHtml);

  return processedHtml;
}

/**
 * Process Drupal media entities and replace with proper img tags
 */
function processDrupalMediaEntities(html: string, includedData?: any[]): string {
  if (!includedData) return html;

  // Replace drupal-entity tags with actual images
  return html.replace(/<drupal-entity[^>]*data-entity-uuid="([^"]*)"[^>]*><\/drupal-entity>/g, 
    (match, uuid) => {
      const mediaItem = findMediaByUuid(uuid, includedData);
      if (mediaItem) {
        const caption = getMediaCaption(match);
        const alignment = getMediaAlignment(match);
        return createImageTag(mediaItem, caption, alignment);
      }
      return '[Hình ảnh không tải được]';
    }
  );
}

/**
 * Find media item by UUID in included data
 */
function findMediaByUuid(uuid: string, includedData: any[]): string | null {
  // Find media entity
  const mediaEntity = includedData.find(item => 
    item.type?.startsWith('media--') && item.id === uuid
  );

  if (!mediaEntity) return null;

  // Get file URL from media entity
  const fileRelationship = mediaEntity.relationships?.field_media_image?.data ||
                           mediaEntity.relationships?.thumbnail?.data ||
                           mediaEntity.relationships?.field_media_file?.data;

  if (!fileRelationship?.id) return null;

  // Find file entity
  const fileEntity = includedData.find(item => 
    item.type === 'file--file' && item.id === fileRelationship.id
  );

  if (!fileEntity?.attributes?.uri?.url) return null;

  // Resolve to absolute URL
  const baseUrl = import.meta.env.VITE_DRUPAL_BASE_URL || 
    (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');
  
  const fileUrl = fileEntity.attributes.uri.url;
  return fileUrl.startsWith('http') ? fileUrl : `${baseUrl}${fileUrl}`;
}

/**
 * Extract caption from drupal-entity tag
 */
function getMediaCaption(entityTag: string): string {
  const captionMatch = entityTag.match(/data-caption="([^"]*)"/);
  return captionMatch ? captionMatch[1] : '';
}

/**
 * Extract alignment from drupal-entity tag
 */
function getMediaAlignment(entityTag: string): string {
  const alignMatch = entityTag.match(/data-align="([^"]*)"/);
  return alignMatch ? alignMatch[1] : 'center';
}

/**
 * Create proper img tag with styling
 */
function createImageTag(imageUrl: string, caption: string, alignment: string): string {
  const alignClass = {
    'left': 'float-left mr-4 mb-4',
    'right': 'float-right ml-4 mb-4', 
    'center': 'mx-auto block'
  }[alignment] || 'mx-auto block';

  return `
    <figure class="my-6 ${alignment === 'center' ? 'text-center' : ''}">
      <img 
        src="${imageUrl}" 
        alt="${caption}" 
        class="max-w-full h-auto rounded-lg shadow-md ${alignClass}"
        loading="lazy"
      />
      ${caption ? `<figcaption class="text-sm text-gray-600 mt-2 italic">${caption}</figcaption>` : ''}
    </figure>
  `;
}

/**
 * Fix relative image URLs to absolute URLs
 */
function fixImageUrls(html: string): string {
  const baseUrl = import.meta.env.VITE_DRUPAL_BASE_URL || 
    (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');

  return html.replace(/<img([^>]*)\ssrc="([^"]*)"([^>]*)>/g, (match, before, src, after) => {
    // Skip if already absolute URL
    if (src.startsWith('http') || src.startsWith('data:')) {
      return match;
    }
    
    // Convert relative to absolute
    const absoluteSrc = src.startsWith('/') ? `${baseUrl}${src}` : `${baseUrl}/${src}`;
    return `<img${before} src="${absoluteSrc}"${after}>`;
  });
}

/**
 * Add responsive styling to images and handle alignment
 */
function addImageStyling(html: string): string {
  return html.replace(/<img([^>]*)>/g, (match, attributes) => {
    // Check for alignment indicators
    const isCenter = /(?:align-center|text-align:\s*center|data-align=["']center["'])/i.test(attributes) ||
                    /style=["'][^"']*text-align:\s*center[^"']*["']/i.test(attributes);
    const isLeft = /(?:align-left|float:\s*left|data-align=["']left["'])/i.test(attributes);
    const isRight = /(?:align-right|float:\s*right|data-align=["']right["'])/i.test(attributes);

    // Determine alignment classes
    let alignmentClasses = '';
    if (isCenter) {
      alignmentClasses = ' mx-auto block';
    } else if (isLeft) {
      alignmentClasses = ' float-left mr-4 mb-4';
    } else if (isRight) {
      alignmentClasses = ' float-right ml-4 mb-4';
    }

    // Base responsive classes
    const baseClasses = 'max-w-full h-auto rounded-lg shadow-md';
    const fullClasses = baseClasses + alignmentClasses;

    // Check if class already exists
    if (attributes.includes('class=')) {
      // Add to existing class
      return match.replace(/class="([^"]*)"/, `class="$1 ${fullClasses}"`);
    } else {
      // Add new class
      return `<img${attributes} class="${fullClasses}">`;
    }
  });
}

/**
 * Wrap images in proper containers for better layout
 */
function wrapImagesInContainers(html: string): string {
  return html.replace(/<img([^>]*class="[^"]*mx-auto[^"]*"[^>]*)>/g, (match, attributes) => {
    // For centered images, wrap in a centered container
    return `<div class="text-center my-6">${match}</div>`;
  });
}

/**
 * Add responsive styling to tables
 */
function addTableStyling(html: string): string {
  // Wrap tables in responsive container
  return html.replace(/<table([^>]*)>/g, 
    '<div class="overflow-x-auto my-6"><table$1 class="min-w-full border-collapse border border-gray-300">'
  ).replace(/<\/table>/g, '</table></div>');
}

/**
 * Extract first image URL from rich text for thumbnail/preview
 * @param richTextHtml - Rich text HTML content
 * @param includedData - Included data for media resolution
 * @returns First image URL found or null
 */
export function extractFirstImageFromRichText(richTextHtml: string, includedData?: any[]): string | null {
  if (!richTextHtml) return null;

  // First check for drupal-entity media
  const entityMatch = richTextHtml.match(/<drupal-entity[^>]*data-entity-uuid="([^"]*)"[^>]*>/);
  if (entityMatch && includedData) {
    const imageUrl = findMediaByUuid(entityMatch[1], includedData);
    if (imageUrl) return imageUrl;
  }

  // Then check for regular img tags
  const imgMatch = richTextHtml.match(/<img[^>]*src="([^"]*)"[^>]*>/);
  if (imgMatch) {
    const src = imgMatch[1];
    if (src.startsWith('http') || src.startsWith('data:')) {
      return src;
    }
    
    // Convert relative to absolute
    const baseUrl = import.meta.env.VITE_DRUPAL_BASE_URL || 
      (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');
    return src.startsWith('/') ? `${baseUrl}${src}` : `${baseUrl}/${src}`;
  }

  return null;
}

/**
 * Convert HTML content to plain text summary for cards/previews
 * @param htmlContent - HTML content to convert
 * @param maxLength - Maximum length of the summary (default: 200)
 * @returns Plain text summary with "..." if truncated
 */
export function createPlainTextSummary(htmlContent: string, maxLength: number = 200): string {
  if (!htmlContent) return '';

  // First sanitize and remove dangerous content
  const sanitized = DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: [], // No tags allowed - we want plain text
    ALLOWED_ATTR: []
  });

  // Remove extra whitespace and line breaks
  const cleaned = sanitized
    .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
    .trim();

  // Truncate if necessary
  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  // Find last complete word within limit
  const truncated = cleaned.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > maxLength * 0.8) { // If last space is close to end, use it
    return truncated.substring(0, lastSpaceIndex) + '...';
  } else {
    return truncated + '...';
  }
} 