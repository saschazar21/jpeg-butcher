import { h, JSX, ComponentChildren } from 'preact';

export type ControlsItemProps = {
  children: ComponentChildren;
  onClick: () => void;
};

const ControlsItem = ({
  children,
  onClick,
}: ControlsItemProps): JSX.Element => {
  return <button onClick={onClick}>{children}</button>;
};

export default ControlsItem;
