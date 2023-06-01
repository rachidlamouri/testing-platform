import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../adapter/voictent';

/**
 * See https://graphviz.org/doc/info/lang.html for the specification of
 * Graphviz's DOT language
 */
export type GraphvizCode = {
  zorn: string;
  grition: string;
};

export const GRAPHVIZ_CODE_GEPP = 'graphviz-code';

export type GraphvizCodeGepp = typeof GRAPHVIZ_CODE_GEPP;

export type GraphvizCodeVoictent = Voictent<GraphvizCodeGepp, GraphvizCode>;

export type GraphvizCodeVoque = InMemoryOdeshin2Voque<
  GraphvizCodeGepp,
  GraphvizCode
>;
