import React, { SVGProps, FunctionComponent } from 'react';
import { usePresentationContext } from '../presentationContext';

export type PathWrapperProps = React.PropsWithChildren<
  SVGProps<SVGPathElement>
>;

export const PathWrapper: FunctionComponent<PathWrapperProps> = (props) => {
  const { style, styleByElement } = usePresentationContext();

  const combinedProps = {
    ...props,
    ...style,
    ...styleByElement.path,
  };

  return <path {...combinedProps} />;
};
