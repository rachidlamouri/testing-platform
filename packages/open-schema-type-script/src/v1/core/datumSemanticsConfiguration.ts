import {
  UnknownCollectionLocator,
  UnknownCollectionLocatorTuple,
} from './collectionLocator';
import { UnknownDatumSemanticsProcessor } from './datumSemanticsProcessor';
import { ConstrainObject } from '../utilities/types/constrainObject';

export type UnknownDatumSemanticsConfiguration = {
  semanticsIdentifier: UnknownCollectionLocator;
  collectionLocator: UnknownCollectionLocator;
  processDatum: UnknownDatumSemanticsProcessor;
  additionalPredicateIdentifiers: UnknownCollectionLocatorTuple;
};

export type DatumSemanticsConfiguration<
  TUnknownDatumSemanticsConfiguration extends UnknownDatumSemanticsConfiguration,
> = ConstrainObject<
  { ConstraintObject: UnknownDatumSemanticsConfiguration },
  { ConstrainedObject: TUnknownDatumSemanticsConfiguration }
>;

export type UnknownDatumSemanticsConfigurationTuple =
  readonly UnknownDatumSemanticsConfiguration[];
