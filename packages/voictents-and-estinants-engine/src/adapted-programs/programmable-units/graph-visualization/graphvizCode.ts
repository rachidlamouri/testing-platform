import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

/**
 * See https://graphviz.org/doc/info/lang.html for the specification of
 * Graphviz's DOT language
 */
type GraphvizCode = {
  zorn: string;
  grition: string;
};

export const GRAPHVIZ_CODE_GEPP = 'graphviz-code';

type GraphvizCodeGepp = typeof GRAPHVIZ_CODE_GEPP;

export type GraphvizCodeVoque = InMemoryIdentifiableItem2ListStreamMetatype<
  GraphvizCodeGepp,
  GraphvizCode
>;
