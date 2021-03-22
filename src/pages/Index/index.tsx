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
  const mediaQuery = window.matchMedia('(min-width: 768px)');

  const elements: VNode<{ 'data-title': string }>[] = [
    <HexEditor data-title="Editor" />,
    <HexViewer data-title="Text" />,
    <Image data-title="Image Preview" />,
  ];

  return original.length ? (
    <section className={styles.hex}>
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
    </section>
  ) : (
    <Dropzone />
  );
};

export default Index;
