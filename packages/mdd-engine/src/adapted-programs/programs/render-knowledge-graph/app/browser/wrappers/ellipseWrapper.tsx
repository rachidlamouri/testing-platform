import React, { SVGProps, FunctionComponent } from 'react';
import { usePresentationContext } from '../presentationContext';

type EllipseWrapperProps = React.PropsWithChildren<SVGProps<SVGEllipseElement>>;

/**
 * Wraps an svg ellipse component in order to receive styles from, and propagate
 * events to, its parent concept component.
 */
export const EllipseWrapper: FunctionComponent<EllipseWrapperProps> = (
  props,
) => {
  const { style, styleByElement } = usePresentationContext();

  const combinedProps = {
    ...props,
    ...style,
    ...styleByElement.ellipse,
  };

  return <ellipse {...combinedProps} />;
};
