import type { JSX } from 'preact';
import classnames from 'classnames';

import foreignStyles from 'components/HexEditor/Byte/Byte.module.css';
import styles from 'components/HexViewer/Byte/Byte.module.css';

export type ByteProps = {
  value: number;
};

const Byte = ({ value }: ByteProps): JSX.Element => {
  const className = classnames(foreignStyles.byte, styles.viewerByte);

  const character = value < 32 ? '.' : String.fromCodePoint(value);

  return <span className={className}>{character}</span>;
};

export default Byte;
