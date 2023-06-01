import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../adapter/voictent';
import { EngineEstinantLocator2 } from './engineEstinantLocator2';
import { ReceivedEngineVoqueLocator } from './engineVoqueLocator';

export type VoictentLocator = {
  name: string;
  hasInitialInput: boolean;
};

/**
 * The information needed to find the parts of an engine program so that it can
 * be assembled later into a complete model
 */
export type EngineProgramLocator2 = {
  zorn: string;
  programName: string;
  description: string;
  filePath: string;
  engineVoqueLocatorList: ReceivedEngineVoqueLocator[];
  voictentLocatorList: VoictentLocator[];
  engineEstinantLocatorList: EngineEstinantLocator2[];
};

export const ENGINE_PROGRAM_LOCATOR_2_GEPP = 'engine-program-locator-2';

export type EngineProgramLocator2Gepp = typeof ENGINE_PROGRAM_LOCATOR_2_GEPP;

export type EngineProgramLocator2Voictent = Voictent<
  EngineProgramLocator2Gepp,
  EngineProgramLocator2
>;

export type EngineProgramLocator2Voque = InMemoryOdeshin2Voque<
  EngineProgramLocator2Gepp,
  EngineProgramLocator2
>;
