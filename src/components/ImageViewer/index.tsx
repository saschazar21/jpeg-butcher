import { h, JSX } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { useStoreon } from 'storeon/preact';

import type { JPEGEvents, JPEGState } from 'store';

import styles from 'components/ImageViewer/ImageViewer.module.css';

export interface Dimensions {
  height: number;
  width: number;
}

const ImageViewer = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const [dimensions, setDimensions] = useState<Dimensions>({
    height: 0,
    width: 0,
  });
  const { modified, original } = useStoreon<JPEGState, JPEGEvents>(
    'modified',
    'original',
  );

  useEffect(() => {
    const worker = new Worker(
      new URL('../../worker/extract-dimensions.js', import.meta.url),
      {
        name: 'convert-image-to-base64-worker',
        type: import.meta.env.mode === 'development' ? 'module' : 'classic',
      },
    );

    worker.onmessage = ({
      data: { height, width },
    }: MessageEvent<Dimensions>) => {
      setDimensions({ height, width });
      return worker.terminate();
    };

    worker.postMessage(original);
  }, [original]);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    const { height, width } = dimensions;
    if (!canvas || !modified.length) {
      return;
    }
    canvas.height = height;
    canvas.width = width;

    const blob = new Blob([modified], { type: 'image/jpeg' });
    const img = new Image(width, height);
    img.src = URL.createObjectURL(blob);

    const ctx = canvas.getContext('2d');
    img.addEventListener('load', () => ctx?.drawImage(img, 0, 0));
  }, [canvasRef, dimensions, modified]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
};

export default ImageViewer;
