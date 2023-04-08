import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  TypeScriptFileVoictent,
  TYPE_SCRIPT_FILE_GEPP,
} from '../type-script-file/typeScriptFile';
import {
  TypeScriptFileImportListVoictent,
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
} from '../type-script-file/typeScriptFileImportList';
import {
  TypeScriptFileRelationshipListVoictent,
  TYPE_SCRIPT_FILE_RELATIONSHIP_LIST_GEPP,
  TypeScriptFileRelationship,
} from './typeScriptFileRelationshipList';

export const getTypeScriptFileRelationshipList = buildEstinant()
  .fromGrition<TypeScriptFileVoictent>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  // TODO: change to "andFromOdeshinTuple"
  .andFromHubblepupTuple<TypeScriptFileImportListVoictent, [string]>({
    gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
    framate: (leftInput): [string] => [leftInput.zorn],
    croard: (rightInput): string => rightInput.zorn,
  })
  .toGrition<TypeScriptFileRelationshipListVoictent>({
    gepp: TYPE_SCRIPT_FILE_RELATIONSHIP_LIST_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((typeScriptFile, [{ grition: importList }]) => {
    const relationshipList = importList.map<TypeScriptFileRelationship>(
      (importedItem) => {
        return {
          node: {
            isInternal: true,
            directoryPath: typeScriptFile.directoryPath,
            nodePath: typeScriptFile.filePath,
          },
          importedNode: {
            isInternal: importedItem.isInternal,
            nodePath: importedItem.sourcePath,
          },
        };
      },
    );

    return relationshipList;
  })
  .assemble();
