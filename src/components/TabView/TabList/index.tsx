import { h, JSX } from 'preact';

import type Tab from 'components/TabList/Tab';

export type TabListProps = {
  children: typeof Tab | typeof Tab[];
};

const TabList = ({ children }: TabListProps): JSX.Element => {
  return <nav role="tablist">{children}</nav>;
};

export default TabList;
