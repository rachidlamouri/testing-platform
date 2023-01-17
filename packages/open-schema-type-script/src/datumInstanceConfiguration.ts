import { UnknownCollectionLocator } from './collectionLocator';
import { UnknownDatumInstance } from './datumInstance';

export type UnknownDatumInstanceConfiguration = {
  datumInstance: UnknownDatumInstance;
  instanceIdentifier: UnknownCollectionLocator;
  // TOOD: we aren't do anything with these, so disabling them for now
  // aliases: UnknownCollectionLocator[];
  // predicateIdentifiers: UnknownCollectionLocator[];
};

export type UnknownDatumInstanceConfigurationTuple =
  readonly UnknownDatumInstanceConfiguration[];

export type DatumInstanceConfigurationTupleToInstanceIdentifierTuple<
  T extends UnknownDatumInstanceConfigurationTuple,
> = {
  [Index in keyof T]: T[Index]['instanceIdentifier'];
};
