import { UnknownCollectionLocator } from './collectionLocator';
import { ConstrainObject } from './utilityTypes/constrainObject';

export type UnknownDatumInstanceAlias = {
  datumInstanceIdentifier: UnknownCollectionLocator;
  value: UnknownCollectionLocator;
};

export type DatumInstanceAlias<
  TDatumInstanceAlias extends UnknownDatumInstanceAlias,
> = ConstrainObject<
  { ConstraintObject: UnknownDatumInstanceAlias },
  { ConstrainedObject: TDatumInstanceAlias }
>;
