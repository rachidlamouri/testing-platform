import { InMemoryOdeshin2ListVoque } from '../../../core/engine/inMemoryOdeshinVoictent2';

/**
 * HTML SVG representation of a Graphviz graph
 */
export type SvgDocument = {
  zorn: string;
  grition: string;
};

export const SVG_DOCUMENT_GEPP = 'svg-document';

type SvgDocumentGepp = typeof SVG_DOCUMENT_GEPP;

export type SvgDocumentVoque = InMemoryOdeshin2ListVoque<
  SvgDocumentGepp,
  SvgDocument
>;
