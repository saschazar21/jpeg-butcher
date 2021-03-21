import { ComponentChild, ComponentChildren, h, JSX } from 'preact';

export type TabProps = {
  children: ComponentChild | ComponentChildren;
  id: string;
  onClick: () => void;
};

const Tab = ({ children, id, onClick }: TabProps): JSX.Element => {
  return (
    <button id={id} aria-controls={`${id}-panel`} onClick={onClick} role="tab">
      {children}
    </button>
  );
};

export default Tab;
