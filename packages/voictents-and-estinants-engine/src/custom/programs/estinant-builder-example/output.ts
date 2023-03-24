import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type Output = string;

export type OutputGrition = Grition<Output>;

export type OutputOdeshin = OdeshinFromGrition<OutputGrition>;

export const OUTPUT_GEPP = 'output';

export type OutputBGepp = typeof OUTPUT_GEPP;

export type OutputVoictent = Voictent<OutputBGepp, OutputOdeshin>;
