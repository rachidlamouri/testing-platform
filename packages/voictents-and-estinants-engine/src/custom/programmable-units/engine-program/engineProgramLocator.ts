import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type EngineProgramLocator = {
  programName: string;
  filePath: string;
  estinantIdentifierList: string[];
};

export type EngineProgramLocatorGrition = Grition<EngineProgramLocator>;

export type EngineProgramLocatorOdeshin =
  OdeshinFromGrition<EngineProgramLocatorGrition>;

export const ENGINE_PROGRAM_LOCATOR_GEPP = 'engine-program-locator';

export type EngineProgramLocatorGepp = typeof ENGINE_PROGRAM_LOCATOR_GEPP;

export type EngineProgramLocatorVoictent = Voictent<
  EngineProgramLocatorGepp,
  EngineProgramLocatorOdeshin
>;
