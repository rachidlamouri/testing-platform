import { createContext, useContext } from 'react';

export type ElementStyle = {
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
  fontSize?: number;
  opacity?: number;
};

type ProvidedPresentationContext = {
  style?: {
    // TODO: use or remove these
    fill?: string;
    stroke?: string;
  };
  styleByElement?: {
    group?: ElementStyle;
    path?: ElementStyle;
    polygon?: ElementStyle;
    ellipse?: ElementStyle;
    text?: ElementStyle;
  };
  onTextClicked?: () => void;
  onTextHoverChange?: (isHovered: boolean) => void;
  partitionText?: (text: string) => TextPartition[];
};

/**
 * A React context object that allows a custom knowledge graph concept component
 * (eg. FileFact, DirectoryFact) to control, and to receive events from, its
 * nested svg wrapper subcomponents.
 */
export const PresentationContext = createContext<ProvidedPresentationContext>({
  onTextHoverChange: () => {},
});

export type TextPartition = {
  text: string;
  style: ElementStyle;
  onTextClicked?: () => void;
};

type ConsumedPresentationContext = {
  style: ElementStyle;
  styleByElement: {
    group?: ElementStyle;
    path: ElementStyle;
    polygon: ElementStyle;
    ellipse: ElementStyle;
    text: ElementStyle;
  };
  onTextClicked?: () => void;
  onTextHoverChange?: (isHovered: boolean) => void;
  partitionText?: (text: string) => TextPartition[];
};

export const usePresentationContext = (): ConsumedPresentationContext => {
  const {
    style = {},
    styleByElement: {
      path: pathStyle = {},
      polygon: polygonStyle = {},
      ellipse: ellipseStyle = {},
      text: textStyle = {},
    } = {},
    ...nonObjectProperties
  } = useContext(PresentationContext);

  return {
    style,
    styleByElement: {
      path: pathStyle,
      polygon: polygonStyle,
      ellipse: ellipseStyle,
      text: textStyle,
    },
    ...nonObjectProperties,
  };
};
