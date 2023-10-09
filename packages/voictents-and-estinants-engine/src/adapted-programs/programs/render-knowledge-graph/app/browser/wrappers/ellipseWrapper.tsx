import React, { SVGProps, FunctionComponent } from 'react';
import { usePresentationContext } from '../presentationContext';

type EllipseWrapperProps = React.PropsWithChildren<SVGProps<SVGEllipseElement>>;

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
