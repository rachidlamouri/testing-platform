import { BuilderConfigurationWithNormalizedInput } from './builderConfiguration';
import {
  DatumInstanceTypeScriptConfigurationTupleToDatumInstanceConfigurationTuple,
  UnknownDatumInstanceTypeScriptConfigurationTuple,
} from './datumInstanceTypeScriptConfiguration';

export type UnknownDatumInstanceTypeScriptConfigurationCollectionBuilderInputAndOutput =
  {
    InputCollection: UnknownDatumInstanceTypeScriptConfigurationTuple;
    OutputCollection: UnknownDatumInstanceTypeScriptConfigurationTuple;
  };

export type TypeScriptConfigurationCollectionToConfigurationCollection<
  T extends UnknownDatumInstanceTypeScriptConfigurationCollectionBuilderInputAndOutput,
> = {
  InputDatumInstanceConfigurationCollection: DatumInstanceTypeScriptConfigurationTupleToDatumInstanceConfigurationTuple<
    T['InputCollection']
  >;
  OutputDatumInstanceConfigurationCollection: DatumInstanceTypeScriptConfigurationTupleToDatumInstanceConfigurationTuple<
    T['OutputCollection']
  >;
};

export const buildBuilderConfiguration = <
  T extends UnknownDatumInstanceTypeScriptConfigurationCollectionBuilderInputAndOutput,
>(
  builderConfiguration: BuilderConfigurationWithNormalizedInput<
    TypeScriptConfigurationCollectionToConfigurationCollection<T>
  >,
): BuilderConfigurationWithNormalizedInput<
  TypeScriptConfigurationCollectionToConfigurationCollection<T>
> => builderConfiguration;
