import { SpreadN } from '../../../../../../package-agnostic-utilities/type/spreadN';
import { AttributeByKeyCNE } from '../../attributeByKeyCNE';
import { AttributeByKeyGSC } from '../../attributeByKeyGSC';
import { AttributeByKeyGSCNE } from '../../attributeByKeyGSCNE';
import { PartialAttributeByKey } from '../../partialAttributeByKey';

type ClusterAttributeByKey = SpreadN<
  [
    AttributeByKeyGSCNE,
    AttributeByKeyCNE,
    AttributeByKeyGSC,
    {
      color: string;
    },
  ]
>;

export type PartialClusterAttributeByKey =
  PartialAttributeByKey<ClusterAttributeByKey>;
