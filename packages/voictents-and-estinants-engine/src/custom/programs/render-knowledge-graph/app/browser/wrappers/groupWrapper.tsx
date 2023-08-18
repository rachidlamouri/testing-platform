import React, { SVGProps, FunctionComponent } from 'react';
import { usePresentationContext } from '../presentationContext';

export type GroupWrapperProps = React.PropsWithChildren<SVGProps<SVGGElement>>;

export const GroupWrapper: FunctionComponent<GroupWrapperProps> = (props) => {
  const { style } = usePresentationContext();

  const combinedProps = {
    ...props,
    ...style,
  };

  return <g {...combinedProps} />;
};
