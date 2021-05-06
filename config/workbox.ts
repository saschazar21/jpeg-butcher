const config = {
  globDirectory: 'build/',
  globPatterns: ['**/*.{js,json,css,ico,woff2,html,svg}'],
  swDest: 'build/sw.js',
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
};

export default config;
