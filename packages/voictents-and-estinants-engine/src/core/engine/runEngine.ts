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
import {
  CollectionId,
  CollectionIdSet,
} from '../types/collection/collectionId';
import {
  GenericIndexedItem,
  GenericIndexedItemTuple,
  Item,
  ItemTuple,
} from '../types/item/item';
import {
  GenericCollectionItemStream2,
  Stream,
  StreamTypeName,
  ItemStream,
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
import { assertIsError } from '../../package-agnostic-utilities/error/assertIsError';
import { assertNotUndefined } from '../../package-agnostic-utilities/nil/assertNotUndefined';

type CollectableItem = {
  collectionId: CollectionId;
  item: Item;
};

type CollectableItemTuple = Tuple<CollectableItem>;

class AggregateEngineError extends Error {
  constructor(errorList: (string | Error)[]) {
    const stackTraceList = errorList.map((value) => {
      if (typeof value === 'string') {
        return value;
      }

      return value.stack ?? 'NO STACK TRACE';
    });

    const aggregateMessage = [
      `Encountered ${errorList.length} errors:`,
      ...stackTraceList.slice(0, 100).map((stackTrace, index) => {
        const [firstLine, ...otherLineList] = stackTrace.split('\n');

        const truncatedOtherLineList = otherLineList.slice(0, 19);

        const messageSegmentLineList = [
          // 4 accounts for 2 spaces and then a 2 digit number
          `${`${index}`.padStart(4, ' ')}: ${firstLine}`,
          ...truncatedOtherLineList.map((line) => `        ${line}`),
        ];

        const lineDifference =
          otherLineList.length - truncatedOtherLineList.length;

        if (lineDifference > 0) {
          messageSegmentLineList.push(`        +${lineDifference} more lines`);
        }

        const messageSegment = messageSegmentLineList.join('\n');
        return messageSegment;
      }),
    ].join('\n');

    super(aggregateMessage);
  }
}

type OnItemAddedToCollectionsHandler = (
  collectableItem: CollectableItem,
) => void;

type RuntimeStatisticsHandler = (statistics: RuntimeStatistics) => void;

export enum EngineRunnerStrategy {
  WaitForAllDependencies = 'WaitForAllDependencies',
  OnlyWaitForCollectionDependency = 'OnlyWaitForVoictentDependency',
}

export type EngineRunnerInput = {
  // TODO: remove "initialQuirmTuple" and make inputVoictentList required
  inputCollectionList?: GenericCollection2[];
  errorCollectionId?: CollectionId;
  programmedTransformTuple: Tuple<GenericProgrammedTransform2>;
  /** @deprecated */
  onItemAddedToCollections?: OnItemAddedToCollectionsHandler;
  onFinish?: RuntimeStatisticsHandler;
  strategy?: EngineRunnerStrategy;
  failForEncounteredError?: boolean;
};

const nanosecondsToSeconds = (nanoseconds: bigint): bigint =>
  nanoseconds / 1000000000n;

// A series of values by engine tick
type TickSeries<TValue extends number | bigint> = TValue[];

type CollectionTickSeriesConfiguration = {
  collectionId: CollectionId;
  collectionStream: GenericCollectionStream | null;
  collectionItemStream: ItemStream | GenericCollectionItemStream2 | null;
  collectionTickSeries: TickSeries<number>;
  collectionItemTickSeries: TickSeries<number>;
};

type ProgrammedTransformConnectionTickSeriesConfiguration = {
  collectionId: CollectionId;
  stream: Stream;
  tickSeries: TickSeries<number>;
};

type ProgrammedTransformTickSeriesConfiguration = {
  mutableTransformState: MutableTransformState2;
  connectionList: ProgrammedTransformConnectionTickSeriesConfiguration[];
  cumulativeExecutionCountTickSeries: TickSeries<number>;
  relativeExecutionCountTickSeries: TickSeries<number>;
};

type TimeSeriesConfiguration = {
  timestampSeries: TickSeries<bigint>;
  cumulativeElapsedSecondsTickSeries: TickSeries<number>;
  relativeElapsedSecondsTickSeries: TickSeries<number>;
};

export type RuntimeStatistics = {
  collectionList: CollectionTickSeriesConfiguration[];
  programmedTransformList: ProgrammedTransformTickSeriesConfiguration[];
  time: TimeSeriesConfiguration;
};

/**
 * A pipes and filters engine. It takes a set of collections and a set of
 * programmed transforms. The engine continues to run as long as a programmed
 * transform has data in its input streams.
 *
 * @readableName runCoreEngine
 *
 * @param input (see individual properties)
 * @param input.estinantTuple the collection of Estinants to register in the
 * engine
 * @param input.initialQuirmTuple the starting collection of Quirms to kickstart
 * the engine
 */
export const runEngine = ({
  inputCollectionList = [],
  errorCollectionId,
  programmedTransformTuple,
  onItemAddedToCollections,
  onFinish,
  strategy = EngineRunnerStrategy.WaitForAllDependencies,
  failForEncounteredError = true,
}: EngineRunnerInput): void => {
  inputCollectionList.forEach((collection) => {
    collection.initialize();
  });

  let isInitialErrorCritical = false;

  const inputCollectionIdSet: CollectionIdSet = new Set(
    inputCollectionList.map((collection) => {
      return collection.collectionId;
    }),
  );

  const errorMessageList: string[] = [];

  const collectionCountByCollectionId: Record<string, number> = {};
  inputCollectionList.forEach((collection) => {
    const currentCount =
      collectionCountByCollectionId[collection.collectionId] ?? 0;
    collectionCountByCollectionId[collection.collectionId] = currentCount + 1;
  });

  const duplicateCollectionIdList = Object.entries(
    collectionCountByCollectionId,
  )
    .filter(([, count]) => count > 1)
    .map(([collectionId]) => collectionId);

  duplicateCollectionIdList.forEach((collectionId) => {
    errorMessageList.push(
      `Voictents must have a unique gepp per program. Found duplicate gepp: ${collectionId}`,
    );

    isInitialErrorCritical = true;
  });

  const invalidProgrammedTransformInputOutputList = programmedTransformTuple
    .filter(
      (
        programmedTransform,
      ): programmedTransform is GenericProgrammedTransform2 =>
        programmedTransform.version === 2,
    )
    .flatMap((programmedTransform) => {
      return [
        {
          programmedTransformName: programmedTransform.name,
          collectionId:
            programmedTransform.leftInputStreamConfiguration.collectionId,
          isInput: true,
        },
        ...programmedTransform.rightInputStreamConfigurationTuple.map(
          (rightStreamConfiguration) => {
            return {
              programmedTransformName: programmedTransform.name,
              collectionId: rightStreamConfiguration.collectionId,
              isInput: true,
            };
          },
        ),
        ...programmedTransform.outputStreamConfiguration.collectionIdTuple.map(
          (collectionId) => {
            return {
              programmedTransformName: programmedTransform.name,
              collectionId,
              isInput: false,
            };
          },
        ),
      ];
    })
    .filter(({ collectionId }) => !inputCollectionIdSet.has(collectionId));

  const programmedTransformCountByName: Record<string, number> = {};
  programmedTransformTuple
    .filter(
      (
        programmedTransform,
      ): programmedTransform is GenericProgrammedTransform2 =>
        programmedTransform.version === 2,
    )
    .forEach((programmedTransform) => {
      const currentCount =
        programmedTransformCountByName[programmedTransform.name] ?? 0;
      programmedTransformCountByName[programmedTransform.name] =
        currentCount + 1;
    });

  const duplicateProgrammedTransformNameList = Object.entries(
    collectionCountByCollectionId,
  )
    .filter(([, count]) => count > 1)
    .map(([name]) => name);

  duplicateProgrammedTransformNameList.forEach((name) => {
    errorMessageList.push(
      `Estinant names must be unique per program. Found duplicate name: ${name}`,
    );

    isInitialErrorCritical = true;
  });

  invalidProgrammedTransformInputOutputList.forEach(
    ({ programmedTransformName, collectionId, isInput }) => {
      const label = isInput ? 'input' : 'output';

      errorMessageList.push(
        `Estinant inputs and outputs must have a corresponding voictent. Estinant "${programmedTransformName}" has an ${label} gepp "${collectionId}" without a corresponding voictent.`,
      );

      isInitialErrorCritical = true;
    },
  );

  const fedCollectionCollectionIdSet = new Set([
    ...inputCollectionList
      .filter((collection) => {
        // note: It's important that this check comes after all collections are initialized
        return !collection.isEmpty;
      })
      .map((collection) => collection.collectionId),
    ...programmedTransformTuple.flatMap(
      (programmedTransform) =>
        programmedTransform.outputStreamConfiguration.collectionIdTuple,
    ),
  ]);

  const consumedCollectionCollectionIdSet = new Set(
    programmedTransformTuple
      .flatMap((programmedTransform) => {
        return [
          programmedTransform.leftInputStreamConfiguration,
          ...programmedTransform.rightInputStreamConfigurationTuple,
        ];
      })
      .map((streamConfiguration) => streamConfiguration.collectionId),
  );

  // note: downstream estinants are gonna be so hungies
  const unfedCollectionList = inputCollectionList.filter((collection) => {
    const isConsumed = consumedCollectionCollectionIdSet.has(
      collection.collectionId,
    );
    const isFed = fedCollectionCollectionIdSet.has(collection.collectionId);
    return isConsumed && !isFed;
  });

  if (unfedCollectionList.length > 0) {
    unfedCollectionList.forEach((collection) => {
      errorMessageList.push(
        `Voictent with gepp "${collection.collectionId}" is consumed by an estinant, but is not initialized nor the output of an estinant`,
      );
    });

    // note: this is not a critical error
  }

  const initialCollectionCacheEntryList = inputCollectionList.map(
    (collection) => {
      return [collection.collectionId, collection] as const;
    },
  );

  const collectionCache = new CollectionCache(initialCollectionCacheEntryList);

  const errorCollection =
    errorCollectionId !== undefined
      ? collectionCache.get(errorCollectionId) ?? null
      : null;

  if (errorCollectionId !== undefined && errorCollection === null) {
    errorMessageList.push(
      `Error gepp "${errorCollectionId}" has no corresponding voictent`,
    );

    isInitialErrorCritical = true;
  }

  let encounteredError = false;

  type ErrorHandlerInput = {
    error: Error;
    isCritical: boolean;
  };
  const onError = ({ error, isCritical }: ErrorHandlerInput): void => {
    encounteredError = true;

    if (errorCollection === null) {
      throw new AggregateEngineError([
        'The engine encountered an error, but no error voictent was specified',
        error.message,
      ]);
    }

    try {
      errorCollection.addItem(error);
    } catch (secondError) {
      assertIsError(secondError);
      throw new AggregateEngineError([
        `The engine encountered a critical error. The error voictent "${errorCollection.collectionId}" threw an error while handling an error`,
        error.message,
        secondError.message,
      ]);
    }

    if (isCritical) {
      throw new Error(
        `The engine encountered a critical error. See the error voictent with gepp "${errorCollection.collectionId}" for more details`,
      );
    }
  };

  if (errorMessageList.length > 0) {
    onError({
      error: new AggregateEngineError(errorMessageList),
      isCritical: isInitialErrorCritical,
    });
  }

  const addToCollectionCache = (
    collectableItemTuple: CollectableItemTuple,
  ): void => {
    collectableItemTuple.forEach((collectableItem) => {
      const collection = collectionCache.get(collectableItem.collectionId);
      assertNotUndefined(
        collection,
        `Unable to find voictent for gepp: ${collectableItem.collectionId}`,
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
      `Unable to find voictent for gepp: ${streamConfiguration.collectionId}`,
    );

    const stream = streamConfiguration.isCollectionStream
      ? collection.createCollectionStream(programmedTransform.name)
      : collection.createCollectionItemStream(programmedTransform.name);

    if (stream === null) {
      throw Error('Unexpected null Lanbe');
    }

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
          version: 2,
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
          const {
            typeName: leftInputTypeName,
            value: leftInputReferenceValue,
          } = mutableStreamConnectionState.stream.dereference();

          const indexedItem: GenericIndexedItem =
            leftInputTypeName === ReferenceTypeName.IndexedItem
              ? leftInputReferenceValue
              : {
                  item: leftInputReferenceValue,
                  indexByName: {
                    serializeableId: '',
                  },
                };

          const leftInput: Item | ItemTuple =
            leftInputTypeName === ReferenceTypeName.IndexedItem
              ? leftInputReferenceValue.item
              : leftInputReferenceValue;

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
                let idTuple: IdTuple;
                if (
                  rightMutableStreamConnectionState.typeName ===
                  MutableStreamConnectionStateTypeName.RightCollectionMutableStreamConnectionState
                ) {
                  idTuple = [rightMutableStreamConnectionState.stream];
                } else if (
                  rightMutableStreamConnectionState.typeName ===
                    MutableStreamConnectionStateTypeName.RightCollectionItem2MutableStreamConnectionState &&
                  leftInputTypeName === ReferenceTypeName.IndexedItem
                ) {
                  idTuple = rightMutableStreamConnectionState.getRightKeyTuple(
                    leftInputReferenceValue,
                  );
                } else if (
                  rightMutableStreamConnectionState.typeName ===
                    MutableStreamConnectionStateTypeName.RightCollectionItem2MutableStreamConnectionState &&
                  leftInputTypeName === ReferenceTypeName.Collection
                ) {
                  // TODO: this cast is incorrect, and is masking some underlying issue. The input type should probably be "never"
                  idTuple = rightMutableStreamConnectionState.getRightKeyTuple(
                    leftInput as GenericIndexedItem,
                  );
                } else {
                  // TODO: remove this else once all voictent item lanbes return indexed hubblepups

                  // eslint-disable-next-line no-console
                  console.log('DEBUG INFO A:', {
                    leftInputTypeName,
                    rightMutableStreamConnectionState,
                    mutableTransformState,
                  });

                  throw Error('Invalid lanbe setup. See above info.');
                }

                return [rightMutableStreamConnectionState, idTuple];
              },
            );

          const transformInputKeyGroup: TransformInputKeyGroup = {
            leftMutableStreamConnectionState: mutableStreamConnectionState,
            leftInput:
              mutableTransformState.programmedTransform.version === 2 &&
              leftInputTypeName === ReferenceTypeName.Collection
                ? indexedItem.item
                : indexedItem,
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
            // TODO: remove this else once all voictent item lanbes return indexed hubblepups

            // eslint-disable-next-line no-console
            console.log('DEBUG INFO B:', {
              rightInputTypeName,
              mutableStreamConnectionState,
            });

            throw Error('Invalid lanbe setup. See above info.');
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
      onError({
        error: error as Error,
        isCritical: false,
      });
    }

    // eslint-disable-next-line no-param-reassign
    mutableTransformState.executionCount += 1;

    // eslint-disable-next-line no-param-reassign
    transformInputKeyGroup.hasTriggered = true;
  };

  // TODO: create a class or something to encapsulate tracking runtime stats
  const collectionTickSeriesConfigurationByCollection = new Map<
    GenericCollection2,
    CollectionTickSeriesConfiguration
  >();

  const programmedTransformTickSeriesConfigurationList =
    mutableTransformStateList.map<ProgrammedTransformTickSeriesConfiguration>(
      (mutableTransformState) => {
        return {
          mutableTransformState,
          connectionList: getMutableStreamConnectionStateTuple(
            mutableTransformState,
          ).map<ProgrammedTransformConnectionTickSeriesConfiguration>(
            (mutableStreamConnectionState) => {
              return {
                collectionId: mutableStreamConnectionState.collectionId,
                stream: mutableStreamConnectionState.stream,
                tickSeries: [],
              };
            },
          ),
          cumulativeExecutionCountTickSeries: [],
          relativeExecutionCountTickSeries: [],
        };
      },
    );

  const timeConfiguration: TimeSeriesConfiguration = {
    timestampSeries: [],
    cumulativeElapsedSecondsTickSeries: [],
    relativeElapsedSecondsTickSeries: [],
  };

  const startTime = process.hrtime.bigint();
  let previousTickTime = startTime;

  let tickCount = 0;

  const onTopOfLoop = (): void => {
    [...collectionCache.values()].forEach((collection) => {
      collection.onTickStart();
    });

    // TODO: make estinant input output gepps static so that the list of possible gepps/voictents is known from the start
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    [...collectionCache.entries()].forEach(([collectionId, collection]) => {
      const configuration: CollectionTickSeriesConfiguration =
        collectionTickSeriesConfigurationByCollection.get(collection) ?? {
          collectionId,
          collectionStream: collection.createCollectionStream(collectionId),
          collectionItemStream:
            collection.createCollectionItemStream(collectionId),
          collectionTickSeries: Array.from({ length: tickCount }).map(() => 0),
          collectionItemTickSeries: Array.from({ length: tickCount }).map(
            () => 0,
          ),
        };

      collectionTickSeriesConfigurationByCollection.set(
        collection,
        configuration,
      );

      configuration.collectionTickSeries.push(
        configuration.collectionStream?.hasNext() ? 1 : 0,
      );

      configuration.collectionItemTickSeries.push(
        configuration.collectionItemStream?.hasNext() ? 1 : 0,
      );

      if (configuration.collectionItemStream?.hasNext()) {
        configuration.collectionItemStream.advance();
      }
    });

    programmedTransformTickSeriesConfigurationList.forEach((configuration) => {
      configuration.connectionList.forEach((connection) => {
        connection.tickSeries.push(connection.stream.hasNext() ? 1 : 0);
      });
    });
  };

  const onBottomOfLoop = (): void => {
    programmedTransformTickSeriesConfigurationList.forEach((configuration) => {
      const lastExecutionCount =
        configuration.cumulativeExecutionCountTickSeries[
          configuration.cumulativeExecutionCountTickSeries.length - 1
        ] ?? 0;

      configuration.cumulativeExecutionCountTickSeries.push(
        configuration.mutableTransformState.executionCount,
      );

      const relativeExecutionCount =
        configuration.mutableTransformState.executionCount - lastExecutionCount;
      configuration.relativeExecutionCountTickSeries.push(
        relativeExecutionCount,
      );
    });

    const tickTime = process.hrtime.bigint();
    timeConfiguration.timestampSeries.push(tickTime);

    const cumulativeElapsedSeconds = nanosecondsToSeconds(tickTime - startTime);
    timeConfiguration.cumulativeElapsedSecondsTickSeries.push(
      Number(cumulativeElapsedSeconds),
    );

    const relativeElapsedSeconds = nanosecondsToSeconds(
      tickTime - previousTickTime,
    );
    timeConfiguration.relativeElapsedSecondsTickSeries.push(
      Number(relativeElapsedSeconds),
    );

    previousTickTime = tickTime;
    tickCount += 1;
  };

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

    // estinants cannot have direct inputs, so they won't be ready immediately
    const runtimeMutableTransformStateSet = new Set<MutableTransformState2>();

    // This is a do-while because estinants cannot have direct inputs so there will be 0 estinants ready to run at the very start
    do {
      onTopOfLoop();

      [...runtimeMutableTransformStateSet]
        .flatMap((mutableTransformState) => {
          return getTransformInputKeyGroupExecutionContextList(
            mutableTransformState,
          );
        })
        .forEach((context) => {
          // Note: it's important that execution is separated from evaluation since executing a platomity can affect other platomities
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

      onBottomOfLoop();
    } while (runtimeMutableTransformStateSet.size > 0);
  };

  switch (strategy) {
    case EngineRunnerStrategy.WaitForAllDependencies:
      executeWaitForAllDependenciesStrategy();
      break;
    case EngineRunnerStrategy.OnlyWaitForCollectionDependency:
      throw Error('Not implemented');
  }

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

  if (unfinishedMutableTransformStateList.length > 0) {
    const output = unfinishedMutableTransformStateList.map((endState) => {
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
    });

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

    onError({
      error: new UntriggeredTransformInputKeyGroupError(output),
      isCritical: false,
    });
  }

  const statistics: RuntimeStatistics = {
    collectionList: [...collectionTickSeriesConfigurationByCollection.values()],
    programmedTransformList: programmedTransformTickSeriesConfigurationList,
    time: timeConfiguration,
  };

  if (encounteredError && failForEncounteredError) {
    throw new Error(
      'The engine encountered an error. See the designated error collection for more details.',
    );
  }

  if (onFinish) {
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
