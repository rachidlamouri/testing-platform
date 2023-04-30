import { Grition } from '../../adapter/grition';
import { Hubblepup } from '../../adapter/hubblepup';
import { Voictent } from '../../adapter/voictent';

export type EngineFunctionConfiguration = {
  filePath: string;
  exportedIdentifier: string;
  estinantListKeyIdentifierName: string;
  initialVoictentByGeppKeyIdentifierName: string;
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
      'packages/voictents-and-estinants-engine/src/type-script-adapter/digikikify.ts',
    exportedIdentifier: 'digikikify',
    estinantListKeyIdentifierName: 'estinantTuple',
    initialVoictentByGeppKeyIdentifierName: 'initialVoictentsByGepp',
  };

export const CORE_ENGINE_FUNCTION_CONFIGURATION: EngineFunctionConfigurationHubblepup =
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/core/engine/digikikify.ts',
    exportedIdentifier: 'digikikify',
    // TODO: these fields are not used. The two hard coded configurations in this file should really be part of two separate singleton collections
    estinantListKeyIdentifierName: '',
    initialVoictentByGeppKeyIdentifierName: '',
  };
