export function resolveProductImageUrl(imageUrl) {
  if (!imageUrl) return '';
  const raw = Array.isArray(imageUrl) ? imageUrl.find(Boolean) : imageUrl;
  if (typeof raw !== 'string') return '';
  return raw.trim().replace(/\/+$/, '');
}
