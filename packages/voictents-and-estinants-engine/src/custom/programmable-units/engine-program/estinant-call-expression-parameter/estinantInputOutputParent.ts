import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';

export type EstinantInputOutputParent = {
  programName: string;
  estinantName: string;
  inputListIdentifier: string;
  outputListIdentifier: string;
};

export type EstinantInputOutputParentGrition =
  Grition<EstinantInputOutputParent>;

export type EstinantInputOutputParentOdeshin =
  OdeshinFromGrition<EstinantInputOutputParentGrition>;

export const ESTINANT_INPUT_OUTPUT_PARENT_GEPP = 'estinant-input-output-parent';

export type EstinantInputOutputParentGepp =
  typeof ESTINANT_INPUT_OUTPUT_PARENT_GEPP;

export type EstinantInputOutputParentVoictent = Voictent<
  EstinantInputOutputParentGepp,
  EstinantInputOutputParentOdeshin
>;
