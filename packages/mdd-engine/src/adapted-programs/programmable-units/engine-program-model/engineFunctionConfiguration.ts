/**
 * @todo tie the engine function keys back to the source files somehow
 */

import { StandardInMemoryStreamMetatype } from '../../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';

export enum EngineFunctionConfigurationTypeName {
  Core = 'Core',
  Core2 = 'Core2',
  Adapted = 'Adapted',
}

export type CoreEngineFunction2Configuration = {
  typeName: EngineFunctionConfigurationTypeName.Core2;
  filePath: 'packages/mdd-engine/src/core/engine/runEngine.ts';
  exportedIdentifier: 'runEngine2';
  programmedTransformListKeyIdentifierName: 'programmedTransformTuple';
  collectionListKeyIdentifierName: 'inputCollectionList';
  collectionCollectionIdKeyIdentifierName: 'collectionId';
  initialItemEggTupleKeyIdentifierName: 'initialItemEggTuple';
};

export type AdaptedEngineFunctionConfiguration = {
  typeName: EngineFunctionConfigurationTypeName.Adapted;
  filePath: 'packages/mdd-engine/src/adapter/engine/runEngine.ts';
  exportedIdentifier: 'runEngine';
  programmedTransformListKeyIdentifierName: 'programmedTransformTuple';
  explicitCollectionTupleKeyIdentifierName: 'explicitCollectionTuple';
  uninferableCollectionByCollectionIdKeyIdentifierName: 'uninferableCollectionByCollectionId';
};

/**
 * The information needed to identify an engine program and to parse a program
 * call
 *
 * @todo rename to EngineRunnerConfiguration
 */
export type EngineFunctionConfiguration =
  | CoreEngineFunction2Configuration
  | AdaptedEngineFunctionConfiguration;

export const ENGINE_FUNCTION_CONFIGURATION_COLLECTION_ID =
  'engine-function-configuration';

type EngineFunctionConfigurationCollectionId =
  typeof ENGINE_FUNCTION_CONFIGURATION_COLLECTION_ID;

export type EngineFunctionConfigurationStreamMetatype =
  StandardInMemoryStreamMetatype<
    EngineFunctionConfigurationCollectionId,
    EngineFunctionConfiguration
  >;

const CORE_ENGINE_FUNCTION_2_CONFIGURATION: CoreEngineFunction2Configuration = {
  typeName: EngineFunctionConfigurationTypeName.Core2,
  filePath: 'packages/mdd-engine/src/core/engine/runEngine.ts',
  exportedIdentifier: 'runEngine2',
  programmedTransformListKeyIdentifierName: 'programmedTransformTuple',
  collectionListKeyIdentifierName: 'inputCollectionList',
  collectionCollectionIdKeyIdentifierName: 'collectionId',
  initialItemEggTupleKeyIdentifierName: 'initialItemEggTuple',
};

const ADAPTED_ENGINE_FUNCTION_CONFIGURATION: AdaptedEngineFunctionConfiguration =
  {
    typeName: EngineFunctionConfigurationTypeName.Adapted,
    filePath: 'packages/mdd-engine/src/adapter/engine/runEngine.ts',
    exportedIdentifier: 'runEngine',
    programmedTransformListKeyIdentifierName: 'programmedTransformTuple',
    explicitCollectionTupleKeyIdentifierName: 'explicitCollectionTuple',
    uninferableCollectionByCollectionIdKeyIdentifierName:
      'uninferableCollectionByCollectionId',
  };

export const ENGINE_FUNCTION_CONFIGURATION_LIST = [
  CORE_ENGINE_FUNCTION_2_CONFIGURATION,
  ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
];
