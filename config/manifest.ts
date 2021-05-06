import type { Options } from 'vite-plugin-pwa';

import pkg from '../package.json';

const config: Options['manifest'] = {
  name: pkg.displayName,
  short_name: pkg.displayName,
  start_url: '/?utm_source=installed',
  display: 'standalone',
  background_color: '#ebe7e6',
  theme_color: pkg.color,
  description: pkg.description,
  icons: [
    {
      src: 'icons/icon-192.png',
      type: 'image/png',
      sizes: '192x192',
      purpose: 'any',
    },
    {
      src: 'icons/icon-512.png',
      type: 'image/png',
      sizes: '512x512',
      purpose: 'any',
    },
    {
      src: 'icons/maskable-192.png',
      type: 'image/png',
      sizes: '192x192',
      purpose: 'maskable',
    },
    {
      src: 'icons/maskable-512.png',
      type: 'image/png',
      sizes: '512x512',
      purpose: 'maskable',
    },
  ],
};

export default config;
