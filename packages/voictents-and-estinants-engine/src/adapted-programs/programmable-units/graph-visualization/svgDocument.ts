import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

/**
 * HTML SVG representation of a Graphviz graph
 */
type SvgDocument = {
  id: string;
  subitem: string;
};

export const SVG_DOCUMENT_COLLECTION_ID = 'svg-document';

type SvgDocumentGepp = typeof SVG_DOCUMENT_COLLECTION_ID;

export type SvgDocumentStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<SvgDocumentGepp, SvgDocument>;
