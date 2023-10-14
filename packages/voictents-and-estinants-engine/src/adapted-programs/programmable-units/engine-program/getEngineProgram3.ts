import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
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
  ENGINE_PROGRAM_LOCATOR_3_COLLECTION_ID,
  EngineProgramLocator3StreamMetatype,
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
import { IdentifiableItemId } from '../../../adapter/identifiable-item/identifiableItem';

/**
 * Joins the program locator to its transforms in order to
 * construct an object that represents an engine program.
 *
 * @readableName getProgramModel
 */
export const getEngineProgram3 = buildProgrammedTransform({
  name: 'getEngineProgram3',
})
  .fromItem2<EngineProgramLocator3StreamMetatype>({
    collectionId: ENGINE_PROGRAM_LOCATOR_3_COLLECTION_ID,
  })
  .andFromItemTuple2<EngineEstinant3Voque, Tuple<IdentifiableItemId>>({
    collectionId: ENGINE_ESTINANT_3_GEPP,
    getRightKeyTuple: (engineProgram) => {
      return engineProgram.item.estinantRelationshipList.map((relationship) => {
        return relationship.estinantLocator.id;
      });
    },
    getRightKey: (engineEstinant) => {
      return engineEstinant.item.locator.id;
    },
  })
  .toItem2<EngineProgram3Voque>({
    collectionId: ENGINE_PROGRAM_3_GEPP,
  })
  .toItemTuple2<ProgramVoqueRelationship2Voque>({
    collectionId: PROGRAM_VOQUE_RELATIONSHIP_2_GEPP,
  })
  .toItemTuple2<ProgramEstinantInputRelationshipVoque>({
    collectionId: PROGRAM_ESTINANT_INPUT_RELATIONSHIP_GEPP,
  })
  .toItemTuple2<ProgramEstinantOutputRelationshipVoque>({
    collectionId: PROGRAM_ESTINANT_OUTPUT_RELATIONSHIP_GEPP,
  })
  .onTransform((engineProgramLocator, estinantList) => {
    const { rootGraphLocator } = engineProgramLocator;

    const voqueLocatorByZorn = new Map(
      [
        ...engineProgramLocator.initializedVoqueLocatorList,
        ...estinantList.flatMap((estinant) => {
          return estinant.allVoqueLocatorList;
        }),
      ].map((voqueLocator) => {
        return [voqueLocator.id, voqueLocator] as const;
      }),
    );

    const allVoqueLocatorList = [...voqueLocatorByZorn.values()];

    const initializedVoqueLocatorIdSet = new Set(
      engineProgramLocator.initializedVoqueLocatorList.map((voqueLocator) => {
        return voqueLocator.oldId;
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
          .map((voqueLocator) => voqueLocator.oldId);
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
          .map((voqueLocator) => voqueLocator.oldId);
      }),
    );

    const categorizedVoqueList = allVoqueLocatorList.map((voqueLocator) => {
      const isInitialized = initializedVoqueLocatorIdSet.has(
        voqueLocator.oldId,
      );
      const isConsumed = consumedVoqueIdSet.has(voqueLocator.oldId);
      const isFed = fedVoqueIdSet.has(voqueLocator.oldId);

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
          parentId = rootGraphLocator.oldId;
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
            outputZorn: output.id,
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
