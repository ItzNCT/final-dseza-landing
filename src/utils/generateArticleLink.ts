import { getArticleUrl } from './seo';

export function generateArticleLink(article: any, language: 'vi' | 'en') {
  return getArticleUrl(language, article);
}