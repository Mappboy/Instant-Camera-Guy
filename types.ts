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

