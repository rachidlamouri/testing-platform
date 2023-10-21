import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

/**
 * HTML SVG representation of a Graphviz graph
 */
type SvgDocument = {
  id: string;
  subitem: string;
};

export const SVG_DOCUMENT_COLLECTION_ID = 'svg-document';

type SvgDocumentCollectionId = typeof SVG_DOCUMENT_COLLECTION_ID;

export type SvgDocumentStreamMetatype = InMemoryIdentifiableItem3StreamMetatype<
  SvgDocumentCollectionId,
  SvgDocument
>;
