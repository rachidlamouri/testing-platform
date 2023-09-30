/**
 * Types that render-knowledge-graph uses for generating data, and that the
 * knowledge graph app uses when presenting the generated data.
 *
 * @noCanonicalDeclaration
 * @todo this file should probably be broken up or renamed
 */

import React from 'react';
import { BoundaryTypeName } from '../../boundary/boundaryTypeName';

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
  boundaryTypeName: BoundaryTypeName;
  boundaryId: string;
  label: string;
  Component: SvgWrapperComponent;
};

export type NavigationLayer = {
  label: string;
  partitionList: NavigationPartition[];
};

type PartitionByBoundaryId = Map<string, NavigationPartition>;

export type GeneratedIndex = {
  navigationList: NavigationLayer[];
  partitionByBoundaryId: PartitionByBoundaryId;
};
