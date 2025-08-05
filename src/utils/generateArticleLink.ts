import slugify from 'slugify';

export function generateArticleLink(article: any, language: 'vi' | 'en') {
  const alias = article.attributes?.path?.alias;    // lấy alias từ API Drupal
  
  // Tạo slug từ tiêu đề làm fallback khi không có alias
  const titleSlug = slugify(article.attributes.title, { lower: true, strict: true });
  
  // Sử dụng alias nếu có, bỏ dấu gạch chéo đầu, nếu không thì dùng titleSlug
  const slug = alias ? alias.replace(/^\//, '') : titleSlug;
  
  if (language === 'vi') {
    return `/vi/bai-viet/${slug}`;
  }
  // English: sử dụng article thay cho bai-viet
  return `/en/article/${slug}`;
}