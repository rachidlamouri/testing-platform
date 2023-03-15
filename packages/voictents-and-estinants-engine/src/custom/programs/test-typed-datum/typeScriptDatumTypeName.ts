import { TypeScriptDatumTypeName } from '../../../utilities/typed-datum/type-script/typeScriptTypedDatum';
import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type TypeScriptDatumTypeNameGrition = Grition<TypeScriptDatumTypeName>;

export type TypeScriptDatumTypeNameOdeshin =
  OdeshinFromGrition<TypeScriptDatumTypeNameGrition>;

export const TYPE_SCRIPT_DATUM_TYPE_NAME_GEPP = 'type-script-datum-type-name';

export type TypeScriptDatumTypeNameGepp =
  typeof TYPE_SCRIPT_DATUM_TYPE_NAME_GEPP;

export type TypeScriptDatumTypeNameVoictent = Voictent<
  TypeScriptDatumTypeNameGepp,
  TypeScriptDatumTypeNameOdeshin
>;
