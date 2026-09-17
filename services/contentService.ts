import type { ContentPiece } from '../types';
import contentPieces from '../content.json';

export const contentService = {
  getContentSync: (slug: string): ContentPiece | undefined => {
    return contentPieces.find((p) => p.frontmatter.slug === slug);
  },
  getFeaturesSync: (): ContentPiece[] => {
    return contentPieces.filter((p) => p.frontmatter.slug.startsWith('feature-'));
  },
  getContent: async (slug: string): Promise<ContentPiece | undefined> => {
    return contentPieces.find((p) => p.frontmatter.slug === slug);
  },
  getFeatures: async (): Promise<ContentPiece[]> => {
    return contentPieces.filter((p) => p.frontmatter.slug.startsWith('feature-'));
  },
};