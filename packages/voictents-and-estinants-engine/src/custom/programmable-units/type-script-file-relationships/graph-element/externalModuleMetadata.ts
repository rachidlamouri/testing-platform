import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { DirectedGraphNode } from '../../graph-visualization/directed-graph/directedGraphNode';

export type ExternalModuleMetadata = {
  id: string;
  boundaryId: string;
  sourcePath: string;
  attributeByKey: Omit<DirectedGraphNode['attributeByKey'], 'id'>;
};

export type ExternalModuleMetadataGrition = Grition<ExternalModuleMetadata>;

export type ExternalModuleMetadataOdeshin =
  OdeshinFromGrition<ExternalModuleMetadataGrition>;

export const EXTERNAL_MODULE_METADATA_GEPP = 'external-module-metadata';

export type ExternalModuleMetadataGepp = typeof EXTERNAL_MODULE_METADATA_GEPP;

export type ExternalModuleMetadataVoictent = Voictent<
  ExternalModuleMetadataGepp,
  ExternalModuleMetadataOdeshin
>;
