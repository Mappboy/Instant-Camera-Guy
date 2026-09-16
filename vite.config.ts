import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; 
import { VitePWA } from 'vite-plugin-pwa'; 
import { setupPlugins } from '@responsive-image/vite-plugin';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      assetsInclude: ['/assets/**'],
      plugins: [
        react(),
        tailwindcss(),
        VitePWA(),
        setupPlugins({
          include: /^[^?]+\.(jpg|png)\?.*responsive.*$/,
        }),
      ],
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              'vendor-react': ['react', 'react-dom', 'react-router-dom'],
              'vendor-markdown': ['react-markdown', 'remark-gfm'],
            },
          },
        },
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
    };
});
