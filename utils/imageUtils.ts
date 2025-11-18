export function getImageUrl(name: string): string {
  if (!name) return '';
  if (name.startsWith('http://') || name.startsWith('https://')) {
    return name;
  }
  const images = import.meta.glob('/assets/images/**', { eager: true, import: 'default' });
  const imagePath = Object.keys(images).find(path => path.endsWith(name));
  return imagePath ? (images[imagePath] as string) : '';
}
