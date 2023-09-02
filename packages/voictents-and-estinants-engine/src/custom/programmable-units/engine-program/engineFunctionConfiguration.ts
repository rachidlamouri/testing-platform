/**
 * @todo tie the engine function keys back to the source files somehow
 */

import { StandardInMemoryVoque } from '../../../core/engine/inMemoryVoque';

export enum EngineFunctionConfigurationTypeName {
  Core = 'Core',
  Core2 = 'Core2',
  Adapted = 'Adapted',
}

type CoreEngineFunctionConfiguration = {
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
  initialHubblepupPelueTupleKeyIdentifierName: 'initialHubblepupPelueTuple';
};

export type AdaptedEngineFunctionConfiguration = {
  typeName: EngineFunctionConfigurationTypeName.Adapted;
  filePath: 'packages/voictents-and-estinants-engine/src/type-script-adapter/digikikify.ts';
  exportedIdentifier: 'digikikify';
  estinantListKeyIdentifierName: 'estinantTuple';
  explicitVoictentTupleKeyIdentifierName: 'explicitVoictentTuple';
  uninferableVoictentByGeppKeyIdentifierName: 'uninferableVoictentByGepp';
};

/**
 * The information needed to identify an engine program and to parse a program
 * call
 */
export type EngineFunctionConfiguration =
  | CoreEngineFunctionConfiguration
  | CoreEngineFunction2Configuration
  | AdaptedEngineFunctionConfiguration;

export const ENGINE_FUNCTION_CONFIGURATION_GEPP =
  'engine-function-configuration';

type EngineFunctionConfigurationGepp =
  typeof ENGINE_FUNCTION_CONFIGURATION_GEPP;

export type EngineFunctionConfigurationVoque = StandardInMemoryVoque<
  EngineFunctionConfigurationGepp,
  EngineFunctionConfiguration
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
    initialHubblepupPelueTupleKeyIdentifierName: 'initialHubblepupPelueTuple',
  };

export const ADAPTED_ENGINE_FUNCTION_CONFIGURATION: AdaptedEngineFunctionConfiguration =
  {
    typeName: EngineFunctionConfigurationTypeName.Adapted,
    filePath:
      'packages/voictents-and-estinants-engine/src/type-script-adapter/digikikify.ts',
    exportedIdentifier: 'digikikify',
    estinantListKeyIdentifierName: 'estinantTuple',
    explicitVoictentTupleKeyIdentifierName: 'explicitVoictentTuple',
    uninferableVoictentByGeppKeyIdentifierName: 'uninferableVoictentByGepp',
  };
