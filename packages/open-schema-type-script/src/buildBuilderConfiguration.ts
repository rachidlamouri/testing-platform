import {
  BuilderConfiguration,
  BuilderConfigurationWithNormalizedInput,
} from './builderConfiguration';
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
  builderConfiguration: BuilderConfiguration<
    TypeScriptConfigurationCollectionToConfigurationCollection<T>
  >,
): BuilderConfigurationWithNormalizedInput<
  TypeScriptConfigurationCollectionToConfigurationCollection<T>
> =>
  builderConfiguration as BuilderConfigurationWithNormalizedInput<
    TypeScriptConfigurationCollectionToConfigurationCollection<T>
  >;
