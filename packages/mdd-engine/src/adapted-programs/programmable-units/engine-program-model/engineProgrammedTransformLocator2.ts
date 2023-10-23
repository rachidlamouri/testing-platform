import { TSESTree } from '@typescript-eslint/typescript-estree';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
  memoizeGetter,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { ExportLocatorId } from '../type-script-file/exportLocatorId';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';

const ENGINE_PROGRAMMED_TRANSFORM_BUILD_ADD_METADATA_FOR_SERIALIZATION_LOCATOR_ID =
  ['filePath', 'index'] as const satisfies GenericComplexIdTemplate;
type EngineProgrammedTransformBuildAddMetadataForSerializationLocatorIdTemplate =
  typeof ENGINE_PROGRAMMED_TRANSFORM_BUILD_ADD_METADATA_FOR_SERIALIZATION_LOCATOR_ID;
class EngineProgrammedTransformBuildAddMetadataForSerializationLocatorId extends ComplexId<EngineProgrammedTransformBuildAddMetadataForSerializationLocatorIdTemplate> {
  get rawTemplate(): EngineProgrammedTransformBuildAddMetadataForSerializationLocatorIdTemplate {
    return ENGINE_PROGRAMMED_TRANSFORM_BUILD_ADD_METADATA_FOR_SERIALIZATION_LOCATOR_ID;
  }
}

const EngineProgrammedTransformLocator2IdClassSet = [
  EngineProgrammedTransformBuildAddMetadataForSerializationLocatorId,
  ExportLocatorId,
] as const;

export enum EngineProgrammedTransformLocator2TypeName {
  TopLevelDeclaration = 'TopLevelDeclaration',
  BuildAddMetadataForSerialization = 'buildAddMetadataForSerialization',
}

type BaseEngineProgrammedTransformTopLevelDeclarationLocator = {
  typeName: EngineProgrammedTransformLocator2TypeName.TopLevelDeclaration;
  identifierName: string;
  filePath: string;
  isCoreProgrammedTransform: boolean;
};

type BaseEngineProgrammedTransformBuildAddMetadataForSerializationLocator = {
  typeName: EngineProgrammedTransformLocator2TypeName.BuildAddMetadataForSerialization;
  callExpression: TSESTree.CallExpression;
  filePath: string;
  isCoreProgrammedTransform: true;
  index: number;
};

type EngineProgrammedTransformLocator2Id = InstanceType<
  typeof EngineProgrammedTransformLocator2IdClassSet[number]
>;

type EngineProgrammedTransformLocatorPrototype = {
  get id(): EngineProgrammedTransformLocator2Id;
  get oldId(): string;
};

type EngineProgrammedTransformTopLevelDeclarationLocator = ObjectWithPrototype<
  BaseEngineProgrammedTransformTopLevelDeclarationLocator,
  EngineProgrammedTransformLocatorPrototype
>;

type EngineProgrammedTransformBuildAddMetadataForSerializationLocator =
  ObjectWithPrototype<
    BaseEngineProgrammedTransformBuildAddMetadataForSerializationLocator,
    EngineProgrammedTransformLocatorPrototype
  >;

/**
 * The information needed to find a transform definition
 *
 * @readableName ProgrammedTransformLocator
 *
 * @canonicalDeclaration
 */
export type EngineProgrammedTransformLocator2 =
  | EngineProgrammedTransformTopLevelDeclarationLocator
  | EngineProgrammedTransformBuildAddMetadataForSerializationLocator;

export const { EngineProgrammedTransformTopLevelDeclarationLocatorInstance } =
  buildConstructorFunctionWithName(
    'EngineProgrammedTransformTopLevelDeclarationLocatorInstance',
  )<
    BaseEngineProgrammedTransformTopLevelDeclarationLocator,
    EngineProgrammedTransformLocatorPrototype
  >({
    id: memoizeGetter((locator) => {
      return ExportLocatorId.fromLocator(locator);
    }),
    oldId: (locator) => locator.id.forMachine,
  });

export const {
  EngineProgrammedTransformBuildAddMetadataForSerializationLocatorInstance,
} = buildConstructorFunctionWithName(
  'EngineProgrammedTransformBuildAddMetadataForSerializationLocatorInstance',
)<
  BaseEngineProgrammedTransformBuildAddMetadataForSerializationLocator,
  EngineProgrammedTransformLocatorPrototype
>({
  id: memoizeGetter((locator) => {
    return new EngineProgrammedTransformBuildAddMetadataForSerializationLocatorId(
      {
        filePath: locator.filePath,
        index: `${locator.index}`,
      },
    );
  }),
  oldId: (locator) => locator.id.forMachine,
});
