import { join } from 'path';
import { defineConfig } from 'vite';
import prefresh from '@prefresh/vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: join(__dirname, './build'),
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  plugins: [
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
