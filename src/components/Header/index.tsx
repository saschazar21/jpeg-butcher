import { h, Fragment, JSX } from 'preact';
import { useMemo } from 'preact/hooks';
import { useStoreon } from 'storeon/preact';

import type { JPEGEvents, JPEGState } from 'store';

import styles from 'components/Header/Header.module.css';

const Header = (): JSX.Element => {
  const { modified, name } = useStoreon<JPEGState, JPEGEvents>(
    'modified',
    'name',
  );

  const href = useMemo(() => {
    const blob = new Blob([modified], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  }, [modified]);

  const download = useMemo(() => {
    const segments = name.split('.');
    const len = segments.length;
    segments.splice(
      len - 1,
      0,
      'butchered',
      !/jpe?g/i.test(segments[len - 1]) ? 'jpg' : '',
    );

    return segments.filter((val: string) => val.length > 0).join('.');
  }, [name]);

  return (
    <header className={styles.header}>
      <h1>JPEG Butcher</h1>
      {name?.length > 0 && (
        <Fragment>
          <span>/</span>
          <a
            alt="Download your butchered result as JPEG image"
            download={download}
            href={href}
            type="image/jpeg"
          >
            {name}
          </a>
        </Fragment>
      )}
    </header>
  );
};

export default Header;