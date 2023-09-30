import { buildEstinant } from '../../../../adapter/estinant-builder/buildEstinant';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from '../typeScriptFileRelationshipGraphZorn';
import {
  EXTERNAL_MODULE_METADATA_GEPP,
  ExternalModuleMetadataVoque,
} from './externalModuleMetadata';
import {
  EXTERNAL_MODULE_METADATA_BY_SOURCE_PATH_GEPP,
  ExternalModuleMetadataBySourcePath,
  ExternalModuleMetadataBySourcePathVoque,
} from './externalModuleMetadataBySourcePath';

/**
 * Consumes the entire ExternalModuleMetadata collection in order to index
 * ExternalModuleMetadata items by their source path. This facilitates finding
 * directed graph edges between second party TypeScript files and first or third
 * party TypeScript modules.
 */
export const getExternalModuleMetadataBySourcePath = buildEstinant({
  name: 'getExternalModuleMetadataBySourcePath',
})
  .fromVoictent2<ExternalModuleMetadataVoque>({
    gepp: EXTERNAL_MODULE_METADATA_GEPP,
  })
  .toHubblepup2<ExternalModuleMetadataBySourcePathVoque>({
    gepp: EXTERNAL_MODULE_METADATA_BY_SOURCE_PATH_GEPP,
  })
  .onPinbe((externalModuleMetadataList) => {
    const map: ExternalModuleMetadataBySourcePath['grition'] = new Map();

    externalModuleMetadataList.forEach((metadata) => {
      map.set(metadata.sourcePath, metadata);
    });

    return {
      zorn: TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN,
      grition: map,
    };
  })
  .assemble();
