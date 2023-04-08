import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  TYPE_SCRIPT_FILE_GEPP,
  TypeScriptFileVoictent,
} from '../../type-script-file/typeScriptFile';
import {
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImportListVoictent,
} from '../../type-script-file/typeScriptFileImportList';
import {
  IMPORT_RELATIONSHIP_EDGE_GEPP,
  ImportRelationshipEdge,
  ImportRelationshipEdgeOdeshin,
  ImportRelationshipEdgeVoictent,
} from './importRelationshipEdge';
import {
  TYPE_SCRIPT_FILE_INSTANCE_ID_BY_FILE_PATH_GEPP,
  TypeScriptFileInstanceIdByFilePathVoictent,
} from '../typeScriptFileInstanceIdByFilePath';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from '../typeScriptFileRelationshipGraphZorn';
import {
  EXTERNAL_MODULE_INSTANCE_ID_BY_SOURCE_PATH_GEPP,
  ExternalModuleInstanceIdBySourcePathVoictent,
} from '../externalModuleInstanceIdBySourcePath';
import { ERROR_GEPP, ErrorOdeshin, ErrorVoictent } from '../../error/error';
import {
  BOUNDARY_METADATA_GEPP,
  BoundaryMetadataVoictent,
} from './boundaryMetadata';
import { FileMetadata } from '../../file/getFileMetadata';
import {
  FILE_NODE_METADATA_GEPP,
  FileNodeMetadataVoictent,
} from './fileNodeMetadata';
import {
  FILE_NODE_METADATA_BY_FILE_PATH_GEPP,
  FileNodeMetadataByFilePath,
  FileNodeMetadataByFilePathVoictent,
} from './fileNodeMetadataByFilePath';

// export const getImportRelationshipEdge = buildEstinant({
//   name: 'getImportRelationshipEdge',
// })
//   .fromHubblepup<TypeScriptFileVoictent>({
//     gepp: TYPE_SCRIPT_FILE_GEPP,
//   })
//   .andFromGritionTuple<TypeScriptFileImportListVoictent, [string]>({
//     gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
//     framate: (leftInput) => [leftInput.zorn],
//     croard: (rightInput) => rightInput.zorn,
//   })
//   .andFromGritionTuple<TypeScriptFileInstanceIdByFilePathVoictent, [string]>({
//     gepp: TYPE_SCRIPT_FILE_INSTANCE_ID_BY_FILE_PATH_GEPP,
//     framate: () => [TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN],
//     croard: (rightInput) => rightInput.zorn,
//   })
//   .andFromGritionTuple<ExternalModuleInstanceIdBySourcePathVoictent, [string]>({
//     gepp: EXTERNAL_MODULE_INSTANCE_ID_BY_SOURCE_PATH_GEPP,
//     framate: () => [TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN],
//     croard: (rightInput) => rightInput.zorn,
//   })
//   .toHubblepupTuple<ErrorVoictent>({
//     gepp: ERROR_GEPP,
//   })
//   .toHubblepupTuple<ImportRelationshipEdgeVoictent>({
//     gepp: IMPORT_RELATIONSHIP_EDGE_GEPP,
//   })
//   .onPinbe(
//     (
//       leftInput,
//       [importList],
//       [fileInstanceIdByFilePath],
//       [externalModuleinstanceIdBySourcePath],
//     ) => {
//       const typeScriptFile = leftInput.grition;
//       const headId = typeScriptFile.instanceId;

//       const errorList: ErrorOdeshin[] = [];
//       const edgeList: ImportRelationshipEdge[] = [];

//       importList.forEach((importedItem) => {
//         let tailId: string | null = null;

//         if (importedItem.isInternal) {
//           tailId =
//             fileInstanceIdByFilePath.get(importedItem.sourcePath) ?? null;
//         } else {
//           tailId =
//             externalModuleinstanceIdBySourcePath.get(importedItem.sourcePath) ??
//             null;
//         }

//         if (tailId === null) {
//           errorList.push({
//             zorn: `getImportRelationshipEdge/${leftInput.zorn}`,
//             grition: {
//               filePath: typeScriptFile.filePath,
//               importedItem,
//             },
//           });
//           return;
//         }

