import React, { SVGProps, FunctionComponent, useState } from 'react';
import { usePresentationContext } from '../presentationContext';

export type TextWrapperProps = React.PropsWithChildren<
  SVGProps<SVGTextElement>
>;

export const TextWrapper: FunctionComponent<TextWrapperProps> = (props) => {
  const { style, onTextClicked, hasInteractiveText } = usePresentationContext();
  const [isHovering, setIsHovering] = useState(false);

  const combinedProps: TextWrapperProps = {
    ...props,
    ...style,
    cursor: hasInteractiveText ? 'pointer' : 'inherit',
    textDecoration: isHovering && hasInteractiveText ? 'underline' : undefined,
    onClick: (): void => {
      onTextClicked();
    },
    onMouseEnter: () => {
      setIsHovering(true);
    },
    onMouseLeave: () => {
      setIsHovering(false);
    },
  };

  return <text {...combinedProps} />;
};
