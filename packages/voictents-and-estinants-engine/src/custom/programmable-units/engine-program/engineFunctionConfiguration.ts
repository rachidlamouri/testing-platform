import { Grition } from '../../adapter/grition';
import { Hubblepup } from '../../adapter/hubblepup';
import { Voictent } from '../../adapter/voictent';

export enum EngineFunctionConfigurationTypeName {
  Core = 'Core',
  Core2 = 'Core2',
  Adapted = 'Adapted',
}

export type CoreEngineFunctionConfiguration = {
  typeName: EngineFunctionConfigurationTypeName.Core;
  filePath: 'packages/voictents-and-estinants-engine/src/core/engine/digikikify.ts';
  exportedIdentifier: 'digikikify';
};

export type CoreEngineFunction2Configuration = {
  typeName: EngineFunctionConfigurationTypeName.Core2;
  filePath: 'packages/voictents-and-estinants-engine/src/core/engine/digikikify.ts';
  exportedIdentifier: 'digikikify2';
  estinantListKeyIdentifierName: 'estinantTuple';
  voictentListKeyIdentifierName: 'inputVoictentList';
  voictentGeppKeyIdentifierName: 'gepp';
};

export type AdaptedEngineFunctionConfiguration = {
  typeName: EngineFunctionConfigurationTypeName.Adapted;
  filePath: 'packages/voictents-and-estinants-engine/src/type-script-adapter/digikikify.ts';
  exportedIdentifier: 'digikikify';
  estinantListKeyIdentifierName: 'estinantTuple';
  initialVoictentByGeppKeyIdentifierName: 'initialVoictentsByGepp';
};

export type EngineFunctionConfiguration =
  | CoreEngineFunctionConfiguration
  | CoreEngineFunction2Configuration
  | AdaptedEngineFunctionConfiguration;

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

export const CORE_ENGINE_FUNCTION_CONFIGURATION: CoreEngineFunctionConfiguration =
  {
    typeName: EngineFunctionConfigurationTypeName.Core,
    filePath:
      'packages/voictents-and-estinants-engine/src/core/engine/digikikify.ts',
    exportedIdentifier: 'digikikify',
  };

export const CORE_ENGINE_FUNCTION_2_CONFIGURATION: CoreEngineFunction2Configuration =
  {
    typeName: EngineFunctionConfigurationTypeName.Core2,
    filePath:
      'packages/voictents-and-estinants-engine/src/core/engine/digikikify.ts',
    exportedIdentifier: 'digikikify2',
    estinantListKeyIdentifierName: 'estinantTuple',
    voictentListKeyIdentifierName: 'inputVoictentList',
    voictentGeppKeyIdentifierName: 'gepp',
  };

export const ADAPTED_ENGINE_FUNCTION_CONFIGURATION: AdaptedEngineFunctionConfiguration =
  {
    typeName: EngineFunctionConfigurationTypeName.Adapted,
    filePath:
      'packages/voictents-and-estinants-engine/src/type-script-adapter/digikikify.ts',
    exportedIdentifier: 'digikikify',
    estinantListKeyIdentifierName: 'estinantTuple',
    initialVoictentByGeppKeyIdentifierName: 'initialVoictentsByGepp',
  };
