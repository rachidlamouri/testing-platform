import { TSESTree } from '@typescript-eslint/typescript-estree';
import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import { getExportLocatorZorn } from '../type-script-file/getExportLocatorZorn';
import { getZorn } from '../../../utilities/getZorn';
import { getZornableId } from '../../../utilities/getZornableId';

export enum EngineEstinantLocator2TypeName {
  TopLevelDeclaration = 'TopLevelDeclaration',
  BuildAddMetadataForSerialization = 'buildAddMetadataForSerialization',
}

type BaseEngineEstinantTopLevelDeclarationLocator = {
  typeName: EngineEstinantLocator2TypeName.TopLevelDeclaration;
  identifierName: string;
  filePath: string;
  isCoreEstinant: boolean;
};

type BaseEngineEstinantBuildAddMetadataForSerializationLocator = {
  typeName: EngineEstinantLocator2TypeName.BuildAddMetadataForSerialization;
  callExpression: TSESTree.CallExpression;
  filePath: string;
  isCoreEstinant: true;
  index: number;
};

type EngineEstinantLocatorPrototype = {
  get zorn(): string;
  get id(): string;
};

export type EngineEstinantTopLevelDeclarationLocator = ObjectWithPrototype<
  BaseEngineEstinantTopLevelDeclarationLocator,
  EngineEstinantLocatorPrototype
>;

export type EngineEstinantBuildAddMetadataForSerializationLocator =
  ObjectWithPrototype<
    BaseEngineEstinantBuildAddMetadataForSerializationLocator,
    EngineEstinantLocatorPrototype
  >;

/**
 * The information needed to find a transform definition
 */
export type EngineEstinantLocator2 =
  | EngineEstinantTopLevelDeclarationLocator
  | EngineEstinantBuildAddMetadataForSerializationLocator;

export const { EngineEstinantTopLevelDeclarationLocatorInstance } =
  buildConstructorFunctionWithName(
    'EngineEstinantTopLevelDeclarationLocatorInstance',
  )<
    BaseEngineEstinantTopLevelDeclarationLocator,
    EngineEstinantLocatorPrototype
  >({
    zorn: (locator) => {
      return getExportLocatorZorn(locator);
    },
    id: getZornableId,
  });

export const { EngineEstinantBuildAddMetadataForSerializationLocatorInstance } =
  buildConstructorFunctionWithName(
    'EngineEstinantBuildAddMetadataForSerializationLocatorInstance',
  )<
    BaseEngineEstinantBuildAddMetadataForSerializationLocator,
    EngineEstinantLocatorPrototype
  >({
    zorn: (locator) => {
      return getZorn([locator.filePath, 'index', `${locator.index}`]);
    },
    id: getZornableId,
  });

export const ENGINE_ESTINANT_LOCATOR_2_GEPP = 'engine-estinant-locator-2';

type EngineEstinantLocator2Gepp = typeof ENGINE_ESTINANT_LOCATOR_2_GEPP;

export type EngineEstinantLocator2Voque = InMemoryOdeshin2Voque<
  EngineEstinantLocator2Gepp,
  EngineEstinantLocator2
>;
