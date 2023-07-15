import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';

export type DecodedSvgNode = {
  elementName: string;
  attributeByKey: {
    [key: string]: string;
  };
  children: (string | DecodedSvgNode)[];
};

export type DecodedSvgDocument = {
  zorn: string;
  grition: DecodedSvgNode;
};

export const DECODED_SVG_DOCUMENT_GEPP = 'decoded-svg-document';

export type DecodedSvgDocumentGepp = typeof DECODED_SVG_DOCUMENT_GEPP;

export type DecodedSvgDocumentVoque = InMemoryOdeshin2Voque<
  DecodedSvgDocumentGepp,
  DecodedSvgDocument
>;
