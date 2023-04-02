import * as uuid from 'uuid';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  TYPE_SCRIPT_FILE_GEPP,
  TypeScriptFile,
  TypeScriptFileVoictent,
} from '../../type-script-file/typeScriptFile';
import {
  LocalTypeScriptFileImport,
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImportList,
  TypeScriptFileImportListVoictent,
  TypeScriptFileImportTypeName,
} from '../../type-script-file/typeScriptFileImportList';
import {
  TYPE_SCRIPT_IMPORT_RELATIONSHIP_LIST_GEPP,
  TypeScriptImportRelationshipListVoictent,
} from '../../type-script-file/typeScriptImportRelationshipList';
import {
  IMPORT_RELATIONSHIP_EDGE_GEPP,
  ImportRelationshipEdge,
  ImportRelationshipEdgeOdeshin,
  ImportRelationshipEdgeVoictent,
} from './importRelationshipEdge';
import {
  FILE_NODE_ATTRIBUTE_BY_KEY_GEPP,
  FileNodeAttributeByKey,
  FileNodeAttributeByKeyVoictent,
} from './fileNodeAttributeByKey';
import {
  TYPE_SCRIPT_FILE_INSTANCE_ID_BY_FILE_PATH_GEPP,
  TypeScriptFileInstanceIdByFilePathVoictent,
} from '../typeScriptFileInstanceIdByFilePath';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from '../typeScriptFileRelationshipGraphZorn';

export const getImportRelationshipEdge = buildEstinant(
  'getImportRelationshipEdge',
)
  .fromGrition<TypeScriptFileVoictent>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  .andFromGritionTuple<TypeScriptFileImportListVoictent, [string]>({
    gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
    framate: (leftInput) => [leftInput.zorn],
    croard: (rightInput) => rightInput.zorn,
  })
  .andFromGritionTuple<TypeScriptFileInstanceIdByFilePathVoictent, [string]>({
    gepp: TYPE_SCRIPT_FILE_INSTANCE_ID_BY_FILE_PATH_GEPP,
    framate: () => [TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN],
    croard: (rightInput) => rightInput.zorn,
  })
  // .andFromHubblepupTuple<TypeScriptFileImportListVoictent, [string]>({
  //   gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  //   framate: (leftInput): [string] => [leftInput.zorn],
  //   croard: (rightInput): string => rightInput.zorn,
  // })
  .toHubblepupTuple<ImportRelationshipEdgeVoictent>({
    gepp: IMPORT_RELATIONSHIP_EDGE_GEPP,
  })
  .onPinbe((typeScriptFile, [importList], [fileInstanceIdByFilePath]) => {
    const headId = typeScriptFile.instanceId;

    // const tailList = importList
    //   .filter(
    //     (importedItem): importedItem is LocalTypeScriptFileImport =>
    //       importedItem.typeName === TypeScriptFileImportTypeName.Local,
    //   )
    //   .map((importedItem) => {
    //     const tailId =
    //       fileInstanceIdByFilePath.get(importedItem.filePath) ??
    //       'TAIL_ID_NOT_FOUND';
    //     return tailId;
    //   });

    // const tailSet = new Set(tailList);

    // const edgeList = [...tailSet].map<ImportRelationshipEdge>((tailId) => {
    //   return {
    //     attributeByKey: {
    //       id: `${tailId}:${headId}`,
    //     },
    //     headId,
    //     tailId,
    //   } satisfies ImportRelationshipEdge;
    // });

    const edgeList = importList
      .filter(
        (importedItem): importedItem is LocalTypeScriptFileImport =>
          importedItem.typeName === TypeScriptFileImportTypeName.Local,
      )
      .map<ImportRelationshipEdge>((importedItem) => {
        const tailId =
          fileInstanceIdByFilePath.get(importedItem.filePath) ??
          'TAIL_ID_NOT_FOUND';
        return {
          attributeByKey: {
            id: `${tailId}:${headId}`,
          },
          headId,
          tailId,
        } satisfies ImportRelationshipEdge;
      });

    const outputList = edgeList.map<ImportRelationshipEdgeOdeshin>(
      (edge, index) => {
        return {
          zorn: `${typeScriptFile.filePath}/${index}`,
          grition: edge,
        };
      },
    );

    return outputList;
  })
  .assemble();

// .onPinbe((typeScriptFile, [importList], [fileInstanceIdByFilePath]) => {
//   const headId = typeScriptFile.instanceId;

//   const tailIdList = importList
//     .filter(
//       (importedItem): importedItem is LocalTypeScriptFileImport =>
//         importedItem.typeName === TypeScriptFileImportTypeName.Local,
//     )
//     .map((importedItem) => {
//       const tailId = fileInstanceIdByFilePath.get(importedItem.filePath);
//       return tailId;
//     });

//   // TODO: how can we make sure that all tails exist?
//   if (tailIdList.some((tailId) => tailId === undefined)) {
//     return [];
//   }

//   const edgeList = tailIdList.map((tailId) => {
//     return {
//       attributeByKey: {
//         id: uuid.v4(),
//       },
//       headId,
//       tailId: tailId as string,
//     } satisfies ImportRelationshipEdge;
//   });

//   const outputList = edgeList.map<ImportRelationshipEdgeOdeshin>(
//     (edge, index) => {
//       return {
//         zorn: `${typeScriptFile.filePath}/${index}`,
//         grition: edge,
//       };
//     },
//   );

//   return outputList;
// })
