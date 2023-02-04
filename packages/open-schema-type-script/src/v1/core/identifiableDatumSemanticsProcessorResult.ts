import { UnknownCollectionLocator } from './collectionLocator';
import { UnknownDatumInstance } from './datumInstance';
import { ConstrainObject } from '../utilities/types/constrainObject';

export type UnknownIdentifiableDatumSemanticsProcessorResult = {
  semanticsIdentifier: UnknownCollectionLocator;
  value: UnknownDatumInstance;
};

export type IdentifiableDatumSemanticsProcessorResult<
  TIdentifiableDatumSemanticsProcessorResult extends UnknownIdentifiableDatumSemanticsProcessorResult,
> = ConstrainObject<
  { ConstraintObject: UnknownIdentifiableDatumSemanticsProcessorResult },
  { ConstrainedObject: TIdentifiableDatumSemanticsProcessorResult }
>;
