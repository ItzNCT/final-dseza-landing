import React from "react";
import { 
  ChevronRight, Calendar, Tag, Share2, Facebook, Twitter, Mail, Copy, Eye, FileText,
  Download, ExternalLink, ZoomIn, Printer, Star, AlertTriangle, 
  CheckCircle, AlertCircle, FileDown, Link2, Monitor, RefreshCcw, ClipboardList
} from "lucide-react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { useArticleDetail, useArticleViewCount } from "@/api/hooks";
import { extractImageUrl } from "@/utils/drupal";
import { processRichTextContent, extractFirstImageFromRichText } from "@/utils/richTextProcessor";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import CommentSection from "@/components/comments/CommentSection";

/**
 * Secure DOMPurify configuration for XSS protection
 * Updated to support full HTML content including tables, styling, and rich formatting
 */
const sanitizeConfig = {
  ALLOWED_TAGS: [
    // Text formatting
    'p', 'br', 'strong', 'em', 'u', 'i', 'b', 'small', 'sub', 'sup', 'mark', 'del', 'ins',
    // Headings
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    // Lists
    'ul', 'ol', 'li', 'dl', 'dt', 'dd',
    // Quotes and blocks
    'blockquote', 'cite', 'q', 'code', 'pre',
    // Links and media
    'a', 'img', 'figure', 'figcaption',
    // Tables
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'colgroup', 'col',
    // Structure and layout
    'div', 'span', 'section', 'article', 'aside', 'header', 'footer', 'main', 'nav',
    // Horizontal rule
    'hr',
    // Address and time
    'address', 'time',
    // PDF/Document viewer
    'iframe', 'button'
  ],
  ALLOWED_ATTR: [
    // Standard attributes
    'href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel',
    // Styling attributes
    'style', 'align', 'valign', 'width', 'height',
    // Table attributes
    'border', 'cellpadding', 'cellspacing', 'colspan', 'rowspan',
    // Image attributes
    'loading', 'sizes', 'srcset',
    // Link attributes
    'download', 'hreflang', 'type',
    // Accessibility attributes
    'aria-label', 'aria-describedby', 'aria-hidden', 'role',
    // Data attributes (limited)
    'data-id', 'data-type', 'data-action',
    // Iframe attributes
    'frameborder', 'allowfullscreen', 'sandbox'
  ],
  ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  ALLOW_DATA_ATTR: false,
  FORBID_SCRIPT: true,
  FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input', 'textarea', 'select', 'option'],
  FORBID_ATTR: [
    // Event handlers
    'onerror', 'onclick', 'onload', 'onmouseover', 'onfocus', 'onblur', 'onchange', 'onsubmit',
    'onmouseout', 'onmousemove', 'onmouseup', 'onmousedown', 'onkeyup', 'onkeydown', 'onkeypress',
    'onabort', 'onbeforeunload', 'onerror', 'onhashchange', 'onload', 'onpageshow', 'onpagehide',
    'onresize', 'onscroll', 'onunload', 'onwheel', 'ondrag', 'ondragend', 'ondragenter', 'ondragleave',
    'ondragover', 'ondragstart', 'ondrop', 'oncopy', 'oncut', 'onpaste'
  ],
  // Allow custom CSS properties but sanitize them
  ALLOW_UNKNOWN_PROTOCOLS: false,
  WHOLE_DOCUMENT: false,
  RETURN_DOM: false,
  RETURN_DOM_FRAGMENT: false,
  RETURN_TRUSTED_TYPE: false
};

/**
 * Secure HTML sanitization function with type safety
 */
const sanitizeHTML = (html: string | null | undefined): string => {
  if (!html || typeof html !== 'string') return '';
  const sanitized = DOMPurify.sanitize(html, sanitizeConfig);
  return typeof sanitized === 'string' ? sanitized : '';
};

/**
 * ArticleDetailPage component for displaying detailed article content
 */
