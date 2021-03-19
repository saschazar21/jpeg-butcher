import { h, JSX } from 'preact';
import { useContext, useEffect, useRef } from 'preact/hooks';
import { useStoreon } from 'storeon/preact';

import type { JPEGEvents, JPEGState } from 'store';

import styles from 'components/Image/ImageViewer/ImageViewer.module.css';
import { ImageContext } from 'utils/context';

const ImageViewer = (): JSX.Element => {
  const dimensions = useContext(ImageContext);
  const canvasRef = useRef<HTMLCanvasElement>();
  const { modified } = useStoreon<JPEGState, JPEGEvents>('modified');

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
