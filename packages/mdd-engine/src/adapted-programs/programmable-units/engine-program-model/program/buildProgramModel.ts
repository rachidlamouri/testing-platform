import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { assertNotUndefined } from '../../../../package-agnostic-utilities/nil/assertNotUndefined';
import { Tuple } from '../../../../package-agnostic-utilities/type/tuple';
import { CollectionInstanceModel } from '../collection-instance/collectionInstanceModel';
import { ProgrammedTransformId } from '../programmed-transform/programmedTransformId';
import { ProgrammedTransformInstance } from '../programmed-transform/programmedTransformInstance';
import {
  PROGRAMMED_TRANSFORM_MODEL_COLLECTION_ID,
  ProgrammedTransformModelStreamMetatype,
} from '../programmed-transform/programmedTransformModel';
import {
  PROGRAM_MODEL_COLLECTION_ID,
  ProgramModel,
  ProgramModelStreamMetatype,
} from './programModel';
import {
  PROGRAM_SKELETON_COLLECTION_ID,
  ProgramSkeletonStreamMetatype,
} from './programSkeleton';

/**
 * Converts a program skeleton into a program model
 */
export const buildProgramModel = buildProgrammedTransform({
  name: 'buildProgramModel',
})
  .fromItem2<ProgramSkeletonStreamMetatype>({
    collectionId: PROGRAM_SKELETON_COLLECTION_ID,
  })
  .andFromItemTuple2<
    ProgrammedTransformModelStreamMetatype,
    Tuple<ProgrammedTransformId>
  >({
    collectionId: PROGRAMMED_TRANSFORM_MODEL_COLLECTION_ID,
    getRightKeyTuple: (programSkeleton) => {
      return programSkeleton.item.programmedTransformLocatorList.map(
        (sublocator) => {
          return sublocator.id;
        },
      );
    },
    getRightKey: (programmedTransformModel) => programmedTransformModel.item.id,
  })
  .toItem2<ProgramModelStreamMetatype>({
    collectionId: PROGRAM_MODEL_COLLECTION_ID,
  })
  .onTransform((programSkeleton, programmedTransformList) => {
    const allItemDefinitionList = programmedTransformList.flatMap(
      (transform) => {
        return transform.getAllItemDefinitionModelList();
      },
    );

    const itemDefinitionById = new Map(
      allItemDefinitionList.map((item) => {
        return [item.id.forHuman, item];
      }),
    );

    const deduplicatedItemList = [...itemDefinitionById.values()];

    const collectionInstanceList = deduplicatedItemList.map(
      (itemDefinition) => {
        return new CollectionInstanceModel({
          programSkeleton,
          itemDefinition,
        });
      },
    );

    const mutableStateByItemId = new Map(
      collectionInstanceList
        .map((collectionInstance) => {
          return {
            collectionInstance,
            isConsumed: false,
            isFed: false,
          };
        })
        .map((mutableState) => {
          return [
            mutableState.collectionInstance.itemDefinition.id,
            mutableState,
          ];
        }),
    );

    programmedTransformList
      .flatMap((transform) => transform.inputModelList)
      .forEach((inputModel) => {
        const mutableState = mutableStateByItemId.get(
          inputModel.itemDefinition.id,
        );
        assertNotUndefined(mutableState);
        mutableState.isConsumed = true;
      });

    programmedTransformList
      .flatMap((transform) => transform.outputModelList)
      .forEach((outputModel) => {
        const mutableState = mutableStateByItemId.get(
          outputModel.itemDefinition.id,
        );
        assertNotUndefined(mutableState);
        mutableState.isFed = true;
      });

    const collectionInstanceByItemId = new Map(
      collectionInstanceList.map((instance) => {
        return [instance.itemDefinition.id.forHuman, instance];
      }),
    );

    const transformInstanceList = programmedTransformList.map(
      (programmedTransformModel) => {
        const transformInstanceCollectionList = [
          ...new Map(
            programmedTransformModel
              .getAllItemDefinitionModelList()
              .map((itemDefinition) => {
                const collectionInstance = collectionInstanceByItemId.get(
                  itemDefinition.id.forHuman,
                );
                assertNotUndefined(collectionInstance);
                return [collectionInstance.id.forHuman, collectionInstance];
              }),
          ).values(),
        ];

        return new ProgrammedTransformInstance({
          programSkeleton,
          model: programmedTransformModel,
          collectionInstanceList: transformInstanceCollectionList,
        });
      },
    );

    const mutableStateList = [...mutableStateByItemId.values()];

    const unconsumedCollectionInstanceList = mutableStateList
      .filter(({ isConsumed }) => !isConsumed)
      .map(({ collectionInstance }) => collectionInstance);

    const unfedCollectionInstanceList = mutableStateList
      .filter(({ isFed }) => !isFed)
      .map(({ collectionInstance }) => collectionInstance);

    return new ProgramModel({
      skeleton: programSkeleton,
      collectionInstanceList,
      transformInstanceList,
      unconsumedCollectionInstanceList,
      unfedCollectionInstanceList,
    });
  })
  .assemble();
