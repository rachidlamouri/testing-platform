import { TSESTree } from '@typescript-eslint/typescript-estree';
import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';

export enum EngineEstinantLocator2TypeName {
  TopLevelDeclaration = 'TopLevelDeclaration',
  BuildAddMetadataForSerialization = 'buildAddMetadataForSerialization',
}

export type EngineEstinantTopLevelDeclarationLocator = {
  zorn: string;
  typeName: EngineEstinantLocator2TypeName.TopLevelDeclaration;
  identifierName: string;
  filePath: string;
  isCoreEstinant: boolean;
};

export type EngineEstinantBuildAddMetadataForSerializationLocator = {
  zorn: string;
  typeName: EngineEstinantLocator2TypeName.BuildAddMetadataForSerialization;
  callExpression: TSESTree.CallExpression;
  filePath: string;
  isCoreEstinant: true;
  index: number;
};

/**
 * The information needed to find a transform definition
 */
export type EngineEstinantLocator2 =
  | EngineEstinantTopLevelDeclarationLocator
  | EngineEstinantBuildAddMetadataForSerializationLocator;

export const ENGINE_ESTINANT_LOCATOR_2_GEPP = 'engine-estinant-locator-2';

type EngineEstinantLocator2Gepp = typeof ENGINE_ESTINANT_LOCATOR_2_GEPP;

export type EngineEstinantLocator2Voque = InMemoryOdeshin2Voque<
  EngineEstinantLocator2Gepp,
  EngineEstinantLocator2
>;
