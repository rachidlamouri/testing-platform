import { SetRequired } from 'type-fest';
import { Voictent } from '../../../adapter/voictent';
import { DirectedSubgraph } from '../../graph-visualization/directed-graph/directedGraph';
import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';

export type InternalBoundaryMetadata = {
  zorn: string;
  isInternal: true;
  id: string;
  directoryPath: string;
  attributeByKey: Omit<DirectedSubgraph['attributeByKey'], 'id'>;
};

export type ExternalBoundaryMetadata = {
  zorn: string;
  isInternal: false;
  id: string;
  description: string;
  attributeByKey: SetRequired<
    Omit<DirectedSubgraph['attributeByKey'], 'id'>,
    'label'
  >;
};

export type LimboBoundaryMetadata = {
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

export type BoundaryMetadataGepp = typeof BOUNDARY_METADATA_GEPP;

export type BoundaryMetadataVoictent = Voictent<
  BoundaryMetadataGepp,
  BoundaryMetadata
>;

export type BoundaryMetadataVoque = InMemoryOdeshin2Voque<
  BoundaryMetadataGepp,
  BoundaryMetadata
>;
