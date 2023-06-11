import { isNotNull } from '../../../utilities/isNotNull';
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
import {
  ENGINE_VOQUE_GEPP,
  EngineVoque,
  EngineVoqueVoque,
} from './engineVoque';
import { EngineVoqueLocator } from './engineVoqueLocator';
import {
  ENGINE_VOQUE_PROGRAM_RELATIONSHIP_GEPP,
  EngineVoqueProgramRelationshipInstance,
  EngineVoqueProgramRelationshipVoque,
} from './engineVoqueProgramRelationship';

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
  .toHubblepupTuple2<EngineVoqueProgramRelationshipVoque>({
    gepp: ENGINE_VOQUE_PROGRAM_RELATIONSHIP_GEPP,
  })
  .onPinbe((engineProgramLocator, estinantList, allCodebaseVoqueList) => {
    // TODO: we can join the program locator to the estinant locator list and then that combined data structure to the voque list
    const allCodebaseVoqueByFilePath = new Map(
      allCodebaseVoqueList.map((voque) => [voque.filePath, voque] as const),
    );

    const getVoqueFromLocator = (
      voqueLocator: EngineVoqueLocator,
    ): EngineVoque => {
      const voque = allCodebaseVoqueByFilePath.get(voqueLocator.filePath);

      if (!voque) {
        throw Error(
          'Apparently this is reachable, but it shouldnt be. You should fix that',
        );
      }

      return voque;
    };

    const initializedVoqueList =
      engineProgramLocator.engineVoqueLocatorList.map(getVoqueFromLocator);

    const allProgramVoqueList = [
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
      .map(getVoqueFromLocator);

    const allUniqueVoqueList = [
      ...new Map(
        allProgramVoqueList.map((engineVoque) => {
          return [engineVoque.zorn, engineVoque] as const;
        }),
      ).values(),
    ];

    const startingVoqueIdSet = new Set(
      initializedVoqueList.map((engineVoque) => engineVoque.id),
    );

    const allEstinantInputVoqueIdList = estinantList
      .flatMap((engineEstinant) => {
        return engineEstinant.inputList.map((estinantInput) => {
          return estinantInput.voqueLocator?.id ?? null;
        });
      })
      .filter(isNotNull);

    const allEstinantInputVoqueIdSet = new Set(allEstinantInputVoqueIdList);

    // TODO: compute this list in getEngineProgram
    const endingVoqueList = allUniqueVoqueList.filter((engineVoque) => {
      const isStartingVoque = startingVoqueIdSet.has(engineVoque.id);
      const isConsumed = allEstinantInputVoqueIdSet.has(engineVoque.id);

      const isEndingVoque = !(isStartingVoque || isConsumed);
      return isEndingVoque;
    });

    const voqueToProgramRelationshipList = allUniqueVoqueList.map(
      (engineVoque) => {
        const relationship = new EngineVoqueProgramRelationshipInstance({
          rootGraphLocator: engineProgramLocator.rootGraphLocator,
          engineVoqueLocator: engineVoque.locator,
        });

        return relationship;
      },
    );

    return {
      [ENGINE_PROGRAM_2_GEPP]: new EngineProgram2Instance({
        programName: engineProgramLocator.programName,
        description: engineProgramLocator.description,
        filePath: engineProgramLocator.filePath,
        voictentLocatorList: engineProgramLocator.voictentLocatorList,
        estinantList,
        allVoqueList: allProgramVoqueList,
        initializedVoqueList,
        endingVoqueList,
        locator: engineProgramLocator,
      }),
      [ENGINE_VOQUE_PROGRAM_RELATIONSHIP_GEPP]: voqueToProgramRelationshipList,
    };
  })
  .assemble();
