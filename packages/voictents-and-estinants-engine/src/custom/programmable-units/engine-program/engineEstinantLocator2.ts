import { TSESTree } from '@typescript-eslint/typescript-estree';
import { Voictent } from '../../adapter/voictent';
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

export type EngineEstinantLocator2 =
  | EngineEstinantTopLevelDeclarationLocator
  | EngineEstinantBuildAddMetadataForSerializationLocator;

export const ENGINE_ESTINANT_LOCATOR_2_GEPP = 'engine-estinant-locator-2';

export type EngineEstinantLocator2Gepp = typeof ENGINE_ESTINANT_LOCATOR_2_GEPP;

export type EngineEstinantLocator2Voictent = Voictent<
  EngineEstinantLocator2Gepp,
  EngineEstinantLocator2
>;

export type EngineEstinantLocator2Voque = InMemoryOdeshin2Voque<
  EngineEstinantLocator2Gepp,
  EngineEstinantLocator2
>;
