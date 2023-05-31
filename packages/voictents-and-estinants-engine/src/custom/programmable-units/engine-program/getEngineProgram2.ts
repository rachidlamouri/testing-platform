import { Tuple } from '../../../utilities/semantic-types/tuple';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_ESTINANT_2_GEPP,
  EngineEstinant2Voque,
} from './engineEstinant2';
import { ENGINE_PROGRAM_2_GEPP, EngineProgram2Voque } from './engineProgram2';
import {
  ENGINE_PROGRAM_LOCATOR_2_GEPP,
  EngineProgramLocator2Voque,
} from './engineProgramLocator2';
import { getTextDigest } from '../../../utilities/getTextDigest';
import { ENGINE_VOQUE_GEPP, EngineVoqueVoque } from './engineVoque';

/**
 * Joins the program locator to its transforms in order to
 * construct an object that represents an engine program.
 */
export const getEngineProgram2 = buildEstinant({
  name: 'getEngineProgram2',
})
  .fromHubblepup2<EngineProgramLocator2Voque>({
    gepp: ENGINE_PROGRAM_LOCATOR_2_GEPP,
  })
  .andFromHubblepupTuple2<EngineEstinant2Voque, Tuple<string>>({
    gepp: ENGINE_ESTINANT_2_GEPP,
    framate: (leftInput) => {
      return leftInput.hubblepup.engineEstinantLocatorList.map((locator) => {
        return locator.zorn;
      });
    },
    croard: (rightInput) => {
      return rightInput.indexByName.zorn;
    },
  })
  .andFromHubblepupTuple2<EngineVoqueVoque, Tuple<string>>({
    gepp: ENGINE_VOQUE_GEPP,
    // TODO: this logic is messy. Maybe the framate/croard pattern is bad? Should it just be (left, right) => left.x === right.x?
    framate: (left) =>
      left.hubblepup.engineVoqueLocatorList.map(
        (locator) => `${locator.filePath}|${locator.identifierName}`,
      ),
    croard: (right) =>
      `${right.hubblepup.filePath}|${right.hubblepup.identifierName}`,
  })
  .toHubblepup2<EngineProgram2Voque>({
    gepp: ENGINE_PROGRAM_2_GEPP,
  })
  .onPinbe((engineProgramLocator, estinantList, voqueList) => {
    return {
      zorn: engineProgramLocator.zorn,
      id: getTextDigest(engineProgramLocator.programName),
      programName: engineProgramLocator.programName,
      description: engineProgramLocator.description,
      filePath: engineProgramLocator.filePath,
      voictentLocatorList: engineProgramLocator.voictentLocatorList,
      estinantList,
      voqueList,
    };
  })
  .assemble();
