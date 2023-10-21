import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

/**
 * See https://graphviz.org/doc/info/lang.html for the specification of
 * Graphviz's DOT language
 */
type GraphvizCode = {
  id: string;
  subitem: string;
};

export const GRAPHVIZ_CODE_COLLECTION_ID = 'graphviz-code';

type GraphvizCodeCollectionId = typeof GRAPHVIZ_CODE_COLLECTION_ID;

export type GraphvizCodeStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    GraphvizCodeCollectionId,
    GraphvizCode
  >;
