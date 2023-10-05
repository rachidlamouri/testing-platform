import { TSESTree } from '@typescript-eslint/typescript-estree';
import { InMemoryOdeshin2ListVoque } from '../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
  memoizeGetter,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { ExportLocatorZorn } from '../type-script-file/getExportLocatorZorn';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../package-agnostic-utilities/datastructure/zorn';

const ENGINE_ESTINANT_BUILD_ADD_METADATA_FOR_SERIALIZATION_LOCATOR_ZORN = [
  'filePath',
  'index',
] as const satisfies GenericZorn2Template;
type EngineEstinantBuildAddMetadataForSerializationLocatorZornTemplate =
  typeof ENGINE_ESTINANT_BUILD_ADD_METADATA_FOR_SERIALIZATION_LOCATOR_ZORN;
class EngineEstinantBuildAddMetadataForSerializationLocatorZorn extends Zorn2<EngineEstinantBuildAddMetadataForSerializationLocatorZornTemplate> {
  get rawTemplate(): EngineEstinantBuildAddMetadataForSerializationLocatorZornTemplate {
    return ENGINE_ESTINANT_BUILD_ADD_METADATA_FOR_SERIALIZATION_LOCATOR_ZORN;
  }
}

export const EngineEstinantLocator2ZornClassSet = [
  EngineEstinantBuildAddMetadataForSerializationLocatorZorn,
  ExportLocatorZorn,
] as const;

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

type EngineEstinantLocator2Zorn = InstanceType<
  typeof EngineEstinantLocator2ZornClassSet[number]
>;

type EngineEstinantLocatorPrototype = {
  get zorn(): EngineEstinantLocator2Zorn;
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
 *
 * @readableName ProgrammedTransformLocator
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
    zorn: memoizeGetter((locator) => {
      return ExportLocatorZorn.fromLocator(locator);
    }),
    id: (locator) => locator.zorn.forMachine,
  });

export const { EngineEstinantBuildAddMetadataForSerializationLocatorInstance } =
  buildConstructorFunctionWithName(
    'EngineEstinantBuildAddMetadataForSerializationLocatorInstance',
  )<
    BaseEngineEstinantBuildAddMetadataForSerializationLocator,
    EngineEstinantLocatorPrototype
  >({
    zorn: memoizeGetter((locator) => {
      return new EngineEstinantBuildAddMetadataForSerializationLocatorZorn({
        filePath: locator.filePath,
        index: `${locator.index}`,
      });
    }),
    id: (locator) => locator.zorn.forMachine,
  });

export const ENGINE_ESTINANT_LOCATOR_2_GEPP = 'engine-estinant-locator-2';

type EngineEstinantLocator2Gepp = typeof ENGINE_ESTINANT_LOCATOR_2_GEPP;

export type EngineEstinantLocator2Voque = InMemoryOdeshin2ListVoque<
  EngineEstinantLocator2Gepp,
  EngineEstinantLocator2
>;
