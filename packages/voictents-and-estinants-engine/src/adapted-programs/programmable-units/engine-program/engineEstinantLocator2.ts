import { TSESTree } from '@typescript-eslint/typescript-estree';
import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
  memoizeGetter,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { ExportLocatorId } from '../type-script-file/getExportLocatorId';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';

const ENGINE_ESTINANT_BUILD_ADD_METADATA_FOR_SERIALIZATION_LOCATOR_ZORN = [
  'filePath',
  'index',
] as const satisfies GenericComplexIdTemplate;
type EngineEstinantBuildAddMetadataForSerializationLocatorZornTemplate =
  typeof ENGINE_ESTINANT_BUILD_ADD_METADATA_FOR_SERIALIZATION_LOCATOR_ZORN;
class EngineEstinantBuildAddMetadataForSerializationLocatorZorn extends ComplexId<EngineEstinantBuildAddMetadataForSerializationLocatorZornTemplate> {
  get rawTemplate(): EngineEstinantBuildAddMetadataForSerializationLocatorZornTemplate {
    return ENGINE_ESTINANT_BUILD_ADD_METADATA_FOR_SERIALIZATION_LOCATOR_ZORN;
  }
}

export const EngineEstinantLocator2ZornClassSet = [
  EngineEstinantBuildAddMetadataForSerializationLocatorZorn,
  ExportLocatorId,
] as const;

export enum EngineProgrammedTransformLocator2TypeName {
  TopLevelDeclaration = 'TopLevelDeclaration',
  BuildAddMetadataForSerialization = 'buildAddMetadataForSerialization',
}

type BaseEngineEstinantTopLevelDeclarationLocator = {
  typeName: EngineProgrammedTransformLocator2TypeName.TopLevelDeclaration;
  identifierName: string;
  filePath: string;
  isCoreEstinant: boolean;
};

type BaseEngineEstinantBuildAddMetadataForSerializationLocator = {
  typeName: EngineProgrammedTransformLocator2TypeName.BuildAddMetadataForSerialization;
  callExpression: TSESTree.CallExpression;
  filePath: string;
  isCoreEstinant: true;
  index: number;
};

type EngineEstinantLocator2Zorn = InstanceType<
  typeof EngineEstinantLocator2ZornClassSet[number]
>;

type EngineEstinantLocatorPrototype = {
  get id(): EngineEstinantLocator2Zorn;
  get oldId(): string;
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
    id: memoizeGetter((locator) => {
      return ExportLocatorId.fromLocator(locator);
    }),
    oldId: (locator) => locator.id.forMachine,
  });

export const { EngineEstinantBuildAddMetadataForSerializationLocatorInstance } =
  buildConstructorFunctionWithName(
    'EngineEstinantBuildAddMetadataForSerializationLocatorInstance',
  )<
    BaseEngineEstinantBuildAddMetadataForSerializationLocator,
    EngineEstinantLocatorPrototype
  >({
    id: memoizeGetter((locator) => {
      return new EngineEstinantBuildAddMetadataForSerializationLocatorZorn({
        filePath: locator.filePath,
        index: `${locator.index}`,
      });
    }),
    oldId: (locator) => locator.id.forMachine,
  });

export const ENGINE_ESTINANT_LOCATOR_2_GEPP = 'engine-estinant-locator-2';

type EngineEstinantLocator2Gepp = typeof ENGINE_ESTINANT_LOCATOR_2_GEPP;

export type EngineEstinantLocator2Voque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    EngineEstinantLocator2Gepp,
    EngineEstinantLocator2
  >;
