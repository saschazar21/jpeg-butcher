import { h, JSX, ComponentChildren } from 'preact';

import styles from 'components/HexEditor/Controls/ControlsItem/ControlsItem.module.css';

export type ControlsItemProps = {
  children: ComponentChildren;
  onClick: () => void;
};

const ControlsItem = ({
  children,
  onClick,
}: ControlsItemProps): JSX.Element => {
  return (
    <button className={styles.control} onClick={onClick}>
      {children}
    </button>
  );
};

export default ControlsItem;
