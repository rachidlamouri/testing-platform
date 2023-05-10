import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type EngineEstinantLocator2 = {
  identifierName: string;
  filePath: string;
  isCoreEstinant: boolean;
};

export const getEngineEstinantLocatorZorn = (
  locator: Omit<EngineEstinantLocator2, 'isCoreEstinant'>,
) => `${locator.identifierName}:${locator.filePath}` as const;

export type EngineEstinantLocator2Grition = Grition<EngineEstinantLocator2>;

export type EngineEstinantLocator2Odeshin =
  OdeshinFromGrition<EngineEstinantLocator2Grition>;

export const ENGINE_ESTINANT_LOCATOR_2_GEPP = 'engine-estinant-locator-2';

export type EngineEstinantLocator2Gepp = typeof ENGINE_ESTINANT_LOCATOR_2_GEPP;

export type EngineEstinantLocator2Voictent = Voictent<
  EngineEstinantLocator2Gepp,
  EngineEstinantLocator2Odeshin
>;
