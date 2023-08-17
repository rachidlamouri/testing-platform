import { createContext, useContext } from 'react';

export type PresentationCtx = {
  style?: {
    // TODO: use or remove these
    fill?: string;
    stroke?: string;
  };

export const PresentationContext = createContext<PresentationCtx>({});

export const usePresentationContext = (): PresentationCtx => {
  const context = useContext(PresentationContext);
  return context;
};
