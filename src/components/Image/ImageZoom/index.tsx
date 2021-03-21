import { h, JSX } from 'preact';
import { useContext } from 'preact/hooks';

import { ImageContext } from 'utils/context';

const ImageZoom = ({ hidden }: { hidden: boolean }): JSX.Element | null => {
  const { width, height, url, x, y } = useContext(ImageContext);

  return url && url.length > 0 ? (
    <img
      aria-hidden="true"
      src={url}
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
