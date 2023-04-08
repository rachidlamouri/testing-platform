import { Zorn, ZornTuple } from '../utilities/semantic-types/zorn';
import { Ajorken } from './ajorken';
import { Appreffinge, getIsWibiz } from './appreffinge';
import { Cology, CologySet, getCologyEntryList } from './cology';
import {
  DreanorTypeName,
  LeftDreanor,
  RightDreanor,
  RightVoictentDreanor,
  RightVoictentItemDreanor,
} from './dreanor';
import { Estinant, EstinantTuple } from './estinant';
import { Gepp } from './gepp';
import { Hubblepup, HubblepupTuple } from './hubblepup';
import {
  Lanbe,
  LanbeTypeName,
  VoictentItemLanbe,
  VoictentLanbe,
} from './lanbe';
import { Mabz, MabzEntry } from './mabz';
import { Platomity, getDreanorTuple } from './platomity';
import { Prected } from './prected';
import { Procody } from './procody';
import { Quirm, QuirmTuple } from './quirm';
import { Tabilly } from './tabilly';
import { Voictent } from './voictent';

export type OnHubblepupAddedToVoictentsHandler = (quirm: Quirm) => void;

export type RuntimeStatisticsHandler = (statistics: RuntimeStatistics) => void;

export type DigikikifierInput = {
  initialQuirmTuple: QuirmTuple;
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
  voictentLanbe: VoictentLanbe;
  voictentItemLanbe: VoictentItemLanbe;
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
  initialQuirmTuple,
  estinantTuple,
  onHubblepupAddedToVoictents,
  onFinish,
}: DigikikifierInput): void => {
  const tabilly = new Tabilly();

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
        return {
          typeName: DreanorTypeName.RightVoictentItemDreanor,
          gepp: rightAppreffinge.gepp,
          lanbe: createLanbe(estinant, rightAppreffinge) as VoictentItemLanbe,
          framate: rightAppreffinge.framate,
          croard: rightAppreffinge.croard,
          prected: new Prected(),
        } satisfies RightVoictentItemDreanor;
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
          const leftInput = dreanor.lanbe.dereference() as
            | Hubblepup
            | HubblepupTuple;

          const mabzEntryList = platomity.rightDreanorTuple.map<MabzEntry>(
            (rightDreanor) => {
              let zornTuple: ZornTuple;
              if (
                rightDreanor.typeName === DreanorTypeName.RightVoictentDreanor
              ) {
                zornTuple = [rightDreanor.lanbe];
              } else {
                zornTuple = rightDreanor.framate(leftInput);
              }

              return [rightDreanor, zornTuple];
            },
          );

          const cology: Cology = {
            leftDreanor: dreanor,
            leftInput,
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
          let rightInput;
          let zorn: Zorn;
          if (dreanor.typeName === DreanorTypeName.RightVoictentDreanor) {
            rightInput = dreanor.lanbe.dereference() as HubblepupTuple;
            zorn = dreanor.lanbe;
            // eslint-disable-next-line no-param-reassign
            dreanor.isReady = true;
          } else {
            rightInput = dreanor.lanbe.dereference() as Hubblepup;
            zorn = dreanor.croard(rightInput);
            dreanor.prected.set(zorn, rightInput);
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

    const rightInputTuple = platomity.rightDreanorTuple.map<HubblepupTuple>(
      (rightDreanor) => {
        if (rightDreanor.typeName === DreanorTypeName.RightVoictentDreanor) {
          const rightInput = rightDreanor.lanbe.dereference() as HubblepupTuple;
          return rightInput;
        }

        const zornTuple = cology.mabz.get(rightDreanor) as ZornTuple;
        const rightInput = zornTuple.map(
          (zorn) => rightDreanor.prected.get(zorn) as Hubblepup,
        );
        return rightInput;
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

  const voictentConfigurationByVoictent = new Map<
    Voictent,
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
        voictentConfigurationByVoictent.get(voictent) ?? {
          gepp,
          voictentLanbe: voictent.createVoictentLanbe(gepp),
          voictentItemLanbe: voictent.createVoictentItemLanbe(gepp),
          voictentTickSeries: Array.from({ length: tickCount }).map(() => 0),
          voictentItemTickSeries: Array.from({ length: tickCount }).map(
            () => 0,
          ),
        };

      voictentConfigurationByVoictent.set(voictent, configuration);

      configuration.voictentTickSeries.push(
        configuration.voictentLanbe.hasNext() ? 1 : 0,
      );

      configuration.voictentItemTickSeries.push(
        configuration.voictentItemLanbe.hasNext() ? 1 : 0,
      );

      if (configuration.voictentItemLanbe.hasNext()) {
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
    voictentList: [...voictentConfigurationByVoictent.values()],
    estinantList: estinantTickSeriesConfigurationList,
    time: timeConfiguration,
  };

  if (onFinish) {
    onFinish(statistics);
  }
};
