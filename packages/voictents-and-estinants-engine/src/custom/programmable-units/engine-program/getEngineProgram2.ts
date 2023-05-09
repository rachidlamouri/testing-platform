import { Tuple } from '../../../utilities/semantic-types/tuple';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_ESTINANT_2_GEPP,
  EngineEstinant2Voictent,
} from './engineEstinant2';
import { getEngineEstinantLocatorZorn } from './engineEstinantLocator2';
import {
  ENGINE_PROGRAM_2_GEPP,
  EngineProgram2Voictent,
} from './engineProgram2';
import {
  ENGINE_PROGRAM_LOCATOR_2_GEPP,
  EngineProgramLocator2Voictent,
} from './engineProgramLocator2';
import { getTextDigest } from '../../../utilities/getTextDigest';

/**
 * Joins the program locator to its transforms in order to
 * construct an object that represents an engine program.
 */
export const getEngineProgram2 = buildEstinant({
  name: 'getEngineProgram2',
})
  .fromGrition<EngineProgramLocator2Voictent>({
    gepp: ENGINE_PROGRAM_LOCATOR_2_GEPP,
  })
  .andFromGritionTuple<EngineEstinant2Voictent, Tuple<string>>({
    gepp: ENGINE_ESTINANT_2_GEPP,
    framate: (leftInput) => {
      return leftInput.grition.engineEstinantLocatorList.map((locator) => {
        return getEngineEstinantLocatorZorn(locator);
      });
    },
    croard: (rightInput) => {
      return getEngineEstinantLocatorZorn(rightInput.grition);
    },
  })
  .toGrition<EngineProgram2Voictent>({
    gepp: ENGINE_PROGRAM_2_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((engineProgramLocator, estinantList) => {
    return {
      id: getTextDigest(engineProgramLocator.programName),
      programName: engineProgramLocator.programName,
      description: engineProgramLocator.description,
      filePath: engineProgramLocator.filePath,
      voictentLocatorList: engineProgramLocator.voictentLocatorList,
      estinantList,
    };
  })
  .assemble();
