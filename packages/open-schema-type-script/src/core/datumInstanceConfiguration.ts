import {
  UnknownCollectionLocator,
  UnknownCollectionLocatorTuple,
} from './collectionLocator';
import { UnknownDatumInstance } from './datumInstance';
import { ConstrainObject } from '../utilities/types/constrainObject';
import { DatumInstancePredicate } from './datumInstancePredicate';

export type UnknownDatumInstanceConfiguration = {
  instanceIdentifier: UnknownCollectionLocator;
  datumInstance: UnknownDatumInstance;
  // TOOD: we aren't do anything with these, so disabling them for now
  // aliases: UnknownCollectionLocator[];
  predicateIdentifiers: UnknownCollectionLocatorTuple;
};

export type DatumInstanceConfiguration<
  TUnknownDatumInstanceConfiguration extends UnknownDatumInstanceConfiguration,
> = ConstrainObject<
  { ConstraintObject: UnknownDatumInstanceConfiguration },
  { ConstrainedObject: TUnknownDatumInstanceConfiguration }
>;

export type UnknownDatumInstanceConfigurationTuple =
  readonly UnknownDatumInstanceConfiguration[];

export type NormalizedDatumInstancePredicateCollection<
  T extends UnknownDatumInstanceConfiguration,
> = Pick<T, 'instanceIdentifier' | 'predicateIdentifiers'>;

// type DatumInstancePredicateIdentifiersToPredicateTuple<
//   T1 extends UnknownCollectionLocatorTuple,
//   T2 extends UnknownDatumInstanceConfiguration,
// > = {
//   [Index in keyof T1]: DatumInstancePredicate<{
//     datumInstanceIdentifier: T2['instanceIdentifier'];
//     semanticsIdentifier: T1[Index];
//   }>;
// };

// export type DatumInstanceConfigurationToDatumInstancePredicateTuple<
//   T extends UnknownDatumInstanceConfiguration,
// > = DatumInstancePredicateIdentifiersToPredicateTuple<
//   T['predicateIdentifiers'],
//   UnknownDatumInstanceConfiguration
// >;

// export type DatumInstanceConfigurationTupleToDatumInstancePredicateTuple<
//   TUnknownDatumInstanceConfigurationTuple extends UnknownDatumInstanceConfigurationTuple,
// > = [
//   ...{
//     [Index in keyof TUnknownDatumInstanceConfigurationTuple]: DatumInstanceConfigurationToDatumInstancePredicateTuple<
//       TUnknownDatumInstanceConfigurationTuple[Index]
//     >;
//   },
// ];

export type DatumInstanceConfigurationTupleToNormalizedDatumInstancePredicateCollectionTuple<
  T extends UnknownDatumInstanceConfigurationTuple,
> = {
  [Index in keyof T]: NormalizedDatumInstancePredicateCollection<T[Index]>;
};
