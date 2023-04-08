import { LabelLocation } from '../../graph-visualization/directed-graph/attribute';
import {
  DirectedGraphRankDirection,
  PartialGraphAttributeByKey,
} from '../../graph-visualization/directed-graph/directedGraph';
import { COMMON_ATTRIBUTE_BY_KEY } from './commonAttributeByKey';

export const ROOT_DIRECTED_GRAPH_ATTRIBUTE_BY_KEY = {
  id: '8540d043-43cf-4af6-84fb-0d2d3bd18d11',
  label: 'Root',
  rankdir: DirectedGraphRankDirection.RightLeft,
  labelloc: LabelLocation.Top,
  fontsize: 36,
  ...COMMON_ATTRIBUTE_BY_KEY,
} satisfies PartialGraphAttributeByKey;
