import { CollectionCache } from './collectionCache';
import {
  MutableTransformState2,
  getMutableStreamConnectionStateTuple,
} from './mutableTransformState';
import { GenericCollection2 } from '../types/collection/collection2';
import { CollectionId } from '../types/collection/collectionId';
import {
  GenericCollectionStream,
  GenericCollectionItemStream2,
  Stream,
} from '../types/stream/stream';

const nanosecondsToSeconds = (nanoseconds: bigint): bigint =>
  nanoseconds / 1000000000n;

// A series of values by engine tick
type TickSeries<TValue extends number | bigint> = TValue[];

type CollectionTickSeriesConfiguration = {
  collection: GenericCollection2;
  collectionStream: GenericCollectionStream | null;
  collectionItemStream: GenericCollectionItemStream2 | null;
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

export type RuntimeStatisticsHandler = (statistics: RuntimeStatistics) => void;

type CollectionTickSeriesInput = {
  collectionCache: CollectionCache;
  mutableTransformStateList: MutableTransformState2[];
};

export class TickSeriesManager {
  collectionTickSeriesConfigurationList: CollectionTickSeriesConfiguration[];

  programmedTransformTickSeriesConfigurationList: ProgrammedTransformTickSeriesConfiguration[];

  tickCount = 0;

  timeConfiguration: TimeSeriesConfiguration = {
    timestampSeries: [],
    cumulativeElapsedSecondsTickSeries: [],
    relativeElapsedSecondsTickSeries: [],
  };

  startTime = process.hrtime.bigint();

  previousTickTime = this.startTime;

  constructor(input: CollectionTickSeriesInput) {
    this.collectionTickSeriesConfigurationList = [
      ...input.collectionCache.entries(),
    ].map(([collectionId, collection]) => {
      const configuration: CollectionTickSeriesConfiguration = {
        collection,
        collectionStream: collection.createCollectionStream(collectionId),
        collectionItemStream:
          collection.createCollectionItemStream(collectionId),
        collectionTickSeries: Array.from({ length: this.tickCount }).map(
          () => 0,
        ),
        collectionItemTickSeries: Array.from({ length: this.tickCount }).map(
          () => 0,
        ),
      };

      return configuration;
    });

    this.programmedTransformTickSeriesConfigurationList =
      input.mutableTransformStateList.map<ProgrammedTransformTickSeriesConfiguration>(
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
  }

  onTopOfLoop(): void {
    this.collectionTickSeriesConfigurationList.forEach((configuration) => {
      configuration.collection.onTickStart();
    });

    this.collectionTickSeriesConfigurationList.forEach((configuration) => {
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

    this.programmedTransformTickSeriesConfigurationList.forEach(
      (configuration) => {
        configuration.connectionList.forEach((connection) => {
          connection.tickSeries.push(connection.stream.hasNext() ? 1 : 0);
        });
      },
    );
  }

  onBottomOfLoop(): void {
    this.programmedTransformTickSeriesConfigurationList.forEach(
      (configuration) => {
        const lastExecutionCount =
          configuration.cumulativeExecutionCountTickSeries[
            configuration.cumulativeExecutionCountTickSeries.length - 1
          ] ?? 0;

        configuration.cumulativeExecutionCountTickSeries.push(
          configuration.mutableTransformState.executionCount,
        );

        const relativeExecutionCount =
          configuration.mutableTransformState.executionCount -
          lastExecutionCount;
        configuration.relativeExecutionCountTickSeries.push(
          relativeExecutionCount,
        );
      },
    );

    const tickTime = process.hrtime.bigint();
    this.timeConfiguration.timestampSeries.push(tickTime);

    const cumulativeElapsedSeconds = nanosecondsToSeconds(
      tickTime - this.startTime,
    );
    this.timeConfiguration.cumulativeElapsedSecondsTickSeries.push(
      Number(cumulativeElapsedSeconds),
    );

    const relativeElapsedSeconds = nanosecondsToSeconds(
      tickTime - this.previousTickTime,
    );
    this.timeConfiguration.relativeElapsedSecondsTickSeries.push(
      Number(relativeElapsedSeconds),
    );

    this.previousTickTime = tickTime;
    this.tickCount += 1;
  }

  getRuntimeStatistics(): RuntimeStatistics {
    return {
      collectionList: this.collectionTickSeriesConfigurationList,
      programmedTransformList:
        this.programmedTransformTickSeriesConfigurationList,
      time: this.timeConfiguration,
    };
  }
}
