import { JSX, createContext } from 'preact';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'preact/hooks';
import { useStoreon } from 'storeon/preact';

import { ReactComponent as RotateCCWIcon } from 'assets/icons/rotate-ccw.svgr.svg';
import { ReactComponent as TrashIcon } from 'assets/icons/trash.svgr.svg';
import Byte from 'components/HexEditor/Byte';
import Controls from 'components/HexEditor/Controls';
import ControlsItem from 'components/HexEditor/Controls/ControlsItem';
import type { JPEGEvents, JPEGState } from 'store';
import { toHex, validateHex } from 'utils/helpers';

import styles from 'components/HexEditor/HexEditor.module.css';

export const MAX_LENGTH = 384;

export const Selection = createContext<boolean>(false);

const HexEditor = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>();
  const [pressed, setPressed] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const { dispatch, modified } = useStoreon<JPEGState, JPEGEvents>('modified');
  const hexPadding = useMemo(
    () => Math.min(MAX_LENGTH, modified.length).toString(16).length + 1,
    [modified],
  );

  useEffect(() => {
    const [, max] = selected;
    !isNaN(max) &&
      inputRef.current &&
      inputRef.current.focus({ preventScroll: true });
  }, [inputRef, selected]);

  const handleBlur = useCallback(
    () =>
      !pressed &&
      setSelected((prev: number[]) => (prev.length === 2 ? [] : prev)),
    [pressed, setSelected],
  );

  const handleDelete = () => dispatch('@init');

  const handleHover = useCallback(
    (byte: number) => {
      setSelected((prev: number[]) => {
        const [first] = prev;
        if (pressed) {
          return !isNaN(first) ? [first, byte] : [byte];
        }
        return prev;
      });
    },
    [pressed, setSelected],
  );

  const handleKeyUp = (e: KeyboardEvent): void => {
    e.preventDefault();
    const { key, shiftKey, target } = e;
    const { value = '' } = (target as HTMLInputElement) || {};
    const [firstSelected = 0, lastSelected = MAX_LENGTH - 1] = [
      ...selected,
    ].sort((a: number, b: number) => a - b);
    const insert = () => {
      if (value.length) {
        dispatch(
          'update',
          new Uint8Array([
            ...modified.slice(0, firstSelected),
            parseInt(value, 16),
            ...modified.slice(firstSelected + 1),
          ]),
        );
        inputRef.current.value = '';
      }
    };

    switch (key.toLowerCase()) {
      case 'backspace':
      case 'delete':
        setSelected([firstSelected, firstSelected]);
        return dispatch(
          'update',
          new Uint8Array([
            ...modified.slice(0, firstSelected),
            ...modified.slice(lastSelected + 1),
          ]),
        );
      case 'enter':
      case 'right':
      case 'arrowright':
      case 'tab':
        insert();
        if (key.toLowerCase() === 'tab' && shiftKey) {
          return setSelected(new Array(2).fill(Math.max(0, firstSelected - 1)));
        }
        return setSelected(
          new Array(2).fill(Math.min(MAX_LENGTH - 1, firstSelected + 1)),
        );
      case 'left':
      case 'arrowleft':
        insert();
        return setSelected(new Array(2).fill(Math.max(0, firstSelected - 1)));
      case 'up':
      case 'arrowup':
        insert();
        return setSelected(new Array(2).fill(Math.max(0, firstSelected - 16)));
      case 'down':
      case 'arrowdown':
        insert();
        return setSelected(
          new Array(2).fill(Math.min(MAX_LENGTH - 1, firstSelected + 16)),
        );
      default:
        setSelected([firstSelected, firstSelected]);
        if (!validateHex(key)) {
          inputRef.current.value = value.slice(0, -1);
          setInvalid(true);
          return window.setTimeout(() => setInvalid(false), 150) as never;
        }
        if (value.length === 2) {
          insert();
          return setSelected(
            new Array(2).fill(Math.min(MAX_LENGTH - 1, firstSelected + 1)),
          );
        }
    }
  };

  const handlePressed = (pressed: boolean, byte: number) => {
    setPressed(pressed);
    setSelected((prev: number[]) =>
      pressed ? [byte] : prev.length === 2 ? prev : [...prev, byte],
    );
  };

  const handleReset = () => dispatch('reset');

  const bytes: JSX.Element[] = useMemo(() => {
    const stripped =
      modified.length > MAX_LENGTH
        ? [...modified.slice(0, MAX_LENGTH)]
        : modified;
    const [min, max] = [...selected].sort((a: number, b: number) => a - b);
    const { value = '' } = inputRef.current || {};

    return [...stripped].map((current: number, offset: number) => {
      const isActive = !!(!isNaN(max) && offset >= min && offset <= max);
      return (
        <Byte
          data-offset={toHex(offset).padStart(hexPadding, '0').toUpperCase()}
          invalid={isActive && invalid}
          key={`editable-byte-offset-${offset}`}
          onHover={handleHover}
          onPressed={handlePressed}
          active={isActive}
        >
          {(isActive && value.length
            ? value.padStart(2, '0')
            : toHex(current)
          ).toUpperCase()}
        </Byte>
      );
    });
  }, [handleHover, hexPadding, inputRef, invalid, modified, selected]);

  return (
    <Selection.Provider value={pressed}>
      <div className={styles.wrapper}>
        <Controls>
          <ControlsItem onClick={handleReset}>
            <RotateCCWIcon className={styles.icon} />
            Reset
          </ControlsItem>
          <ControlsItem onClick={handleDelete}>
            <TrashIcon className={styles.icon} />
            Delete
          </ControlsItem>
        </Controls>
        <div
          className={styles.editor}
          style={{ paddingLeft: `${hexPadding + 1}ch` }}
        >
          {bytes}
        </div>
      </div>
      {selected.length === 2 && (
        <input
          type="text"
          ref={inputRef}
          className={styles.input}
          onBlur={handleBlur}
          onKeyUp={handleKeyUp}
        />
      )}
    </Selection.Provider>
  );
};

export default HexEditor;
