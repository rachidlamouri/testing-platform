import { Grition } from '../../adapter/grition';
import { Hubblepup } from '../../adapter/hubblepup';
import { Voictent } from '../../adapter/voictent';

export type EngineFunctionConfiguration = {
  filePath: string;
  exportedIdentifier: string;
  estinantListKeyIdentifierName: string;
};

export type EngineFunctionConfigurationGrition =
  Grition<EngineFunctionConfiguration>;

export type EngineFunctionConfigurationHubblepup =
  Hubblepup<EngineFunctionConfiguration>;

export const ENGINE_FUNCTION_CONFIGURATION_GEPP =
  'engine-function-configuration';

export type EngineFunctionConfigurationGepp =
  typeof ENGINE_FUNCTION_CONFIGURATION_GEPP;

export type EngineFunctionConfigurationVoictent = Voictent<
  EngineFunctionConfigurationGepp,
  EngineFunctionConfigurationHubblepup
>;

export const ENGINE_FUNCTION_CONFIGURATION: EngineFunctionConfigurationHubblepup =
  {
    filePath:
      'packages/pipes-and-filters-engine/src/type-script-adapter/digikikify.ts',
    exportedIdentifier: 'digikikify',
    estinantListKeyIdentifierName: 'estinantTuple',
  };
