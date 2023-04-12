import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import { SvgDocument } from './svgDocument';

export type SvgMetadata = {
  label: string;
  document: SvgDocument;
};

export type SvgMetadataList = SvgMetadata[];

export type SvgMetadataListGrition = Grition<SvgMetadataList>;

export type SvgMetadataListOdeshin = OdeshinFromGrition<SvgMetadataListGrition>;

export const SVG_METADATA_LIST_GEPP = 'svg-metadata-list';

export type SvgMetadataListGepp = typeof SVG_METADATA_LIST_GEPP;

export type SvgMetadataListVoictent = Voictent<
  SvgMetadataListGepp,
  SvgMetadataListOdeshin
>;
