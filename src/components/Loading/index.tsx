import type { JSX } from 'preact';

import { ReactComponent as RotateIcon } from 'assets/icons/rotate-cw.svgr.svg';

import styles from 'components/Loading/Loading.module.css';

const Loading = (): JSX.Element => {
  return (
    <div className={styles.loading}>
      <RotateIcon />
      <span>Loading...</span>
    </div>
  );
};

export default Loading;
