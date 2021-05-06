import { join } from 'path';
import { defineConfig } from 'vite';
import htmlConfig from 'vite-plugin-html-config';
import preact from '@preact/preset-vite';
import { VitePWA as pwa } from 'vite-plugin-pwa';
import svgr from '@svgr/rollup';
import tsconfigPaths from 'vite-tsconfig-paths';

import htmlConfigOptions from './config/html-config';
import manifestOptions from './config/manifest';
import workboxOptions from './config/workbox';

export default defineConfig({
  build: {
    cssCodeSplit: true,
    emptyOutDir: true,
    outDir: join(__dirname, './build'),
    sourcemap: process.env.NODE_ENV !== 'production',
  },
  css: {
    modules: {
      generateScopedName:
        process.env.NODE_ENV === 'production'
          ? '[hash:6]'
          : '[name]_[local]__[hash:6]',
    },
    postcss: join(__dirname, './postcss.config.js'),
  },
  plugins: [
    htmlConfig(htmlConfigOptions),
    svgr({
      plugins: [
        '@svgr/plugin-svgo',
        '@svgr/plugin-jsx',
        '@svgr/plugin-prettier',
      ],
    }),
    tsconfigPaths({
      root: __dirname,
    }),
    preact({ devtoolsInProd: false }),
    pwa({
      base: '/',
      manifest: manifestOptions,
      minify: process.env.NODE_ENV === 'production',
      mode:
        process.env.NODE_ENV === 'production' ? 'production' : 'development',
      outDir: 'build',
      registerType: 'autoUpdate',
      workbox: workboxOptions,
    }),
  ],
  publicDir: join(__dirname, './public'),
  resolve: {
    alias: {
      react: 'preact/compat',
    },
  },
  root: join(__dirname, './src'),
});
