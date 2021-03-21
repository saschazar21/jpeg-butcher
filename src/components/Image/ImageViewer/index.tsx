import { h, JSX } from 'preact';
import { useContext, useEffect, useRef } from 'preact/hooks';

import styles from 'components/Image/ImageViewer/ImageViewer.module.css';
import { ImageContext } from 'utils/context';

const ImageViewer = (): JSX.Element => {
  const dimensions = useContext(ImageContext);
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const { current: canvas } = canvasRef;
    const { height, width, url } = dimensions;
    if (!canvas || !url?.length) {
      return;
    }
    canvas.height = height;
    canvas.width = width;
    const img = new Image(width, height);
    img.src = url;

    const ctx = canvas.getContext('2d');
    img.addEventListener('load', () => ctx?.drawImage(img, 0, 0));
  }, [canvasRef, dimensions]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
};

export default ImageViewer;
