import { buildWattlection } from '../../../type-script-adapter/estinant/wattlection';
import { Vicken } from '../../../type-script-adapter/vicken';
import { Vition } from '../../../type-script-adapter/vition';
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

export const typeScriptFileRelationshipWattlection = buildWattlection<
  Vition<
    TypeScriptFileVoictent,
    [
      Vicken<
        TypeScriptFileImportListVoictent,
        [TypeScriptFileImportListVoictent],
        string
      >,
    ]
  >,
  TypeScriptFileRelationshipListVoictent
>({
  leftGepp: TYPE_SCRIPT_FILE_GEPP,
  rightAppreffingeTuple: [
    {
      gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
      framate: (leftInput): [string] => [leftInput.zorn],
      croard: (rightInput): string => rightInput.zorn,
    },
  ],
  outputGepp: TYPE_SCRIPT_FILE_RELATIONSHIP_LIST_GEPP,
  pinbe: (leftInput, [{ grition: importList }]) => {
    const typeScriptFile = leftInput.grition;

    return {
      zorn: leftInput.zorn,
      grition: importList.map<TypeScriptFileRelationship>((importedItem) => {
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
      }),
    };
  },
});
