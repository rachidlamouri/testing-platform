import { CustomDatumTypeName } from '../../../utilities/typed-datum/customTypedDatum';
import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type CustomDatumTypeNameGrition = Grition<CustomDatumTypeName>;

export type CustomDatumTypeNameOdeshin =
  OdeshinFromGrition<CustomDatumTypeNameGrition>;

export const CUSTOM_DATUM_TYPE_NAME_GEPP = 'custom-datum-type-name';

export type CustomDatumTypeNameGepp = typeof CUSTOM_DATUM_TYPE_NAME_GEPP;

export type CustomDatumTypeNameVoictent = Voictent<
  CustomDatumTypeNameGepp,
  CustomDatumTypeNameOdeshin
>;
