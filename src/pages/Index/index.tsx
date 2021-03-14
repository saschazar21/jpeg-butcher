import { h, JSX } from 'preact';
import { useStoreon } from 'storeon/preact';

import Dropzone from 'components/Dropzone';
import HexEditor from 'components/HexEditor';
import HexViewer from 'components/HexViewer';
import type { JPEGEvents, JPEGState } from 'store';

import styles from 'pages/Index/Index.module.css';

const Index = (): JSX.Element => {
  const { original } = useStoreon<JPEGState, JPEGEvents>('original');

  return original.length ? (
    <section className={styles.hex}>
      <HexEditor />
      <HexViewer />
    </section>
  ) : (
    <Dropzone />
  );
};

export default Index;
