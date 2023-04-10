import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from '../typeScriptFileRelationshipGraphZorn';
import {
  EXTERNAL_MODULE_METADATA_GEPP,
  ExternalModuleMetadataVoictent,
} from './externalModuleMetadata';
import {
  EXTERNAL_MODULE_METADATA_BY_SOURCE_PATH_GEPP,
  ExternalModuleMetadataBySourcePath,
  ExternalModuleMetadataBySourcePathVoictent,
} from './externalModuleMetadataBySourcePath';

export const getExternalModuleMetadataBySourcePath = buildEstinant({
  name: 'getExternalModuleMetadataBySourcePath',
})
  .fromOdeshinVoictent<ExternalModuleMetadataVoictent>({
    gepp: EXTERNAL_MODULE_METADATA_GEPP,
  })
  .toGrition<ExternalModuleMetadataBySourcePathVoictent>({
    gepp: EXTERNAL_MODULE_METADATA_BY_SOURCE_PATH_GEPP,
    getZorn: () => TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN,
  })
  .onPinbe((externalModuleMetadataList) => {
    const map: ExternalModuleMetadataBySourcePath = new Map();

    externalModuleMetadataList.forEach((metadata) => {
      map.set(metadata.sourcePath, metadata);
    });

    return map;
  })
  .assemble();
