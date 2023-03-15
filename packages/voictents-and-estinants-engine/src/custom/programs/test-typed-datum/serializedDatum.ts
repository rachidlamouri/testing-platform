import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type SerializedDatum = string;

export type SerializedDatumGrition = Grition<SerializedDatum>;

export type SerializedDatumOdeshin = OdeshinFromGrition<SerializedDatumGrition>;

export const SERIALIZED_DATUM_GEPP = 'serialized-datum';

export type SerializedDatumGepp = typeof SERIALIZED_DATUM_GEPP;

export type SerializedDatumVoictent = Voictent<
  SerializedDatumGepp,
  SerializedDatumOdeshin
>;
