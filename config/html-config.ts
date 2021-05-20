import { URL } from 'url';
import type { Options } from 'vite-plugin-html-config';
import pkg from '../package.json';

const CARD_IMAGE_PATH = '/card-image.png';
const DOMAIN =
  process.env.CONTEXT === 'production'
    ? process.env.URL ?? pkg.homepage
    : process.env.PREVIEW_URL ?? 'http://localhost:3000';

const getURL = (path = ''): string => new URL(path, DOMAIN).toString();

const options: Options = {
  metas: [
    {
      name: 'description',
      content: pkg.description,
    },
    {
      name: 'author',
      content: pkg.author.name,
    },
    {
      name: 'theme-color',
      content: pkg.color,
    },
    {
      name: 'og:url',
      content: getURL(),
    },
    {
      name: 'og:type',
      content: 'website',
    },
    {
      name: 'og:title',
      content: pkg.displayName,
    },
    {
      name: 'og:description',
      content: pkg.description,
    },
    {
      name: 'og:image',
      content: getURL(CARD_IMAGE_PATH),
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:domain',
      content: new URL(DOMAIN).hostname,
    },
    {
      name: 'twitter:url',
      content: getURL(),
    },
    {
      name: 'twitter:title',
      content: pkg.displayName,
    },
    {
      name: 'twitter:description',
      content: pkg.description,
    },
    {
      name: 'twitter:image',
      content: getURL(CARD_IMAGE_PATH),
    },
    {
      name: 'robots',
      content:
        process.env.CONTEXT === 'production'
          ? 'index, follow'
          : 'noindex, nofollow',
    },
  ],
};

export default options;
