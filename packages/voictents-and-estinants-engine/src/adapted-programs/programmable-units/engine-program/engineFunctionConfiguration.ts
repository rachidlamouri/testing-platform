/**
 * @todo tie the engine function keys back to the source files somehow
 */

import { StandardInMemoryStreamMetatype } from '../../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';

export enum EngineFunctionConfigurationTypeName {
  Core = 'Core',
  Core2 = 'Core2',
  Adapted = 'Adapted',
}

type CoreEngineFunctionConfiguration = {
  typeName: EngineFunctionConfigurationTypeName.Core;
  filePath: 'packages/voictents-and-estinants-engine/src/core/engine/runEngine.ts';
  exportedIdentifier: 'digikikify';
};

export type CoreEngineFunction2Configuration = {
  typeName: EngineFunctionConfigurationTypeName.Core2;
  filePath: 'packages/voictents-and-estinants-engine/src/core/engine/runEngine.ts';
  exportedIdentifier: 'runEngine2';
  programmedTransformListKeyIdentifierName: 'programmedTransformTuple';
  collectionListKeyIdentifierName: 'inputCollectionList';
  collectionCollectionIdKeyIdentifierName: 'collectionId';
  initialItemEggTupleKeyIdentifierName: 'initialItemEggTuple';
};

export type AdaptedEngineFunctionConfiguration = {
  typeName: EngineFunctionConfigurationTypeName.Adapted;
  filePath: 'packages/voictents-and-estinants-engine/src/adapter/engine/runEngine.ts';
  exportedIdentifier: 'runEngine';
  programmedTransformListKeyIdentifierName: 'programmedTransformTuple';
  explicitCollectionTupleKeyIdentifierName: 'explicitCollectionTuple';
  uninferableCollectionByCollectionIdKeyIdentifierName: 'uninferableCollectionByCollectionId';
};

/**
 * The information needed to identify an engine program and to parse a program
 * call
 */
export type EngineFunctionConfiguration =
  | CoreEngineFunctionConfiguration
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

export const CORE_ENGINE_FUNCTION_CONFIGURATION: CoreEngineFunctionConfiguration =
  {
    typeName: EngineFunctionConfigurationTypeName.Core,
    filePath:
      'packages/voictents-and-estinants-engine/src/core/engine/runEngine.ts',
    exportedIdentifier: 'digikikify',
  };

export const CORE_ENGINE_FUNCTION_2_CONFIGURATION: CoreEngineFunction2Configuration =
  {
    typeName: EngineFunctionConfigurationTypeName.Core2,
    filePath:
      'packages/voictents-and-estinants-engine/src/core/engine/runEngine.ts',
    exportedIdentifier: 'runEngine2',
    programmedTransformListKeyIdentifierName: 'programmedTransformTuple',
    collectionListKeyIdentifierName: 'inputCollectionList',
    collectionCollectionIdKeyIdentifierName: 'collectionId',
    initialItemEggTupleKeyIdentifierName: 'initialItemEggTuple',
  };

export const ADAPTED_ENGINE_FUNCTION_CONFIGURATION: AdaptedEngineFunctionConfiguration =
  {
    typeName: EngineFunctionConfigurationTypeName.Adapted,
    filePath:
      'packages/voictents-and-estinants-engine/src/adapter/engine/runEngine.ts',
    exportedIdentifier: 'runEngine',
    programmedTransformListKeyIdentifierName: 'programmedTransformTuple',
    explicitCollectionTupleKeyIdentifierName: 'explicitCollectionTuple',
    uninferableCollectionByCollectionIdKeyIdentifierName:
      'uninferableCollectionByCollectionId',
  };