//         edgeList.push({
//           attributeByKey: {
//             id: `${tailId}:${headId}`,
//           },
//           headId,
//           tailId,
//         });
//       });

//       const outputList = edgeList.map<ImportRelationshipEdgeOdeshin>(
//         (edge, index) => {
//           return {
//             zorn: `${typeScriptFile.filePath}/${index}`,
//             grition: edge,
//           };
//         },
//       );

//       return {
//         [ERROR_GEPP]: errorList,
//         [IMPORT_RELATIONSHIP_EDGE_GEPP]: outputList,
//       };
//     },
//   )
//   .assemble();

// import {
//   BOUNDARY_CONFIGURATION_GEPP,
//   BoundaryConfigurationVoictent,
// } from '../boundaryConfiguration';
// import { EXTERNAL_BOUNDARY_SUBGRAPH_ATTRIBUTE_BY_KEY } from './externalBoundarySubgraph';

export const getImportRelationshipEdge = buildEstinant({
  name: 'getImportRelationshipEdge',
})
  .fromHubblepup<TypeScriptFileVoictent>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  .andFromGritionTuple<FileNodeMetadataVoictent, [string]>({
    gepp: FILE_NODE_METADATA_GEPP,
    framate: (leftInput) => [leftInput.zorn],
    croard: (rightInput) => rightInput.zorn,
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
  .andFromGritionTuple<ExternalModuleInstanceIdBySourcePathVoictent, [string]>({
    gepp: EXTERNAL_MODULE_INSTANCE_ID_BY_SOURCE_PATH_GEPP,
    framate: () => [TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN],
    croard: (rightInput) => rightInput.zorn,
  })
  .andFromGritionTuple<BoundaryMetadataVoictent, [string]>({
    gepp: BOUNDARY_METADATA_GEPP,
    framate: () => ['external'],
    croard: (rightInput) => rightInput.zorn,
  })
  .toHubblepupTuple<ErrorVoictent>({
    gepp: ERROR_GEPP,
  })
  .toHubblepupTuple<ImportRelationshipEdgeVoictent>({
    gepp: IMPORT_RELATIONSHIP_EDGE_GEPP,
  })
  .onPinbe(
    (
      { zorn: leftInputZorn, grition: typeScriptFile },
      [fileNodeMetadata],
      [importList],
      [fileNodeMetadataByFilePath],
      [externalModuleinstanceIdBySourcePath],
      [externalBoundary],
    ) => {
      const headId = typeScriptFile.instanceId;
      const headBoundaryId = fileNodeMetadata.boundaryId;

      const errorList: ErrorOdeshin[] = [];
      const edgeList: ImportRelationshipEdge[] = [];

      importList
        .filter((importedItem) => {
          let tailBoundaryId: string | undefined;

          if (importedItem.isInternal) {
            tailBoundaryId = fileNodeMetadataByFilePath.get(
              importedItem.sourcePath,
            )?.boundaryId;
          } else {
            tailBoundaryId = externalBoundary.id;
          }

          if (tailBoundaryId === undefined) {
            throw Error('Whoopsie');
          }

          return headBoundaryId === tailBoundaryId;
        })
        .forEach((importedItem) => {
          let tailId: string | null = null;

          if (importedItem.isInternal) {
            tailId =
              fileNodeMetadataByFilePath.get(importedItem.sourcePath)?.id ??
              null;
          } else {
            tailId =
              externalModuleinstanceIdBySourcePath.get(
                importedItem.sourcePath,
              ) ?? null;
          }

          if (tailId === null) {
            errorList.push({
              zorn: `getImportRelationshipEdge/${leftInputZorn}`,
              grition: {
                filePath: typeScriptFile.filePath,
                importedItem,
              },
            });
            return;
          }

          edgeList.push({
            attributeByKey: {
              id: `${tailId}:${headId}`,
            },
            headId,
            tailId,
          });
        });

      const outputList = edgeList.map<ImportRelationshipEdgeOdeshin>(
        (edge, index) => {
          return {
            zorn: `${typeScriptFile.filePath}/${index}`,
            grition: edge,
          };
        },
      );

      return {
        [ERROR_GEPP]: errorList,
        [IMPORT_RELATIONSHIP_EDGE_GEPP]: outputList,
      };
    },
  )
  .assemble();
