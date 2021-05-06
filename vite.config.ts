import { join } from 'path';
import { defineConfig } from 'vite';
import htmlConfig from 'vite-plugin-html-config';
import preact from '@preact/preset-vite';
import svgr from '@svgr/rollup';
import tsconfigPaths from 'vite-tsconfig-paths';

import htmlConfigOptions from './config/html-config';

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
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
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
  ],
  publicDir: join(__dirname, './public'),
  resolve: {
    alias: {
      react: 'preact/compat',
    },
  },
  root: join(__dirname, './src'),
});
