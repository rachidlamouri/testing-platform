import React from 'react';

export type GeneratedComponent = React.FunctionComponent<{
  ref: React.ForwardedRef<SVGSVGElement>;
}>;

export type GeneratedItem = {
  Component: GeneratedComponent;
  label: string;
};

export type GeneratedCollection = GeneratedItem[];
