import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImportListVoictent,
} from '../../type-script-file/typeScriptFileImportList';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from '../typeScriptFileRelationshipGraphZorn';
import {
  PROGRAM_ERROR_GEPP,
  ErrorLocatorTypeName,
  ProgramErrorOdeshin,
  ProgramErrorVoictent,
} from '../../error/programError';
import {
  INITIAL_EDGE_METADATA_LIST_GEPP,
  InitialEdgeMetadataList,
  InitialEdgeMetadataListVoictent,
} from './initialEdgeMetadataList';
import {
  FILE_NODE_METADATA_GEPP,
  FileNodeMetadataVoictent,
} from './fileNodeMetadata';
import {
  EXTERNAL_MODULE_METADATA_BY_SOURCE_PATH_GEPP,
  ExternalModuleMetadataBySourcePathVoictent,
} from './externalModuleMetadataBySourcePath';
import {
  FILE_NODE_METADATA_BY_FILE_PATH_GEPP,
  FileNodeMetadataByFilePathVoictent,
} from './fileNodeMetadataByFilePath';

/**
 * Converts TypeScript file import statements into directed graph edge metadata.
 */
export const getInitialEdgeMetadata = buildEstinant({
  name: 'getInitialEdgeMetadata',
})
  .fromHubblepup<FileNodeMetadataVoictent>({
    gepp: FILE_NODE_METADATA_GEPP,
  })
  .andFromGritionTuple<TypeScriptFileImportListVoictent, [string]>({
    gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
    framate: (leftInput) => [leftInput.zorn],
    croard: (rightInput) => rightInput.zorn,
  })
  .andFromGritionTuple<FileNodeMetadataByFilePathVoictent, [string]>({
    gepp: FILE_NODE_METADATA_BY_FILE_PATH_GEPP,
    framate: () => [TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN],
    croard: (rightInput) => rightInput.zorn,
  })
  .andFromGritionTuple<ExternalModuleMetadataBySourcePathVoictent, [string]>({
    gepp: EXTERNAL_MODULE_METADATA_BY_SOURCE_PATH_GEPP,
    framate: () => [TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN],
    croard: (rightInput) => rightInput.zorn,
  })
  .toHubblepup<InitialEdgeMetadataListVoictent>({
    gepp: INITIAL_EDGE_METADATA_LIST_GEPP,
  })
  .toHubblepupTuple<ProgramErrorVoictent>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe(
    (
      leftInput,
      [importList],
      [fileNodeMetadataByFilePath],
      [externalModuleMetadataIdBySourcePath],
    ) => {
      const fileNodeMetadata = leftInput.grition;

      const errorList: ProgramErrorOdeshin[] = [];
      const edgeMetadataList: InitialEdgeMetadataList = [];

      const headList = importList.map((importedItem) => {
        const headMetadata = importedItem.isInternal
          ? fileNodeMetadataByFilePath.get(importedItem.sourcePath)
          : externalModuleMetadataIdBySourcePath.get(importedItem.sourcePath);

        return {
          headMetadata,
          importedItem,
        };
      });

      headList.forEach(({ headMetadata, importedItem }, index) => {
        if (headMetadata === undefined) {
          errorList.push({
            zorn: `getInitialEdgeMetadata/${leftInput.zorn}/${index}`,
            grition: {
              message: `Unable to find metadata for the imported item "${importedItem.sourcePath}"`,
              locator: {
                typeName: ErrorLocatorTypeName.FileErrorLocator,
                filePath: fileNodeMetadata.filePath,
              },
              metadata: {
                fileNodeMetadata,
                importedItem,
              },
            },
          });
        } else {
          edgeMetadataList.push({
            head: headMetadata,
            tail: fileNodeMetadata,
          });
        }
      });

      return {
        [PROGRAM_ERROR_GEPP]: errorList,
        [INITIAL_EDGE_METADATA_LIST_GEPP]: {
          zorn: leftInput.zorn,
          grition: edgeMetadataList,
        },
      };
    },
  )
  .assemble();
