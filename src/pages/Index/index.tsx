import type { JSX, VNode } from 'preact';
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
    <HexEditor key="hexeditor" data-title="Editor" />,
    <Image key="imagepreview" data-title="Image Preview" />,
    <HexViewer key="hexviewer" data-title="Text" />,
  ];

  return original.length ? (
    <main className={styles.hex}>
      {mediaQuery?.matches ? (
        <>
          <TabView>
            {elements.shift() as VNode<{ 'data-title': string }>}
          </TabView>
          <TabView>{elements}</TabView>
        </>
      ) : (
        <TabView>{elements}</TabView>
      )}
    </main>
  ) : (
    <main>
      <Dropzone />
    </main>
  );
};

export default Index;
