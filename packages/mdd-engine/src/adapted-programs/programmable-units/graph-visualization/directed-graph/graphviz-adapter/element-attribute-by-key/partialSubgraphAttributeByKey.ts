import { SpreadN } from '../../../../../../package-agnostic-utilities/type/spreadN';
import { AttributeByKeyGS } from '../../attributeByKeyGS';
import { AttributeByKeyGSC } from '../../attributeByKeyGSC';
import { AttributeByKeyGSCNE } from '../../attributeByKeyGSCNE';
import { PartialAttributeByKey } from '../../partialAttributeByKey';

export enum RankType {
  Same = 'same',
  Minimum = 'min',
  Source = 'source',
  Maximum = 'max',
  Sink = 'sink',
}

type SubgraphAttributeByKey = SpreadN<
  [
    AttributeByKeyGSCNE,
    AttributeByKeyGS,
    AttributeByKeyGSC,
    {
      rank: RankType;
    },
  ]
>;
/**
 * Graphviz subgraph attributes
 */
export type PartialSubgraphAttributeByKey =
  PartialAttributeByKey<SubgraphAttributeByKey>;
