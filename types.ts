export interface ContentPiece {
  frontmatter: {
    title: string;
    image?: string;
    slug: string;
  };
  content: string;
}

export interface InstagramMedia {
  id: string;
  caption: string;
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
}

// FIX: Add Post interface to resolve type errors in ListPage and PostPage.
export interface Post {
  frontmatter: {
    title: string;
    image: string;
    slug: string;
    category: string;
    date: string;
  };
  content: string;
}
