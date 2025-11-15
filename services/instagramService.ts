import type { InstagramMedia } from '../types';

const INSTAGRAM_ACCESS_TOKEN = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_USER_ID = 'theinstantcameraguy'; // IMPORTANT: Replace with your actual Instagram User ID.

// For production, it is strongly recommended to store the access token on a server and fetch it from there,
// rather than exposing it in the client-side code.

const API_URL = `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

export const instagramService = {
  getInstagramPosts: async (): Promise<InstagramMedia[]> => {
    if (!INSTAGRAM_ACCESS_TOKEN) {
      console.error('Instagram access token is not configured. Please set VITE_INSTAGRAM_ACCESS_TOKEN in your environment.');
      return [];
    }

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Instagram API error: ${errorData.error.message}`);
      }
      const data = await response.json();
      return data.data as InstagramMedia[];
    } catch (error) {
      console.error('Failed to fetch Instagram posts:', error);
      return [];
    }
  },
};
