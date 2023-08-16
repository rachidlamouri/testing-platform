import React, { SVGProps, FunctionComponent, forwardRef } from 'react';
import { usePresentationContext } from '../presentationContext';

export type SvgWrapperProps = React.PropsWithChildren<SVGProps<SVGSVGElement>>;

export const SvgWrapper: FunctionComponent<SvgWrapperProps> =
  forwardRef<SVGSVGElement>((props, ref) => {
    const presentationContext = usePresentationContext();

    const combinedProps = {
      ...props,
      ...presentationContext,
    };

    return <svg ref={ref} {...combinedProps} />;
  });
