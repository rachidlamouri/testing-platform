import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../../adapter/voictent';
import { DirectedGraphNode } from '../../graph-visualization/directed-graph/directedGraphNode';

/**
 * Information needed to add an external module to a directed graph in the
 * knowledge graph
 */
export type ExternalModuleMetadata = {
  zorn: string;
  id: string;
  boundaryId: string;
  sourcePath: string;
  attributeByKey: Omit<DirectedGraphNode['attributeByKey'], 'id'>;
};

export const EXTERNAL_MODULE_METADATA_GEPP = 'external-module-metadata';

export type ExternalModuleMetadataGepp = typeof EXTERNAL_MODULE_METADATA_GEPP;

export type ExternalModuleMetadataVoictent = Voictent<
  ExternalModuleMetadataGepp,
  ExternalModuleMetadata
>;

export type ExternalModuleMetadataVoque = InMemoryOdeshin2Voque<
  ExternalModuleMetadataGepp,
  ExternalModuleMetadata
>;
