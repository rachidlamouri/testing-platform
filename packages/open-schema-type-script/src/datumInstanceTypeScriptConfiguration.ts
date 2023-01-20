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
import { DatumInstanceConfiguration } from './datumInstanceConfiguration';
import { TypeScriptSemanticsIdentifier } from './typeScriptSemanticsIdentifier';
import { ConstrainObject } from './utilityTypes/constrainObject';

export type UnknownDatumInstanceTypeScriptConfiguration = {
  datumInstanceIdentifier: UnknownCollectionLocator;
  typeSemanticsIdentifier: UnknownCollectionLocator;
  datumInstance: UnknownDatumInstance;
};

export type UnknownDatumInstanceTypeScriptConfigurationTuple =
  readonly UnknownDatumInstanceTypeScriptConfiguration[];

export type DatumInstanceTypeScriptConfiguration<
  TUnknownDatumInstanceTypeScriptConfiguration extends UnknownDatumInstanceTypeScriptConfiguration,
> = ConstrainObject<
  { ConstraintObject: UnknownDatumInstanceTypeScriptConfiguration },
  { ConstrainedObject: TUnknownDatumInstanceTypeScriptConfiguration }
>;

export type DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<
  T extends UnknownDatumInstanceTypeScriptConfiguration,
> = DatumInstanceConfiguration<{
  instanceIdentifier: T['datumInstanceIdentifier'];
  datumInstance: T['datumInstance'];
  predicateIdentifiers: [T['typeSemanticsIdentifier']];
}>;

export type DatumInstanceTypeScriptConfigurationTupleToDatumInstanceConfigurationTuple<
  TTuple extends UnknownDatumInstanceTypeScriptConfigurationTuple,
> = TTuple extends readonly unknown[]
  ? {
      [Index in keyof TTuple]: DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<
        TTuple[Index]
      >;
    }
  : never;

export type RootDatumInstanceTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    datumInstanceIdentifier: RootDatumInstanceLocator;
    typeSemanticsIdentifier: TypeScriptSemanticsIdentifier.null;
    datumInstance: RootDatumInstance;
  }>;

export const ROOT_DATUM_INSTANCE_TYPE_SCRIPT_CONFIGURATION: RootDatumInstanceTypeScriptConfiguration =
  {
    datumInstanceIdentifier: ROOT_DATUM_INSTANCE_LOCATOR,
    datumInstance: ROOT_DATUM_INSTANCE,
    typeSemanticsIdentifier: TypeScriptSemanticsIdentifier.null,
  };

export const getDatumInstanceConfiguration = <
  T extends UnknownDatumInstanceTypeScriptConfiguration,
>({
  typeSemanticsIdentifier,
  datumInstanceIdentifier,
  datumInstance,
}: T): DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<T> => ({
  predicateIdentifiers: [typeSemanticsIdentifier],
  instanceIdentifier: datumInstanceIdentifier,
  datumInstance,
});
