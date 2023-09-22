import React, { SVGProps, FunctionComponent, forwardRef } from 'react';
import { usePresentationContext } from '../presentationContext';

export type SvgWrapperProps = React.PropsWithChildren<SVGProps<SVGSVGElement>>;

export const SvgWrapper: FunctionComponent<SvgWrapperProps> =
  forwardRef<SVGSVGElement>((props, ref) => {
    const { style } = usePresentationContext();

    const combinedProps = {
      ...props,
      ...style,
    };

    return <svg ref={ref} {...combinedProps} />;
  });
