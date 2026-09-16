import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; 
import { VitePWA } from 'vite-plugin-pwa'; 
import webfontDownload from 'vite-plugin-webfont-dl';
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
      plugins: [react(),
        tailwindcss(),
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: [
            'favicon.ico',
            'favicon.svg',
            'assets/images/icon-192.png',
            'assets/images/icon-512.png',
            'assets/images/sx_70.png'
          ],
          manifest: {
            name: 'The Instant 📷 Guy',
            short_name: 'The Instant Camera Guy',
            description: 'The world’s busiest independent technician for classic instant cameras.',
            theme_color: '#da291c',
            background_color: '#fdfdf8',
            display: 'standalone',
            start_url: '/',
            icons: [
              {
                src: '/assets/images/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any maskable'
              },
              {
                src: '/assets/images/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable'
              }
            ]
          }
        }),
        webfontDownload(),
        setupPlugins({
          include: /^[^?]+\.(jpg|png)\?.*responsive.*$/,
        }),
      ],
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              'vendor-react': ['react', 'react-dom', 'react-router-dom'],
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
