import { h, JSX, VNode } from 'preact';

import type { ControlsItemProps } from 'components/HexEditor/Controls/ControlsItem';

import styles from 'components/HexEditor/Controls/Controls.module.css';

export type ControlsProps = {
  children: VNode<ControlsItemProps> | VNode<ControlsItemProps>[];
};

const Controls = ({ children }: ControlsProps): JSX.Element => {
  return <aside className={styles.controls}>{children}</aside>;
};

export default Controls;
