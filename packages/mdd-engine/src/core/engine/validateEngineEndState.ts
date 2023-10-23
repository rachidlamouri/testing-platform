import { IdTuple } from '../../package-agnostic-utilities/data-structure/id';
import {
  MutableStreamConnectionStateTypeName,
  RightMutableStreamConnectionState,
} from './mutable-stream-connection-state/mutableStreamConnectionState';
import { MutableTransformState2 } from './mutableTransformState';

class UntriggeredTransformInputKeyGroupError extends Error {
  constructor(public metadata: unknown) {
    super(
      `Some cologies were not triggered:  \n${JSON.stringify(
        metadata,
        null,
        2,
      )}`,
    );
  }
}

/**
 * Looks for untriggered transform input key groups
 */
export const validateEngineEndState = (
  mutableTransformStateList: MutableTransformState2[],
): UntriggeredTransformInputKeyGroupError | null => {
  const mutableTransformStateEndStateList = mutableTransformStateList.flatMap(
    (mutableTransformState) => {
      const transformInputKeyGroupSet = new Set(
        [
          ...mutableTransformState.transformInputKeyGroupSetCacheCache.values(),
        ].flatMap((transformInputKeyGroupSetCache) => {
          return [...transformInputKeyGroupSetCache.values()].flatMap(
            (transformInputKeyGroupSubset) => {
              return [...transformInputKeyGroupSubset];
            },
          );
        }),
      );

      const untriggeredTransformInputKeyGroupSet = [
        ...transformInputKeyGroupSet,
      ].filter(
        (transformInputKeyGroup) => !transformInputKeyGroup.hasTriggered,
      );

      return {
        mutableTransformState,
        untriggeredTransformInputKeyGroupSet,
      };
    },
  );

  const unfinishedMutableTransformStateList =
    mutableTransformStateEndStateList.filter(
      (endState) => endState.untriggeredTransformInputKeyGroupSet.length > 0,
    );

  const metadata =
    unfinishedMutableTransformStateList.length > 0
      ? unfinishedMutableTransformStateList.map((endState) => {
          const transformInputKeyGroupSetEndState =
            endState.untriggeredTransformInputKeyGroupSet.map(
              (transformInputKeyGroup) => {
                const rightTupleState =
                  endState.mutableTransformState.rightMutableStreamConnectionStateTuple.map(
                    (
                      rightMutableStreamConnectionState: RightMutableStreamConnectionState,
                    ) => {
                      if (
                        rightMutableStreamConnectionState.typeName ===
                        MutableStreamConnectionStateTypeName.RightCollectionMutableStreamConnectionState
                      ) {
                        return {
                          rightCollectionId:
                            rightMutableStreamConnectionState.collectionId,
                          isReady: rightMutableStreamConnectionState.isReady,
                        };
                      }

                      const idTuple =
                        transformInputKeyGroup.rightInputKeyTupleCache.get(
                          rightMutableStreamConnectionState,
                        ) as IdTuple;
                      return idTuple.map((id) => {
                        const hasItem =
                          rightMutableStreamConnectionState.itemCache.has(id);
                        return {
                          rightCollectionId:
                            rightMutableStreamConnectionState.collectionId,
                          id,
                          hasItem,
                        };
                      });
                    },
                  );

                return {
                  leftInput: transformInputKeyGroup.leftInput,
                  rightTupleState,
                };
              },
            );

          return {
            programmedTransformName:
              endState.mutableTransformState.programmedTransform.name,
            leftCollectionId:
              endState.mutableTransformState.programmedTransform
                .leftInputStreamConfiguration.collectionId,
            transformInputKeyGroupSet: transformInputKeyGroupSetEndState,
          };
        })
      : null;

  const error =
    metadata !== null
      ? new UntriggeredTransformInputKeyGroupError(metadata)
      : null;

  return error;
};
