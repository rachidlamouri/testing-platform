import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type TypeScriptFileInstanceIdByFilePath = Map<string, string>;

export type TypeScriptFileInstanceIdByFilePathGrition =
  Grition<TypeScriptFileInstanceIdByFilePath>;

export type TypeScriptFileInstanceIdByFilePathOdeshin =
  OdeshinFromGrition<TypeScriptFileInstanceIdByFilePathGrition>;

export const TYPE_SCRIPT_FILE_INSTANCE_ID_BY_FILE_PATH_GEPP =
  'type-script-file-instance-id-by-file-path';

export type TypeScriptFileInstanceIdByFilePathGepp =
  typeof TYPE_SCRIPT_FILE_INSTANCE_ID_BY_FILE_PATH_GEPP;

export type TypeScriptFileInstanceIdByFilePathVoictent = Voictent<
  TypeScriptFileInstanceIdByFilePathGepp,
  TypeScriptFileInstanceIdByFilePathOdeshin
>;
