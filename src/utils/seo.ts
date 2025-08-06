export function slugifyTitle(title: string): string {
  title = title.toString().toLowerCase().trim();

  // Normalize to NFD and remove diacritics
  title = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Handle Vietnamese 'đ'
  title = title.replace(/đ/g, 'd');

  // Replace spaces with hyphens
  title = title.replace(/\s+/g, '-');

  // Remove all non-word chars except hyphens
  title = title.replace(/[^\w-]+/g, '');

  // Replace multiple hyphens with a single hyphen
  title = title.replace(/--+/g, '-');

  // Trim hyphens from start and end
  title = title.replace(/^-+|-+$/g, '');

  return title;
}

import { useTranslation } from 'react-i18next';

/**
 * Get translated path segment for the given key and language
 * @param segmentKey - The key for the URL segment (e.g., 'news', 'article', 'event')
 * @param lang - The language code ('vi' | 'en')
 * @returns The translated URL segment
 */
export function translatePath(segmentKey: string, lang: 'vi' | 'en'): string {
  // Import translation resources directly since this is a utility function
  const translations = {
    vi: {
      news: 'tin-tuc',
      article: 'bai-viet',
      event: 'su-kien',
      utilities: 'tien-ich',
      documents: 'van-ban',
      introduction: 'gioi-thieu',
      contact: 'lien-he',
      investmentHandbook: 'cam-nang-dau-tu',
      qna: 'hoi-dap',
      create: 'tao-moi',
      faq: 'cau-hoi-thuong-gap',
      functionalZones: 'cac-khu-chuc-nang'
    },
    en: {
      news: 'news',
      article: 'article',
      event: 'event',
      utilities: 'utilities',
      documents: 'documents',
      introduction: 'introduction',
      contact: 'contact',
      investmentHandbook: 'investment-handbook',
      qna: 'qna',
      create: 'create',
      faq: 'faq',
      functionalZones: 'functional-zones'
    }
  };
  
  return translations[lang][segmentKey as keyof typeof translations['vi']] || segmentKey;
}

export function getArticleSlug(article: any): string {
  if (!article) {
    return '';
  }

  // 1. Prefer explicit path alias when available (e.g. from Drupal JSON:API)
  const alias = article?.attributes?.path?.alias;
  if (alias) {
    const trimmedAlias = alias.replace(/^\/|\/$/g, '');
    const parts = trimmedAlias.split('/');
    const slugFromAlias = parts[parts.length - 1];
    if (slugFromAlias) {
      return slugFromAlias;
    }
  }

  // 2. Fall back to a provided "slug" field or path string (flattened Article object)
  if (typeof article.slug === 'string' && article.slug.trim() !== '') {
    return article.slug;
  }

  if (typeof article.path === 'string' && article.path.trim() !== '') {
    const trimmedPath = article.path.replace(/^\/|\/$/g, '');
    const pathParts = trimmedPath.split('/');
    const slugFromPath = pathParts[pathParts.length - 1];
    if (slugFromPath) {
      return slugFromPath;
    }
  }

  // 3. Derive slug from the article title (support both flattened and nested structures)
  const rawTitle = article?.attributes?.title || article?.title || '';
  const safeTitle = rawTitle ? slugifyTitle(rawTitle) : 'article';

  // 4. Append a shortened id (if present) to keep slugs unique
  const idFragment = typeof article.id === 'string' ? article.id.slice(0, 8) : '';
  return idFragment ? `${safeTitle}-${idFragment}` : safeTitle;
}

export function getArticleUrl(lang: 'vi' | 'en', article: any): string {
  const slug = getArticleSlug(article);
  const articleSegment = translatePath('article', lang);
  return `/${lang}/${articleSegment}/${slug}`;
}
