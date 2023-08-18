import { createContext, useContext } from 'react';

export type PresentationCtx = {
  style?: {
    // TODO: use or remove these
    fill?: string;
    stroke?: string;
  };
  onTextClicked: () => void;
  hasInteractiveText: boolean;
};

export const PresentationContext = createContext<PresentationCtx>({
  onTextClicked: () => {},
  hasInteractiveText: false,
});

export const usePresentationContext = (): PresentationCtx => {
  const context = useContext(PresentationContext);
  return context;
};
