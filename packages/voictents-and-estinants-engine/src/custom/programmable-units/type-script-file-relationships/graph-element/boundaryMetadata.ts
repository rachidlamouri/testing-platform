import { SetRequired } from 'type-fest';
import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { DirectedSubgraph } from '../../graph-visualization/directed-graph/directedSubgraph';

type InternalBoundaryMetadata = {
  zorn: string;
  isInternal: true;
  id: string;
  directoryPath: string;
  attributeByKey: Omit<DirectedSubgraph['attributeByKey'], 'id'>;
};

type ExternalBoundaryMetadata = {
  zorn: string;
  isInternal: false;
  id: string;
  description: string;
  attributeByKey: SetRequired<
    Omit<DirectedSubgraph['attributeByKey'], 'id'>,
    'label'
  >;
};

type LimboBoundaryMetadata = {
  zorn: string;
  isInternal: null;
  id: string;
  description: string;
  attributeByKey: SetRequired<
    Omit<DirectedSubgraph['attributeByKey'], 'id'>,
    'label'
  >;
};

/**
 * Represents an arbitrary grouping of files. This is used to organize the
 * knowledge graph
 */
export type BoundaryMetadata =
  | InternalBoundaryMetadata
  | ExternalBoundaryMetadata
  | LimboBoundaryMetadata;

export const BOUNDARY_METADATA_GEPP = 'boundary-metadata';

type BoundaryMetadataGepp = typeof BOUNDARY_METADATA_GEPP;

export type BoundaryMetadataVoque = InMemoryOdeshin2Voque<
  BoundaryMetadataGepp,
  BoundaryMetadata
>;
