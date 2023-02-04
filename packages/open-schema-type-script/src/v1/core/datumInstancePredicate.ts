import { UnknownCollectionLocator } from './collectionLocator';
import { ConstrainObject } from '../utilities/types/constrainObject';

export type UnknownDatumInstancePredicate = {
  datumInstanceIdentifier: UnknownCollectionLocator;
  semanticsIdentifier: UnknownCollectionLocator;
};

export type DatumInstancePredicate<
  TDatumInstancePredicate extends UnknownDatumInstancePredicate,
> = ConstrainObject<
  { ConstraintObject: UnknownDatumInstancePredicate },
  { ConstrainedObject: TDatumInstancePredicate }
>;
