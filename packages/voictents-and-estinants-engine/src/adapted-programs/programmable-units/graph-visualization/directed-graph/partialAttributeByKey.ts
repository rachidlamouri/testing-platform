import { SetOptional } from 'type-fest';
import { AttributeByKeyGSCNE } from './attributeByKeyGSCNE';

export type PartialAttributeByKey<TAttributeByKey extends AttributeByKeyGSCNE> =
  SetOptional<TAttributeByKey, Exclude<keyof TAttributeByKey, 'id'>>;
