import { AttributeByKeyGSCNE } from '../../graph-visualization/directed-graph/attributeByKeyGSCNE';

/**
 * Common attributes for an outdated graph pattern
 *
 * @deprecated
 */
export const COMMON_ATTRIBUTE_BY_KEY: Pick<AttributeByKeyGSCNE, 'fontname'> = {
  fontname: 'sans-serif',
};

export const FONT_SIZE = {
  root: 48,
  boundary: 36,
  directory: 24,
  node: 18,
};
