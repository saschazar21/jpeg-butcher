module.exports = {
  globDirectory: 'build/',
  globPatterns: ['**/*.{js,json,css,ico,woff2,html}'],
  swDest: 'build/sw.js',
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
};
