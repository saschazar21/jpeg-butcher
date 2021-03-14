import { h, JSX } from 'preact';
import { useContext, useMemo } from 'preact/hooks';
import classnames from 'classnames';

import { Selection } from 'components/HexEditor';

import styles from 'components/HexEditor/Byte/Byte.module.css';

export interface ByteProps {
  active: boolean;
  children: string;
  className?: string;
  'data-offset': string;
  invalid: boolean;
  // eslint-disable-next-line no-unused-vars
  onHover: (offset: number) => void;
  // eslint-disable-next-line no-unused-vars
  onPressed: (pressed: boolean, offset: number) => void;
}

const Byte = ({
  active,
  children,
  className: customClassName,
  'data-offset': dataOffset,
  invalid,
  onHover,
  onPressed,
}: ByteProps): JSX.Element => {
  const pressed = useContext(Selection);
  const offset = useMemo(() => parseInt(dataOffset, 16), [dataOffset]);

  const className = classnames(
    customClassName,
    styles.byte,
    styles.editorByte,
    {
      [styles.active]: active,
      [styles.invalid]: invalid,
    },
  );

  const handleMouseDown = () => !pressed && onPressed(true, offset);
  const handleMouseOver = () => pressed && onHover(offset);
  const handleMouseUp = () => pressed && onPressed(false, offset);

  return (
    <span
      data-offset={dataOffset}
      className={className}
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
      onMouseUp={handleMouseUp}
    >
      {children}
    </span>
  );
};

export default Byte;
