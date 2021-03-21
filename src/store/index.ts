import { createStoreon, StoreonStore } from 'storeon';

import { isProd } from 'utils/helpers';

export type JPEGState = {
  name: string;
  original: Uint8Array;
  modified: Uint8Array;
};

export type JPEGEvents = {
  reset: undefined;
  set: [Uint8Array, string];
  update: Uint8Array;
};

const jpeg = (store: StoreonStore<JPEGState, JPEGEvents>) => {
  store.on('@init', () => ({
    name: '',
    original: new Uint8Array(),
    modified: new Uint8Array(),
  }));

  store.on(
    'set',
    (_s: Readonly<JPEGState>, [img, name]: [Uint8Array, string]) =>
      Object.assign(
        {},
        {
          original: new Uint8Array([...img]),
          modified: new Uint8Array([...img]),
        },
        name ? { name } : null,
      ),
  );

  store.on(
    'update',
    ({ original, name }: Readonly<JPEGState>, img: Uint8Array) => ({
      name,
      original,
      modified: new Uint8Array([...img]),
    }),
  );

  store.on('reset', ({ original, name }: Readonly<JPEGState>) => ({
    name,
    original,
    modified: new Uint8Array([...original]),
  }));

  !isProd &&
    store.on('@dispatch', (_state, [event, data]) => console.log(event, data));
};

export default createStoreon([jpeg]);
