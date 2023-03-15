import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type GraphvizCode = string;

export type GraphvizCodeGrition = Grition<GraphvizCode>;

export type GraphvizCodeOdeshin = OdeshinFromGrition<GraphvizCodeGrition>;

export const GRAPHVIZ_CODE_GEPP = 'graphviz-code';

export type GraphvizCodeGepp = typeof GRAPHVIZ_CODE_GEPP;

export type GraphvizCodeVoictent = Voictent<
  GraphvizCodeGepp,
  GraphvizCodeOdeshin
>;
