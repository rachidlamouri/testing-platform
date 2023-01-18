import {
  RootDatumInstanceLocator,
  ROOT_DATUM_INSTANCE_LOCATOR,
  UnknownCollectionLocator,
} from './collectionLocator';
import {
  RootDatumInstance,
  ROOT_DATUM_INSTANCE,
  UnknownDatumInstance,
} from './datumInstance';
import { TypeSemanticsIdentifier } from './example/typeSemanticsIdentifier';
import { ConstrainObject } from './utilityTypes/constrainObject';

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

export type DatumInstanceConfigurationTupleToInstanceIdentifierTuple<
  T extends UnknownDatumInstanceConfigurationTuple,
> = {
  [Index in keyof T]: T[Index]['instanceIdentifier'];
};

export type RootDatumInstanceConfiguration = DatumInstanceConfiguration<{
  instanceIdentifier: RootDatumInstanceLocator;
  datumInstance: RootDatumInstance;
  predicateIdentifiers: [TypeSemanticsIdentifier.null];
}>;

export const ROOT_DATUM_INSTANCE_CONFIGURATION: RootDatumInstanceConfiguration =
  {
    instanceIdentifier: ROOT_DATUM_INSTANCE_LOCATOR,
    datumInstance: ROOT_DATUM_INSTANCE,
    predicateIdentifiers: [TypeSemanticsIdentifier.null],
  };
