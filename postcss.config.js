/* eslint-disable @typescript-eslint/no-var-requires */

const cssnano = require('cssnano');
const normalize = require('postcss-normalize');
const presetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [normalize(), presetEnv(), cssnano()],
};
