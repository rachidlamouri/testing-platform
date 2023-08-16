import React, { SVGProps, FunctionComponent } from 'react';
import { usePresentationContext } from '../presentationContext';

export type EllipseWrapperProps = React.PropsWithChildren<
  SVGProps<SVGEllipseElement>
>;

export const EllipseWrapper: FunctionComponent<EllipseWrapperProps> = (
  props,
) => {
  const presentationContext = usePresentationContext();

  const combinedProps = {
    ...props,
    ...presentationContext,
  };

  return <ellipse {...combinedProps} />;
};
