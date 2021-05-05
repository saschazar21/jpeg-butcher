import { join } from 'path';
import { defineConfig } from 'vite';
import htmlConfig from 'vite-plugin-html-config';
import prefresh from '@prefresh/vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

import htmlConfigOptions from './config/html-config';

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: join(__dirname, './build'),
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
    svgr(),
    tsconfigPaths({
      root: __dirname,
    }),
    prefresh(),
  ],
  publicDir: join(__dirname, './public'),
  resolve: {
    alias: {
      react: 'preact/compat',
    },
  },
  root: join(__dirname, './src'),
});
