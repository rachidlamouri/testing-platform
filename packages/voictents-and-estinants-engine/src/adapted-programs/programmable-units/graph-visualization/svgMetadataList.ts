import { InMemoryOdeshin2ListVoque } from '../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import { SvgDocument } from './svgDocument';

type SvgMetadata = {
  label: string;
  document: SvgDocument;
};

/**
 * The list of tab labels for a knowledge graph and their corresponding
 * SvgDocuments
 */
type SvgMetadataList = {
  zorn: string;
  grition: SvgMetadata[];
};

export const SVG_METADATA_LIST_GEPP = 'svg-metadata-list';

type SvgMetadataListGepp = typeof SVG_METADATA_LIST_GEPP;

export type SvgMetadataListVoque = InMemoryOdeshin2ListVoque<
  SvgMetadataListGepp,
  SvgMetadataList
>;
