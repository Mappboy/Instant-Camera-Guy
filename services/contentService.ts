import matter from 'gray-matter';
// FIX: Import Post type.
import type { ContentPiece, Post } from '../types';

const markdownContent: string[] = [
  `---
title: "Australia's home for Polaroid and Instant Camera Repairs"
slug: "hero"
---
`,
  `---
title: "Experience"
image: "https://picsum.photos/seed/experience/800/600"
slug: "feature-experience"
---
Years of hands-on experience with hundreds of cameras means your beloved Polaroid is in safe hands. We've seen it all.
`,
  `---
title: "Repair, Service & Modification"
image: "https://picsum.photos/seed/repair/800/600"
slug: "feature-repair"
---
From simple cleanings to complex electronic repairs and custom modifications, we bring your camera back to life.
`,
  `---
title: "Worldwide Shipping"
image: "https://picsum.photos/seed/shipping/800/600"
slug: "feature-shipping"
---
Based in Australia, but we happily accept repairs from and ship cameras to anywhere in the world.
`,
  `---
title: "About The Instant Camera Guy"
image: "https://www.datocms-assets.com/12178/1561713490-2483746215112465356118787362462414567503721o.jpg?ar64=MjAwOjIwMA&auto=format&fit=crop&fp-y=0.18&h=200&mask=ellipse&w=200"
slug: "about"
---
My name is Jake, and I'm the guy behind The Instant Camera Guy. My passion for these incredible cameras started years ago and quickly turned into an obsession with understanding how they work, and more importantly, how to fix them when they don't. I believe in preserving the magic of instant photography for generations to come.
`,
    `---
title: "More to Come"
slug: "more-to-come"
---
We're always working on new projects, blog posts, and guides. Stay tuned for more content!
`,
  `---
title: "Photos"
slug: "photos"
---
A gallery of our favorite shots and camera restorations is coming soon! Check back for inspiration.
`,
  `---
title: "Contact Us"
slug: "contact"
---
Get in touch to discuss your repair or ask any questions.

*   **Phone:** [0431 845 455](tel:0431845455)
*   **Email:** [theinstantcameraguy@hotmail.com](mailto:theinstantcameraguy@hotmail.com)
*   **Facebook:** [Message us on Facebook](https://www.facebook.com/)
*   **Gumtree:** [Visit our Gumtree Store](https://www.gumtree.com.au/)
`,
];

const contentPieces: ContentPiece[] = markdownContent.map((md) => {
  const { data, content } = matter(md.trim());
  return { frontmatter: data as ContentPiece['frontmatter'], content };
});

// FIX: Add mock post data to support ListPage and PostPage components.
const markdownPosts: string[] = [
`---
title: "My First Polaroid Photo"
image: "https://picsum.photos/seed/post1/800/600"
slug: "first-polaroid"
category: "photography"
date: "2023-10-26"
---
This is the content of my first post. I'm so excited to share my first photo taken with a vintage Polaroid camera!
`,
`---
title: "SX-70 Camera Review"
image: "https://picsum.photos/seed/post2/800/600"
slug: "sx-70-review"
category: "reviews"
date: "2023-11-05"
---
A deep dive into the iconic Polaroid SX-70 Land Camera. Is it still worth it today? Let's find out.
`,
`---
title: "Tips for beginners"
image: "https://picsum.photos/seed/post3/800/600"
slug: "beginner-tips"
category: "photography"
date: "2023-11-12"
---
Some useful tips and tricks for those who are just starting their journey with instant photography.
`
];

const posts: Post[] = markdownPosts.map((md) => {
    const { data, content } = matter(md.trim());
    return { frontmatter: data as Post['frontmatter'], content };
});

export const contentService = {
  getContent: async (slug: string): Promise<ContentPiece | undefined> => {
    return contentPieces.find((p) => p.frontmatter.slug === slug);
  },
  getFeatures: async (): Promise<ContentPiece[]> => {
    return contentPieces.filter((p) => p.frontmatter.slug.startsWith('feature-'));
  },
  // FIX: Add getPostsByCategory to resolve error in ListPage.
  getPostsByCategory: async (category: string): Promise<Post[]> => {
    return posts.filter((p) => p.frontmatter.category === category);
  },
  // FIX: Add getPost to resolve error in PostPage.
  getPost: async (category: string, slug: string): Promise<Post | undefined> => {
    return posts.find((p) => p.frontmatter.category === category && p.frontmatter.slug === slug);
  },
};