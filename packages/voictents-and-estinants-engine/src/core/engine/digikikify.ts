import {
  Zorn,
  ZornTuple,
} from '../../package-agnostic-utilities/datastructure/zorn';
import { Ajorken } from './procody/ajorken';
import {
  Cology,
  CologySet,
  getCologyEntryList,
} from './procody/cology';
import {
  DreanorTypeName,
  LeftDreanor,
  RightDreanor,
  RightVoictentDreanor,
  RightVoictentItem2Dreanor,
} from './dreanor/dreanor';
import {
  GenericEstinant2,
  UnsafeEstinant2Tuple,
} from '../types/estinant/estinant';
import { Gepp, GeppSet } from '../types/voictent/gepp';
import {
  GenericIndexedHubblepup,
  GenericIndexedHubblepupTuple,
  Hubblepup,
  HubblepupTuple,
} from '../types/hubblepup/hubblepup';
import {
  GenericVoictentItemLanbe2,
  Lanbe,
  LanbeTypeName,
  HubblepupPelieLanbe,
  GenericVoictentPelieLanbe,
} from '../types/lanbe/lanbe';
import { Mabz, MabzEntry } from './procody/mabz';
import { Platomity2, Virok, getDreanorTuple } from './platomity';
import { Prected } from './dreanor/prected';
import { Procody } from './procody/procody';
import { Tabilly } from './tabilly';
import { GenericVoictent2 } from '../types/voictent/voictent2';
import { GenericInputAppreffinge } from '../types/appreffinge/input/inputAppreffinge';
import { Tuple } from '../../package-agnostic-utilities/type/tuple';
import { getIsRightInputHubblepupTupleAppreffinge } from '../types/appreffinge/input/right/rightInputAppreffinge';
import { ReferenceTypeName } from '../types/lanbe/referenceTypeName';
import { assertIsError } from '../../package-agnostic-utilities/error/assertIsError';
import { assertNotUndefined } from '../../package-agnostic-utilities/nil/assertNotUndefined';

type Quirm = {
  gepp: Gepp;
  hubblepup: Hubblepup;
};

type QuirmTuple = Tuple<Quirm>;

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

type OnHubblepupAddedToVoictentsHandler = (quirm: Quirm) => void;

type RuntimeStatisticsHandler = (statistics: RuntimeStatistics) => void;

export enum DigikikifierStrategy {
  WaitForAllDependencies = 'WaitForAllDependencies',
  OnlyWaitForVoictentDependency = 'OnlyWaitForVoictentDependency',
}

export type DigikikifierInput = {
  // TODO: remove "initialQuirmTuple" and make inputVoictentList required
  inputVoictentList?: GenericVoictent2[];
  errorGepp?: Gepp;
  estinantTuple: Tuple<GenericEstinant2>;
  /** @deprecated */
  onHubblepupAddedToVoictents?: OnHubblepupAddedToVoictentsHandler;
  onFinish?: RuntimeStatisticsHandler;
  strategy?: DigikikifierStrategy;
  failForEncounteredError?: boolean;
};

const nanosecondsToSeconds = (nanoseconds: bigint): bigint =>
  nanoseconds / 1000000000n;

// A series of values by engine tick
type TickSeries<TValue extends number | bigint> = TValue[];

type VoictentTickSeriesConfiguration = {
  gepp: Gepp;
  voictentLanbe: GenericVoictentPelieLanbe | null;
  voictentItemLanbe: HubblepupPelieLanbe | GenericVoictentItemLanbe2 | null;
  voictentTickSeries: TickSeries<number>;
  voictentItemTickSeries: TickSeries<number>;
};

type EstinantConnectionTickSeriesConfiguration = {
  gepp: Gepp;
  lanbe: Lanbe;
  tickSeries: TickSeries<number>;
};

type EstinantTickSeriesConfiguration = {
  platomity: Platomity2;
  connectionList: EstinantConnectionTickSeriesConfiguration[];
  cumulativeExecutionCountTickSeries: TickSeries<number>;
  relativeExecutionCountTickSeries: TickSeries<number>;
};

type TimeSeriesConfiguration = {
  timestampSeries: TickSeries<bigint>;
  cumulativeElapsedSecondsTickSeries: TickSeries<number>;
  relativeElapsedSecondsTickSeries: TickSeries<number>;
};

