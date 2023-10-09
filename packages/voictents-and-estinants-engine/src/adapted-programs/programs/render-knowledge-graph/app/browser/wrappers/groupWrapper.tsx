import React, { SVGProps, FunctionComponent } from 'react';
import { usePresentationContext } from '../presentationContext';

type GroupWrapperProps = React.PropsWithChildren<SVGProps<SVGGElement>>;

/**
 * Wraps an svg group component in order to receive styles from, and propagate
 * events to, its parent concept component.
 */
export const GroupWrapper: FunctionComponent<GroupWrapperProps> = (props) => {
  const { style, styleByElement } = usePresentationContext();

  const combinedProps = {
    ...props,
    ...style,
    ...styleByElement.group,
  };

  return <g {...combinedProps} />;
};
