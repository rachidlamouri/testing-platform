import { SetOptional } from 'type-fest';
import { AttributeByKeyGSCNE } from './attributeByKeyGSCNE';

/**
 * A helper type to make directed graph subobject attributes optional
 */
export type PartialAttributeByKey<TAttributeByKey extends AttributeByKeyGSCNE> =
  SetOptional<TAttributeByKey, Exclude<keyof TAttributeByKey, 'id'>>;
