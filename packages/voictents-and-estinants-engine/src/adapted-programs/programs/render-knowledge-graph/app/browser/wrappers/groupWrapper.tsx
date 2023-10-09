import React, { SVGProps, FunctionComponent } from 'react';
import { usePresentationContext } from '../presentationContext';

type GroupWrapperProps = React.PropsWithChildren<SVGProps<SVGGElement>>;

export const GroupWrapper: FunctionComponent<GroupWrapperProps> = (props) => {
  const { style, styleByElement } = usePresentationContext();

  const combinedProps = {
    ...props,
    ...style,
    ...styleByElement.group,
  };

  return <g {...combinedProps} />;
};
