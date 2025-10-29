export interface ContentPiece {
  frontmatter: {
    title: string;
    image?: string;
    slug: string;
  };
  content: string;
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
