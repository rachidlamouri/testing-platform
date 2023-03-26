import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import {
  TypeScriptFileVoictent,
  TYPE_SCRIPT_FILE_GEPP,
} from '../type-script-file/typeScriptFile';
import {
  getSourcePath,
  TypeScriptFileImportListVoictent,
  TypeScriptFileImportTypeName,
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
} from '../type-script-file/typeScriptFileImportList';

export type RelationshipNodeMetadata =
  | {
      typeName: TypeScriptFileImportTypeName.Local;
      directoryPath: string;
      nodePath: string;
    }
  | {
      typeName: TypeScriptFileImportTypeName;
      directoryPath?: never;
      nodePath: string;
    };

export const getNodeId = (node: RelationshipNodeMetadata): string =>
  `${node.typeName}:${node.nodePath}`;

export type TypeScriptFileRelationship = {
  node: RelationshipNodeMetadata;
  importedNode: RelationshipNodeMetadata;
};

export type TypeScriptFileRelationshipList = TypeScriptFileRelationship[];

export type TypeScriptFileRelationshipListGrition =
  Grition<TypeScriptFileRelationshipList>;

export type TypeScriptFileRelationshipListOdeshin =
  OdeshinFromGrition<TypeScriptFileRelationshipListGrition>;

export const TYPE_SCRIPT_FILE_RELATIONSHIP_LIST_GEPP =
  'type-script-file-relationship-list';

export type TypeScriptFileRelationshipListGepp =
  typeof TYPE_SCRIPT_FILE_RELATIONSHIP_LIST_GEPP;

export type TypeScriptFileRelationshipListVoictent = Voictent<
  TypeScriptFileRelationshipListGepp,
  TypeScriptFileRelationshipListOdeshin
>;

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
            typeName: TypeScriptFileImportTypeName.Local,
            directoryPath: typeScriptFile.directoryPath,
            nodePath: typeScriptFile.filePath,
          },
          importedNode: {
            typeName: importedItem.typeName,
            nodePath: getSourcePath(importedItem),
          },
        };
      },
    );

    return relationshipList;
  })
  .assemble();
