import type { JSX } from 'preact';
import { ReactComponent as InfoIcon } from 'assets/icons/info.svgr.svg';

import styles from 'components/Toast/Toast.module.css';

export type ToastProps = {
  children: string;
};

const Toast = ({ children }: ToastProps): JSX.Element => {
  return (
    <aside className={styles.wrapper}>
      <InfoIcon className={styles.icon} />
      <span className={styles.text}>{children}</span>
    </aside>
  );
};

export default Toast;
