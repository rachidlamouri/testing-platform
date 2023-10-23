import { SpreadN } from '../../../../../../package-agnostic-utilities/type/spreadN';
import { AttributeByKeyGS } from '../../attributeByKeyGS';
import { AttributeByKeyGSC } from '../../attributeByKeyGSC';
import { AttributeByKeyGSCNE } from '../../attributeByKeyGSCNE';
import { PartialAttributeByKey } from '../../partialAttributeByKey';

type GraphAttributeByKey = SpreadN<
  [AttributeByKeyGSCNE, AttributeByKeyGSC, AttributeByKeyGS]
>;

export type PartialGraphAttributeByKey =
  PartialAttributeByKey<GraphAttributeByKey>;
