import React, { SVGProps, FunctionComponent, forwardRef } from 'react';
import { usePresentationContext } from '../presentationContext';

type SvgWrapperProps = React.PropsWithChildren<SVGProps<SVGSVGElement>>;

/**
 * Wraps an svg component in order to receive styles from, and propagate
 * events to, its parent concept component.
 */
export const SvgWrapper: FunctionComponent<SvgWrapperProps> =
  forwardRef<SVGSVGElement>((props, ref) => {
    const { style } = usePresentationContext();

    const combinedProps = {
      ...props,
      ...style,
    };

    return <svg ref={ref} {...combinedProps} />;
  });
