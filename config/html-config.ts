import { URL } from 'url';
import type { Options } from 'vite-plugin-html-config';
import pkg from '../package.json';

const CARD_IMAGE_PATH = '/card-image.jpg';

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
      content: pkg.homepage,
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
      content: new URL(CARD_IMAGE_PATH, pkg.homepage).toString(),
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:domain',
      content: new URL(pkg.homepage).hostname,
    },
    {
      name: 'twitter:url',
      content: pkg.homepage,
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
      content: new URL(CARD_IMAGE_PATH, pkg.homepage).toString(),
    },
    {
      name: 'robots',
      content:
        process.env.CONTEXT === 'production'
          ? 'index follow'
          : 'noindex nofollow',
    },
  ],
};

export default options;
