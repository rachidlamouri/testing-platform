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
import {
  Estinant,
  GenericEstinant2,
  UnsafeEstinant2Tuple,
} from '../engine-shell/estinant/estinant';
import { GenericGepp, GenericGeppSet } from '../engine-shell/voictent/gepp';
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
import {
  Platomity,
  Platomity2,
  Virok,
  getDreanorTuple,
  isPlatomity2List,
} from '../internal/platomity';
import { Prected } from '../internal/dreanor/prected';
import { Procody } from '../internal/procody/procody';
import { Quirm, QuirmTuple } from '../engine-shell/quirm/quirm';
import { Tabilly } from './tabilly';
import { GenericVoictent2 } from './voictent2';
import { GenericAppreffinge2 } from '../engine-shell/appreffinge/appreffinge2';
import { Tuple } from '../../utilities/semantic-types/tuple';
import { getIsRightInputHubblepupTupleAppreffinge } from '../engine-shell/appreffinge/rightInputAppreffinge';

type OnHubblepupAddedToVoictentsHandler = (quirm: Quirm) => void;

type RuntimeStatisticsHandler = (statistics: RuntimeStatistics) => void;

export enum DigikikifierStrategy {
  AllAtOnce = 'AllAtOnce',
  WaitForAllDependencies = 'WaitForAllDependencies',
  OnlyWaitForVoictentDependency = 'OnlyWaitForVoictentDependency',
}

export type DigikikifierInput = {
  // TODO: remove "initialQuirmTuple" and make inputVoictentList required
  inputVoictentList?: GenericVoictent2[];
  estinantTuple: Tuple<Estinant | GenericEstinant2>;
  /** @deprecated */
  onHubblepupAddedToVoictents?: OnHubblepupAddedToVoictentsHandler;
  onFinish?: RuntimeStatisticsHandler;
  strategy?: DigikikifierStrategy;
};

const nanosecondsToSeconds = (nanoseconds: bigint): bigint =>
  nanoseconds / 1000000000n;

// A series of values by engine tick
type TickSeries<TValue extends number | bigint> = TValue[];

type VoictentTickSeriesConfiguration = {
  gepp: GenericGepp;
  voictentLanbe: VoictentLanbe | null;
  voictentItemLanbe: VoictentItemLanbe | GenericVoictentItemLanbe2 | null;
  voictentTickSeries: TickSeries<number>;
  voictentItemTickSeries: TickSeries<number>;
};

type EstinantConnectionTickSeriesConfiguration = {
  gepp: GenericGepp;
  lanbe: Lanbe;
  tickSeries: TickSeries<number>;
};

