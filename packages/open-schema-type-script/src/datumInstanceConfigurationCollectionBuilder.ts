import { UnknownDatumInstanceConfigurationTuple } from './datumInstanceConfiguration';
import { Merge } from './utilityTypes/merge/merge';

export type UnknownDatumInstanceConfigurationCollectionBuilderInput = {
  InputDatumInstanceConfigurationCollection: UnknownDatumInstanceConfigurationTuple;
};

export type UnknownDatumInstanceConfigurationCollectionBuilderOutput = {
  OutputDatumInstanceConfigurationCollection: UnknownDatumInstanceConfigurationTuple;
};

export type UnknownDatumInstanceConfigurationCollectionBuilderInputAndOutput =
  Merge<
    UnknownDatumInstanceConfigurationCollectionBuilderInput,
    UnknownDatumInstanceConfigurationCollectionBuilderOutput
  >;

export type DatumInstanceConfigurationCollectionBuilder<
  T extends UnknownDatumInstanceConfigurationCollectionBuilderInputAndOutput,
> = (
  ...inputCollection: T['InputDatumInstanceConfigurationCollection']
) => T['OutputDatumInstanceConfigurationCollection'];
