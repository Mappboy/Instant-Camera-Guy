import type { ContentPiece, Post } from '../types';
import contentPieces from '../content.json';
import posts from '../posts.json';

export const contentService = {
  getContent: async (slug: string): Promise<ContentPiece | undefined> => {
    return contentPieces.find((p) => p.frontmatter.slug === slug);
  },
  getFeatures: async (): Promise<ContentPiece[]> => {
    return contentPieces.filter((p) => p.frontmatter.slug.startsWith('feature-'));
  },
  getPostsByCategory: async (category: string): Promise<Post[]> => {
    return posts.filter((p) => p.frontmatter.category === category);
  },
  getPost: async (category: string, slug: string): Promise<Post | undefined> => {
    return posts.find((p) => p.frontmatter.category === category && p.frontmatter.slug === slug);
  },
};