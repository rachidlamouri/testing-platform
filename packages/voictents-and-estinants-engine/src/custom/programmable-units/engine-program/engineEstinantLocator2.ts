import { TSESTree } from '@typescript-eslint/typescript-estree';
import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export enum EngineEstinantLocator2TypeName {
  TopLevelDeclaration = 'TopLevelDeclaration',
  BuildAddMetadataForSerialization = 'buildAddMetadataForSerialization',
}

export type EngineEstinantTopLevelDeclarationLocator = {
  typeName: EngineEstinantLocator2TypeName.TopLevelDeclaration;
  identifierName: string;
  filePath: string;
  isCoreEstinant: boolean;
};

export type EngineEstinantBuildAddMetadataForSerializationLocator = {
  typeName: EngineEstinantLocator2TypeName.BuildAddMetadataForSerialization;
  callExpression: TSESTree.CallExpression;
  filePath: string;
  isCoreEstinant: true;
  index: number;
};

export type EngineEstinantLocator2 =
  | EngineEstinantTopLevelDeclarationLocator
  | EngineEstinantBuildAddMetadataForSerializationLocator;

export const getEngineEstinantLocatorZorn = (
  locator: EngineEstinantLocator2,
): string => {
  switch (locator.typeName) {
    case EngineEstinantLocator2TypeName.BuildAddMetadataForSerialization:
      return `${locator.filePath}:${locator.index}` as const;
    case EngineEstinantLocator2TypeName.TopLevelDeclaration:
      return `${locator.identifierName}:${locator.filePath}` as const;
  }
};

export type EngineEstinantLocator2Grition = Grition<EngineEstinantLocator2>;

export type EngineEstinantLocator2Odeshin =
  OdeshinFromGrition<EngineEstinantLocator2Grition>;

export const ENGINE_ESTINANT_LOCATOR_2_GEPP = 'engine-estinant-locator-2';

export type EngineEstinantLocator2Gepp = typeof ENGINE_ESTINANT_LOCATOR_2_GEPP;

export type EngineEstinantLocator2Voictent = Voictent<
  EngineEstinantLocator2Gepp,
  EngineEstinantLocator2Odeshin
>;
