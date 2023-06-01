import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../adapter/voictent';
import { SvgDocument } from './svgDocument';

export type SvgMetadata = {
  label: string;
  document: SvgDocument;
};

/**
 * The list of tab labels for a knowledge graph and their corresponding
 * SvgDocuments
 */
export type SvgMetadataList = {
  zorn: string;
  grition: SvgMetadata[];
};

export const SVG_METADATA_LIST_GEPP = 'svg-metadata-list';

export type SvgMetadataListGepp = typeof SVG_METADATA_LIST_GEPP;

export type SvgMetadataListVoictent = Voictent<
  SvgMetadataListGepp,
  SvgMetadataList
>;

export type SvgMetadataListVoque = InMemoryOdeshin2Voque<
  SvgMetadataListGepp,
  SvgMetadataList
>;
