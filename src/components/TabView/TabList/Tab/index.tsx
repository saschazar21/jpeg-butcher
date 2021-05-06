import type { ComponentChild, ComponentChildren, JSX } from 'preact';
import { useContext } from 'preact/hooks';

import { TabContext } from 'components/TabView';

import styles from 'components/TabView/TabList/Tab/Tab.module.css';

export type TabProps = {
  children: ComponentChild | ComponentChildren;
  id: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (id: string) => void;
};

const Tab = ({ children, id, onClick }: TabProps): JSX.Element => {
  const selected = useContext(TabContext);
  const isSelected = id === selected;

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    return onClick(id);
  };

  return (
    <button
      className={styles.tab}
      id={id}
      aria-controls={`${id}-panel`}
      aria-selected={!!isSelected}
      onClick={handleClick}
      role="tab"
      tabIndex={isSelected ? -1 : 0}
    >
      {children}
    </button>
  );
};

export default Tab;
