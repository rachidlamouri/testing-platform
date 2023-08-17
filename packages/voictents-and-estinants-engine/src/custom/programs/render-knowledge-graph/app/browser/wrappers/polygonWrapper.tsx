import React, { SVGProps, FunctionComponent } from 'react';
import { usePresentationContext } from '../presentationContext';

export type PolygonWrapperProps = React.PropsWithChildren<
  SVGProps<SVGPolygonElement>
>;

export const PolygonWrapper: FunctionComponent<PolygonWrapperProps> = (
  props,
) => {
  const { style } = usePresentationContext();

  const combinedProps = {
    ...props,
    ...style,
  };

  return <polygon {...combinedProps} />;
};
