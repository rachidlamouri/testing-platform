import {
  DeprecatedId,
  IdTuple,
} from '../../package-agnostic-utilities/data-structure/id';
import { TransformInputKeyGroupSetCache } from './transform-input-key-group-set-cache-cache/transformInputKeyGroupSetCache';
import {
  TransformInputKeyGroup,
  TransformInputKeyGroupSet,
  getTransformInputKeyGroupEntryList,
} from './transform-input-key-group-set-cache-cache/transformInputKeyGroup';
import {
  MutableStreamConnectionStateTypeName,
  LeftMutableStreamConnectionState,
  RightMutableStreamConnectionState,
  RightCollectionMutableStreamConnectionState,
  RightCollectionItem2MutableStreamConnectionState,
} from './mutable-stream-connection-state/mutableStreamConnectionState';
import {
  GenericProgrammedTransform2,
  UnsafeProgrammedTransform2Tuple,
} from '../types/programmed-transform/programmedTransform';
import { CollectionId } from '../types/collection/collectionId';
import { GenericIndexedItemTuple, Item } from '../types/item/item';
import {
  GenericCollectionItemStream2,
  Stream,
  StreamTypeName,
  GenericCollectionStream,
} from '../types/stream/stream';
import {
  RightInputKeyTupleCache,
  RightInputKeyTupleCacheEntry,
} from './transform-input-key-group-set-cache-cache/rightInputKeyTupleCache';
import {
  MutableTransformState2,
  MutableCollectionState,
  getMutableStreamConnectionStateTuple,
} from './mutableTransformState';
import { ItemCache } from './mutable-stream-connection-state/itemCache';
import { TransformInputKeyGroupSetCacheCache } from './transform-input-key-group-set-cache-cache/transformInputKeyGroupSetCacheCache';
import { CollectionCache } from './collectionCache';
import { GenericCollection2 } from '../types/collection/collection2';
import { GenericInputStreamConfiguration } from '../types/stream-configuration/input/inputStreamConfiguration';
import { Tuple } from '../../package-agnostic-utilities/type/tuple';
import { getIsRightInputItemTupleStreamConfiguration } from '../types/stream-configuration/input/right/rightInputStreamConfiguration';
import { ReferenceTypeName } from '../types/stream/referenceTypeName';
import { assertNotUndefined } from '../../package-agnostic-utilities/nil/assertNotUndefined';
import { ErrorHandler } from './errorHandler';
import { AggregateEngineError } from './aggregateEngineError';
import { validateEngineInput } from './validateEngineInput';
import {
  TickSeriesManager,
  RuntimeStatisticsHandler,
} from './tickSeriesManager';
import { validateEngineEndState } from './validateEngineEndState';
import { assertNotNull } from '../../package-agnostic-utilities/nil/assertNotNull';

type CollectableItem = {
  collectionId: CollectionId;
  item: Item;
};

type OnItemAddedToCollectionsHandler = (
  collectableItem: CollectableItem,
) => void;

export enum EngineRunnerStrategy {
  WaitForAllDependencies = 'WaitForAllDependencies',
  OnlyWaitForCollectionDependency = 'OnlyWaitForCollectionDependency',
}

export type EngineRunnerInput = {
  // TODO: make inputCollectionList required
  inputCollectionList?: GenericCollection2[];
  errorCollectionId?: CollectionId | null;
  programmedTransformTuple: Tuple<GenericProgrammedTransform2>;
  /** @deprecated */
  onItemAddedToCollections?: OnItemAddedToCollectionsHandler;
  onFinish?: RuntimeStatisticsHandler;
  strategy?: EngineRunnerStrategy;
  failForEncounteredError?: boolean;
};

/**
 * A pipes and filters engine. It takes a set of collections and a set of
 * programmed transforms. The engine continues to run as long as a programmed
 * transform has data in its input streams.
 *
 * @readableName runCoreEngine
 *
 * @param input (see individual properties)
 * @param input.programmedTransformTuple the collection of ProgrammedTransforms to register in the
 * engine
 */
