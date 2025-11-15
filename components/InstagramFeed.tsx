import React, { useState, useEffect } from 'react';
import { instagramService } from '../services/instagramService';
import type { InstagramMedia } from '../types';
import LoadingSpinner from './LoadingSpinner';

const InstagramFeed: React.FC = () => {
  const [posts, setPosts] = useState<InstagramMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const instagramPosts = await instagramService.getInstagramPosts();
        setPosts(instagramPosts);
      } catch (err) {
        setError('Failed to fetch Instagram posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (posts.length === 0) {
    return (
        <div className="text-center">
            <p className="text-primary/80">
                Could not retrieve Instagram posts. Please ensure your access token is correctly configured.
            </p>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 max-w-4xl mx-auto mb-8">
      {posts.map((post) => (
        <a
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          key={post.id}
          className="block overflow-hidden rounded-sm group aspect-square"
        >
          <img
            src={post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url}
            alt={post.caption || 'Instagram post'}
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          {post.media_type === 'VIDEO' && (
            <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </a>
      ))}
    </div>
  );
};

export default InstagramFeed;
