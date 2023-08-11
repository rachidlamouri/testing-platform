import React from 'react';

export type SvgWrapperComponent = React.FunctionComponent<{
  ref: React.ForwardedRef<SVGSVGElement>;
}>;

export type SvgWrapperComponentMetadata = {
  Component: SvgWrapperComponent;
  label: string;
};

export type SvgWrapperComponentMetadataList = SvgWrapperComponentMetadata[];
