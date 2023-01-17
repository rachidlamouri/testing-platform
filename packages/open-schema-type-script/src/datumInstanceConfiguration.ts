import { UnknownCollectionLocator } from './collectionLocator';
import { UnknownDatumInstance } from './datumInstance';

export type UnknownDatumInstanceConfiguration = {
  datumInstance: UnknownDatumInstance;
  instanceIdentifier: UnknownCollectionLocator;
  aliases: UnknownCollectionLocator[];
  predicateIdentifiers: UnknownCollectionLocator[];
};

export type UnknownDatumInstanceConfigurationTuple =
  readonly UnknownDatumInstanceConfiguration[];

export type DatumInstanceConfigurationTupleToInstanceIdentifierTuple<
  T extends UnknownDatumInstanceConfigurationTuple,
> = {
  [Index in keyof T]: T[Index]['instanceIdentifier'];
};
