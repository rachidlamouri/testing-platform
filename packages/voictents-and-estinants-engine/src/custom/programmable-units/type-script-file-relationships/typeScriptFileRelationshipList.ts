import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import { TypeScriptFileImportTypeName } from '../type-script-file/typeScriptFileImportList';

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
