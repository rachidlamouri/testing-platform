import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../../adapter/voictent';
import { DirectedGraph } from '../../graph-visualization/directed-graph/directedGraph';
import { InitialEdgeMetadata } from './initialEdgeMetadataList';

export type RootMetadata = {
  zorn: string;
  id: string;
  boundaryId: string;
  relevantBoundaryIdSet: Set<string>;
  importedBoundaryIdSet: Set<string>;
  edgeMetadataList: InitialEdgeMetadata[];
  attributeByKey: Omit<DirectedGraph['attributeByKey'], 'id'>;
};

export const ROOT_METADATA_GEPP = 'root-metadata';

export type RootMetadataGepp = typeof ROOT_METADATA_GEPP;

export type RootMetadataVoictent = Voictent<RootMetadataGepp, RootMetadata>;

export type RootMetadataVoque = InMemoryOdeshin2Voque<
  RootMetadataGepp,
  RootMetadata
>;
