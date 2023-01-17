import { UnknownCollectionLocator } from './collectionLocator';
import { UnknownIdentifiableDatumSemanticsProcessorResult } from './identifiableDatumSemanticsProcessorResult';
import { ConstrainObject } from './utilityTypes/constrainObject';

export type UnknownDatumSemanticsResultCollection = {
  datumInstanceIdentifier: UnknownCollectionLocator;
  resultsBySemanticsIdentifier: Map<
    UnknownCollectionLocator,
    UnknownIdentifiableDatumSemanticsProcessorResult
  >;
};

export type DatumSemanticsResultCollection<
  TUnknownDatumSemanticsResultCollection extends UnknownDatumSemanticsResultCollection,
> = ConstrainObject<
  { ConstraintObject: UnknownDatumSemanticsResultCollection },
  { ConstrainedObject: TUnknownDatumSemanticsResultCollection }
>;
