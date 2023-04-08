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

export const getImportRelationshipEdge = buildEstinant({
  name: 'getImportRelationshipEdge',
})
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
  .toHubblepupTuple<ImportRelationshipEdgeVoictent>({
    gepp: IMPORT_RELATIONSHIP_EDGE_GEPP,
  })
  .onPinbe((typeScriptFile, [importList], [fileInstanceIdByFilePath]) => {
    const headId = typeScriptFile.instanceId;

    const edgeList = importList
      .filter((importedItem) => importedItem.isInternal)
      .map<ImportRelationshipEdge>((importedItem) => {
        const tailId =
          fileInstanceIdByFilePath.get(importedItem.sourcePath) ??
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
