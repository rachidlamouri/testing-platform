import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type EngineEstinantLocator = {
  programName: string;
  estinantName: string;
  estinantFilePath: string;
  exportedIdentifierName: string;
};

export type EngineEstinantLocatorGrition = Grition<EngineEstinantLocator>;

export type EngineEstinantLocatorOdeshin =
  OdeshinFromGrition<EngineEstinantLocatorGrition>;

export const ENGINE_ESTINANT_LOCATOR_GEPP = 'engine-estinant-locator';

export type EngineEstinantLocatorGepp = typeof ENGINE_ESTINANT_LOCATOR_GEPP;

export type EngineEstinantLocatorVoictent = Voictent<
  EngineEstinantLocatorGepp,
  EngineEstinantLocatorOdeshin
>;
