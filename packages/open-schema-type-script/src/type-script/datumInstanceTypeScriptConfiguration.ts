import { UnknownCollectionLocator } from '../core/collectionLocator';
import { UnknownDatumInstance } from '../core/datumInstance';
import { DatumInstanceConfiguration } from '../core/datumInstanceConfiguration';
import { ConstrainObject } from '../utilities/types/constrainObject';

export type UnknownDatumInstanceTypeScriptConfiguration = {
  datumInstanceIdentifier: UnknownCollectionLocator;
  typeSemanticsIdentifiers: UnknownCollectionLocator[];
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
  predicateIdentifiers: T['typeSemanticsIdentifiers'];
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

export const getDatumInstanceConfiguration = <
  T extends UnknownDatumInstanceTypeScriptConfiguration,
>({
  typeSemanticsIdentifiers,
  datumInstanceIdentifier,
  datumInstance,
}: T): DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<T> => ({
  predicateIdentifiers: typeSemanticsIdentifiers,
  instanceIdentifier: datumInstanceIdentifier,
  datumInstance,
});
