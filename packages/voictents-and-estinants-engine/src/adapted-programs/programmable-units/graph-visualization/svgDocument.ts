import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

/**
 * HTML SVG representation of a Graphviz graph
 */
type SvgDocument = {
  zorn: string;
  grition: string;
};

export const SVG_DOCUMENT_GEPP = 'svg-document';

type SvgDocumentGepp = typeof SVG_DOCUMENT_GEPP;

export type SvgDocumentVoque = InMemoryIdentifiableItem2ListStreamMetatype<
  SvgDocumentGepp,
  SvgDocument
>;
