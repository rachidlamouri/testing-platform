import React, { SVGProps, FunctionComponent } from 'react';
import { usePresentationContext } from '../presentationContext';

export type PathWrapperProps = React.PropsWithChildren<
  SVGProps<SVGPathElement>
>;

export const PathWrapper: FunctionComponent<PathWrapperProps> = (props) => {
  const { style } = usePresentationContext();

  const combinedProps = {
    ...props,
    ...style,
  };

  return <path {...combinedProps} />;
};