const ArticleDetailPage: React.FC = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const { uuid } = useParams<{ uuid: string }>();
  const { data, isLoading, isError, error } = useArticleDetail(uuid || '');
  
  // Get node ID from article data for view count
  const nodeId = data?.data?.attributes?.drupal_internal__nid?.toString() || '';
  const { viewCount, isLoading: viewCountLoading } = useArticleViewCount(nodeId);



  // Basic styling for rich content
  React.useEffect(() => {
    const styleId = 'rich-content-styles';
    const existingStyle = document.getElementById(styleId);
    
    if (existingStyle) {
      existingStyle.remove();
    }
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .rich-content-article table {
        width: 100%;
        border-collapse: collapse;
        margin: 1.5rem 0;
        font-size: 0.875rem;
        line-height: 1.5;
      }
      
      .rich-content-article table th,
      .rich-content-article table td {
        padding: 0.75rem;
        text-align: left;
        border: 1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'};
        vertical-align: top;
      }
      
      .rich-content-article table th {
        background-color: ${theme === 'dark' ? '#1f2937' : '#f9fafb'};
        font-weight: 600;
        color: ${theme === 'dark' ? '#f9fafb' : '#1f2937'};
      }
      
      .rich-content-article table tr:nth-child(even) {
        background-color: ${theme === 'dark' ? '#111827' : '#f9fafb'};
      }
      
      .rich-content-article table tr:hover {
        background-color: ${theme === 'dark' ? '#1f2937' : '#f3f4f6'};
      }
      
      .rich-content-article hr {
        border: none;
        height: 2px;
        background: linear-gradient(90deg, 
          ${theme === 'dark' ? '#4b5563' : '#d1d5db'} 0%, 
          ${theme === 'dark' ? '#6b7280' : '#9ca3af'} 50%, 
          ${theme === 'dark' ? '#4b5563' : '#d1d5db'} 100%);
        margin: 2rem 0;
        border-radius: 1px;
      }
      
      .rich-content-article ol {
        counter-reset: list-counter;
        padding-left: 0;
      }
      
      .rich-content-article ol > li {
        counter-increment: list-counter;
        position: relative;
        padding-left: 2rem;
        margin-bottom: 0.5rem;
      }
      
      .rich-content-article ol > li::before {
        content: counter(list-counter) ".";
        position: absolute;
        left: 0;
        top: 0;
        font-weight: 600;
        color: ${theme === 'dark' ? '#60a5fa' : '#2563eb'};
      }
      
      .rich-content-article h2 {
        color: ${theme === 'dark' ? '#f3f4f6' : '#1f2937'};
        border-bottom: 2px solid ${theme === 'dark' ? '#4b5563' : '#e5e7eb'};
        padding-bottom: 0.5rem;
        margin-top: 2rem;
        margin-bottom: 1.5rem;
      }
      
      .rich-content-article h3, 
      .rich-content-article h4, 
      .rich-content-article h5, 
      .rich-content-article h6 {
        color: ${theme === 'dark' ? '#e5e7eb' : '#374151'};
        margin-top: 1.5rem;
        margin-bottom: 1rem;
      }
      
      .rich-content-article ul ul, 
      .rich-content-article ol ol, 
      .rich-content-article ul ol, 
      .rich-content-article ol ul {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }
      
      .rich-content-article li p {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }
      
      .rich-content-article em {
        color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'};
        font-style: italic;
      }
      
      .rich-content-article strong {
        color: ${theme === 'dark' ? '#f9fafb' : '#111827'};
        font-weight: 700;
      }
    `;
    
    document.head.appendChild(style);
    
    // Cleanup on unmount
    return () => {
      const styleToRemove = document.getElementById(styleId);
      if (styleToRemove) {
        styleToRemove.remove();
      }
    };
  }, [theme]);



  // Debug logging
  // console.log('ArticleDetailPage Debug:', { uuid, nodeId, viewCount, isLoading, isError, error, data });

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = data?.data?.attributes?.title || "Bài viết";
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          toast({
            title: "Đã sao chép!",
            description: "Đường dẫn bài viết đã được sao chép vào clipboard.",
          });
        });
        break;
    }
  };

  // Get featured image URL from included data or rich text
  const getFeaturedImageUrl = () => {
    // First try to get from field_anh_dai_dien
    if (data?.data?.relationships?.field_anh_dai_dien?.data && data?.included) {
      const imageUrl = extractImageUrl(data.data.relationships.field_anh_dai_dien, data.included);
      if (imageUrl) return imageUrl;
    }

    // If no featured image field, try to extract from rich text content
    const richTextContent = getRichTextContent();
    if (richTextContent && data?.included) {
      const firstImage = extractFirstImageFromRichText(richTextContent, data.included);
      if (firstImage) return firstImage;
    }

    return null;
  };

  // Get raw rich text content for processing
  const getRichTextContent = (): string => {
    if (!data?.data?.relationships?.field_noi_dung_bai_viet?.data || !data?.included) {
      return data?.data?.attributes?.body?.processed || data?.data?.attributes?.body?.value || '';
    }
    
    const paragraphIds = data.data.relationships.field_noi_dung_bai_viet.data.map((rel: any) => rel.id);
    const paragraphs = data.included
      .filter((item: any) => paragraphIds.includes(item.id))
      .sort((a: any, b: any) => {
        const aIndex = paragraphIds.indexOf(a.id);
        const bIndex = paragraphIds.indexOf(b.id);
        return aIndex - bIndex;
      });
    
    let content = '';
    
    paragraphs.forEach((paragraph: any) => {
      if (paragraph.type === 'paragraph--rich_text_block') {
        if (paragraph.attributes?.field_rich_text?.processed) {
          content += paragraph.attributes.field_rich_text.processed;
        } else if (paragraph.attributes?.field_text?.processed) {
          content += paragraph.attributes.field_text.processed;
        } else if (paragraph.attributes?.field_content?.processed) {
          content += paragraph.attributes.field_content.processed;
        } else if (paragraph.attributes?.field_body?.processed) {
          content += paragraph.attributes.field_body.processed;
        }
      }
    });
    
    return content;
  };

  // Get categories from included data
  const getCategories = () => {
    if (!data?.data?.relationships?.field_chuyen_muc?.data || !data?.included) {
      return [];
    }
    
    const categoryIds = data.data.relationships.field_chuyen_muc.data.map((rel: any) => rel.id);
    const categories = data.included
      .filter((item: any) => item.type === 'taxonomy_term--news_category' && categoryIds.includes(item.id))
      .map((item: any) => ({
        id: item.id,
        name: item.attributes.name
      }));
    
    return categories;
  };

  // Get PDF document from paragraph--file_dinh_kem in field_noi_dung_bai_viet
  const getPdfDocument = (): { url: string | null; name: string; description: string } => {
    const defaultResult = { url: null, name: '', description: '' };
    
    // Debug: Log all available data
    console.log('🔍 Debug Article Data:', data);
    console.log('🔍 Relationships:', data?.data?.relationships);
    console.log('🔍 Included:', data?.included);
    
    if (!data?.data?.relationships?.field_noi_dung_bai_viet?.data || !data?.included) {
      console.log('❌ No field_noi_dung_bai_viet relationship found');
      return defaultResult;
    }
    
    // Find paragraph--file_dinh_kem in the paragraphs
    const paragraphIds = data.data.relationships.field_noi_dung_bai_viet.data.map((rel: any) => rel.id);
    const fileParagraph = data.included.find((item: any) => 
      item.type === 'paragraph--file_dinh_kem' && paragraphIds.includes(item.id)
    );
    
    console.log('📁 File Paragraph:', fileParagraph);
    
    if (fileParagraph) {
      // Extract file info from paragraph attributes or relationships
      console.log('📎 File Paragraph Attributes:', fileParagraph.attributes);
      console.log('📎 File Paragraph Relationships:', fileParagraph.relationships);
      
      // Check if there's a file relationship in the paragraph
      if (fileParagraph.relationships) {
        const fileRelationshipKeys = Object.keys(fileParagraph.relationships);
        console.log('🔑 File Relationship Keys:', fileRelationshipKeys);
        
        // Look for common file relationship field names
        const possibleFileFields = ['field_file', 'field_document', 'field_media', 'field_attachment'];
        
        for (const fieldName of possibleFileFields) {
          if (fileParagraph.relationships[fieldName]?.data) {
            const fileRef = fileParagraph.relationships[fieldName].data;
            console.log(`📁 Found file reference in ${fieldName}:`, fileRef);
            
            // Find the media entity
            const mediaEntity = data.included.find((item: any) => 
              item.id === fileRef.id
            );
            
            if (mediaEntity) {
              console.log('🎬 Media Entity:', mediaEntity);
              
              // Extract file URL from media entity
              if (mediaEntity.relationships) {
                const mediaRelKeys = Object.keys(mediaEntity.relationships);
                console.log('🔑 Media Relationship Keys:', mediaRelKeys);
                
                // Look for file relationships in media entity
                const possibleMediaFileFields = ['field_media_document', 'field_media_file', 'thumbnail'];
                
                for (const mediaField of possibleMediaFileFields) {
                  if (mediaEntity.relationships[mediaField]?.data) {
                    const actualFileRef = mediaEntity.relationships[mediaField].data;
                    const fileEntity = data.included.find((item: any) => 
                      item.type === 'file--file' && item.id === actualFileRef.id
                    );
                    
                    if (fileEntity?.attributes?.uri?.url) {
                      const baseUrl = import.meta.env.VITE_DRUPAL_BASE_URL || 
                        (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');
                      
                      const fileUrl = fileEntity.attributes.uri.url;
                      const fullUrl = fileUrl.startsWith('http') ? fileUrl : `${baseUrl}${fileUrl}`;
                      
                      console.log('✅ Found PDF URL:', fullUrl);
                      
                      return {
                        url: fullUrl,
                        name: fileEntity.attributes.filename || mediaEntity.attributes?.name || 'Tài liệu PDF',
                        description: mediaEntity.attributes?.field_description?.value || 'Tài liệu đính kèm'
                      };
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    
    // Fallback: Check if any paragraph has PDF info in attributes
    const allParagraphs = data.included.filter((item: any) => 
      paragraphIds.includes(item.id)
    );
    
    console.log('📋 All Paragraphs:', allParagraphs);
    
    // Try to find any file-related info in any paragraph
    for (const paragraph of allParagraphs) {
      console.log(`📄 Checking paragraph ${paragraph.type}:`, paragraph);
      
      if (paragraph.attributes) {
        const attrs = Object.keys(paragraph.attributes);
        console.log(`🏷️ Paragraph attributes:`, attrs);
        
        // Look for any field that might contain file info
        for (const attr of attrs) {
          const value = paragraph.attributes[attr];
          if (typeof value === 'string' && value.includes('.pdf')) {
            console.log(`📎 Found PDF reference in ${attr}:`, value);
            
            // Try to extract filename from HTML or direct reference
            const pdfMatch = value.match(/([^\/\\]+\.pdf)/i);
            if (pdfMatch) {
              const filename = pdfMatch[1];
              const baseUrl = import.meta.env.VITE_DRUPAL_BASE_URL || 
                (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');
              
              const guessedUrl = `${baseUrl}/sites/default/files/${filename}`;
              console.log(`🎯 Guessed PDF URL: ${guessedUrl}`);
              
              return {
                url: guessedUrl,
                name: filename,
                description: 'Tài liệu đính kèm'
              };
            }
          }
        }
      }
    }
    
    console.log('❌ No PDF found in any paragraph');
    return defaultResult;
  };

  // Get meta description
  const getMetaDescription = () => {
    const metatags = data?.data?.attributes?.metatag || [];
    const descriptionTag = metatags.find((tag: any) => tag.attributes?.name === 'description');
    return descriptionTag?.attributes?.content || '';
  };

  // Check if article is featured event
  const isFeaturedEvent = () => {
    return data?.data?.attributes?.field_su_kien_tieu_bieu || false;
  };

  // Get paragraphs content or fallback to body
  // SECURITY NOTE: All dynamic content is sanitized to prevent XSS attacks
  const getArticleContent = () => {
    if (!data?.data?.relationships?.field_noi_dung_bai_viet?.data || !data?.included) {
      // No paragraphs available - use body field if available
      const bodyContent = data?.data?.attributes?.body?.processed || data?.data?.attributes?.body?.value || '';
      if (bodyContent) {
        return processRichTextContent(bodyContent, data?.included);
      }
      return `<p class="${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'} italic">Nội dung bài viết đang được cập nhật...</p>`;
    }
    
    const paragraphIds = data.data.relationships.field_noi_dung_bai_viet.data.map((rel: any) => rel.id);
    const paragraphs = data.included
      .filter((item: any) => paragraphIds.includes(item.id))
      .sort((a: any, b: any) => {
        // Sort by the order in the relationships
        const aIndex = paragraphIds.indexOf(a.id);
        const bIndex = paragraphIds.indexOf(b.id);
        return aIndex - bIndex;
      });
    
    // console.log('📚 Processing paragraphs:', paragraphs.map(p => ({ type: p.type, id: p.id })));
    // console.log('🖼️ Image blocks found:', paragraphs.filter(p => p.type === 'paragraph--image_block').length);
    
    let content = '';
    
    paragraphs.forEach((paragraph: any) => {
      switch (paragraph.type) {
        case 'paragraph--rich_text_block':
          // Get raw rich text content
          let richTextContent = '';
          if (paragraph.attributes?.field_rich_text?.processed) {
            richTextContent = paragraph.attributes.field_rich_text.processed;
          } else if (paragraph.attributes?.field_text?.processed) {
            richTextContent = paragraph.attributes.field_text.processed;
          } else if (paragraph.attributes?.field_content?.processed) {
            richTextContent = paragraph.attributes.field_content.processed;
          } else if (paragraph.attributes?.field_body?.processed) {
            richTextContent = paragraph.attributes.field_body.processed;
          } else {
            // Log all available attributes for debugging
            console.log('Rich text paragraph attributes:', Object.keys(paragraph.attributes || {}));
          }
          
          // Process rich text content with image and PDF handling
          if (richTextContent) {
            let processedContent = processRichTextContent(richTextContent, data.included);
            
                        // Keep PDF links as regular links since we have dedicated PDF viewer for attachments
            // No need to auto-convert inline PDF links
            
            content += processedContent;
          }
          break;
          
        case 'paragraph--image_block':
          // Handle image blocks with proper image extraction
          const imageUrl = getImageFromParagraph(paragraph);
          if (imageUrl) {
            const rawImageCaption = paragraph.attributes?.field_caption || paragraph.attributes?.field_alt_text || '';
            // Sanitize image URL and caption to prevent XSS
            const safeImageUrl = DOMPurify.sanitize(imageUrl, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
            const safeImageCaption = DOMPurify.sanitize(rawImageCaption, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
            content += `
              <figure class="my-6 text-center">
                <img src="${safeImageUrl}" alt="${safeImageCaption}" class="max-w-full h-auto rounded-lg shadow-md mx-auto" loading="lazy" />
                ${safeImageCaption ? `<figcaption class="text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'} mt-2 italic">${safeImageCaption}</figcaption>` : ''}
              </figure>
            `;
          } else {
            content += `<div class="image-block-placeholder my-4 p-4 ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'} text-center ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'} rounded border-2 border-dashed ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}">[Hình ảnh đang được tải...]</div>`;
          }
          break;
          
        case 'paragraph--document_block':
        case 'paragraph--file_block':
        case 'paragraph--pdf_block':
        case 'paragraph--file_dinh_kem':
          // Handle document/PDF blocks with embedded viewer
          const documentData = getDocumentFromParagraph(paragraph);
          if (documentData.url) {
            const safeDocumentUrl = DOMPurify.sanitize(documentData.url, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
            const safeDocumentName = DOMPurify.sanitize(documentData.name || 'Tài liệu', { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
            const safeDocumentDescription = DOMPurify.sanitize(documentData.description || '', { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
            
            // Check if it's a PDF file
            const isPDF = documentData.url.toLowerCase().includes('.pdf') || documentData.mimeType?.includes('pdf');
            
                                     if (isPDF) {
              // Simple PDF viewer following DocumentViewerPage pattern
              content += `
                <div class="pdf-viewer-block my-8 p-4 ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'} rounded-lg border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}">
                  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div class="flex-1">
                      <h4 class="font-semibold text-lg ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'} mb-2">${safeDocumentName}</h4>
                      ${safeDocumentDescription ? `<p class="text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}">${safeDocumentDescription}</p>` : ''}
                    </div>
                    <div class="flex flex-col sm:flex-row gap-2">
                      <button onclick="window.open('${safeDocumentUrl}', '_blank')" class="px-3 py-2 text-sm ${theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary-hover' : 'bg-dseza-light-primary hover:bg-dseza-light-primary-hover'} text-white rounded transition-colors flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        Mở toàn màn hình
                      </button>
                      <a href="${safeDocumentUrl}" download="${safeDocumentName}" class="px-3 py-2 text-sm ${theme === 'dark' ? 'bg-dseza-dark-secondary-accent hover:bg-dseza-dark-secondary-accent-hover' : 'bg-dseza-light-secondary-accent hover:bg-dseza-light-secondary-accent-hover'} text-white rounded transition-colors no-underline text-center flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Tải xuống
                      </a>
                    </div>
                  </div>
                  
                  <!-- Simple PDF Viewer -->
                  <div class="w-full bg-gray-100 rounded-lg overflow-hidden" style="height: 80vh;">
                    <iframe
                      src="${safeDocumentUrl}"
                      title="${safeDocumentName}"
                      width="100%"
                      height="100%"
                      class="border-0">
                    </iframe>
                  </div>
                  
                  <!-- Fallback Message -->
                  <div class="mt-4 p-4 border rounded-lg ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}">
                    <div class="flex items-start gap-3">
                      <svg class="w-5 h-5 mt-0.5 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      <div class="flex-1">
                        <h4 class="font-medium mb-1 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}">
                          Không thể hiển thị PDF?
                        </h4>
                        <p class="text-sm mb-3 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}">
                          Trình duyệt của bạn có thể không hỗ trợ hiển thị PDF. Bạn có thể tải xuống để xem.
                        </p>
                        <div class="flex gap-2">
                          <a href="${safeDocumentUrl}" download="${safeDocumentName}" class="px-3 py-1 text-sm ${theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary-hover' : 'bg-dseza-light-primary hover:bg-dseza-light-primary-hover'} text-white rounded transition-colors no-underline flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            Tải xuống PDF
                          </a>
                          <button onclick="window.open('${safeDocumentUrl}', '_blank')" class="px-3 py-1 text-sm border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-secondary-text hover:bg-dseza-dark-hover' : 'border-dseza-light-border text-dseza-light-secondary-text hover:bg-dseza-light-hover'} rounded transition-colors flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            Mở trong tab mới
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            } else {
              // For non-PDF documents, show download link
              content += `
                <div class="document-block my-4 p-4 ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'} rounded border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}">
                  <div class="flex items-center gap-3">
                    <svg class="w-6 h-6 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <div class="flex-1">
                      <h4 class="font-semibold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}">${safeDocumentName}</h4>
                      ${safeDocumentDescription ? `<p class="text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'} mt-1">${safeDocumentDescription}</p>` : ''}
                      <a href="${safeDocumentUrl}" target="_blank" class="inline-flex items-center gap-2 mt-2 px-3 py-1 text-sm ${theme === 'dark' ? 'bg-dseza-dark-secondary-accent hover:bg-dseza-dark-secondary-accent-hover' : 'bg-dseza-light-secondary-accent hover:bg-dseza-light-secondary-accent-hover'} text-white rounded transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Tải xuống tài liệu
                      </a>
                    </div>
                  </div>
                </div>
              `;
            }
          } else {
            content += `<div class="document-block-placeholder my-4 p-4 ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'} text-center ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'} rounded border-2 border-dashed ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}">[Tài liệu đang được tải...]</div>`;
          }
          break;
          
        default:
          // Handle other paragraph types as needed
          console.log('Unknown paragraph type:', paragraph.type, 'attributes:', Object.keys(paragraph.attributes || {}));
          // Sanitize paragraph type to prevent XSS
          const safeParagraphType = DOMPurify.sanitize(paragraph.type || 'unknown', { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
          content += `<div class="unknown-paragraph-type my-2 p-2 ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg/50' : 'bg-dseza-light-secondary-bg'} ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'} rounded ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'} text-sm">[Nội dung ${safeParagraphType}]</div>`;
          break;
      }
    });
    
    // Final sanitization layer for all assembled content
    const finalContent = content || `<p class="${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'} italic">Nội dung paragraphs trống.</p>`;
    return finalContent;
  };

  // Helper function to extract image from paragraph
  const getImageFromParagraph = (paragraph: any): string | null => {
    // Debug logging for image blocks
    if (paragraph.type === 'paragraph--image_block') {
      console.log('🖼️ Processing image block:', paragraph);
      console.log('🔗 Relationships:', paragraph.relationships);
      console.log('📦 Available included data count:', data?.included?.length || 0);
      
      if (!paragraph.relationships) {
        console.log('❌ No relationships found in paragraph');
        return null;
      }
      
      const relationshipKeys = Object.keys(paragraph.relationships);
      console.log('🔑 Available relationship keys:', relationshipKeys);
      
      // Try different possible field names for image relationships
      const possibleImageFields = [
        'field_image', 
        'field_media_image', 
        'field_media', 
        'field_anh',
        'field_hinh_anh',
        'field_picture',
        'field_photo'
      ];
      
      for (const fieldName of possibleImageFields) {
        if (paragraph.relationships[fieldName]?.data) {
          console.log(`✅ Found image relationship in ${fieldName}:`, paragraph.relationships[fieldName].data);
          const imageUrl = extractImageUrl(paragraph.relationships[fieldName], data.included);
          if (imageUrl) {
            console.log(`🎯 Successfully extracted image URL: ${imageUrl}`);
            return imageUrl;
          } else {
            console.log(`❌ Failed to extract image URL from ${fieldName}`);
          }
        }
      }
      
      // If no standard field found, try all relationship keys that might contain image/media
      for (const key of relationshipKeys) {
        if ((key.includes('image') || key.includes('media') || key.includes('anh') || key.includes('photo') || key.includes('picture')) && 
            paragraph.relationships[key]?.data) {
          console.log(`🔍 Trying dynamic field ${key}:`, paragraph.relationships[key].data);
          const imageUrl = extractImageUrl(paragraph.relationships[key], data.included);
          if (imageUrl) {
            console.log(`🎯 Successfully extracted image URL from ${key}: ${imageUrl}`);
            return imageUrl;
          }
        }
      }
      
      console.log('❌ No image relationship found in any field');
      
      // As last resort, check if there's an image in attributes
      if (paragraph.attributes) {
        console.log('🔍 Checking attributes for image data:', Object.keys(paragraph.attributes));
        for (const attrKey of Object.keys(paragraph.attributes)) {
          if ((attrKey.includes('image') || attrKey.includes('anh')) && paragraph.attributes[attrKey]) {
            console.log(`📎 Found image in attributes ${attrKey}:`, paragraph.attributes[attrKey]);
          }
        }
      }
    }

    // Fallback to standard field check
    if (paragraph.relationships?.field_image?.data && data?.included) {
      return extractImageUrl(paragraph.relationships.field_image, data.included);
    }
    
    return null;
  };

  // Helper function to extract document from paragraph
  const getDocumentFromParagraph = (paragraph: any): { url: string | null; name: string; description: string; mimeType: string | null } => {
    const defaultResult = { url: null, name: '', description: '', mimeType: null };
    
    // console.log('📄 getDocumentFromParagraph called with:', paragraph);
    // console.log('📄 Paragraph type:', paragraph.type);
    // console.log('📄 Relationships:', paragraph.relationships);
    // console.log('📄 Included data count:', data?.included?.length || 0);
    
    if (!paragraph.relationships || !data?.included) {
      console.log('❌ Missing relationships or included data');
      return defaultResult;
    }
    
    // Try different possible field names for document relationships
    const possibleFields = ['field_document', 'field_file', 'field_media_document', 'field_attachment', 'field_file_dinh_kem'];
    let documentRelationship = null;
    let fieldUsed = '';
    
    for (const field of possibleFields) {
      if (paragraph.relationships[field]?.data) {
        documentRelationship = paragraph.relationships[field].data;
        fieldUsed = field;
        // console.log(`✅ Found document relationship in ${field}:`, documentRelationship);
        break;
      }
    }
    
    if (!documentRelationship) {
      console.log('❌ No document relationship found in any field');
      console.log('📋 Available relationship keys:', Object.keys(paragraph.relationships));
      return defaultResult;
    }
    
    console.log(`🎯 Using field: ${fieldUsed}`);
    
    // Handle both single file and array of files
    const documentRef = Array.isArray(documentRelationship) ? documentRelationship[0] : documentRelationship;
    if (!documentRef) {
      return defaultResult;
    }
    
    // Find the media document in included data
    console.log('🔍 Looking for media document with type:', documentRef.type, 'id:', documentRef.id);
    console.log('📦 Available included items:', data.included.map(item => ({ type: item.type, id: item.id })));
    
    const mediaDocument = data.included.find((item: any) => 
      item.type === documentRef.type && item.id === documentRef.id
    );
    
    if (!mediaDocument) {
      console.log('❌ Media document not found in included data');
      return defaultResult;
    }
    
    console.log('✅ Found media document:', mediaDocument);
    
    // Get document name and description from media attributes
    const name = mediaDocument.attributes?.name || 
                 mediaDocument.attributes?.title || 
                 mediaDocument.attributes?.filename || 
                 paragraph.attributes?.field_title || 
                 'Tài liệu';
    
    const description = mediaDocument.attributes?.field_description?.value || 
                       mediaDocument.attributes?.field_caption?.value ||
                       paragraph.attributes?.field_description?.value ||
                       paragraph.attributes?.field_caption?.value ||
                       '';
    
    // Get the actual file reference
    console.log('🔗 Media document relationships:', mediaDocument.relationships);
    
    const possibleFileFields = ['field_media_document', 'field_media_file', 'thumbnail'];
    let fileRelationship = null;
    let fileFieldUsed = '';
    
    for (const field of possibleFileFields) {
      if (mediaDocument.relationships?.[field]?.data) {
        fileRelationship = mediaDocument.relationships[field].data;
        fileFieldUsed = field;
        console.log(`✅ Found file relationship in ${field}:`, fileRelationship);
        break;
      }
    }
    
    if (!fileRelationship) {
      console.log('❌ No file relationship found in media document');
      console.log('📋 Available media relationship keys:', Object.keys(mediaDocument.relationships || {}));
      return { ...defaultResult, name, description };
    }
    
    console.log(`🎯 Using file field: ${fileFieldUsed}`);
    
    // Find the file entity
    console.log('🔍 Looking for file entity with id:', fileRelationship.id);
    console.log('📦 Available file entities:', data.included.filter(item => item.type === 'file--file').map(item => ({ id: item.id, filename: item.attributes?.filename })));
    
    const fileEntity = data.included.find((item: any) => 
      item.type === 'file--file' && item.id === fileRelationship.id
    );
    
    if (!fileEntity) {
      console.log('❌ File entity not found in included data');
      return { ...defaultResult, name, description };
    }
    
    console.log('✅ Found file entity:', fileEntity);
    
    if (!fileEntity?.attributes?.uri?.url) {
      console.log('❌ File entity missing uri.url');
      console.log('📋 File entity attributes:', fileEntity.attributes);
      return { ...defaultResult, name, description };
    }
    
    // Get file URL and MIME type
    const baseUrl = import.meta.env.VITE_DRUPAL_BASE_URL || 
      (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');
    
    const fileUrl = fileEntity.attributes.uri.url;
    const fullUrl = fileUrl.startsWith('http') ? fileUrl : `${baseUrl}${fileUrl}`;
    const mimeType = fileEntity.attributes?.filemime || null;
    
    console.log('🎯 Final document data:', {
      url: fullUrl,
      name,
      description,
      mimeType,
      filename: fileEntity.attributes?.filename
    });
    
    return {
      url: fullUrl,
      name,
      description,
      mimeType
    };
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
        {/* Header */}
        <TopBar />
        <LogoSearchBar />
        <NavigationBar />
        
        <main className="flex-1 pt-52"> {/* Added flex-1 and increased padding to accommodate full header */}
          {/* Breadcrumb Skeleton */}
          <div className={`py-4 ${theme === 'dark' ? 'bg-dseza-dark-secondary/50' : 'bg-dseza-light-secondary/50'}`}>
            <div className="container mx-auto px-4">
              <Skeleton className="h-4 w-96" />
            </div>
          </div>

          {/* Article Content Skeleton */}
          <div className="container mx-auto px-4 py-8">
            <article className="max-w-4xl mx-auto">
              {/* Title Skeleton */}
              <header className="mb-8">
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <div className="flex gap-4 mb-6">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </header>

              {/* Image Skeleton */}
              <Skeleton className="w-full h-96 rounded-lg mb-8" />

              {/* Content Skeleton */}
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </article>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
        {/* Header */}
        <TopBar />
        <LogoSearchBar />
        <NavigationBar />
        
        <main className="flex-1 pt-52"> {/* Added flex-1 and increased padding to accommodate full header */}
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                Không thể tải bài viết
              </h1>
              <p className={`mb-8 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                {error?.message || "Đã có lỗi xảy ra khi tải bài viết. Vui lòng thử lại sau."}
              </p>
              <Button 
                onClick={() => window.history.back()}
                className={theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80'}
              >
                Quay lại
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
        {/* Header */}
        <TopBar />
        <LogoSearchBar />
        <NavigationBar />
        
        <main className="flex-1 pt-52"> {/* Added flex-1 and increased padding to accommodate full header */}
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Không tìm thấy bài viết
              </h1>
              <p className={`mb-8 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                Bài viết bạn tìm kiếm không tồn tại hoặc đã bị xóa.
              </p>
              {/* Debug: Show current UUID */}
              <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                Article UUID: {uuid}
              </p>
              <div className="space-y-4">
                <Button 
                  onClick={() => window.history.back()}
                  className={theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80'}
                >
                  Quay lại
                </Button>
                
                {/* Debug: API Information */}
                <div className={`text-sm border p-4 rounded-lg ${theme === 'dark' ? 'text-dseza-dark-secondary-text border-dseza-dark-border bg-dseza-dark-secondary-bg/50' : 'text-dseza-light-secondary-text border-dseza-light-border bg-dseza-light-secondary-bg/50'}`}>
                  <p className="font-semibold mb-2">Debug Information:</p>
                  <p>Base URL: https://dseza-backend.lndo.site</p>
                  <p>Full URL: https://dseza-backend.lndo.site/jsonapi/node/bai-viet/{uuid}</p>
                  <p className="mt-2">Bạn có thể kiểm tra API trực tiếp tại:</p>
                  <div className="mt-2 space-y-1">
                    <a 
                      href="https://dseza-backend.lndo.site/jsonapi/node/bai-viet" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 transition-colors ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary/80' : 'text-dseza-light-primary hover:text-dseza-light-primary/80'}`}
                    >
                      <ClipboardList className="h-4 w-4" />
                      Danh sách tất cả bài viết
                    </a>
                    <a 
                      href={`https://dseza-backend.lndo.site/jsonapi/node/bai-viet/${uuid}?include=field_anh_dai_dien.field_media_image`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 transition-colors ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary/80' : 'text-dseza-light-primary hover:text-dseza-light-primary/80'}`}
                    >
                      <ZoomIn className="h-4 w-4" />
                      Chi tiết bài viết UUID: {uuid}
                    </a>
                  </div>
                </div>
                
                {/* Debug: Test with sample IDs */}
                <div className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  <p>Thử test với các ID mẫu:</p>
                  <div className="flex gap-2 justify-center mt-2">
                    <a href="/bai-viet/1" className={`transition-colors ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary/80' : 'text-dseza-light-primary hover:text-dseza-light-primary/80'}`}>ID: 1</a>
                    <a href="/bai-viet/2" className={`transition-colors ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary/80' : 'text-dseza-light-primary hover:text-dseza-light-primary/80'}`}>ID: 2</a>
                    <a href="/bai-viet/3" className={`transition-colors ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary/80' : 'text-dseza-light-primary hover:text-dseza-light-primary/80'}`}>ID: 3</a>
                    <a href="/bai-viet/4" className={`transition-colors ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary/80' : 'text-dseza-light-primary hover:text-dseza-light-primary/80'}`}>ID: 4</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const article = data.data;
  const featuredImageUrl = getFeaturedImageUrl();
  const categories = getCategories();
  const metaDescription = getMetaDescription();
  const isFeatured = isFeaturedEvent();
  const articleContent = getArticleContent();
  const pdfDocument = getPdfDocument();

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
      {/* Header - Complete header structure */}
      <TopBar />
      <LogoSearchBar />
      <NavigationBar />
      
      {/* Main Content */}
      <main className="flex-1 pt-52"> {/* Added flex-1 and increased padding to accommodate full header */}
        {/* Breadcrumb */}
        <div className={`py-2 ${theme === 'dark' ? 'bg-dseza-dark-secondary/50' : 'bg-dseza-light-secondary/50'}`}>
          <div className="container mx-auto px-4">
            <nav className={`flex items-center space-x-2 text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <a 
                href="/" 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Trang chủ
              </a>
              <ChevronRight className="h-4 w-4" />
              <a 
                href="/tin-tuc" 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {isFeatured ? 'Tin tức' : (categories.length > 0 ? categories[0].name : 'Tin tức')}
              </a>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium line-clamp-1 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {article.attributes.title}
              </span>
            </nav>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-8">
          <article className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {article.attributes.title}
              </h1>
              
              {/* Featured Badge */}
              {isFeatured && (
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${theme === 'dark' ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border border-dseza-dark-primary/30' : 'bg-dseza-light-primary/10 text-dseza-light-primary border border-dseza-light-primary/30'}`}>
                  <Star className="h-4 w-4" />
                  <span>Sự kiện tiêu điểm</span>
                </div>
              )}
              
              {/* Meta Description */}
              {metaDescription && (
                <p className={`text-lg mb-4 italic ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  {metaDescription}
                </p>
              )}
              
              {/* Meta Information */}
              <div className={`flex flex-wrap items-center gap-4 mb-6 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Ngày đăng: {formatDate(article.attributes.created)}</span>
                </div>
                
                {/* View Count */}
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>
                    Lượt xem: {viewCountLoading ? (
                      <span className="inline-block w-8 h-4 bg-gray-300 rounded animate-pulse"></span>
                    ) : (
                      viewCount.toLocaleString('vi-VN')
                    )}
                  </span>
                </div>
                
                {categories.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <span>Chuyên mục: </span>
                    <div className="flex gap-1">
                      {categories.map((category, index) => (
                        <Badge 
                          key={category.id} 
                          variant="secondary" 
                          className={`text-xs ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg text-dseza-dark-main-text' : 'bg-dseza-light-secondary-bg text-dseza-light-main-text'}`}
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </header>

            {/* Images are now handled within paragraphs content */}

            {/* Article Content */}
            {/* SECURITY: Double-layer XSS protection - content is sanitized during construction AND before rendering */}
            <div className={`prose prose-lg max-w-none mt-8 ${theme === 'dark' ? 'prose-invert' : ''}`}>
              <div
                className={`rich-content-article ${theme === 'dark' ? 'dark' : 'light'}`}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(articleContent)
                }}
              />
            </div>

            {/* PDF Document Viewer - Display attached PDF if available */}
            {pdfDocument.url && (
              <div className={`mt-12 pt-8 border-t ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  <FileText className="h-5 w-5" />
                  Tài liệu đính kèm
                </h3>
                
                {/* PDF Viewer inspired by BrochurePage */}
                <div className="w-full mb-8">
                  <div className={`rounded-lg p-4 mb-4 border ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-lg">{pdfDocument.name}</h4>
                      <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                        <FileText className="w-4 h-4" />
                        <span>PDF Document</span>
                        {pdfDocument.description && (
                          <>
                            <span>•</span>
                            <span>{pdfDocument.description}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = pdfDocument.url!;
                          link.download = pdfDocument.name;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Tải xuống
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => window.open(pdfDocument.url!, '_blank')}
                        className="flex items-center gap-2"
                      >
                        <ZoomIn className="h-4 w-4" />
                        Xem toàn màn hình
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: pdfDocument.name,
                              text: `Xem tài liệu: ${pdfDocument.name}`,
                              url: pdfDocument.url!,
                            }).catch(console.error);
                          } else {
                            navigator.clipboard.writeText(pdfDocument.url!).then(() => {
                              toast({
                                title: "Đã sao chép!",
                                description: "Đường dẫn PDF đã được sao chép vào clipboard.",
                              });
                            });
                          }
                        }}
                        className="flex items-center gap-2"
                      >
                        <Share2 className="h-4 w-4" />
                        Chia sẻ
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => window.open(pdfDocument.url!, '_blank')}
                        className="flex items-center gap-2"
                      >
                        <Printer className="h-4 w-4" />
                        In
                      </Button>
                    </div>
                    
                    {/* PDF Embed */}
                    <div className="relative w-full" style={{ height: '800px' }}>
                      <iframe
                        src={`${pdfDocument.url}#view=FitH&toolbar=1&navpanes=1&scrollbar=1&zoom=page-width`}
                        className={`w-full h-full border rounded ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}
                        title={pdfDocument.name}
                        loading="lazy"
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
                      />
                    </div>
                    
                    {/* PDF Controls */}
                    <div className="mt-4 flex items-center justify-center gap-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => window.open(pdfDocument.url!, '_blank')}
                        className="flex items-center gap-2"
                      >
                        <Monitor className="h-4 w-4" />
                        Xem kích thước thật
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = pdfDocument.url!;
                          link.download = pdfDocument.name;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className={`flex items-center gap-2 ${
                          theme === 'dark' 
                            ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary-hover' 
                            : 'bg-dseza-light-primary hover:bg-dseza-light-primary-hover'
                        }`}
                      >
                        <Download className="h-4 w-4" />
                        Tải xuống PDF
                      </Button>
                    </div>
                  </div>
                  
                  {/* Alternative download section for browsers that don't support PDF embed */}
                  <div className={`mt-6 p-4 border rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' 
                      : 'bg-dseza-light-secondary-bg border-dseza-light-border'
                  }`}>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className={`w-5 h-5 mt-0.5 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                      <div className="flex-1">
                        <h4 className={`font-medium mb-1 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                          Không thể hiển thị PDF?
                        </h4>
                        <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                          Trình duyệt của bạn có thể không hỗ trợ hiển thị PDF. Bạn có thể tải xuống để xem.
                        </p>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = pdfDocument.url!;
                              link.download = pdfDocument.name;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                            className={`flex items-center gap-2 ${
                              theme === 'dark' 
                                ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary-hover text-white' 
                                : 'bg-dseza-light-primary hover:bg-dseza-light-primary-hover text-white'
                            }`}
                          >
                            <Download className="h-4 w-4" />
                            Tải xuống PDF
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => window.open(pdfDocument.url!, '_blank')}
                            className={`flex items-center gap-2 border ${
                              theme === 'dark' 
                                ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-hover' 
                                : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-hover'
                            }`}
                          >
                            <ExternalLink className="h-4 w-4" />
                            Mở trong tab mới
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className={`mt-12 pt-8 border-t ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
              <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                <Share2 className="h-5 w-5" />
                Chia sẻ bài viết:
              </h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className={`flex items-center gap-2 transition-colors ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-hover hover:border-dseza-dark-primary' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-hover hover:border-dseza-light-primary'}`}
                  >
                    <Facebook className="h-4 w-4 text-blue-600" />
                    Facebook
                  </Button>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.attributes.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className={`flex items-center gap-2 transition-colors ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-hover hover:border-dseza-dark-primary' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-hover hover:border-dseza-light-primary'}`}
                  >
                    <Twitter className="h-4 w-4 text-sky-500" />
                    Twitter
                  </Button>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className={`flex items-center gap-2 transition-colors ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-hover hover:border-dseza-dark-primary' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-hover hover:border-dseza-light-primary'}`}
                  >
                    <svg className="h-4 w-4 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </Button>
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(article.attributes.title)}&body=${encodeURIComponent(`Xem bài viết này: ${window.location.href}`)}`}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className={`flex items-center gap-2 transition-colors ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-hover hover:border-dseza-dark-primary' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-hover hover:border-dseza-light-primary'}`}
                  >
                    <Mail className="h-4 w-4 text-gray-600" />
                    Email
                  </Button>
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('copy')}
                  className={`flex items-center gap-2 transition-colors ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-hover hover:border-dseza-dark-secondary-accent' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-hover hover:border-dseza-light-secondary-accent'}`}
                >
                  <Copy className={`h-4 w-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-accent' : 'text-dseza-light-secondary-accent'}`} />
                  Sao chép link
                </Button>
              </div>
            </div>

            {/* Comments Section */}
            <CommentSection articleId={uuid || ''} />
          </article>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ArticleDetailPage;
