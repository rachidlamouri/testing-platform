import React, { SVGProps, FunctionComponent } from 'react';
import { usePresentationContext } from '../presentationContext';

type PolygonWrapperProps = React.PropsWithChildren<SVGProps<SVGPolygonElement>>;

/**
 * Wraps an svg polygon component in order to receive styles from, and propagate
 * events to, its parent concept component.
 */
export const PolygonWrapper: FunctionComponent<PolygonWrapperProps> = (
  props,
) => {
  const { style, styleByElement } = usePresentationContext();

  const combinedProps = {
    ...props,
    ...style,
    ...styleByElement.polygon,
  };

  return <polygon {...combinedProps} />;
};
