import { UnknownCollectionLocator } from './collectionLocator';
import { UnknownIdentifiableDatumSemanticsProcessorResult } from './identifiableDatumSemanticsProcessorResult';
import { ConstrainObject } from '../utilities/types/constrainObject';

export type UnknownDatumSemanticsResultCollection = {
  datumInstanceIdentifier: UnknownCollectionLocator;
  resultsBySemanticsIdentifier: Map<
    UnknownCollectionLocator,
    UnknownIdentifiableDatumSemanticsProcessorResult
  >;
};

export type DatumInstanceSemanticsResultCollection<
  TUnknownDatumSemanticsResultCollection extends UnknownDatumSemanticsResultCollection,
> = ConstrainObject<
  { ConstraintObject: UnknownDatumSemanticsResultCollection },
  { ConstrainedObject: TUnknownDatumSemanticsResultCollection }
>;
