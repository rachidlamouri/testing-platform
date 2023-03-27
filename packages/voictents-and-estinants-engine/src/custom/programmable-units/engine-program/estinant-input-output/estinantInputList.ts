import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { BaseEstinantInputOutput } from './baseEstinantInputOutput';

export type EstinantInput = BaseEstinantInputOutput<true, number>;

export type EstinantInputList = EstinantInput[];

export type EstinantInputListGrition = Grition<EstinantInputList>;

export type EstinantInputListOdeshin =
  OdeshinFromGrition<EstinantInputListGrition>;

export const ESTINANT_INPUT_LIST_GEPP = 'estinant-input-list';

export type EstinantInputListGepp = typeof ESTINANT_INPUT_LIST_GEPP;

export type EstinantInputListVoictent = Voictent<
  EstinantInputListGepp,
  EstinantInputListOdeshin
>;
