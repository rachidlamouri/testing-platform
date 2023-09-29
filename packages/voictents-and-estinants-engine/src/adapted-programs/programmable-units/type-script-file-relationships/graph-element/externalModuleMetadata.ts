import { InMemoryOdeshin2ListVoque } from '../../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
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

type ExternalModuleMetadataGepp = typeof EXTERNAL_MODULE_METADATA_GEPP;

export type ExternalModuleMetadataVoque = InMemoryOdeshin2ListVoque<
  ExternalModuleMetadataGepp,
  ExternalModuleMetadata
>;
