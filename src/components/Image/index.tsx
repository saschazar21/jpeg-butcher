import type { JSX } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { useStoreon } from 'storeon/preact';

import ImageViewer from 'components/Image/ImageViewer';
import ImageZoom from 'components/Image/ImageZoom';
import type { JPEGEvents, JPEGState } from 'store';
import { ImageContext, ImageDimensions } from 'utils/context';

import Worker from '../../worker/extract-dimensions?worker';

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

  const isZoomNeeded = useMemo(() => {
    const {
      width = Number.MAX_SAFE_INTEGER,
      height = Number.MAX_SAFE_INTEGER,
    } = divRef.current?.getBoundingClientRect() || {};
    const { width: imageWidth, height: imageHeight } = dimensions;
    return imageWidth > width || imageHeight > height;
  }, [dimensions]);

  const { modified, original } = useStoreon<JPEGState, JPEGEvents>(
    'modified',
    'original',
  );

  useEffect(() => {
    const worker = new Worker();

    worker.onmessage = ({
      data: { height, width },
    }: MessageEvent<{ height: number; width: number }>) => {
      setDimensions((d: ImageDimensions) => ({ ...d, height, width }));
      return worker.terminate();
    };

    worker.postMessage(original);
  }, [original]);

  useEffect(() => {
    const blob = new Blob([modified], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);
    setDimensions((d: ImageDimensions) => ({ ...d, url }));
  }, [modified]);

  const handleMouseEnter = () => setIsOver(true);
  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (!isZoomNeeded || !isOver) {
      return;
    }

    const { clientX = 0, clientY = 0 } = e;
    const {
      height = 0,
      width = 0,
      left = 0,
      top = 0,
    } = divRef.current?.getBoundingClientRect();
    return setDimensions((d: ImageDimensions) => ({
      ...d,
      x: ((clientX - left) / width) * (d.width - width) * -1.0,
      y: ((clientY - top) / height) * (d.height - height) * -1.0,
    }));
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
        {isZoomNeeded && <ImageZoom hidden={!isOver} />}
      </div>
    </ImageContext.Provider>
  );
};

export default Image;
