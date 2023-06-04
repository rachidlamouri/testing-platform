import { Tuple } from '../../../utilities/semantic-types/tuple';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_ESTINANT_2_GEPP,
  EngineEstinant2Voque,
} from './engineEstinant2';
import {
  ENGINE_PROGRAM_2_GEPP,
  EngineProgram2Instance,
  EngineProgram2Voque,
} from './engineProgram2';
import {
  ENGINE_PROGRAM_LOCATOR_2_GEPP,
  EngineProgramLocator2Voque,
} from './engineProgramLocator2';
import { ENGINE_VOQUE_GEPP, EngineVoqueVoque } from './engineVoque';
import { EngineVoqueLocator } from './engineVoqueLocator';

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
      return rightInput.hubblepup.locator.zorn;
    },
  })
  .andFromVoictent2<EngineVoqueVoque>({
    gepp: ENGINE_VOQUE_GEPP,
  })
  .toHubblepup2<EngineProgram2Voque>({
    gepp: ENGINE_PROGRAM_2_GEPP,
  })
  .onPinbe((engineProgramLocator, estinantList, allVoqueList) => {
    const allVoqueByFilePath = new Map(
      allVoqueList.map((voque) => [voque.filePath, voque] as const),
    );

    const voqueList = [
      ...engineProgramLocator.engineVoqueLocatorList,
      ...estinantList.flatMap((estinant) => {
        return [...estinant.inputList, ...estinant.outputList].flatMap(
          (inputOutput) => {
            return inputOutput.voqueLocator;
          },
        );
      }),
    ]
      .filter(
        (voqueLocator): voqueLocator is EngineVoqueLocator =>
          voqueLocator !== undefined,
      )
      .map((voqueLocator) => {
        const voque = allVoqueByFilePath.get(voqueLocator.filePath);

        if (!voque) {
          throw Error('Apparently this is reachable, but it shouldnt be');
        }

        return voque;
      });

    return new EngineProgram2Instance({
      programName: engineProgramLocator.programName,
      description: engineProgramLocator.description,
      filePath: engineProgramLocator.filePath,
      voictentLocatorList: engineProgramLocator.voictentLocatorList,
      estinantList,
      voqueList,
      locator: engineProgramLocator,
    });
  })
  .assemble();
