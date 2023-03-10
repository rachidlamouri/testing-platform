import { UnknownCollectionLocator } from './collectionLocator';
import { DatumSemanticsProcessorResult } from './datumSemanticsProcessor';
import { ConstrainObject } from '../utilities/types/constrainObject';

export type UnknownIdentifiableDatumInstance = {
  Identifier: UnknownCollectionLocator;
  value: DatumSemanticsProcessorResult;
};

export type IdentifiableDatumInstance<
  TIdentifiableDatumInstance extends UnknownIdentifiableDatumInstance,
> = ConstrainObject<
  { ConstraintObject: UnknownIdentifiableDatumInstance },
  { ConstrainedObject: TIdentifiableDatumInstance }
>;
