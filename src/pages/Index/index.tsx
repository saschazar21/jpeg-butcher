import { Fragment, h, JSX, VNode } from 'preact';
import { useStoreon } from 'storeon/preact';

import Dropzone from 'components/Dropzone';
import HexEditor from 'components/HexEditor';
import HexViewer from 'components/HexViewer';
import Image from 'components/Image';
import TabView from 'components/TabView';
import type { JPEGEvents, JPEGState } from 'store';

import styles from 'pages/Index/Index.module.css';

const Index = (): JSX.Element => {
  const { original } = useStoreon<JPEGState, JPEGEvents>('original');
  const mediaQuery = window.matchMedia('(min-width: 1200px)');

  const elements: VNode<{ 'data-title': string }>[] = [
    <HexEditor data-title="Editor" />,
    <Image data-title="Image Preview" />,
    <HexViewer data-title="Text" />,
  ];

  return original.length ? (
    <main className={styles.hex}>
      {mediaQuery?.matches ? (
        <Fragment>
          <TabView>
            {elements.shift() as VNode<{ 'data-title': string }>}
          </TabView>
          <TabView>{elements}</TabView>
        </Fragment>
      ) : (
        <TabView>{elements}</TabView>
      )}
    </main>
  ) : (
    <Dropzone />
  );
};

export default Index;
