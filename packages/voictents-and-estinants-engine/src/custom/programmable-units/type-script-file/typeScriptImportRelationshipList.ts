import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type TypeScriptImportRelationshipElement = {
  isInternal: boolean;
  modulePath: string;
};

export type TypeScriptImportRelationship = {
  importer: TypeScriptImportRelationshipElement;
  importee: TypeScriptImportRelationshipElement;
};

export type TypeScriptImportRelationshipList = TypeScriptImportRelationship[];

export type TypeScriptImportRelationshipListGrition =
  Grition<TypeScriptImportRelationshipList>;

export type TypeScriptImportRelationshipListOdeshin =
  OdeshinFromGrition<TypeScriptImportRelationshipListGrition>;

export const TYPE_SCRIPT_IMPORT_RELATIONSHIP_LIST_GEPP =
  'type-script-import-relationship-list';

export type TypeScriptImportRelationshipListGepp =
  typeof TYPE_SCRIPT_IMPORT_RELATIONSHIP_LIST_GEPP;

export type TypeScriptImportRelationshipListVoictent = Voictent<
  TypeScriptImportRelationshipListGepp,
  TypeScriptImportRelationshipListOdeshin
>;
