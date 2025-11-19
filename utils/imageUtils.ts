export function getImageUrl(name: string, options?: { responsive?: boolean }): { default: string } {
  if (!name) return { default: '' };
  if (name.startsWith('http://') || name.startsWith('https://')) {
    return { default: name };
  }

  // Logic to get a non-responsive image
  const getNonResponsiveImage = () => {
    const images = import.meta.glob('/assets/images/**', { eager: true, import: 'default' });
    const imagePath = Object.keys(images).find(path => path.endsWith(name));
    return imagePath ? (images[imagePath] as string) : '';
  };

  if (options?.responsive) {
    const responsiveImages = import.meta.glob('/assets/images/**', { eager: true,  import: 'default', query: {
      responsive: true,
      lqip: 'blurhash'
    } });
    const responsiveImagePath = Object.keys(responsiveImages).find(path => path.includes(name));

    if (responsiveImagePath) {
      return responsiveImages[responsiveImagePath];
    } else {
      // Fallback to non-responsive image if responsive not found, wrap in { default: ... }
      return { default: getNonResponsiveImage() };
    }
  }

  // Original logic for non-responsive images if responsive option is not set, wrap in { default: ... }
  return { default: getNonResponsiveImage() };
}

export function getImageUrlHref(name) {
  // note that this does not include files in subdirectories
  return new URL(`../assets/images/${name}`, import.meta.url).href
}
