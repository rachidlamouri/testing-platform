import React from 'react';

export type SvgWrapperComponent = React.FunctionComponent<{
  ref: React.ForwardedRef<SVGSVGElement>;
}>;

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

export type NavigationPartition = {
  boundaryId: string;
  label: string;
  Component: SvgWrapperComponent;
};

export type NavigationLayer = {
  label: string;
  partitionList: NavigationPartition[];
};

export type PartitionByBoundaryId = Map<string, NavigationPartition>;

export type GeneratedIndex = {
  navigationList: NavigationLayer[];
  partitionByBoundaryId: PartitionByBoundaryId;
};
