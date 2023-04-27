import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import { EngineEstinantLocator2 } from './engineEstinantLocator2';

export type EngineProgramLocator2 = {
  programName: string;
  description: string;
  filePath: string;
  initialVoictentNameList: string[];
  engineEstinantLocatorList: EngineEstinantLocator2[];
};

export type EngineProgramLocator2Grition = Grition<EngineProgramLocator2>;

export type EngineProgramLocator2Odeshin =
  OdeshinFromGrition<EngineProgramLocator2Grition>;

export const ENGINE_PROGRAM_LOCATOR_2_GEPP = 'engine-program-locator-2';

export type EngineProgramLocator2Gepp = typeof ENGINE_PROGRAM_LOCATOR_2_GEPP;

export type EngineProgramLocator2Voictent = Voictent<
  EngineProgramLocator2Gepp,
  EngineProgramLocator2Odeshin
>;
