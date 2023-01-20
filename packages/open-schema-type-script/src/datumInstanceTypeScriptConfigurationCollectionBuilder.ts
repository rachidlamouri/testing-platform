import {
  DatumInstanceTypeScriptConfigurationTupleToDatumInstanceConfigurationTuple,
  UnknownDatumInstanceTypeScriptConfigurationTuple,
} from './datumInstanceTypeScriptConfiguration';

export type UnknownDatumInstanceTypeScriptConfigurationCollectionBuilderInputAndOutput =
  {
    InputCollection: UnknownDatumInstanceTypeScriptConfigurationTuple;
    OutputCollection: UnknownDatumInstanceTypeScriptConfigurationTuple;
  };

export type DatumInstanceTypeScriptConfigurationCollectionBuilder<
  T extends UnknownDatumInstanceTypeScriptConfigurationCollectionBuilderInputAndOutput,
> = (
  ...inputCollection: DatumInstanceTypeScriptConfigurationTupleToDatumInstanceConfigurationTuple<
    T['InputCollection']
  >
) => DatumInstanceTypeScriptConfigurationTupleToDatumInstanceConfigurationTuple<
  T['OutputCollection']
>;
