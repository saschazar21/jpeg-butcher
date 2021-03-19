import { h, JSX } from 'preact';
import { useContext, useMemo } from 'preact/hooks';
import { useStoreon } from 'storeon/preact';

import type { JPEGEvents, JPEGState } from 'store';
import { ImageContext } from 'utils/context';

const ImageZoom = ({ hidden }: { hidden: boolean }): JSX.Element | null => {
  const { width, height, x, y } = useContext(ImageContext);
  const { modified } = useStoreon<JPEGState, JPEGEvents>('modified');

  const src = useMemo(() => {
    if (!modified.length) {
      return;
    }

    const blob = new Blob([modified], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  }, [modified]);

  return src && src.length > 0 ? (
    <img
      aria-hidden="true"
      src={src}
      width={width}
      height={height}
      hidden={hidden}
      style={{
        cursor: 'zoom-in',
        position: 'absolute',
        top: y,
        left: x,
      }}
    />
  ) : null;
};

export default ImageZoom;
