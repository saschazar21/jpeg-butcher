import { h, Fragment, JSX } from 'preact';
import { useStoreon } from 'storeon/preact';

import type { JPEGEvents, JPEGState } from 'store';

import styles from 'components/Header/Header.module.css';

const Header = (): JSX.Element => {
  const { name } = useStoreon<JPEGState, JPEGEvents>('name');

  return (
    <header className={styles.header}>
      <h1>JPEG Butcher</h1>
      {name?.length > 0 && (
        <Fragment>
          <span>/</span>
          <strong>{name}</strong>
        </Fragment>
      )}
    </header>
  );
};

export default Header;
