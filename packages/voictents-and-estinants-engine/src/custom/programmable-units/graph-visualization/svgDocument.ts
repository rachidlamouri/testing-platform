import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../adapter/voictent';

/**
 * HTML SVG representation of a Graphviz graph
 */
export type SvgDocument = {
  zorn: string;
  grition: string;
};

export const SVG_DOCUMENT_GEPP = 'svg-document';

export type SvgDocumentGepp = typeof SVG_DOCUMENT_GEPP;

export type SvgDocumentVoictent = Voictent<SvgDocumentGepp, SvgDocument>;

export type SvgDocumentVoque = InMemoryOdeshin2Voque<
  SvgDocumentGepp,
  SvgDocument
>;