export type RuntimeStatistics = {
  voictentList: VoictentTickSeriesConfiguration[];
  estinantList: EstinantTickSeriesConfiguration[];
  time: TimeSeriesConfiguration;
};

/**
 * A pipes and filters engine. It takes a set of collections and a set of
 * programmed transforms. The engine continues to run as long as a programmed
 * transform has data in its input streams.
 *
 * @readable runCoreEngine
 *
 * @param input (see individual properties)
 * @param input.estinantTuple the collection of Estinants to register in the
 * engine
 * @param input.initialQuirmTuple the starting collection of Quirms to kickstart
 * the engine
 */
export const digikikify = ({
  inputVoictentList = [],
  errorGepp,
  estinantTuple,
  onHubblepupAddedToVoictents,
  onFinish,
  strategy = DigikikifierStrategy.WaitForAllDependencies,
  failForEncounteredError = true,
}: DigikikifierInput): void => {
  inputVoictentList.forEach((voictent) => {
    voictent.initialize();
  });

  let isInitialErrorCritical = false;

  const inputGeppSet: GeppSet = new Set(
    inputVoictentList.map((voictent) => {
      return voictent.gepp;
    }),
  );

  const errorMessageList: string[] = [];

  const voictentCountByGepp: Record<string, number> = {};
  inputVoictentList.forEach((voictent) => {
    const currentCount = voictentCountByGepp[voictent.gepp] ?? 0;
    voictentCountByGepp[voictent.gepp] = currentCount + 1;
  });

  const duplicateGeppList = Object.entries(voictentCountByGepp)
    .filter(([, count]) => count > 1)
    .map(([gepp]) => gepp);

  duplicateGeppList.forEach((gepp) => {
    errorMessageList.push(
      `Voictents must have a unique gepp per program. Found duplicate gepp: ${gepp}`,
    );

    isInitialErrorCritical = true;
  });

  const invalidEstinantInputOutputList = estinantTuple
    .filter((estinant): estinant is GenericEstinant2 => estinant.version === 2)
    .flatMap((estinant) => {
      return [
        {
          estinantName: estinant.name,
          gepp: estinant.leftInputAppreffinge.gepp,
          isInput: true,
        },
        ...estinant.rightInputAppreffingeTuple.map((rightAppreffinge) => {
          return {
            estinantName: estinant.name,
            gepp: rightAppreffinge.gepp,
            isInput: true,
          };
        }),
        ...estinant.outputAppreffinge.geppTuple.map((gepp) => {
          return {
            estinantName: estinant.name,
            gepp,
            isInput: false,
          };
        }),
      ];
    })
    .filter(({ gepp }) => !inputGeppSet.has(gepp));

  const estinantCountByName: Record<string, number> = {};
  estinantTuple
    .filter((estinant): estinant is GenericEstinant2 => estinant.version === 2)
    .forEach((estinant) => {
      const currentCount = estinantCountByName[estinant.name] ?? 0;
      estinantCountByName[estinant.name] = currentCount + 1;
    });

  const duplicateEstinantNameList = Object.entries(voictentCountByGepp)
    .filter(([, count]) => count > 1)
    .map(([name]) => name);

  duplicateEstinantNameList.forEach((name) => {
    errorMessageList.push(
      `Estinant names must be unique per program. Found duplicate name: ${name}`,
    );

    isInitialErrorCritical = true;
  });

  invalidEstinantInputOutputList.forEach(({ estinantName, gepp, isInput }) => {
    const label = isInput ? 'input' : 'output';

    errorMessageList.push(
      `Estinant inputs and outputs must have a corresponding voictent. Estinant "${estinantName}" has an ${label} gepp "${gepp}" without a corresponding voictent.`,
    );

    isInitialErrorCritical = true;
  });

  const fedVoictentGeppSet = new Set([
    ...inputVoictentList
      .filter((voictent) => {
        // note: It's important that this check comes after all collections are initialized
        return !voictent.isEmpty;
      })
      .map((voictent) => voictent.gepp),
    ...estinantTuple.flatMap(
      (estinant) => estinant.outputAppreffinge.geppTuple,
    ),
  ]);

  const consumedVoictentGeppSet = new Set(
    estinantTuple
      .flatMap((estinant) => {
        return [
          estinant.leftInputAppreffinge,
          ...estinant.rightInputAppreffingeTuple,
        ];
      })
      .map((appreffinge) => appreffinge.gepp),
  );

  // note: downstream estinants are gonna be so hungies
  const unfedVoictentList = inputVoictentList.filter((voictent) => {
    const isConsumed = consumedVoictentGeppSet.has(voictent.gepp);
    const isFed = fedVoictentGeppSet.has(voictent.gepp);
    return isConsumed && !isFed;
  });

  if (unfedVoictentList.length > 0) {
    unfedVoictentList.forEach((voictent) => {
      errorMessageList.push(
        `Voictent with gepp "${voictent.gepp}" is consumed by an estinant, but is not initialized nor the output of an estinant`,
      );
    });

    // note: this is not a critical error
  }

  const initialTabillyEntryList = inputVoictentList.map((voictent) => {
    return [voictent.gepp, voictent] as const;
  });

  const tabilly = new Tabilly(initialTabillyEntryList);

  const errorVoictent =
    errorGepp !== undefined ? tabilly.get(errorGepp) ?? null : null;

  if (errorGepp !== undefined && errorVoictent === null) {
    errorMessageList.push(
      `Error gepp "${errorGepp}" has no corresponding voictent`,
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

    if (errorVoictent === null) {
      throw new AggregateEngineError([
        'The engine encountered an error, but no error voictent was specified',
        error.message,
      ]);
    }

    try {
      errorVoictent.addHubblepup(error);
    } catch (secondError) {
      assertIsError(secondError);
      throw new AggregateEngineError([
        `The engine encountered a critical error. The error voictent "${errorVoictent.gepp}" threw an error while handling an error`,
        error.message,
        secondError.message,
      ]);
    }

    if (isCritical) {
      throw new Error(
        `The engine encountered a critical error. See the error voictent with gepp "${errorVoictent.gepp}" for more details`,
      );
    }
  };

  if (errorMessageList.length > 0) {
    onError({
      error: new AggregateEngineError(errorMessageList),
      isCritical: isInitialErrorCritical,
    });
  }

  const addToTabilly = (quirmTuple: QuirmTuple): void => {
    quirmTuple.forEach((quirm) => {
      const voictent = tabilly.get(quirm.gepp);
      assertNotUndefined(
        voictent,
        `Unable to find voictent for gepp: ${quirm.gepp}`,
      );

      voictent.addHubblepup(quirm.hubblepup);
    });

    if (onHubblepupAddedToVoictents !== undefined) {
      quirmTuple.forEach((quirm) => {
        onHubblepupAddedToVoictents(quirm);
      });
    }
  };

  const createLanbe2 = (
    estinant: GenericEstinant2,
    appreffinge: GenericInputAppreffinge,
  ): Lanbe => {
    const voictent = tabilly.get(appreffinge.gepp);
    assertNotUndefined(
      voictent,
      `Unable to find voictent for gepp: ${appreffinge.gepp}`,
    );
    const lanbe = appreffinge.isWibiz
      ? voictent.createVoictentLanbe(estinant.name)
      : voictent.createVoictentItemLanbe(estinant.name);

    if (lanbe === null) {
      throw Error('Unexpected null Lanbe');
    }

    return lanbe;
  };

  const platomityList = estinantTuple.map<Platomity2>((estinant) => {
    const { leftInputAppreffinge, rightInputAppreffingeTuple } = estinant;

    const leftDreanor: LeftDreanor = {
      typeName: DreanorTypeName.LeftDreanor,
      gepp: leftInputAppreffinge.gepp,
      lanbe: createLanbe2(estinant, leftInputAppreffinge),
      isReady: false,
    };

    const rightDreanorTuple = rightInputAppreffingeTuple.map<RightDreanor>(
      (rightInputAppreffinge) => {
        if (getIsRightInputHubblepupTupleAppreffinge(rightInputAppreffinge)) {
          return {
            typeName: DreanorTypeName.RightVoictentItem2Dreanor,
            gepp: rightInputAppreffinge.gepp,
            lanbe: createLanbe2(
              estinant,
              rightInputAppreffinge,
            ) as GenericVoictentItemLanbe2,
            framate: rightInputAppreffinge.framate,
            croard: rightInputAppreffinge.croard,
            prected: new Prected(),
          } satisfies RightVoictentItem2Dreanor;
        }

        return {
          typeName: DreanorTypeName.RightVoictentDreanor,
          gepp: rightInputAppreffinge.gepp,
          lanbe: createLanbe2(
            estinant,
            rightInputAppreffinge,
          ) as GenericVoictentPelieLanbe,
          isReady: false,
        } satisfies RightVoictentDreanor;
      },
    );

    const platomity: Platomity2 = {
      version: 2,
      estinant,
      leftDreanor,
      rightDreanorTuple,
      outputGeppSet: new Set(estinant.outputAppreffinge.geppTuple),
      procody: new Procody(),
      executionCount: 0,
      dependencySet: new Set(),
      mutableDependencySet: new Set(),
      dependentSet: new Set(),
    };

    return platomity;
  });

  type CologyExecutionContext = {
    platomity: Platomity2;
    cology: Cology;
  };

  const getCologyExecutionContextList = (
    platomity: Platomity2,
  ): CologyExecutionContext[] => {
    const touchedCologySet = new CologySet();

    getDreanorTuple(platomity)
      .filter((dreanor) => {
        if (
          strategy === DigikikifierStrategy.WaitForAllDependencies &&
          (dreanor.typeName === DreanorTypeName.RightVoictentDreanor ||
            (dreanor.typeName === DreanorTypeName.LeftDreanor &&
              dreanor.lanbe.typeName === LanbeTypeName.VoictentPelieLanbe))
        ) {
          return !dreanor.isReady;
        }

        return dreanor.lanbe.hasNext();
      })
      .forEach((dreanor) => {
        dreanor.lanbe.advance();

        if (dreanor.typeName === DreanorTypeName.LeftDreanor) {
          const {
            typeName: leftInputTypeName,
            value: leftInputReferenceValue,
          } = dreanor.lanbe.dereference();

          const indexedHubblepup: GenericIndexedHubblepup =
            leftInputTypeName === ReferenceTypeName.IndexedHubblepupPelie
              ? leftInputReferenceValue
              : {
                  hubblepup: leftInputReferenceValue,
                  indexByName: {
                    serializeableId: '',
                  },
                };

          const leftInput: Hubblepup | HubblepupTuple =
            leftInputTypeName === ReferenceTypeName.IndexedHubblepupPelie
              ? leftInputReferenceValue.hubblepup
              : leftInputReferenceValue;

          if (dreanor.lanbe.typeName === LanbeTypeName.VoictentPelieLanbe) {
            // eslint-disable-next-line no-param-reassign
            dreanor.isReady = true;
          }

          const mabzEntryList = platomity.rightDreanorTuple.map<MabzEntry>(
            (rightDreanor) => {
              let zornTuple: ZornTuple;
              if (
                rightDreanor.typeName === DreanorTypeName.RightVoictentDreanor
              ) {
                zornTuple = [rightDreanor.lanbe];
              } else if (
                rightDreanor.typeName ===
                  DreanorTypeName.RightVoictentItem2Dreanor &&
                leftInputTypeName === ReferenceTypeName.IndexedHubblepupPelie
              ) {
                zornTuple = rightDreanor.framate(leftInputReferenceValue);
              } else if (
                rightDreanor.typeName ===
                  DreanorTypeName.RightVoictentItem2Dreanor &&
                leftInputTypeName === ReferenceTypeName.VoictentPelie
              ) {
                // TODO: this cast is incorrect, and is masking some underlying issue. The input type should probably be "never"
                zornTuple = rightDreanor.framate(
                  leftInput as GenericIndexedHubblepup,
                );
              } else {
                // TODO: remove this else once all voictent item lanbes return indexed hubblepups

                // eslint-disable-next-line no-console
                console.log('DEBUG INFO A:', {
                  leftInputTypeName,
                  rightDreanor,
                  platomity,
                });

                throw Error('Invalid lanbe setup. See above info.');
              }

              return [rightDreanor, zornTuple];
            },
          );

          const cology: Cology = {
            leftDreanor: dreanor,
            leftInput:
              platomity.estinant.version === 2 &&
              leftInputTypeName === ReferenceTypeName.VoictentPelie
                ? indexedHubblepup.hubblepup
                : indexedHubblepup,
            mabz: new Mabz(mabzEntryList),
            hasTriggered: false,
          };

          getCologyEntryList(cology).forEach(([cologyDreanor, zorn]) => {
            const ajorken =
              platomity.procody.get(cologyDreanor.gepp) ?? new Ajorken();
            const cologySet = ajorken.get(zorn) ?? new CologySet();

            cologySet.add(cology);
            ajorken.set(zorn, cologySet);
            platomity.procody.set(cologyDreanor.gepp, ajorken);
          });

          touchedCologySet.add(cology);
        } else {
          const { typeName: rightInputTypeName, value: rightInput } =
            dreanor.lanbe.dereference();

          let zorn: Zorn;
          if (dreanor.typeName === DreanorTypeName.RightVoictentDreanor) {
            zorn = dreanor.lanbe;
            // eslint-disable-next-line no-param-reassign
            dreanor.isReady = true;
          } else if (
            dreanor.typeName === DreanorTypeName.RightVoictentItem2Dreanor &&
            rightInputTypeName === ReferenceTypeName.IndexedHubblepupPelie
          ) {
            zorn = dreanor.croard(rightInput);
            dreanor.prected.set(zorn, rightInput);
          } else {
            // TODO: remove this else once all voictent item lanbes return indexed hubblepups

            // eslint-disable-next-line no-console
            console.log('DEBUG INFO B:', {
              rightInputTypeName,
              dreanor,
            });

            throw Error('Invalid lanbe setup. See above info.');
          }

          const ajorken = platomity.procody.get(dreanor.gepp) ?? new Ajorken();
          const cologySet = ajorken.get(zorn) ?? new CologySet();

          [...cologySet].forEach((cology) => {
            touchedCologySet.add(cology);
          });
        }
      });

    const readyCologyList = [...touchedCologySet].filter((cology) => {
      const isReady = platomity.rightDreanorTuple.every(
        (rightDreanor: RightDreanor) => {
          if (rightDreanor.typeName === DreanorTypeName.RightVoictentDreanor) {
            return rightDreanor.isReady;
          }

          const zornTuple = cology.mabz.get(rightDreanor) as ZornTuple;
          return zornTuple.every((zorn) => rightDreanor.prected.has(zorn));
        },
      );

      return isReady;
    });

    const cologyExecutionContextList =
      readyCologyList.map<CologyExecutionContext>((cology) => {
        return {
          platomity,
          cology,
        };
      });

    return cologyExecutionContextList;
  };

  const executeContext = ({
    platomity,
    cology,
  }: CologyExecutionContext): void => {
    const { leftInput } = cology;

    const rightInputTuple = platomity.rightDreanorTuple.map((rightDreanor) => {
      if (rightDreanor.typeName === DreanorTypeName.RightVoictentDreanor) {
        const rightInputElement = rightDreanor.lanbe.dereference();
        return rightInputElement.value;
      }

      const zornTuple = cology.mabz.get(rightDreanor) as ZornTuple;
      const rightInputTupleElement = zornTuple.map((zorn) => {
        return rightDreanor.prected.get(zorn);
      }) as GenericIndexedHubblepupTuple;

      return rightInputTupleElement;
    });

    try {
      const outputRecord = platomity.estinant.tropoig(
        leftInput,
        ...rightInputTuple,
      );

      const outputQuirmTuple = Object.entries(outputRecord)
        .filter(([gepp]) => {
          return platomity.outputGeppSet.has(gepp);
        })
        .flatMap(([gepp, hubblepupTuple]): Quirm[] => {
          return hubblepupTuple.map<Quirm>((hubblepup) => {
            return {
              gepp,
              hubblepup,
            };
          });
        });

      addToTabilly(outputQuirmTuple);
    } catch (error) {
      onError({
        error: error as Error,
        isCritical: false,
      });
    }

    // eslint-disable-next-line no-param-reassign
    platomity.executionCount += 1;

    // eslint-disable-next-line no-param-reassign
    cology.hasTriggered = true;
  };

  // TODO: create a class or something to encapsulate tracking runtime stats
  const voictentTickSeriesConfigurationByVoictent = new Map<
    GenericVoictent2,
    VoictentTickSeriesConfiguration
  >();

  const estinantTickSeriesConfigurationList =
    platomityList.map<EstinantTickSeriesConfiguration>((platomity) => {
      return {
        platomity,
        connectionList: getDreanorTuple(
          platomity,
        ).map<EstinantConnectionTickSeriesConfiguration>((dreanor) => {
          return {
            gepp: dreanor.gepp,
            lanbe: dreanor.lanbe,
            tickSeries: [],
          };
        }),
        cumulativeExecutionCountTickSeries: [],
        relativeExecutionCountTickSeries: [],
      };
    });

  const timeConfiguration: TimeSeriesConfiguration = {
    timestampSeries: [],
    cumulativeElapsedSecondsTickSeries: [],
    relativeElapsedSecondsTickSeries: [],
  };

  const startTime = process.hrtime.bigint();
  let prevousTickTime = startTime;

  let tickCount = 0;

  const onTopOfLoop = (): void => {
    [...tabilly.values()].forEach((voictent) => {
      voictent.onTickStart();
    });

    // TODO: make estinant input output gepps static so that the list of possible gepps/voictents is known from the start
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    [...tabilly.entries()].forEach(([gepp, voictent]) => {
      const configuration: VoictentTickSeriesConfiguration =
        voictentTickSeriesConfigurationByVoictent.get(voictent) ?? {
          gepp,
          voictentLanbe: voictent.createVoictentLanbe(gepp),
          voictentItemLanbe: voictent.createVoictentItemLanbe(gepp),
          voictentTickSeries: Array.from({ length: tickCount }).map(() => 0),
          voictentItemTickSeries: Array.from({ length: tickCount }).map(
            () => 0,
          ),
        };

      voictentTickSeriesConfigurationByVoictent.set(voictent, configuration);

      configuration.voictentTickSeries.push(
        configuration.voictentLanbe?.hasNext() ? 1 : 0,
      );

      configuration.voictentItemTickSeries.push(
        configuration.voictentItemLanbe?.hasNext() ? 1 : 0,
      );

      if (configuration.voictentItemLanbe?.hasNext()) {
        configuration.voictentItemLanbe.advance();
      }
    });

    estinantTickSeriesConfigurationList.forEach((configuration) => {
      configuration.connectionList.forEach((connection) => {
        connection.tickSeries.push(connection.lanbe.hasNext() ? 1 : 0);
      });
    });
  };

  const onBottomOfLoop = (): void => {
    estinantTickSeriesConfigurationList.forEach((configuration) => {
      const lastExecutionCount =
        configuration.cumulativeExecutionCountTickSeries[
          configuration.cumulativeExecutionCountTickSeries.length - 1
        ] ?? 0;

      configuration.cumulativeExecutionCountTickSeries.push(
        configuration.platomity.executionCount,
      );

      const relativeExecutionCount =
        configuration.platomity.executionCount - lastExecutionCount;
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
      tickTime - prevousTickTime,
    );
    timeConfiguration.relativeElapsedSecondsTickSeries.push(
      Number(relativeElapsedSeconds),
    );

    prevousTickTime = tickTime;
    tickCount += 1;
  };

  const executeWaitForAllDependenciesStrategy = (): void => {
    const virokByGepp = new Map<Gepp, Virok>();

    inputVoictentList.forEach((voictent) => {
      const virok: Virok = {
        voictent,
        mutableDependencySet: new Set(),
        dependencySet: new Set(),
        dependentSet: new Set(),
      };

      virokByGepp.set(voictent.gepp, virok);
    });

    platomityList.forEach((platomity) => {
      [
        platomity.estinant.leftInputAppreffinge.gepp,
        ...platomity.estinant.rightInputAppreffingeTuple.map(
          (appreffinge) => appreffinge.gepp,
        ),
      ].forEach((gepp) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const virok = virokByGepp.get(gepp)!;
        virok.dependentSet.add(platomity);
        platomity.dependencySet.add(virok);
        platomity.mutableDependencySet.add(virok);
      });

      platomity.estinant.outputAppreffinge.geppTuple.forEach((gepp) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const virok = virokByGepp.get(gepp)!;
        platomity.dependentSet.add(virok);
        virok.dependencySet.add(platomity);
        virok.mutableDependencySet.add(platomity);
      });
    });

    const runtimeVirokSet = new Set(
      [...virokByGepp.values()].filter((virok) => {
        return virok.dependencySet.size === 0;
      }),
    );

    // estinants cannot have direct inputs, so they won't be ready immediately
    const runtimePlatomitySet = new Set<Platomity2>();

    // This is a do-while because estinants cannot have direct inputs so there will be 0 estinants ready to run at the very start
    do {
      onTopOfLoop();

      [...runtimePlatomitySet]
        .flatMap((platomity) => {
          return getCologyExecutionContextList(platomity);
        })
        .forEach((context) => {
          // Note: it's important that execution is separated from evaluation since executing a platomity can affect other platomities
          executeContext(context);
        });

      runtimePlatomitySet.forEach((platomity) => {
        const isFinished = getDreanorTuple(platomity).every((dreanor) => {
          if (
            (dreanor.typeName === DreanorTypeName.LeftDreanor ||
              dreanor.typeName === DreanorTypeName.RightVoictentDreanor) &&
            dreanor.lanbe.typeName === LanbeTypeName.VoictentPelieLanbe
          ) {
            return true;
          }

          return !dreanor.lanbe.hasNext();
        });

        if (isFinished) {
          platomity.dependentSet.forEach((virok) => {
            virok.mutableDependencySet.delete(platomity);

            if (virok.mutableDependencySet.size === 0) {
              runtimeVirokSet.add(virok);
            }
          });

          runtimePlatomitySet.delete(platomity);
        }
      });

      runtimeVirokSet.forEach((idkV) => {
        idkV.dependentSet.forEach((idkP) => {
          idkP.mutableDependencySet.delete(idkV);

          if (idkP.mutableDependencySet.size === 0) {
            runtimePlatomitySet.add(idkP);
          }
        });

        runtimeVirokSet.delete(idkV);
      });

      onBottomOfLoop();
    } while (runtimePlatomitySet.size > 0);
  };

  switch (strategy) {
    case DigikikifierStrategy.WaitForAllDependencies:
      executeWaitForAllDependenciesStrategy();
      break;
    case DigikikifierStrategy.OnlyWaitForVoictentDependency:
      throw Error('Not implemented');
  }

  const platomityEndStateList = platomityList.flatMap((platomity) => {
    const cologySet = new Set(
      [...platomity.procody.values()].flatMap((ajorken) => {
        return [...ajorken.values()].flatMap((cologySubset) => {
          return [...cologySubset];
        });
      }),
    );

    const untriggeredCologySet = [...cologySet].filter(
      (cology) => !cology.hasTriggered,
    );

    return {
      platomity,
      untriggeredCologySet,
    };
  });

  const unfinishedPlatomityList = platomityEndStateList.filter(
    (endState) => endState.untriggeredCologySet.length > 0,
  );

  if (unfinishedPlatomityList.length > 0) {
    const output = unfinishedPlatomityList.map((endState) => {
      const cologySetEndState = endState.untriggeredCologySet.map((cology) => {
        const rightTupleState = endState.platomity.rightDreanorTuple.map(
          (rightDreanor: RightDreanor) => {
            if (
              rightDreanor.typeName === DreanorTypeName.RightVoictentDreanor
            ) {
              return {
                rightGepp: rightDreanor.gepp,
                isReady: rightDreanor.isReady,
              };
            }

            const zornTuple = cology.mabz.get(rightDreanor) as ZornTuple;
            return zornTuple.map((zorn) => {
              const hasItem = rightDreanor.prected.has(zorn);
              return {
                rightGepp: rightDreanor.gepp,
                zorn,
                hasItem,
              };
            });
          },
        );

        return {
          leftInput: cology.leftInput,
          rightTupleState,
        };
      });

      return {
        estinantName: endState.platomity.estinant.name,
        leftGepp: endState.platomity.estinant.leftInputAppreffinge.gepp,
        cologySet: cologySetEndState,
      };
    });

    class UntriggeredCologyError extends Error {
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

    onError({ error: new UntriggeredCologyError(output), isCritical: false });
  }

  const statistics: RuntimeStatistics = {
    voictentList: [...voictentTickSeriesConfigurationByVoictent.values()],
    estinantList: estinantTickSeriesConfigurationList,
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

type DigikikifierInput2<TEstinantTuple extends UnsafeEstinant2Tuple> = {
  inputVoictentList: GenericVoictent2[];
  errorGepp?: Gepp;
  estinantTuple: TEstinantTuple;
  onFinish?: RuntimeStatisticsHandler;
  failForEncounteredError?: boolean;
};

export const digikikify2 = <TEstinantTuple extends UnsafeEstinant2Tuple>({
  inputVoictentList = [],
  errorGepp,
  estinantTuple,
  onFinish,
  failForEncounteredError,
}: DigikikifierInput2<TEstinantTuple>): void => {
  digikikify({
    inputVoictentList,
    errorGepp,
    estinantTuple,
    onFinish,
    failForEncounteredError,
  });
};
