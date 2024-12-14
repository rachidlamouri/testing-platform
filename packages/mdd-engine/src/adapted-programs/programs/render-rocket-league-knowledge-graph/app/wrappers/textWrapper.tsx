import React, {
  SVGProps,
  FunctionComponent,
  useState,
  useEffect,
  useRef,
} from 'react';
import { TextPartition, usePresentationContext } from '../presentationContext';

type SubtextWrapperProps = {
  index: number;
  partition: TextPartition;
  partitionCount: number;
  parentWidth: number;
  baseProps: SVGProps<SVGTextElement>;
};

const SubtextWrapper: FunctionComponent<SubtextWrapperProps> = ({
  index,
  partition,
  partitionCount,
  parentWidth,
  baseProps,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const isInteractive = partition.onTextClicked !== undefined;
  const interactiveProps: SVGProps<SVGTextElement> = {
    cursor: isInteractive ? 'pointer' : 'inherit',
    textDecoration: isHovering && isInteractive ? 'underline' : undefined,
    onClick: (): void => {
      if (partition.onTextClicked) {
        partition.onTextClicked();
      }
    },
    onMouseEnter: () => {
      setIsHovering(true);
    },
    onMouseLeave: () => {
      setIsHovering(false);
    },
  };

  const originalX =
    typeof baseProps.x === 'string'
      ? Number.parseInt(baseProps.x, 10)
      : baseProps.x;

  const centerIndex = Math.floor(partitionCount / 2);
  const vector = index - centerIndex;

  const partitionProps = {
    ...(isInteractive ? interactiveProps : {}),
    ...baseProps,
    ...partition.style,
    x: originalX + vector * parentWidth,
    y: baseProps.y,
  };
  return <text {...partitionProps}>{partition.text}</text>;
};

type TextWrapperProps = React.PropsWithChildren<SVGProps<SVGTextElement>>;

/**
 * Wraps an svg text component in order to receive styles from, and propagate
 * events to, its parent concept component.
 */
export const TextWrapper: FunctionComponent<TextWrapperProps> = (props) => {
  const { children, ...childlessProps } = props;

  const { style, styleByElement, partitionText, onTextClicked } =
    usePresentationContext();

  const [width, setWidth] = useState(0);
  const ref = useRef<SVGGElement | null>(null);
  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.getBBox().width);
    }
  }, [ref]);

  const text = typeof children === 'string' ? children : undefined;
  const isPartitioned = text !== undefined && partitionText !== undefined;

  const partitionedText: TextPartition[] = isPartitioned
    ? partitionText(text)
    : [
        {
          text,
          style: {
            ...style,
            ...styleByElement.text,
          },
          onTextClicked,
        },
      ];

  return (
    <g ref={ref}>
      {partitionedText.map((partition, index) => {
        return (
          <SubtextWrapper
            key={index}
            partition={partition}
            partitionCount={partitionedText.length}
            index={index}
            baseProps={childlessProps}
            parentWidth={width}
          />
        );
      })}
    </g>
  );
};
