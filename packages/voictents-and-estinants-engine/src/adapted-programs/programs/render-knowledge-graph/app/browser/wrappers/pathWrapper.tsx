import React, { SVGProps, FunctionComponent } from 'react';
import { usePresentationContext } from '../presentationContext';

type PathWrapperProps = React.PropsWithChildren<SVGProps<SVGPathElement>>;

/**
 * Wraps an svg path component in order to receive styles from, and propagate
 * events to, its parent concept component.
 */
export const PathWrapper: FunctionComponent<PathWrapperProps> = (props) => {
  const { style, styleByElement } = usePresentationContext();

  const combinedProps = {
    ...props,
    ...style,
    ...styleByElement.path,
  };

  return <path {...combinedProps} />;
};
