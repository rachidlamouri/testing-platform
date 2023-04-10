import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { DirectedGraph } from '../../graph-visualization/directed-graph/directedGraph';
import { InitialEdgeMetadata } from './initialEdgeMetadataList';

export type RootMetadata = {
  id: string;
  boundaryId: string;
  relevantBoundaryIdSet: Set<string>;
  edgeMetadataList: InitialEdgeMetadata[];
  attributeByKey: Omit<DirectedGraph['attributeByKey'], 'id'>;
};

export type RootMetadataGrition = Grition<RootMetadata>;

export type RootMetadataOdeshin = OdeshinFromGrition<RootMetadataGrition>;

export const ROOT_METADATA_GEPP = 'root-metadata';

export type RootMetadataGepp = typeof ROOT_METADATA_GEPP;

export type RootMetadataVoictent = Voictent<
  RootMetadataGepp,
  RootMetadataOdeshin
>;
