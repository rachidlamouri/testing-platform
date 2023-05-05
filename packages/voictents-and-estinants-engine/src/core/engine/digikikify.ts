import { Zorn, ZornTuple } from '../../utilities/semantic-types/zorn';
import { Ajorken } from '../internal/procody/ajorken';
import {
  Appreffinge,
  getIsWibiz,
} from '../engine-shell/appreffinge/appreffinge';
import {
  Cology,
  CologySet,
  getCologyEntryList,
} from '../internal/procody/cology';
import {
  DreanorTypeName,
  LeftDreanor,
  RightDreanor,
  RightVoictentDreanor,
  RightVoictentItem2Dreanor,
  RightVoictentItemDreanor,
} from '../internal/dreanor/dreanor';
import { Estinant, EstinantTuple } from '../engine-shell/estinant/estinant';
import { Gepp } from '../engine-shell/voictent/gepp';
import {
  GenericIndexedHubblepup,
  GenericIndexedHubblepupTuple,
  Hubblepup,
  HubblepupTuple,
} from '../engine-shell/quirm/hubblepup';
import {
  GenericVoictentItemLanbe2,
  Lanbe,
  LanbeTypeName,
  ReferenceTypeName,
  VoictentItemLanbe,
  VoictentLanbe,
} from '../engine-shell/voictent/lanbe';
import { Mabz, MabzEntry } from '../internal/procody/mabz';
import { Platomity, getDreanorTuple } from '../internal/platomity';
import { Prected } from '../internal/dreanor/prected';
import { Procody } from '../internal/procody/procody';
import { Quirm, QuirmTuple } from '../engine-shell/quirm/quirm';
import { Tabilly } from './tabilly';
import { GenericVoictent2 } from './voictent2';

export type OnHubblepupAddedToVoictentsHandler = (quirm: Quirm) => void;

export type RuntimeStatisticsHandler = (statistics: RuntimeStatistics) => void;

export type DigikikifierInput = {
  // TODO: remove "initialQuirmTuple" and make inputVoictentList required
  inputVoictentList?: GenericVoictent2[];
  initialQuirmTuple?: QuirmTuple;
  estinantTuple: EstinantTuple;
  onHubblepupAddedToVoictents: OnHubblepupAddedToVoictentsHandler;
  onFinish?: RuntimeStatisticsHandler;
};

const nanosecondsToSeconds = (nanoseconds: bigint): bigint =>
  nanoseconds / 1000000000n;

// A series of values by engine tick
type TickSeries<TValue extends number | bigint> = TValue[];

type VoictentTickSeriesConfiguration = {
  gepp: Gepp;
  voictentLanbe: VoictentLanbe | null;
  voictentItemLanbe: VoictentItemLanbe | GenericVoictentItemLanbe2 | null;
  voictentTickSeries: TickSeries<number>;
  voictentItemTickSeries: TickSeries<number>;
};

type EstinantConnectionTickSeriesConfiguration = {
  gepp: Gepp;
  lanbe: Lanbe;
  tickSeries: TickSeries<number>;
};

type EstinantTickSeriesConfiguration = {
  platomity: Platomity;
  connectionList: EstinantConnectionTickSeriesConfiguration[];
  cumulativeExecutionCountTickSeries: TickSeries<number>;
  relativeExecutionCountTickSeries: TickSeries<number>;
};

type TimeSeriesConfiguration = {
  timestampSeries: TickSeries<bigint>;
  cumulativeElapsedSecondsTickSeries: TickSeries<number>;
  relativeElapsedSecondsTickSeries: TickSeries<number>;
};

type RuntimeStatistics = {
  voictentList: VoictentTickSeriesConfiguration[];
  estinantList: EstinantTickSeriesConfiguration[];
  time: TimeSeriesConfiguration;
};

/**
 * A pipes and filters engine
 *
 * @param input (see individual properties)
 * @param input.estinantTuple the collection of Estinants to register in the engine
 * @param input.initialQuirmTuple the starting collection of Quirms to kickstart the engine
 */
