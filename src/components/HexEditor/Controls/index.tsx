import { h, JSX, VNode } from 'preact';

import type { ControlsItemProps } from 'components/HexEditor/Controls/ControlsItem';

export type ControlsProps = {
  children: VNode<ControlsItemProps> | VNode<ControlsItemProps>[];
};

const Controls = ({ children }: ControlsProps): JSX.Element => {
  return <aside>{children}</aside>;
};

export default Controls;
