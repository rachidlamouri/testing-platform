import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  EngineProgrammedTransform3StreamMetatype,
  ENGINE_PROGRAMMED_TRANSFORM_3_COLLECTION_ID,
} from './engineEstinant3';
import {
  ENGINE_PROGRAM_3_COLLECTION_ID,
  EngineProgram3Instance,
  EngineProgram3StreamMetatype,
} from './engineProgram3';
import {
  ENGINE_PROGRAM_LOCATOR_3_COLLECTION_ID,
  EngineProgramLocator3StreamMetatype,
} from './engineProgramLocator3';
import {
  PROGRAM_STREAM_METATYPE_RELATIONSHIP_2_COLLECTION_ID,
  ProgramVoqueRelationship2Instance,
  ProgramStreamMetatypeRelationship2StreamMetatype,
} from './programVoqueRelationship2';
import {
  PROGRAM_PROGRAMMED_TRANSFORM_INPUT_RELATIONSHIP_COLLECTION_ID,
  ProgramEstinantInputRelationshipInstance,
  ProgramProgrammedTransformInputRelationshipStreamMetatype,
} from './input-output/programEstinantInputRelationship';
import {
  ProgramProgrammedTransformOutputRelationshipStreamMetatype,
  PROGRAM_PROGRAMMED_TRANSFORM_OUTPUT_RELATIONSHIP_COLLECTION_ID,
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
  .andFromItemTuple2<
    EngineProgrammedTransform3StreamMetatype,
    Tuple<IdentifiableItemId>
  >({
    collectionId: ENGINE_PROGRAMMED_TRANSFORM_3_COLLECTION_ID,
    getRightKeyTuple: (engineProgram) => {
      return engineProgram.item.estinantRelationshipList.map((relationship) => {
        return relationship.programmedTransformLocator.id;
      });
    },
    getRightKey: (engineEstinant) => {
      return engineEstinant.item.locator.id;
    },
  })
  .toItem2<EngineProgram3StreamMetatype>({
    collectionId: ENGINE_PROGRAM_3_COLLECTION_ID,
  })
  .toItemTuple2<ProgramStreamMetatypeRelationship2StreamMetatype>({
    collectionId: PROGRAM_STREAM_METATYPE_RELATIONSHIP_2_COLLECTION_ID,
  })
  .toItemTuple2<ProgramProgrammedTransformInputRelationshipStreamMetatype>({
    collectionId: PROGRAM_PROGRAMMED_TRANSFORM_INPUT_RELATIONSHIP_COLLECTION_ID,
  })
  .toItemTuple2<ProgramProgrammedTransformOutputRelationshipStreamMetatype>({
    collectionId:
      PROGRAM_PROGRAMMED_TRANSFORM_OUTPUT_RELATIONSHIP_COLLECTION_ID,
  })
  .onTransform((engineProgramLocator, programmedTransformList) => {
    const { rootGraphLocator } = engineProgramLocator;

    const voqueLocatorByZorn = new Map(
      [
        ...engineProgramLocator.initializedVoqueLocatorList,
        ...programmedTransformList.flatMap((estinant) => {
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
      programmedTransformList.flatMap((engineEstinant) => {
        return engineEstinant.inputList
          .map((input) => {
            return input.streamMetatypeLocator;
          })
          .filter((voqueLocator): voqueLocator is EngineVoqueLocator2 => {
            return voqueLocator !== undefined;
          })
          .map((voqueLocator) => voqueLocator.oldId);
      }),
    );

    const fedVoqueIdSet = new Set(
      programmedTransformList.flatMap((engineEstinant) => {
        return engineEstinant.outputList
          .map((output) => {
            return output.streamMetatypeLocator;
          })
          .filter((voqueLocator): voqueLocator is EngineVoqueLocator2 => {
            return voqueLocator !== undefined;
          })
          .map((voqueLocator) => voqueLocator.oldId);
      }),
    );

    const categorizedVoqueList = allVoqueLocatorList.map(
      (streamMetatypeLocator) => {
        const isInitialized = initializedVoqueLocatorIdSet.has(
          streamMetatypeLocator.oldId,
        );
        const isConsumed = consumedVoqueIdSet.has(streamMetatypeLocator.oldId);
        const isFed = fedVoqueIdSet.has(streamMetatypeLocator.oldId);

        const isEndingVoque = !isConsumed;

        return {
          streamMetatypeLocator,
          isInitialized,
          isFed,
          isEndingVoque,
        };
      },
    );

    const voqueRelationshipList = categorizedVoqueList.map(
      ({ streamMetatypeLocator, isInitialized, isFed, isEndingVoque }) => {
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
          streamMetatypeLocator,
          rootGraphLocator,
          parentId,
        });
      },
    );

    const endingStreamMetatypeLocatorList = categorizedVoqueList
      .filter((categorizedVoque) => {
        return categorizedVoque.isEndingVoque;
      })
      .map((categorizedVoque) => categorizedVoque.streamMetatypeLocator);

    const engineProgram = new EngineProgram3Instance({
      programName: engineProgramLocator.programName,
      description: engineProgramLocator.description,
      filePath: engineProgramLocator.filePath,
      programmedTransformList,
      initializedStreamMetatypeLocatorList:
        engineProgramLocator.initializedVoqueLocatorList,
      endingStreamMetatypeLocatorList,
      locator: engineProgramLocator,
    });

    const inputRelationshipList = engineProgram.programmedTransformList.flatMap(
      (engineEstinant) => {
        return engineEstinant.inputList.map((programmedTransformInput) => {
          return new ProgramEstinantInputRelationshipInstance({
            programmedTransformInput,
            rootGraphLocator,
            programmedTransformLocator: engineEstinant.locator,
          });
        });
      },
    );

    const outputRelationshipList =
      engineProgram.programmedTransformList.flatMap((engineEstinant) => {
        return engineEstinant.outputList.map((output) => {
          return new ProgramEstinantOutputRelationshipInstance({
            outputId: output.id,
            rootGraphLocator,
            programmedTransformLocator: engineEstinant.locator,
          });
        });
      });

    return {
      [ENGINE_PROGRAM_3_COLLECTION_ID]: engineProgram,
      [PROGRAM_STREAM_METATYPE_RELATIONSHIP_2_COLLECTION_ID]:
        voqueRelationshipList,
      [PROGRAM_PROGRAMMED_TRANSFORM_INPUT_RELATIONSHIP_COLLECTION_ID]:
        inputRelationshipList,
      [PROGRAM_PROGRAMMED_TRANSFORM_OUTPUT_RELATIONSHIP_COLLECTION_ID]:
        outputRelationshipList,
    };
  })
  .assemble();
