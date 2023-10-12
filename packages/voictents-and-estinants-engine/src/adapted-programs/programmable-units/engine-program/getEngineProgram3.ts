import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
import {
  EngineEstinant3Voque,
  ENGINE_ESTINANT_3_GEPP,
} from './engineEstinant3';
import {
  ENGINE_PROGRAM_3_GEPP,
  EngineProgram3Instance,
  EngineProgram3Voque,
} from './engineProgram3';
import {
  ENGINE_PROGRAM_LOCATOR_3_GEPP,
  EngineProgramLocator3Voque,
} from './engineProgramLocator3';
import {
  PROGRAM_VOQUE_RELATIONSHIP_2_GEPP,
  ProgramVoqueRelationship2Instance,
  ProgramVoqueRelationship2Voque,
} from './programVoqueRelationship2';
import {
  PROGRAM_ESTINANT_INPUT_RELATIONSHIP_GEPP,
  ProgramEstinantInputRelationshipInstance,
  ProgramEstinantInputRelationshipVoque,
} from './input-output/programEstinantInputRelationship';
import {
  ProgramEstinantOutputRelationshipVoque,
  PROGRAM_ESTINANT_OUTPUT_RELATIONSHIP_GEPP,
  ProgramEstinantOutputRelationshipInstance,
} from './input-output/programEstinantOutputRelationship';
import { EngineVoqueLocator2 } from './engineVoqueLocator2';
import { OdeshinZorn } from '../../../adapter/odeshin/identifiableItem';

/**
 * Joins the program locator to its transforms in order to
 * construct an object that represents an engine program.
 *
 * @readableName getProgramModel
 */
export const getEngineProgram3 = buildEstinant({
  name: 'getEngineProgram3',
})
  .fromHubblepup2<EngineProgramLocator3Voque>({
    gepp: ENGINE_PROGRAM_LOCATOR_3_GEPP,
  })
  .andFromHubblepupTuple2<EngineEstinant3Voque, Tuple<OdeshinZorn>>({
    gepp: ENGINE_ESTINANT_3_GEPP,
    framate: (engineProgram) => {
      return engineProgram.item.estinantRelationshipList.map((relationship) => {
        return relationship.estinantLocator.zorn;
      });
    },
    croard: (engineEstinant) => {
      return engineEstinant.item.locator.zorn;
    },
  })
  .toHubblepup2<EngineProgram3Voque>({
    gepp: ENGINE_PROGRAM_3_GEPP,
  })
  .toHubblepupTuple2<ProgramVoqueRelationship2Voque>({
    gepp: PROGRAM_VOQUE_RELATIONSHIP_2_GEPP,
  })
  .toHubblepupTuple2<ProgramEstinantInputRelationshipVoque>({
    gepp: PROGRAM_ESTINANT_INPUT_RELATIONSHIP_GEPP,
  })
  .toHubblepupTuple2<ProgramEstinantOutputRelationshipVoque>({
    gepp: PROGRAM_ESTINANT_OUTPUT_RELATIONSHIP_GEPP,
  })
  .onPinbe((engineProgramLocator, estinantList) => {
    const { rootGraphLocator } = engineProgramLocator;

    const voqueLocatorByZorn = new Map(
      [
        ...engineProgramLocator.initializedVoqueLocatorList,
        ...estinantList.flatMap((estinant) => {
          return estinant.allVoqueLocatorList;
        }),
      ].map((voqueLocator) => {
        return [voqueLocator.zorn, voqueLocator] as const;
      }),
    );

    const allVoqueLocatorList = [...voqueLocatorByZorn.values()];

    const initializedVoqueLocatorIdSet = new Set(
      engineProgramLocator.initializedVoqueLocatorList.map((voqueLocator) => {
        return voqueLocator.id;
      }),
    );

    const consumedVoqueIdSet = new Set(
      estinantList.flatMap((engineEstinant) => {
        return engineEstinant.inputList
          .map((input) => {
            return input.voqueLocator;
          })
          .filter((voqueLocator): voqueLocator is EngineVoqueLocator2 => {
            return voqueLocator !== undefined;
          })
          .map((voqueLocator) => voqueLocator.id);
      }),
    );

    const fedVoqueIdSet = new Set(
      estinantList.flatMap((engineEstinant) => {
        return engineEstinant.outputList
          .map((output) => {
            return output.voqueLocator;
          })
          .filter((voqueLocator): voqueLocator is EngineVoqueLocator2 => {
            return voqueLocator !== undefined;
          })
          .map((voqueLocator) => voqueLocator.id);
      }),
    );

    const categorizedVoqueList = allVoqueLocatorList.map((voqueLocator) => {
      const isInitialized = initializedVoqueLocatorIdSet.has(voqueLocator.id);
      const isConsumed = consumedVoqueIdSet.has(voqueLocator.id);
      const isFed = fedVoqueIdSet.has(voqueLocator.id);

      const isEndingVoque = !isConsumed;

      return {
        voqueLocator,
        isInitialized,
        isFed,
        isEndingVoque,
      };
    });

    const voqueRelationshipList = categorizedVoqueList.map(
      ({ voqueLocator, isInitialized, isFed, isEndingVoque }) => {
        let parentId: string;
        if (isInitialized && !isFed) {
          parentId = engineProgramLocator.startingSubgraphId;
        } else if (isEndingVoque) {
          parentId = engineProgramLocator.endingSubgraphId;
        } else {
          parentId = rootGraphLocator.id;
        }

        return new ProgramVoqueRelationship2Instance({
          programName: engineProgramLocator.programName,
          voqueLocator,
          rootGraphLocator,
          parentId,
        });
      },
    );

    const endingVoqueLocatorList = categorizedVoqueList
      .filter((categorizedVoque) => {
        return categorizedVoque.isEndingVoque;
      })
      .map((categorizedVoque) => categorizedVoque.voqueLocator);

    const engineProgram = new EngineProgram3Instance({
      programName: engineProgramLocator.programName,
      description: engineProgramLocator.description,
      filePath: engineProgramLocator.filePath,
      estinantList,
      initializedVoqueLocatorList:
        engineProgramLocator.initializedVoqueLocatorList,
      endingVoqueLocatorList,
      locator: engineProgramLocator,
    });

    const inputRelationshipList = engineProgram.estinantList.flatMap(
      (engineEstinant) => {
        return engineEstinant.inputList.map((estinantInput) => {
          return new ProgramEstinantInputRelationshipInstance({
            estinantInput,
            rootGraphLocator,
            estinantLocator: engineEstinant.locator,
          });
        });
      },
    );

    const outputRelationshipList = engineProgram.estinantList.flatMap(
      (engineEstinant) => {
        return engineEstinant.outputList.map((output) => {
          return new ProgramEstinantOutputRelationshipInstance({
            outputZorn: output.zorn,
            rootGraphLocator,
            estinantLocator: engineEstinant.locator,
          });
        });
      },
    );

    return {
      [ENGINE_PROGRAM_3_GEPP]: engineProgram,
      [PROGRAM_VOQUE_RELATIONSHIP_2_GEPP]: voqueRelationshipList,
      [PROGRAM_ESTINANT_INPUT_RELATIONSHIP_GEPP]: inputRelationshipList,
      [PROGRAM_ESTINANT_OUTPUT_RELATIONSHIP_GEPP]: outputRelationshipList,
    };
  })
  .assemble();
