import {
  RootDatumInstanceLocator,
  ROOT_DATUM_INSTANCE_LOCATOR,
  UnknownCollectionLocator,
} from '../core/collectionLocator';
import {
  RootDatumInstance,
  ROOT_DATUM_INSTANCE,
  UnknownDatumInstance,
} from '../core/datumInstance';
import { DatumInstanceConfiguration } from '../core/datumInstanceConfiguration';
import { TypeScriptSemanticsIdentifier } from './typeScriptSemanticsIdentifier';
import { ConstrainObject } from '../utilities/types/constrainObject';
import { Merge } from '../utilities/types/merge/merge';

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

// export type ABC<T extends Unknown> = {
//   [Key in keyof T['typeSemanticsIdentifier']]
// };

// export type IDK<T extends readonly object[], X extends object> = {
//   [Index in keyof T]: Merge<T[Index], X>;
// };

// export type DatumInstanceTypeScriptConfigurationTupleToDatumInstanceConfigurationTuple<
//   TTuple extends UnknownDatumInstanceTypeScriptConfigurationTuple,
// > = {

// }
// TTuple extends readonly unknown[]
//   ? {
//       [Index in keyof TTuple]: DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<
//         TTuple[Index]
//       >;
//     }
//   : never;

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
