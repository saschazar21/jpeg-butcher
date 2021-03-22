import { ComponentChildren, h, JSX } from 'preact';
import { useContext } from 'preact/hooks';

import { TabContext } from 'components/TabView';

export type TabPanelProps = {
  children: ComponentChildren;
  id: string;
};

const TabPanel = ({ children, id }: TabPanelProps): JSX.Element => {
  const selected = useContext(TabContext);
  const isSelected = id === selected;

  return (
    <div
      id={`${id}-panel`}
      role="tabpanel"
      aria-labelledby={id}
      hidden={!isSelected}
    >
      {children}
    </div>
  );
};

export default TabPanel;