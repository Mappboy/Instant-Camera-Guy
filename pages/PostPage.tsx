

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { contentService } from '../services/contentService';
import type { Post } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const PostPage: React.FC = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (category && slug) {
        setLoading(true);
        const fetchedPost = await contentService.getPost(category, slug);
        setPost(fetchedPost || null);
        setLoading(false);
      }
    };
    fetchPost();
  }, [category, slug]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!post) {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-special mb-4">Post not found</h1>
        <p className="text-primary/80">
          Sorry, we couldn't find the post you were looking for.
        </p>
        <Link to="/" className="text-accent-red hover:underline mt-4 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  const { frontmatter, content } = post;
  
  return (
    <article className="max-w-4xl mx-auto bg-background p-8 sm:p-12 shadow-lg rounded-sm">
      <header className="text-center mb-8">
        <p className="text-sm text-primary/60 mb-2">
          Published on {new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <h1 className="text-5xl font-special text-primary leading-tight">
          {frontmatter.title}
        </h1>
        <Link to={`/${category}`} className="capitalize text-accent-teal hover:underline mt-2 inline-block">
          in {category}
        </Link>
      </header>

      <img
        src={frontmatter.image.replace('/400/400', '/800/600')}
        alt={frontmatter.title}
        className="w-full h-auto object-cover rounded-sm mb-8 border-4 border-accent-tan p-1 bg-background"
      />

      <div className="prose lg:prose-xl max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </article>
  );
};

export default PostPage;