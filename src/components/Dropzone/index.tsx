import type { JSX } from 'preact';
import { useRef, useState } from 'preact/hooks';
import classnames from 'classnames';
import { useStoreon } from 'storeon/preact';

import Loading from 'components/Loading';
import type { JPEGEvents, JPEGState } from 'store';
import readFile from 'utils/filereader';

import styles from 'components/Dropzone/Dropzone.module.css';

const Dropzone = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useStoreon<JPEGState, JPEGEvents>('original');

  const handleChange = async (e: Event) => {
    e.preventDefault();
    if ((e.target as HTMLInputElement)?.files) {
      try {
        const { files } = e.target as HTMLInputElement;
        const data = await readFile(files as FileList);
        dispatch('set', data);
      } catch (e) {
        setError(e as Error);
      }
    }
  };

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setError(null);
    inputRef.current?.click();
  };

  const handleDragEnd = () => setActive(false);
  const handleDragEnter = () => setActive(true);
  const handleDragLeave = () => setActive(false);
  const handleDragOver = (e: DragEvent) => {
    setError(null);
    e.preventDefault();
    if (e?.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
    }
  };

  const handleDragStart = (e: DragEvent) => {
    if (e?.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
    }
  };

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    setActive(false);
    if (e?.dataTransfer) {
      const timeout = setTimeout(() => setIsLoading(true), 1500);
      const { files } = e.dataTransfer;

      try {
        const data = await readFile(files);
        dispatch('set', data);
      } catch (e) {
        setError(e as Error);
      } finally {
        clearTimeout(timeout);
        setIsLoading(false);
      }
    }
  };

  const className = classnames(styles.dropzone, {
    [styles.active]: active,
    [styles.error]: error,
  });
  return (
    <>
      <div
        className={className}
        onClick={handleClick}
        onDragEnd={handleDragEnd}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
      >
        {error ? (
          <span>{error.message}</span>
        ) : (
          <span>
            Click to open file, or
            <br />
            drag &amp; drop a JPEG image...
          </span>
        )}
        {isLoading && <Loading />}
      </div>
      <input
        type="file"
        ref={inputRef}
        className={styles.input}
        onChange={handleChange}
      />
    </>
  );
};

export default Dropzone;
