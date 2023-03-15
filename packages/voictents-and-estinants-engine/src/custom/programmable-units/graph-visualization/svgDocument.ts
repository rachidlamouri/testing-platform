import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type SvgDocument = string;

export type SvgDocumentGrition = Grition<SvgDocument>;

export type SvgDocumentOdeshin = OdeshinFromGrition<SvgDocumentGrition>;

export const SVG_DOCUMENT_GEPP = 'svg-document';

export type SvgDocumentGepp = typeof SVG_DOCUMENT_GEPP;

export type SvgDocumentVoictent = Voictent<SvgDocumentGepp, SvgDocumentOdeshin>;