export const runEngine = ({
  inputCollectionList = [],
  errorCollectionId = null,
  programmedTransformTuple,
  onItemAddedToCollections,
  onFinish,
  strategy = EngineRunnerStrategy.WaitForAllDependencies,
  failForEncounteredError = true,
}: EngineRunnerInput): void => {
  inputCollectionList.forEach((collection) => {
    collection.initialize();
  });

  const collectionCache = new CollectionCache(
    inputCollectionList.map((collection) => {
      return [collection.collectionId, collection] as const;
    }),
  );

  const errorCollection =
    errorCollectionId === null
      ? errorCollectionId
      : collectionCache.get(errorCollectionId) ?? null;

  const { errorMessageList, isCritical } = validateEngineInput({
    inputCollectionList,
    programmedTransformTuple,
    errorCollection,
    errorCollectionId,
  });

  const errorHandler = new ErrorHandler({
    errorCollection,
  });

  if (errorMessageList.length > 0) {
    errorHandler.onError({
      error: new AggregateEngineError(errorMessageList),
      isCritical,
    });
  }

  const addToCollectionCache = (
    collectableItemTuple: Tuple<CollectableItem>,
  ): void => {
    collectableItemTuple.forEach((collectableItem) => {
      const collection = collectionCache.get(collectableItem.collectionId);
      assertNotUndefined(
        collection,
        `Unable to find collection for collection id: ${collectableItem.collectionId}`,
      );

      collection.addItem(collectableItem.item);
    });

    if (onItemAddedToCollections !== undefined) {
      collectableItemTuple.forEach((collectableItem) => {
        onItemAddedToCollections(collectableItem);
      });
    }
  };

  const createStream2 = (
    programmedTransform: GenericProgrammedTransform2,
    streamConfiguration: GenericInputStreamConfiguration,
  ): Stream => {
    const collection = collectionCache.get(streamConfiguration.collectionId);
    assertNotUndefined(
      collection,
      `Unable to find collection for collection id: ${streamConfiguration.collectionId}`,
    );

    const stream = streamConfiguration.isCollectionStream
      ? collection.createCollectionStream(programmedTransform.name)
      : collection.createCollectionItemStream(programmedTransform.name);

    assertNotNull(stream);

    return stream;
  };

  const mutableTransformStateList =
    programmedTransformTuple.map<MutableTransformState2>(
      (programmedTransform) => {
        const {
          leftInputStreamConfiguration,
          rightInputStreamConfigurationTuple,
        } = programmedTransform;

        const leftMutableStreamConnectionState: LeftMutableStreamConnectionState =
          {
            typeName:
              MutableStreamConnectionStateTypeName.LeftMutableStreamConnectionState,
            collectionId: leftInputStreamConfiguration.collectionId,
            stream: createStream2(
              programmedTransform,
              leftInputStreamConfiguration,
            ),
            isReady: false,
          };

        const rightMutableStreamConnectionStateTuple =
          rightInputStreamConfigurationTuple.map<RightMutableStreamConnectionState>(
            (rightInputStreamConfiguration) => {
              if (
                getIsRightInputItemTupleStreamConfiguration(
                  rightInputStreamConfiguration,
                )
              ) {
                return {
                  typeName:
                    MutableStreamConnectionStateTypeName.RightCollectionItem2MutableStreamConnectionState,
                  collectionId: rightInputStreamConfiguration.collectionId,
                  stream: createStream2(
                    programmedTransform,
                    rightInputStreamConfiguration,
                  ) as GenericCollectionItemStream2,
                  getRightKeyTuple:
                    rightInputStreamConfiguration.getRightKeyTuple,
                  getRightKey: rightInputStreamConfiguration.getRightKey,
                  itemCache: new ItemCache(),
                } satisfies RightCollectionItem2MutableStreamConnectionState;
              }

              return {
                typeName:
                  MutableStreamConnectionStateTypeName.RightCollectionMutableStreamConnectionState,
                collectionId: rightInputStreamConfiguration.collectionId,
                stream: createStream2(
                  programmedTransform,
                  rightInputStreamConfiguration,
                ) as GenericCollectionStream,
                isReady: false,
              } satisfies RightCollectionMutableStreamConnectionState;
            },
          );

        const mutableTransformState: MutableTransformState2 = {
          programmedTransform,
          leftMutableStreamConnectionState,
          rightMutableStreamConnectionStateTuple,
          outputCollectionIdSet: new Set(
            programmedTransform.outputStreamConfiguration.collectionIdTuple,
          ),
          transformInputKeyGroupSetCacheCache:
            new TransformInputKeyGroupSetCacheCache(),
          executionCount: 0,
          dependencySet: new Set(),
          mutableDependencySet: new Set(),
          dependentSet: new Set(),
        };

        return mutableTransformState;
      },
    );

  type TransformInputKeyGroupExecutionContext = {
    mutableTransformState: MutableTransformState2;
    transformInputKeyGroup: TransformInputKeyGroup;
  };

  const getTransformInputKeyGroupExecutionContextList = (
    mutableTransformState: MutableTransformState2,
  ): TransformInputKeyGroupExecutionContext[] => {
    const touchedTransformInputKeyGroupSet = new TransformInputKeyGroupSet();

    getMutableStreamConnectionStateTuple(mutableTransformState)
      .filter((mutableStreamConnectionState) => {
        if (
          strategy === EngineRunnerStrategy.WaitForAllDependencies &&
          (mutableStreamConnectionState.typeName ===
            MutableStreamConnectionStateTypeName.RightCollectionMutableStreamConnectionState ||
            (mutableStreamConnectionState.typeName ===
              MutableStreamConnectionStateTypeName.LeftMutableStreamConnectionState &&
              mutableStreamConnectionState.stream.typeName ===
                StreamTypeName.CollectionStream))
        ) {
          return !mutableStreamConnectionState.isReady;
        }

        return mutableStreamConnectionState.stream.hasNext();
      })
      .forEach((mutableStreamConnectionState) => {
        mutableStreamConnectionState.stream.advance();

        if (
          mutableStreamConnectionState.typeName ===
          MutableStreamConnectionStateTypeName.LeftMutableStreamConnectionState
        ) {
          const leftInput = mutableStreamConnectionState.stream.dereference();

          if (
            mutableStreamConnectionState.stream.typeName ===
            StreamTypeName.CollectionStream
          ) {
            // eslint-disable-next-line no-param-reassign
            mutableStreamConnectionState.isReady = true;
          }

          const rightInputKeyTupleCacheEntryList =
            mutableTransformState.rightMutableStreamConnectionStateTuple.map<RightInputKeyTupleCacheEntry>(
              (rightMutableStreamConnectionState) => {
                const idTuple = ((): IdTuple => {
                  switch (rightMutableStreamConnectionState.typeName) {
                    case MutableStreamConnectionStateTypeName.RightCollectionMutableStreamConnectionState: {
                      return [rightMutableStreamConnectionState.stream];
                    }
                    case MutableStreamConnectionStateTypeName.RightCollectionItem2MutableStreamConnectionState: {
                      return rightMutableStreamConnectionState.getRightKeyTuple(
                        leftInput.value,
                      );
                    }
                  }
                })();

                return [rightMutableStreamConnectionState, idTuple];
              },
            );

          const transformInputKeyGroup: TransformInputKeyGroup = {
            leftMutableStreamConnectionState: mutableStreamConnectionState,
            leftInput: leftInput.value,
            rightInputKeyTupleCache: new RightInputKeyTupleCache(
              rightInputKeyTupleCacheEntryList,
            ),
            hasTriggered: false,
          };

          getTransformInputKeyGroupEntryList(transformInputKeyGroup).forEach(
            ([transformInputKeyGroupMutableStreamConnectionState, id]) => {
              const transformInputKeyGroupSetCache =
                mutableTransformState.transformInputKeyGroupSetCacheCache.get(
                  transformInputKeyGroupMutableStreamConnectionState.collectionId,
                ) ?? new TransformInputKeyGroupSetCache();
              const transformInputKeyGroupSet =
                transformInputKeyGroupSetCache.get(id) ??
                new TransformInputKeyGroupSet();

              transformInputKeyGroupSet.add(transformInputKeyGroup);
              transformInputKeyGroupSetCache.set(id, transformInputKeyGroupSet);
              mutableTransformState.transformInputKeyGroupSetCacheCache.set(
                transformInputKeyGroupMutableStreamConnectionState.collectionId,
                transformInputKeyGroupSetCache,
              );
            },
          );

          touchedTransformInputKeyGroupSet.add(transformInputKeyGroup);
        } else {
          // TODO: we no longer need to destructure these fields since there are now only 2 stream references. This will simplify this logic, but comes with additional challenges
          const { typeName: rightInputTypeName, value: rightInput } =
            mutableStreamConnectionState.stream.dereference();

          let id: DeprecatedId;
          if (
            mutableStreamConnectionState.typeName ===
            MutableStreamConnectionStateTypeName.RightCollectionMutableStreamConnectionState
          ) {
            id = mutableStreamConnectionState.stream;
            // eslint-disable-next-line no-param-reassign
            mutableStreamConnectionState.isReady = true;
          } else if (
            mutableStreamConnectionState.typeName ===
              MutableStreamConnectionStateTypeName.RightCollectionItem2MutableStreamConnectionState &&
            rightInputTypeName === ReferenceTypeName.IndexedItem
          ) {
            id = mutableStreamConnectionState.getRightKey(rightInput);
            mutableStreamConnectionState.itemCache.set(id, rightInput);
          } else {
            // TODO: remove this else once all collection item streams return indexed items

            // eslint-disable-next-line no-console
            console.log('DEBUG INFO B:', {
              rightInputTypeName,
              mutableStreamConnectionState,
            });

            throw Error('Invalid stream setup. See above info.');
          }

          const transformInputKeyGroupSetCache =
            mutableTransformState.transformInputKeyGroupSetCacheCache.get(
              mutableStreamConnectionState.collectionId,
            ) ?? new TransformInputKeyGroupSetCache();
          const transformInputKeyGroupSet =
            transformInputKeyGroupSetCache.get(id) ??
            new TransformInputKeyGroupSet();

          [...transformInputKeyGroupSet].forEach((transformInputKeyGroup) => {
            touchedTransformInputKeyGroupSet.add(transformInputKeyGroup);
          });
        }
      });

    const readyTransformInputKeyGroupList = [
      ...touchedTransformInputKeyGroupSet,
    ].filter((transformInputKeyGroup) => {
      const isReady =
        mutableTransformState.rightMutableStreamConnectionStateTuple.every(
          (
            rightMutableStreamConnectionState: RightMutableStreamConnectionState,
          ) => {
            if (
              rightMutableStreamConnectionState.typeName ===
              MutableStreamConnectionStateTypeName.RightCollectionMutableStreamConnectionState
            ) {
              return rightMutableStreamConnectionState.isReady;
            }

            const idTuple = transformInputKeyGroup.rightInputKeyTupleCache.get(
              rightMutableStreamConnectionState,
            ) as IdTuple;
            return idTuple.every((id) =>
              rightMutableStreamConnectionState.itemCache.has(id),
            );
          },
        );

      return isReady;
    });

    const transformInputKeyGroupExecutionContextList =
      readyTransformInputKeyGroupList.map<TransformInputKeyGroupExecutionContext>(
        (transformInputKeyGroup) => {
          return {
            mutableTransformState,
            transformInputKeyGroup,
          };
        },
      );

    return transformInputKeyGroupExecutionContextList;
  };

  const executeContext = ({
    mutableTransformState,
    transformInputKeyGroup,
  }: TransformInputKeyGroupExecutionContext): void => {
    const { leftInput } = transformInputKeyGroup;

    const rightInputTuple =
      mutableTransformState.rightMutableStreamConnectionStateTuple.map(
        (rightMutableStreamConnectionState) => {
          if (
            rightMutableStreamConnectionState.typeName ===
            MutableStreamConnectionStateTypeName.RightCollectionMutableStreamConnectionState
          ) {
            const rightInputElement =
              rightMutableStreamConnectionState.stream.dereference();
            return rightInputElement.value;
          }

          const idTuple = transformInputKeyGroup.rightInputKeyTupleCache.get(
            rightMutableStreamConnectionState,
          ) as IdTuple;
          const rightInputTupleElement = idTuple.map((id) => {
            return rightMutableStreamConnectionState.itemCache.get(id);
          }) as GenericIndexedItemTuple;

          return rightInputTupleElement;
        },
      );

    try {
      const outputRecord = mutableTransformState.programmedTransform.transform(
        leftInput,
        ...rightInputTuple,
      );

      const outputCollectableItemTuple = Object.entries(outputRecord)
        .filter(([collectionId]) => {
          return mutableTransformState.outputCollectionIdSet.has(collectionId);
        })
        .flatMap(([collectionId, itemTuple]): CollectableItem[] => {
          return itemTuple.map<CollectableItem>((item) => {
            return {
              collectionId,
              item,
            };
          });
        });

      addToCollectionCache(outputCollectableItemTuple);
    } catch (error) {
      errorHandler.onError({
        error: error as Error,
        isCritical: false,
      });
    }

    // eslint-disable-next-line no-param-reassign
    mutableTransformState.executionCount += 1;

    // eslint-disable-next-line no-param-reassign
    transformInputKeyGroup.hasTriggered = true;
  };

  const tickSeriesManager = new TickSeriesManager({
    collectionCache,
    mutableTransformStateList,
  });

  const executeWaitForAllDependenciesStrategy = (): void => {
    const mutableCollectionStateByCollectionId = new Map<
      CollectionId,
      MutableCollectionState
    >();

    inputCollectionList.forEach((collection) => {
      const mutableCollectionState: MutableCollectionState = {
        collection,
        mutableDependencySet: new Set(),
        dependencySet: new Set(),
        dependentSet: new Set(),
      };

      mutableCollectionStateByCollectionId.set(
        collection.collectionId,
        mutableCollectionState,
      );
    });

    mutableTransformStateList.forEach((mutableTransformState) => {
      [
        mutableTransformState.programmedTransform.leftInputStreamConfiguration
          .collectionId,
        ...mutableTransformState.programmedTransform.rightInputStreamConfigurationTuple.map(
          (streamConfiguration) => streamConfiguration.collectionId,
        ),
      ].forEach((collectionId) => {
        const mutableCollectionState =
          mutableCollectionStateByCollectionId.get(collectionId);
        assertNotUndefined(mutableCollectionState);
        mutableCollectionState.dependentSet.add(mutableTransformState);
        mutableTransformState.dependencySet.add(mutableCollectionState);
        mutableTransformState.mutableDependencySet.add(mutableCollectionState);
      });

      mutableTransformState.programmedTransform.outputStreamConfiguration.collectionIdTuple.forEach(
        (collectionId) => {
          const mutableCollectionState =
            mutableCollectionStateByCollectionId.get(collectionId);
          assertNotUndefined(mutableCollectionState);
          mutableTransformState.dependentSet.add(mutableCollectionState);
          mutableCollectionState.dependencySet.add(mutableTransformState);
          mutableCollectionState.mutableDependencySet.add(
            mutableTransformState,
          );
        },
      );
    });

    const runtimeMutableCollectionStateSet = new Set(
      [...mutableCollectionStateByCollectionId.values()].filter(
        (mutableCollectionState) => {
          return mutableCollectionState.dependencySet.size === 0;
        },
      ),
    );

    // programmed transforms cannot have direct inputs, so they won't be ready immediately
    const runtimeMutableTransformStateSet = new Set<MutableTransformState2>();

    // This is a do-while because programmed transforms cannot have direct inputs so there will be 0 programmed transforms ready to run at the very start
    do {
      tickSeriesManager.onTopOfLoop();

      [...runtimeMutableTransformStateSet]
        .flatMap((mutableTransformState) => {
          return getTransformInputKeyGroupExecutionContextList(
            mutableTransformState,
          );
        })
        .forEach((context) => {
          // Note: it's important that execution is separated from evaluation since executing a MutableTransformState can affect other platomities
          executeContext(context);
        });

      runtimeMutableTransformStateSet.forEach((mutableTransformState) => {
        const isFinished = getMutableStreamConnectionStateTuple(
          mutableTransformState,
        ).every((mutableStreamConnectionState) => {
          if (
            (mutableStreamConnectionState.typeName ===
              MutableStreamConnectionStateTypeName.LeftMutableStreamConnectionState ||
              mutableStreamConnectionState.typeName ===
                MutableStreamConnectionStateTypeName.RightCollectionMutableStreamConnectionState) &&
            mutableStreamConnectionState.stream.typeName ===
              StreamTypeName.CollectionStream
          ) {
            return true;
          }

          return !mutableStreamConnectionState.stream.hasNext();
        });

        if (isFinished) {
          mutableTransformState.dependentSet.forEach(
            (mutableCollectionState) => {
              mutableCollectionState.mutableDependencySet.delete(
                mutableTransformState,
              );

              if (mutableCollectionState.mutableDependencySet.size === 0) {
                runtimeMutableCollectionStateSet.add(mutableCollectionState);
              }
            },
          );

          runtimeMutableTransformStateSet.delete(mutableTransformState);
        }
      });

      runtimeMutableCollectionStateSet.forEach((mutableCollectionState) => {
        mutableCollectionState.dependentSet.forEach((mutableTransformState) => {
          mutableTransformState.mutableDependencySet.delete(
            mutableCollectionState,
          );

          if (mutableTransformState.mutableDependencySet.size === 0) {
            runtimeMutableTransformStateSet.add(mutableTransformState);
          }
        });

        runtimeMutableCollectionStateSet.delete(mutableCollectionState);
      });

      tickSeriesManager.onBottomOfLoop();
    } while (runtimeMutableTransformStateSet.size > 0);
  };

  switch (strategy) {
    case EngineRunnerStrategy.WaitForAllDependencies:
      executeWaitForAllDependenciesStrategy();
      break;
    case EngineRunnerStrategy.OnlyWaitForCollectionDependency:
      throw Error('Not implemented');
  }

  const endError = validateEngineEndState(mutableTransformStateList);

  if (endError !== null) {
    errorHandler.onError({
      error: endError,
      isCritical: false,
    });
  }

  if (errorHandler.encounteredError && failForEncounteredError) {
    throw new Error(
      'The engine encountered an error. See the designated error collection for more details.',
    );
  }

  if (onFinish) {
    const statistics = tickSeriesManager.getRuntimeStatistics();
    onFinish(statistics);
  }
};

type EngineRunnerInput2<
  TProgrammedTransformTuple extends UnsafeProgrammedTransform2Tuple,
> = {
  inputCollectionList: GenericCollection2[];
  errorCollectionId?: CollectionId;
  programmedTransformTuple: TProgrammedTransformTuple;
  onFinish?: RuntimeStatisticsHandler;
  failForEncounteredError?: boolean;
};

export const runEngine2 = <
  TProgrammedTransformTuple extends UnsafeProgrammedTransform2Tuple,
>({
  inputCollectionList = [],
  errorCollectionId,
  programmedTransformTuple,
  onFinish,
  failForEncounteredError,
}: EngineRunnerInput2<TProgrammedTransformTuple>): void => {
  runEngine({
    inputCollectionList,
    errorCollectionId,
    programmedTransformTuple,
    onFinish,
    failForEncounteredError,
  });
};