export const digikikify = ({
  inputVoictentList = [],
  initialQuirmTuple = [],
  estinantTuple,
  onHubblepupAddedToVoictents,
  onFinish,
}: DigikikifierInput): void => {
  const initialTabillyEntryList = inputVoictentList.map((voictent) => {
    return [voictent.gepp, voictent] as const;
  });

  const tabilly = new Tabilly(initialTabillyEntryList);

  const addToTabilly = (quirmTuple: QuirmTuple): void => {
    tabilly.addHubblepupsToVoictents(quirmTuple);

    quirmTuple.forEach((quirm) => {
      onHubblepupAddedToVoictents(quirm);
    });
  };

  const createLanbe = (estinant: Estinant, appreffinge: Appreffinge): Lanbe => {
    const voictent = tabilly.getOrInstantiateAndGetVoictent(appreffinge.gepp);
    const lanbe = getIsWibiz(appreffinge)
      ? voictent.createVoictentLanbe(estinant.tropoig.name)
      : voictent.createVoictentItemLanbe(estinant.tropoig.name);

    if (lanbe === null) {
      throw Error('Unexpected null Lanbe');
    }

    return lanbe;
  };

  const platomityList = estinantTuple.map<Platomity>((estinant) => {
    const { leftAppreffinge, rightAppreffingeTuple } = estinant;

    const leftDreanor: LeftDreanor = {
      typeName: DreanorTypeName.LeftDreanor,
      gepp: leftAppreffinge.gepp,
      lanbe: createLanbe(estinant, leftAppreffinge),
    };

    const rightDreanorTuple = rightAppreffingeTuple.map<RightDreanor>(
      (rightAppreffinge) => {
        if (getIsWibiz(rightAppreffinge)) {
          return {
            typeName: DreanorTypeName.RightVoictentDreanor,
            gepp: rightAppreffinge.gepp,
            lanbe: createLanbe(estinant, rightAppreffinge) as VoictentLanbe,
            isReady: false,
          } satisfies RightVoictentDreanor;
        }

        if ('framate' in rightAppreffinge) {
          return {
            typeName: DreanorTypeName.RightVoictentItemDreanor,
            gepp: rightAppreffinge.gepp,
            lanbe: createLanbe(estinant, rightAppreffinge) as VoictentItemLanbe,
            framate: rightAppreffinge.framate,
            croard: rightAppreffinge.croard,
            prected: new Prected(),
          } satisfies RightVoictentItemDreanor;
        }

        return {
          typeName: DreanorTypeName.RightVoictentItem2Dreanor,
          gepp: rightAppreffinge.gepp,
          lanbe: createLanbe(
            estinant,
            rightAppreffinge,
          ) as GenericVoictentItemLanbe2,
          framate: rightAppreffinge.framate2,
          croard: rightAppreffinge.croard2,
          prected: new Prected(),
        } satisfies RightVoictentItem2Dreanor;
      },
    );

    const platomity: Platomity = {
      estinant,
      leftDreanor,
      rightDreanorTuple,
      procody: new Procody(),
      executionCount: 0,
    };

    return platomity;
  });

  const isPlatomityActive = (platomity: Platomity): boolean => {
    return getDreanorTuple(platomity).some((dreanor) => {
      if (dreanor.lanbe.typeName === LanbeTypeName.VoictentLanbe) {
        return dreanor.lanbe.hasNext() || dreanor.lanbe.isAccumulating();
      }

      return dreanor.lanbe.hasNext();
    });
  };

  type CologyExecutionContext = {
    platomity: Platomity;
    cology: Cology;
  };

  const getCologyExecutionContextList = (
    platomity: Platomity,
  ): CologyExecutionContext[] => {
    const touchedCologySet = new CologySet();

    getDreanorTuple(platomity)
      .filter((dreanor) => {
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
            leftInputTypeName === ReferenceTypeName.IndexedVoictentItem
              ? leftInputReferenceValue
              : {
                  hubblepup: leftInputReferenceValue,
                  indexByName: {
                    serializeableId: '',
                  },
                };

          const leftInput: Hubblepup | HubblepupTuple =
            leftInputTypeName === ReferenceTypeName.IndexedVoictentItem
              ? leftInputReferenceValue.hubblepup
              : leftInputReferenceValue;

          const mabzEntryList = platomity.rightDreanorTuple.map<MabzEntry>(
            (rightDreanor) => {
              let zornTuple: ZornTuple;
              if (
                rightDreanor.typeName === DreanorTypeName.RightVoictentDreanor
              ) {
                zornTuple = [rightDreanor.lanbe];
              } else if (
                rightDreanor.typeName ===
                DreanorTypeName.RightVoictentItemDreanor
              ) {
                zornTuple = rightDreanor.framate(leftInput);
              } else if (
                rightDreanor.typeName ===
                  DreanorTypeName.RightVoictentItem2Dreanor &&
                leftInputTypeName === ReferenceTypeName.IndexedVoictentItem
              ) {
                zornTuple = rightDreanor.framate(leftInputReferenceValue);
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
            leftInput: indexedHubblepup,
            mabz: new Mabz(mabzEntryList),
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
          const {
            typeName: rightInputTypeName,
            value: rightInputReferenceValue,
          } = dreanor.lanbe.dereference();

          const rightInput =
            rightInputTypeName === ReferenceTypeName.IndexedVoictentItem
              ? rightInputReferenceValue.hubblepup
              : rightInputReferenceValue;

          let zorn: Zorn;
          if (dreanor.typeName === DreanorTypeName.RightVoictentDreanor) {
            zorn = dreanor.lanbe;
            // eslint-disable-next-line no-param-reassign
            dreanor.isReady = true;
          } else if (
            dreanor.typeName === DreanorTypeName.RightVoictentItemDreanor &&
            rightInputTypeName === ReferenceTypeName.VoictentItem
          ) {
            zorn = dreanor.croard(rightInputReferenceValue);
            dreanor.prected.set(zorn, rightInput);
          } else if (
            dreanor.typeName === DreanorTypeName.RightVoictentItem2Dreanor &&
            rightInputTypeName === ReferenceTypeName.IndexedVoictentItem
          ) {
            zorn = dreanor.croard(rightInputReferenceValue);
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

    const rightInputTuple: GenericIndexedHubblepupTuple =
      platomity.rightDreanorTuple.map<GenericIndexedHubblepup>(
        (rightDreanor) => {
          if (rightDreanor.typeName === DreanorTypeName.RightVoictentDreanor) {
            const rightInput = rightDreanor.lanbe.dereference().value;
            return {
              hubblepup: rightInput,
              indexByName: {},
            };
          }

          const zornTuple = cology.mabz.get(rightDreanor) as ZornTuple;
          const rightInput = zornTuple.map((zorn) => {
            return rightDreanor.prected.get(zorn);
          });
          return {
            hubblepup: rightInput,
            indexByName: {},
          };
        },
      );

    const outputQuirmTuple = platomity.estinant.tropoig(
      leftInput,
      ...rightInputTuple,
    );

    // eslint-disable-next-line no-param-reassign
    platomity.executionCount += 1;

    addToTabilly(outputQuirmTuple);
  };

  addToTabilly(initialQuirmTuple);

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

  while (platomityList.some(isPlatomityActive)) {
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

    platomityList
      .flatMap((platomity) => {
        return getCologyExecutionContextList(platomity);
      })
      .forEach((context) => {
        // Note: it's important that execution is separated from evaluation since executing a platomity can affect other platomities
        executeContext(context);
      });

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
  }

  const statistics: RuntimeStatistics = {
    voictentList: [...voictentTickSeriesConfigurationByVoictent.values()],
    estinantList: estinantTickSeriesConfigurationList,
    time: timeConfiguration,
  };

  if (onFinish) {
    onFinish(statistics);
  }
};
