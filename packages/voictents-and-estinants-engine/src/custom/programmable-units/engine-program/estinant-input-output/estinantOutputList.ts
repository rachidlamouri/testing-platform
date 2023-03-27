import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { BaseEstinantInputOutput } from './baseEstinantInputOutput';

export type EstinantOutput = BaseEstinantInputOutput<false, null>;

export type EstinantOutputList = EstinantOutput[];

export type EstinantOutputListGrition = Grition<EstinantOutputList>;

export type EstinantOutputListOdeshin =
  OdeshinFromGrition<EstinantOutputListGrition>;

export const ESTINANT_OUTPUT_LIST_GEPP = 'estinant-output-list';

export type EstinantOutputListGepp = typeof ESTINANT_OUTPUT_LIST_GEPP;

export type EstinantOutputListVoictent = Voictent<
  EstinantOutputListGepp,
  EstinantOutputListOdeshin
>;
