import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type Error = unknown;

export type ErrorGrition = Grition<Error>;

export type ErrorOdeshin = OdeshinFromGrition<ErrorGrition>;

export const ERROR_GEPP = 'error';

export type ErrorGepp = typeof ERROR_GEPP;

export type ErrorVoictent = Voictent<ErrorGepp, ErrorOdeshin>;
