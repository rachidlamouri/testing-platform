import React, { SVGProps, FunctionComponent } from 'react';
import { usePresentationContext } from '../presentationContext';

export type PolygonWrapperProps = React.PropsWithChildren<
  SVGProps<SVGPolygonElement>
>;

export const PolygonWrapper: FunctionComponent<PolygonWrapperProps> = (
  props,
) => {
  const presentationContext = usePresentationContext();

  const combinedProps = {
    ...props,
    ...presentationContext,
  };

  return <polygon {...combinedProps} />;
};
