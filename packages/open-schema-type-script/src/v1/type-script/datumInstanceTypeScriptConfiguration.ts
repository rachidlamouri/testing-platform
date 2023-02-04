import { UnknownCollectionLocator } from '../core/collectionLocator';
import { UnknownDatumInstance } from '../core/datumInstance';
import { DatumInstanceConfiguration } from '../core/datumInstanceConfiguration';
import { ConstrainObject } from '../utilities/types/constrainObject';

export type UnknownDatumInstanceTypeScriptConfiguration = {
  datumInstanceIdentifier: UnknownCollectionLocator;
  typeSemanticsIdentifiers: UnknownCollectionLocator[];
  datumInstance: UnknownDatumInstance;
  datumInstanceAliases: UnknownCollectionLocator[];
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
  aliases: T['datumInstanceAliases'];
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
  datumInstanceAliases,
}: T): DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<T> => ({
  predicateIdentifiers: typeSemanticsIdentifiers,
  instanceIdentifier: datumInstanceIdentifier,
  datumInstance,
  aliases: datumInstanceAliases,
});
