import { buildEstinant } from '../../../../adapter/estinant-builder/estinantBuilder';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from '../typeScriptFileRelationshipGraphZorn';
import {
  FILE_NODE_METADATA_GEPP,
  FileNodeMetadataVoque,
} from './fileNodeMetadata';
import {
  FILE_NODE_METADATA_BY_FILE_PATH_GEPP,
  FileNodeMetadataByFilePath,
  FileNodeMetadataByFilePathVoque,
} from './fileNodeMetadataByFilePath';

/**
 * Consumes the entire FileNodeMetadata collection in order to index
 * FileNodeMetadata items by their file path. This facilitates finding directed
 * graph edges between TypeScript files.
 */
export const getFileNodeMetadataByFilePath = buildEstinant({
  name: 'getFileNodeMetadataByFilePath',
})
  .fromVoictent2<FileNodeMetadataVoque>({
    gepp: FILE_NODE_METADATA_GEPP,
  })
  .toHubblepup2<FileNodeMetadataByFilePathVoque>({
    gepp: FILE_NODE_METADATA_BY_FILE_PATH_GEPP,
  })
  .onPinbe((fileMetdataList) => {
    const metdataById: FileNodeMetadataByFilePath['grition'] = new Map();

    fileMetdataList.forEach((fileMetdata) => {
      metdataById.set(fileMetdata.filePath, fileMetdata);
    });

    return {
      zorn: TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN,
      grition: metdataById,
    };
  })
  .assemble();
