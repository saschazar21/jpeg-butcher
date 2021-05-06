import type { JSX, VNode } from 'preact';

import type { TabProps } from 'components/TabView/TabList/Tab';

import styles from 'components/TabView/TabList/TabList.module.css';

export type TabListProps = {
  children: VNode<TabProps> | VNode<TabProps>[];
};

const TabList = ({ children }: TabListProps): JSX.Element => {
  return (
    <div className={styles.tablist} role="tablist">
      {children}
    </div>
  );
};

export default TabList;
