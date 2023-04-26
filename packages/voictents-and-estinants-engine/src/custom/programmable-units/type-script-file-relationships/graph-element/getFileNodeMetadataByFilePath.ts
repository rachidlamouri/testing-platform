import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from '../typeScriptFileRelationshipGraphZorn';
import {
  FILE_NODE_METADATA_GEPP,
  FileNodeMetadataVoictent,
} from './fileNodeMetadata';
import {
  FILE_NODE_METADATA_BY_FILE_PATH_GEPP,
  FileNodeMetadataByFilePath,
  FileNodeMetadataByFilePathVoictent,
} from './fileNodeMetadataByFilePath';

/**
 * Consumes the entire FileNodeMetadata collection in order to index
 * FileNodeMetadata items by their file path. This facilitates finding directed
 * graph edges between TypeScript files.
 */
export const getFileNodeMetadataByFilePath = buildEstinant({
  name: 'getFileNodeMetadataByFilePath',
})
  .fromOdeshinVoictent<FileNodeMetadataVoictent>({
    gepp: FILE_NODE_METADATA_GEPP,
  })
  .toGrition<FileNodeMetadataByFilePathVoictent>({
    gepp: FILE_NODE_METADATA_BY_FILE_PATH_GEPP,
    getZorn: () => TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN,
  })
  .onPinbe((fileMetdataList) => {
    const metdataById: FileNodeMetadataByFilePath = new Map();

    fileMetdataList.forEach((fileMetdata) => {
      metdataById.set(fileMetdata.filePath, fileMetdata);
    });

    return metdataById;
  })
  .assemble();
