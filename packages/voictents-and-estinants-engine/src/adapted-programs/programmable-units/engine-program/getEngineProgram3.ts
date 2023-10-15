import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  EngineProgrammedTransform3StreamMetatype,
  ENGINE_PROGRAMMED_TRANSFORM_3_COLLECTION_ID,
} from './engineProgrammedTransform3';
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
  ProgramStreamMetatypeRelationship2Instance,
  ProgramStreamMetatypeRelationship2StreamMetatype,
} from './programStreamMetatypeRelationship2';
import {
  PROGRAM_PROGRAMMED_TRANSFORM_INPUT_RELATIONSHIP_COLLECTION_ID,
  ProgramProgrammedTransformInputRelationshipInstance,
  ProgramProgrammedTransformInputRelationshipStreamMetatype,
} from './input-output/programProgrammedTransformInputRelationship';
import {
  ProgramProgrammedTransformOutputRelationshipStreamMetatype,
  PROGRAM_PROGRAMMED_TRANSFORM_OUTPUT_RELATIONSHIP_COLLECTION_ID,
  ProgramProgrammedTransformOutputRelationshipInstance,
} from './input-output/programProgrammedTransformOutputRelationship';
import { EngineStreamMetatypeLocator2 } from './engineStreamMetatypeLocator2';
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
      return engineProgram.item.programmedTransformRelationshipList.map(
        (relationship) => {
          return relationship.programmedTransformLocator.id;
        },
      );
    },
    getRightKey: (engineProgrammedTransform) => {
      return engineProgrammedTransform.item.locator.id;
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

    const streamMetatypeLocatorById = new Map(
      [
        ...engineProgramLocator.initializedStreamMetatypeLocatorList,
        ...programmedTransformList.flatMap((programmedTransform) => {
          return programmedTransform.allStreamMetatypeLocatorList;
        }),
      ].map((streamMetatypeLocator) => {
        return [streamMetatypeLocator.id, streamMetatypeLocator] as const;
      }),
    );

    const allStreamMetatypeLocatorList = [
      ...streamMetatypeLocatorById.values(),
    ];

    const initializedStreamMetatypeLocatorIdSet = new Set(
      engineProgramLocator.initializedStreamMetatypeLocatorList.map(
        (streamMetatypeLocator) => {
          return streamMetatypeLocator.oldId;
        },
      ),
    );

    const consumedStreamMetatypeIdSet = new Set(
      programmedTransformList.flatMap((engineProgrammedTransform) => {
        return engineProgrammedTransform.inputList
          .map((input) => {
            return input.streamMetatypeLocator;
          })
          .filter(
            (
              streamMetatypeLocator,
            ): streamMetatypeLocator is EngineStreamMetatypeLocator2 => {
              return streamMetatypeLocator !== undefined;
            },
          )
          .map((streamMetatypeLocator) => streamMetatypeLocator.oldId);
      }),
    );

    const fedStreamMetatypeIdSet = new Set(
      programmedTransformList.flatMap((engineProgrammedTransform) => {
        return engineProgrammedTransform.outputList
          .map((output) => {
            return output.streamMetatypeLocator;
          })
          .filter(
            (
              streamMetatypeLocator,
            ): streamMetatypeLocator is EngineStreamMetatypeLocator2 => {
              return streamMetatypeLocator !== undefined;
            },
          )
          .map((streamMetatypeLocator) => streamMetatypeLocator.oldId);
      }),
    );

    const categorizedStreamMetatypeList = allStreamMetatypeLocatorList.map(
      (streamMetatypeLocator) => {
        const isInitialized = initializedStreamMetatypeLocatorIdSet.has(
          streamMetatypeLocator.oldId,
        );
        const isConsumed = consumedStreamMetatypeIdSet.has(
          streamMetatypeLocator.oldId,
        );
        const isFed = fedStreamMetatypeIdSet.has(streamMetatypeLocator.oldId);

        const isEndingStreamMetatype = !isConsumed;

        return {
          streamMetatypeLocator,
          isInitialized,
          isFed,
          isEndingStreamMetatype,
        };
      },
    );

    const streamMetatypeRelationshipList = categorizedStreamMetatypeList.map(
      ({
        streamMetatypeLocator,
        isInitialized,
        isFed,
        isEndingStreamMetatype,
      }) => {
        let parentId: string;
        if (isInitialized && !isFed) {
          parentId = engineProgramLocator.startingSubgraphId;
        } else if (isEndingStreamMetatype) {
          parentId = engineProgramLocator.endingSubgraphId;
        } else {
          parentId = rootGraphLocator.oldId;
        }

        return new ProgramStreamMetatypeRelationship2Instance({
          programName: engineProgramLocator.programName,
          streamMetatypeLocator,
          rootGraphLocator,
          parentId,
        });
      },
    );

    const endingStreamMetatypeLocatorList = categorizedStreamMetatypeList
      .filter((categorizedStreamMetatype) => {
        return categorizedStreamMetatype.isEndingStreamMetatype;
      })
      .map(
        (categorizedStreamMetatype) =>
          categorizedStreamMetatype.streamMetatypeLocator,
      );

    const engineProgram = new EngineProgram3Instance({
      programName: engineProgramLocator.programName,
      description: engineProgramLocator.description,
      filePath: engineProgramLocator.filePath,
      programmedTransformList,
      initializedStreamMetatypeLocatorList:
        engineProgramLocator.initializedStreamMetatypeLocatorList,
      endingStreamMetatypeLocatorList,
      locator: engineProgramLocator,
    });

    const inputRelationshipList = engineProgram.programmedTransformList.flatMap(
      (engineProgrammedTransform) => {
        return engineProgrammedTransform.inputList.map(
          (programmedTransformInput) => {
            return new ProgramProgrammedTransformInputRelationshipInstance({
              programmedTransformInput,
              rootGraphLocator,
              programmedTransformLocator: engineProgrammedTransform.locator,
            });
          },
        );
      },
    );

    const outputRelationshipList =
      engineProgram.programmedTransformList.flatMap(
        (engineProgrammedTransform) => {
          return engineProgrammedTransform.outputList.map((output) => {
            return new ProgramProgrammedTransformOutputRelationshipInstance({
              outputId: output.id,
              rootGraphLocator,
              programmedTransformLocator: engineProgrammedTransform.locator,
            });
          });
        },
      );

    return {
      [ENGINE_PROGRAM_3_COLLECTION_ID]: engineProgram,
      [PROGRAM_STREAM_METATYPE_RELATIONSHIP_2_COLLECTION_ID]:
        streamMetatypeRelationshipList,
      [PROGRAM_PROGRAMMED_TRANSFORM_INPUT_RELATIONSHIP_COLLECTION_ID]:
        inputRelationshipList,
      [PROGRAM_PROGRAMMED_TRANSFORM_OUTPUT_RELATIONSHIP_COLLECTION_ID]:
        outputRelationshipList,
    };
  })
  .assemble();
