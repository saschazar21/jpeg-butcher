import { join } from 'path';
import { defineConfig } from 'vite';
import babel from '@rollup/plugin-babel';
import prefresh from '@prefresh/vite';
import svgr from 'vite-plugin-svgr';

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
    babel({
      babelHelpers: 'bundled',
      configFile: join(__dirname, './.babelrc'),
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
