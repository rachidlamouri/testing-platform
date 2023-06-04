import { TSESTree } from '@typescript-eslint/typescript-estree';
import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import { getExportLocatorZorn } from '../type-script-file/getExportLocatorZorn';
import { getZorn } from '../../../utilities/getZorn';

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

type BaseEngineEstinantLocator2 =
  | BaseEngineEstinantTopLevelDeclarationLocator
  | BaseEngineEstinantBuildAddMetadataForSerializationLocator;

type EngineEstinantLocatorPrototype = {
  get zorn(): string;
};

/**
 * The information needed to find a transform definition
 */
export type EngineEstinantLocator2 = ObjectWithPrototype<
  BaseEngineEstinantLocator2,
  EngineEstinantLocatorPrototype
>;

export type EngineEstinantTopLevelDeclarationLocator = Extract<
  EngineEstinantLocator2,
  BaseEngineEstinantTopLevelDeclarationLocator
>;

export type EngineEstinantBuildAddMetadataForSerializationLocator = Extract<
  EngineEstinantLocator2,
  BaseEngineEstinantBuildAddMetadataForSerializationLocator
>;

export const { EngineEstinantLocator2Instance } =
  buildConstructorFunctionWithName('EngineEstinantLocator2Instance')<
    BaseEngineEstinantLocator2,
    EngineEstinantLocatorPrototype
  >({
    zorn: (locator: EngineEstinantLocator2) => {
      if (
        locator.typeName === EngineEstinantLocator2TypeName.TopLevelDeclaration
      ) {
        return getExportLocatorZorn(locator);
      }

      return getZorn([locator.filePath, 'index', `${locator.index}`]);
    },
  });

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
