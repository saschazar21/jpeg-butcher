import { ComponentChild, ComponentChildren, h, JSX } from 'preact';

export type TabContainerProps = {
  children: ComponentChild | ComponentChildren;
  id: string;
};

const TabContainer = ({ children, id }: TabContainerProps): JSX.Element => {
  return (
    <section id={`${id}-panel`} role="tabpanel">
      {children}
    </section>
  );
};

export default TabContainer;
