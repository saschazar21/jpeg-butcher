import { createContext, h, JSX, VNode } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { paramCase } from 'param-case';

import Tab, { TabProps } from 'components/TabView/TabList/Tab';
import TabList from 'components/TabView/TabList';
import TabPanel, { TabPanelProps } from 'components/TabView/TabPanel';

export type TabViewProps = {
  children:
    | VNode<{
        'data-title': string;
      }>
    | VNode<{
        'data-title': string;
      }>[];
};

export const TabContext = createContext('');

const TabView = ({ children }: TabViewProps): JSX.Element => {
  const [selected, setSelected] = useState('');
  const [tabs, setTabs] = useState<VNode<TabProps>[]>([]);
  const [panels, setPanels] = useState<VNode<TabPanelProps>[]>([]);

  useEffect(() => {
    const p: VNode<TabPanelProps>[] = [];
    const t: VNode<TabProps>[] = [];
    (Array.isArray(children) ? children : [children]).forEach((child) => {
      const { props: { 'data-title': title } = {} } = child;
      if (!title?.length) {
        return;
      }

      const id = paramCase(title as string);

      setSelected((val) => (!val?.length ? id : val));

      t.push(
        <Tab id={id} onClick={setSelected} key={`${id}-tab`}>
          {title}
        </Tab>,
      );

      p.push(
        <TabPanel id={id} key={`${id}-panel`}>
          {child}
        </TabPanel>,
      );
    });

    setPanels([...p]);
    setTabs([...t]);
  }, [children]);

  return (
    <div>
      <TabContext.Provider value={selected}>
        <TabList>{tabs}</TabList>
        {panels}
      </TabContext.Provider>
    </div>
  );
};

export default TabView;
