import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  TypeScriptImportRelationship,
  TypeScriptImportRelationshipListVoictent,
  TYPE_SCRIPT_IMPORT_RELATIONSHIP_LIST_GEPP,
} from '../type-script-file/typeScriptImportRelationshipList';
import {
  TypeScriptFileVoictent,
  TYPE_SCRIPT_FILE_GEPP,
} from '../type-script-file/typeScriptFile';
import {
  TypeScriptFileImportListVoictent,
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImportTypeName,
  getSourcePath,
} from '../type-script-file/typeScriptFileImportList';

export const getTypeScriptImportRelationshipListForFile = buildEstinant()
  .fromGrition<TypeScriptFileVoictent>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  // TODO: change to "andFromGritionTuple"
  .andFromHubblepupTuple<TypeScriptFileImportListVoictent, [string]>({
    gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
    framate: (leftInput): [string] => [leftInput.zorn],
    croard: (rightInput): string => rightInput.zorn,
  })
  .toGrition<TypeScriptImportRelationshipListVoictent>({
    gepp: TYPE_SCRIPT_IMPORT_RELATIONSHIP_LIST_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((typeScriptFile, [{ grition: importList }]) => {
    const relationshipList = importList.map<TypeScriptImportRelationship>(
      (importedItem) => {
        return {
          importer: {
            isInternal: true,
            modulePath: typeScriptFile.filePath,
          },
          importee: {
            isInternal:
              importedItem.typeName === TypeScriptFileImportTypeName.Local,
            modulePath: getSourcePath(importedItem),
          },
        };
      },
    );

    return relationshipList;
  })
  .assemble();