type EstinantTickSeriesConfiguration = {
  platomity: Platomity | Platomity2;
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
 * A pipes and filters engine
 *
 * @param input (see individual properties)
 * @param input.estinantTuple the collection of Estinants to register in the engine
 * @param input.initialQuirmTuple the starting collection of Quirms to kickstart the engine
 */
export const digikikify = ({
  inputVoictentList = [],
  estinantTuple,
  onHubblepupAddedToVoictents,
  onFinish,
  strategy = DigikikifierStrategy.WaitForAllDependencies,
}: DigikikifierInput): void => {
  const inputGeppSet: GenericGeppSet = new Set(
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
  });

  invalidEstinantInputOutputList.forEach(({ estinantName, gepp, isInput }) => {
    const label = isInput ? 'input' : 'output';

    errorMessageList.push(
      `Estinant inputs and outputs must have a corresponding voictent. Estinant "${estinantName}" has an ${label} gepp "${gepp}" without a corresponding voictent.`,
    );
  });

  if (errorMessageList.length > 0) {
    const aggregateMessage = [
      `Encountered ${errorMessageList.length} errors:`,
      ...errorMessageList.slice(0, 100).map((errorMessage, index) => {
        // 4 accounts for 2 spaces and then a 2 digit number
        return `${`${index}`.padStart(4, ' ')}: ${errorMessage}`;
      }),
    ].join('\n');

    throw Error(aggregateMessage);
  }

  const initialTabillyEntryList = inputVoictentList.map((voictent) => {
    return [voictent.gepp, voictent] as const;
  });

  const tabilly = new Tabilly(initialTabillyEntryList);

  const addToTabilly = (quirmTuple: QuirmTuple): void => {
    tabilly.addHubblepupsToVoictents(quirmTuple);

    if (onHubblepupAddedToVoictents !== undefined) {
      quirmTuple.forEach((quirm) => {
        onHubblepupAddedToVoictents(quirm);
      });
    }
  };

  const createLanbe2 = (
    estinant: GenericEstinant2,
    appreffinge: GenericAppreffinge2,
  ): Lanbe => {
    const voictent = tabilly.getOrInstantiateAndGetVoictent(appreffinge.gepp);
    const lanbe = getIsWibiz(appreffinge)
      ? voictent.createVoictentLanbe(estinant.name)
      : voictent.createVoictentItemLanbe(estinant.name);

    if (lanbe === null) {
      throw Error('Unexpected null Lanbe');
    }

    return lanbe;
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

  const platomityList = estinantTuple.map<Platomity | Platomity2>(
    (estinant) => {
      if (estinant.version === 2) {
        const { leftInputAppreffinge, rightInputAppreffingeTuple } = estinant;

        const leftDreanor: LeftDreanor = {
          typeName: DreanorTypeName.LeftDreanor,
          gepp: leftInputAppreffinge.gepp,
          lanbe: createLanbe2(estinant, leftInputAppreffinge),
          isReady: false,
        };

        const rightDreanorTuple = rightInputAppreffingeTuple.map<RightDreanor>(
          (rightInputAppreffinge) => {
            if (
              getIsRightInputHubblepupTupleAppreffinge(rightInputAppreffinge)
            ) {
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
              ) as VoictentLanbe,
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
      }

      const { leftAppreffinge, rightAppreffingeTuple } = estinant;

      const leftDreanor: LeftDreanor = {
        typeName: DreanorTypeName.LeftDreanor,
        gepp: leftAppreffinge.gepp,
        lanbe: createLanbe(estinant, leftAppreffinge),
        isReady: false,
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
              lanbe: createLanbe(
                estinant,
                rightAppreffinge,
              ) as VoictentItemLanbe,
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
        version: 1,
        estinant,
        leftDreanor,
        rightDreanorTuple,
        procody: new Procody(),
        executionCount: 0,
      };

      return platomity;
    },
  );

  const isPlatomityActive = (platomity: Platomity | Platomity2): boolean => {
    return getDreanorTuple(platomity).some((dreanor) => {
      if (dreanor.lanbe.typeName === LanbeTypeName.VoictentLanbe) {
        return dreanor.lanbe.hasNext() || dreanor.lanbe.isAccumulating();
      }

      return dreanor.lanbe.hasNext();
    });
  };

  type CologyExecutionContext = {
    platomity: Platomity | Platomity2;
    cology: Cology;
  };

  const getCologyExecutionContextList = (
    platomity: Platomity | Platomity2,
  ): CologyExecutionContext[] => {
    const touchedCologySet = new CologySet();

    getDreanorTuple(platomity)
      .filter((dreanor) => {
        if (
          strategy === DigikikifierStrategy.WaitForAllDependencies &&
          (dreanor.typeName === DreanorTypeName.RightVoictentDreanor ||
            (dreanor.typeName === DreanorTypeName.LeftDreanor &&
              dreanor.lanbe.typeName === LanbeTypeName.VoictentLanbe))
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

          if (dreanor.lanbe.typeName === LanbeTypeName.VoictentLanbe) {
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
                DreanorTypeName.RightVoictentItemDreanor
              ) {
                zornTuple = rightDreanor.framate(leftInput);
              } else if (
                rightDreanor.typeName ===
                  DreanorTypeName.RightVoictentItem2Dreanor &&
                leftInputTypeName === ReferenceTypeName.IndexedVoictentItem
              ) {
                zornTuple = rightDreanor.framate(leftInputReferenceValue);
              } else if (
                rightDreanor.typeName ===
                  DreanorTypeName.RightVoictentItem2Dreanor &&
                leftInputTypeName === ReferenceTypeName.Voictent
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
              leftInputTypeName === ReferenceTypeName.Voictent
                ? indexedHubblepup.hubblepup
                : indexedHubblepup,
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
          const { typeName: rightInputTypeName, value: rightInput } =
            dreanor.lanbe.dereference();

          let zorn: Zorn;
          if (dreanor.typeName === DreanorTypeName.RightVoictentDreanor) {
            zorn = dreanor.lanbe;
            // eslint-disable-next-line no-param-reassign
            dreanor.isReady = true;

            if (strategy === DigikikifierStrategy.AllAtOnce) {
              // eslint-disable-next-line no-param-reassign
              dreanor.mutableReference = rightInput;
            }
          } else if (
            dreanor.typeName === DreanorTypeName.RightVoictentItemDreanor &&
            rightInputTypeName === ReferenceTypeName.VoictentItem
          ) {
            zorn = dreanor.croard(rightInput);
            dreanor.prected.set(zorn, rightInput);
          } else if (
            dreanor.typeName === DreanorTypeName.RightVoictentItem2Dreanor &&
            rightInputTypeName === ReferenceTypeName.IndexedVoictentItem
          ) {
            zorn = dreanor.croard(rightInput);
            dreanor.prected.set(zorn, rightInput);
          } else if (
            dreanor.typeName === DreanorTypeName.RightVoictentItemDreanor &&
            rightInputTypeName === ReferenceTypeName.IndexedVoictentItem
          ) {
            const actualRightInput = rightInput.hubblepup;
            zorn = dreanor.croard(actualRightInput);
            dreanor.prected.set(zorn, actualRightInput);
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

    let outputQuirmTuple: Quirm[] = [];

    if (platomity.version === 2) {
      const rightInputTuple = platomity.rightDreanorTuple.map(
        (rightDreanor) => {
          if (rightDreanor.typeName === DreanorTypeName.RightVoictentDreanor) {
            if (strategy === DigikikifierStrategy.AllAtOnce) {
              const rightInputElement = rightDreanor.mutableReference;
              return rightInputElement;
            }

            const rightInputElement = rightDreanor.lanbe.dereference();
            return rightInputElement.value;
          }

          const zornTuple = cology.mabz.get(rightDreanor) as ZornTuple;
          const rightInputTupleElement = zornTuple.map((zorn) => {
            return rightDreanor.prected.get(zorn);
          }) as GenericIndexedHubblepupTuple;

          return rightInputTupleElement;
        },
      );

      const outputRecord = platomity.estinant.tropoig(
        leftInput,
        ...rightInputTuple,
      );

      outputQuirmTuple = Object.entries(outputRecord)
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
    } else {
      const rightInputTuple = platomity.rightDreanorTuple.map(
        (rightDreanor) => {
          if (rightDreanor.typeName === DreanorTypeName.RightVoictentDreanor) {
            const rightInputElement = rightDreanor.lanbe.dereference().value;
            return {
              hubblepup: rightInputElement,
              indexByName: {},
            };
          }

          const zornTuple = cology.mabz.get(rightDreanor) as ZornTuple;
          const rightInputTupleElement = zornTuple.map((zorn) => {
            return rightDreanor.prected.get(zorn);
          });

          return {
            hubblepup: rightInputTupleElement,
            indexByName: {},
          };
        },
      );

      outputQuirmTuple = platomity.estinant.tropoig(
        // TODO: this cast isn't right, but this whole case will go away, so whatever
        leftInput as GenericIndexedHubblepup,
        ...rightInputTuple,
      );
    }

    // eslint-disable-next-line no-param-reassign
    platomity.executionCount += 1;

    addToTabilly(outputQuirmTuple);
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

  const executeAllAtOnceStrategy = (): void => {
    while (platomityList.some(isPlatomityActive)) {
      onTopOfLoop();

      platomityList
        .flatMap((platomity) => {
          return getCologyExecutionContextList(platomity);
        })
        .forEach((context) => {
          // Note: it's important that execution is separated from evaluation since executing a platomity can affect other platomities
          executeContext(context);
        });

      onBottomOfLoop();
    }
  };

  const executeWaitForAllDependenciesStrategy = (): void => {
    if (!isPlatomity2List(platomityList)) {
      throw Error('Unsupported Platomity 1');
    }

    const virokByGepp = new Map<GenericGepp, Virok>();

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
            dreanor.lanbe.typeName === LanbeTypeName.VoictentLanbe
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
    case DigikikifierStrategy.AllAtOnce:
      executeAllAtOnceStrategy();
      break;
    case DigikikifierStrategy.WaitForAllDependencies:
      executeWaitForAllDependenciesStrategy();
      break;
    case DigikikifierStrategy.OnlyWaitForVoictentDependency:
      throw Error('Not implemented');
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

type DigikikifierInput2<TEstinantTuple extends UnsafeEstinant2Tuple> = {
  inputVoictentList: GenericVoictent2[];
  estinantTuple: TEstinantTuple;
  onFinish?: RuntimeStatisticsHandler;
};

export const digikikify2 = <TEstinantTuple extends UnsafeEstinant2Tuple>({
  inputVoictentList = [],
  estinantTuple,
  onFinish,
}: DigikikifierInput2<TEstinantTuple>): void => {
  digikikify({
    inputVoictentList,
    estinantTuple,
    onFinish,
  });
};
