import { h, JSX } from 'preact';
import { useMemo } from 'preact/hooks';
import { useStoreon } from 'storeon/preact';

import type { JPEGEvents, JPEGState } from 'store';
import Byte from 'components/HexViewer/Byte';
import { MAX_LENGTH } from 'components/HexEditor';

import foreignStyles from 'components/HexEditor/HexEditor.module.css';

const HexViewer = (): JSX.Element => {
  const { modified } = useStoreon<JPEGState, JPEGEvents>('modified');

  const bytes = useMemo(
    () =>
      [...modified]
        .slice(0, MAX_LENGTH)
        .map((val: number, offset: number) => (
          <Byte key={`viewer-byte-offset-${offset}`} value={val} />
        )),
    [modified],
  );

  return <div className={foreignStyles.editor}>{bytes}</div>;
};

export default HexViewer;
