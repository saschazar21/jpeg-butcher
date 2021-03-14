import { createStoreon, StoreonStore } from 'storeon';

import { isProd } from 'utils/helpers';

export interface JPEGState {
  original: Uint8Array;
  modified: Uint8Array;
}

export interface JPEGEvents {
  reset: undefined;
  set: Uint8Array;
  update: Uint8Array;
}

const jpeg = (store: StoreonStore<JPEGState, JPEGEvents>) => {
  store.on('@init', () => ({
    original: new Uint8Array(),
    modified: new Uint8Array(),
  }));

  store.on('set', (_s: Readonly<JPEGState>, img: Uint8Array) => ({
    original: new Uint8Array([...img]),
    modified: new Uint8Array([...img]),
  }));

  store.on('update', ({ original }: Readonly<JPEGState>, img: Uint8Array) => ({
    original,
    modified: new Uint8Array([...img]),
  }));

  store.on('reset', ({ original }: Readonly<JPEGState>) => ({
    original,
    modified: new Uint8Array([...original]),
  }));

  !isProd &&
    store.on('@dispatch', (_state, [event, data]) => console.log(event, data));
};

export default createStoreon([jpeg]);
