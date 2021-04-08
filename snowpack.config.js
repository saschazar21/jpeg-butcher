const isProd = process.env.NODE_ENV === 'production';

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  alias: {
    assets: './src/assets',
    components: './src/components',
    pages: './src/pages',
    styles: './src/styles',
    store: './src/store',
    utils: './src/utils',
    react: 'preact/compat',
    'react-dom': 'preact/compat',
  },
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: [
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-postcss',
    [
      'snowpack-plugin-svgr',
      {
        include: '**/*.svgr.svg',
      },
    ],
    [
      '@snowpack/plugin-typescript',
      {
        /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
        ...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {}),
      },
    ],
    '@prefresh/snowpack',
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
    minify: isProd,
    preload: isProd,
    sourcemap: isProd ? false : 'inline',
    treeshake: isProd,
  },
  packageOptions: {
    source: isProd ? 'remote' : 'local',
    types: isProd,
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
