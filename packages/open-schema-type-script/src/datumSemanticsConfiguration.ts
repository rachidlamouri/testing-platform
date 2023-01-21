import { UnknownCollectionLocator } from './collectionLocator';
import { UnknownDatumSemanticsProcessor } from './datumSemanticsProcessor';
import { ConstrainObject } from './utilityTypes/constrainObject';

export type UnknownDatumSemanticsConfiguration = {
  semanticsIdentifier: UnknownCollectionLocator;
  collectionLocator: UnknownCollectionLocator;
  processDatum: UnknownDatumSemanticsProcessor;
};

export type DatumSemanticsConfiguration<
  TUnknownDatumSemanticsConfiguration extends UnknownDatumSemanticsConfiguration,
> = ConstrainObject<
  { ConstraintObject: UnknownDatumSemanticsConfiguration },
  { ConstrainedObject: TUnknownDatumSemanticsConfiguration }
>;

export type UnknownDatumSemanticsConfigurationTuple =
  readonly UnknownDatumSemanticsConfiguration[];
