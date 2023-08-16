import React, { SVGProps, FunctionComponent } from 'react';
import { usePresentationContext } from '../presentationContext';

export type GroupWrapperProps = React.PropsWithChildren<SVGProps<SVGGElement>>;

export const GroupWrapper: FunctionComponent<GroupWrapperProps> = (props) => {
  const presentationContext = usePresentationContext();

  const combinedProps = {
    ...props,
    ...presentationContext,
  };

  return <g {...combinedProps} />;
};
