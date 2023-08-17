import React, { SVGProps, FunctionComponent } from 'react';
import { usePresentationContext } from '../presentationContext';

export type TextWrapperProps = React.PropsWithChildren<
  SVGProps<SVGTextElement>
>;

export const TextWrapper: FunctionComponent<TextWrapperProps> = (props) => {
  const { style } = usePresentationContext();

  const combinedProps = {
    ...props,
    ...style,
  };

  return <text {...combinedProps} />;
};
