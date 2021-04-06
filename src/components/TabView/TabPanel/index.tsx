import { ComponentChildren, h, JSX } from 'preact';
import { useContext } from 'preact/hooks';

import { TabContext } from 'components/TabView';

import styles from 'components/TabView/TabPanel/TabPanel.module.css';

export type TabPanelProps = {
  children: ComponentChildren;
  id: string;
};

const TabPanel = ({ children, id }: TabPanelProps): JSX.Element => {
  const selected = useContext(TabContext);
  const isSelected = id === selected;

  return (
    <section
      className={styles.panel}
      id={`${id}-panel`}
      role="tabpanel"
      aria-labelledby={id}
      hidden={!isSelected}
    >
      {children}
    </section>
  );
};

export default TabPanel;
