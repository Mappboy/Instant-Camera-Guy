export function getImageUrl(name: string, options?: { responsive?: boolean }): string | any {
  if (!name) return '';
  if (name.startsWith('http://') || name.startsWith('https://')) {
    return name;
  }
  if (options?.responsive) {
    const images = import.meta.glob('/assets/images/**', { eager: true, query: {
    responsive: true,
    lqip: 'blurhash'
  } });
    const imagePath = Object.keys(images).find(path => path.includes(name));
    return imagePath ? images[imagePath] : '';
  }
  const images = import.meta.glob('/assets/images/**', { eager: true, import: 'default' });
  const imagePath = Object.keys(images).find(path => path.endsWith(name));
  return imagePath ? (images[imagePath] as string) : '';
}

export function getImageUrlHref(name) {
  // note that this does not include files in subdirectories
  return new URL(`../assets/images/${name}`, import.meta.url).href
}
