import { ComponentChild, ComponentChildren, h, JSX } from 'preact';

export type TabListProps = {
  children: ComponentChild | ComponentChildren;
};

const TabList = ({ children }: TabListProps): JSX.Element => {
  return <nav>{children}</nav>;
};

export default TabList;
