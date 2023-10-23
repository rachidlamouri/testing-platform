import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { DirectedGraph } from '../element/directedGraph';
import { DirectedGraphId } from '../id/directedGraphId';

type SvgDocumentInput = {
  document: string;
  graph: DirectedGraph;
};

/**
 * A text blob of HTML for an svg
 */
export class SvgDocument implements SvgDocumentInput {
  get id(): DirectedGraphId {
    return this.graph.localComplexId;
  }

  document: string;

  graph: DirectedGraph;

  constructor(input: SvgDocumentInput) {
    this.document = input.document;
    this.graph = input.graph;
  }
}

export const SVG_DOCUMENT_COLLECTION_ID = 'svg-document';

type SvgDocumentCollectionId = typeof SVG_DOCUMENT_COLLECTION_ID;

export type SvgDocumentStreamMetatype = InMemoryIdentifiableItem3StreamMetatype<
  SvgDocumentCollectionId,
  SvgDocument
>;
