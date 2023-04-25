import * as uuid from 'uuid';
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
      id: uuid.v4(),
      programName: engineProgramLocator.programName,
      filePath: engineProgramLocator.filePath,
      estinantList,
    };
  })
  .assemble();
