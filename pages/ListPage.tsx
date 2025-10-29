

import React, { useState, useEffect } from 'react';
// FIX: Import Link to wrap PolaroidCard for navigation.
import { useParams, Link } from 'react-router-dom';
import { contentService } from '../services/contentService';
import type { Post } from '../types';
import PolaroidCard from '../components/PolaroidCard';
import LoadingSpinner from '../components/LoadingSpinner';

const ListPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      if (category) {
        setLoading(true);
        const fetchedPosts = await contentService.getPostsByCategory(category);
        setPosts(fetchedPosts);
        setLoading(false);
      }
    };
    fetchPosts();
  }, [category]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1 className="text-4xl font-special text-center mb-12 capitalize">
        {category}
      </h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
          {/* FIX: Map over posts, destructure content, wrap PolaroidCard in a Link, and pass excerpt. */}
          {posts.map(({ frontmatter, content }) => (
            <Link key={frontmatter.slug} to={`/${frontmatter.category}/${frontmatter.slug}`}>
              <PolaroidCard
                title={frontmatter.title}
                image={frontmatter.image}
                excerpt={content.substring(0, 100) + (content.length > 100 ? '...' : '')}
              />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-primary/80">No posts found in this category yet.</p>
      )}
    </div>
  );
};

export default ListPage;