import { createContext, useContext } from 'react';

type ElementStyle = {
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
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
  onTextClicked: () => void;
  onTextHoverChange?: (isHovered: boolean) => void;
  hasInteractiveText: boolean;
};

/**
 * A React context object that allows a custom knowledge graph concept component
 * (eg. FileFact, DirectoryFact) to control, and to receive events from, its
 * nested svg wrapper subcomponents.
 */
export const PresentationContext = createContext<ProvidedPresentationContext>({
  onTextClicked: () => {},
  onTextHoverChange: () => {},
  hasInteractiveText: false,
});

type ConsumedPresentationContext = {
  style: ElementStyle;
  styleByElement: {
    group?: ElementStyle;
    path: ElementStyle;
    polygon: ElementStyle;
    ellipse: ElementStyle;
    text: ElementStyle;
  };
  onTextClicked: () => void;
  onTextHoverChange?: (isHovered: boolean) => void;
  hasInteractiveText: boolean;
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
