import { h, Fragment, JSX } from 'preact';
import { useMemo } from 'preact/hooks';
import { useStoreon } from 'storeon/preact';

import type { JPEGEvents, JPEGState } from 'store';

import { ReactComponent as DownloadIcon } from 'assets/icons/download.svgr.svg';
import { ReactComponent as Icon } from 'assets/icons/icon.svgr.svg';

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
      <h1>
        <Icon className={styles.icon} />
        <span>JPEG Butcher</span>
      </h1>
      {name?.length > 0 && (
        <Fragment>
          <span className={styles.separator}>/</span>
          <a
            alt="Download your butchered result as JPEG image"
            className={styles.downloadlink}
            download={download}
            href={href}
            type="image/jpeg"
          >
            <DownloadIcon className={styles.downloadicon} />
            <span className={styles.name}>{name}</span>
          </a>
        </Fragment>
      )}
    </header>
  );
};

export default Header;
