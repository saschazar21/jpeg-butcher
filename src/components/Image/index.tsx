import { h, JSX } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { useStoreon } from 'storeon/preact';

import ImageViewer from 'components/Image/ImageViewer';
import ImageZoom from 'components/Image/ImageZoom';
import type { JPEGEvents, JPEGState } from 'store';
import { ImageContext, ImageDimensions } from 'utils/context';

import styles from 'components/Image/Image.module.css';

const Image = (): JSX.Element => {
  const divRef = useRef<HTMLDivElement>();
  const [isOver, setIsOver] = useState(false);
  const [dimensions, setDimensions] = useState<ImageDimensions>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const { original } = useStoreon<JPEGState, JPEGEvents>('original');

  useEffect(() => {
    const worker = new Worker(
      new URL('../../worker/extract-dimensions.js', import.meta.url),
      {
        name: 'extract-image-dimensions-worker',
        type: import.meta.env.mode === 'development' ? 'module' : 'classic',
      },
    );

    worker.onmessage = ({
      data: { height, width },
    }: MessageEvent<{ height: number; width: number }>) => {
      setDimensions((d: ImageDimensions) => ({ ...d, height, width }));
      return worker.terminate();
    };

    worker.postMessage(original);
  }, [original]);

  const handleMouseEnter = () => setIsOver(true);
  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    const { clientX = 0, clientY = 0 } = e;
    const {
      height = 0,
      width = 0,
      left = 0,
      top = 0,
    } = divRef.current?.getBoundingClientRect();
    return (
      isOver &&
      setDimensions((d: ImageDimensions) => ({
        ...d,
        x: ((clientX - left) / width) * (d.width - width) * -1.0,
        y: ((clientY - top) / height) * (d.height - height) * -1.0,
      }))
    );
  };
  const handleMouseLeave = () => setIsOver(false);

  return (
    <ImageContext.Provider value={dimensions}>
      <div
        className={styles.wrapper}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={divRef}
      >
        <ImageViewer />
        <ImageZoom hidden={!isOver} />
      </div>
    </ImageContext.Provider>
  );
};

export default Image;
