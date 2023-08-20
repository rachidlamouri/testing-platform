import React from 'react';

export type SvgWrapperComponent = React.FunctionComponent<{
  ref: React.ForwardedRef<SVGSVGElement>;
}>;

export type SvgWrapperComponentMetadata = {
  Component: SvgWrapperComponent;
  label: string;
};

export type SvgWrapperComponentMetadataList = SvgWrapperComponentMetadata[];

export type MetadataField = {
  label: string;
  value: string;
};

export type Metadata = {
  id: string;
  title: string;
  fileSystemPath: string;
  fieldList: MetadataField[];
};

export type MetadataById = Record<string, Metadata>;
