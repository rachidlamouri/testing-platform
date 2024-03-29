import React, { SVGProps, FunctionComponent, useState, useEffect } from 'react';
import { usePresentationContext } from '../presentationContext';

type TextWrapperProps = React.PropsWithChildren<SVGProps<SVGTextElement>>;

/**
 * Wraps an svg text component in order to receive styles from, and propagate
 * events to, its parent concept component.
 */
export const TextWrapper: FunctionComponent<TextWrapperProps> = (props) => {
  const {
    style,
    styleByElement,
    onTextClicked,
    onTextHoverChange,
    hasInteractiveText,
  } = usePresentationContext();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (onTextHoverChange) {
      onTextHoverChange(isHovering);
    }
  }, [isHovering, onTextHoverChange]);

  const combinedProps: TextWrapperProps = {
    ...props,
    ...style,
    ...styleByElement.text,
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
