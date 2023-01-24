import { UnknownCollectionLocator } from './collectionLocator';
import { UnknownDatumInstance } from './datumInstance';
import { ConstrainObject } from '../utilities/types/constrainObject';

export type UnknownDatumInstanceConfiguration = {
  instanceIdentifier: UnknownCollectionLocator;
  datumInstance: UnknownDatumInstance;
  // TOOD: we aren't do anything with these, so disabling them for now
  // aliases: UnknownCollectionLocator[];
  predicateIdentifiers: UnknownCollectionLocator[];
};

export type DatumInstanceConfiguration<
  TUnknownDatumInstanceConfiguration extends UnknownDatumInstanceConfiguration,
> = ConstrainObject<
  { ConstraintObject: UnknownDatumInstanceConfiguration },
  { ConstrainedObject: TUnknownDatumInstanceConfiguration }
>;

export type UnknownDatumInstanceConfigurationTuple =
  readonly UnknownDatumInstanceConfiguration[];

export type NormalizedDatumInstancePredicateLocatorCollection<
  T extends UnknownDatumInstanceConfiguration,
> = Pick<
  DatumInstanceConfiguration<T>,
  'instanceIdentifier' | 'predicateIdentifiers'
>;

export type UnknownNormalizedDatumInstancePredicateLocatorCollection =
  NormalizedDatumInstancePredicateLocatorCollection<UnknownDatumInstanceConfiguration>;

export type DatumInstanceConfigurationTupleToNormalizedPredicateLocatorCollectionTuple<
  T extends UnknownDatumInstanceConfigurationTuple,
> = {
  [Index in keyof T]: NormalizedDatumInstancePredicateLocatorCollection<
    T[Index]
  >;
};

export type DatumInstanceConfigurationTupleToInstanceIdentifierTuple<
  T extends UnknownDatumInstanceConfigurationTuple,
> = {
  [Index in keyof T]: T[Index]['instanceIdentifier'];
};
