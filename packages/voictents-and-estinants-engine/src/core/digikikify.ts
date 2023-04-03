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
import { Hubblepup, HubblepupTuple } from './hubblepup';
import { Lanbe, VoictentItemLanbe, VoictentLanbe } from './lanbe';
import { Mabz, MabzEntry } from './mabz';
import { Platomity, getDreanorTuple } from './platomity';
import { Prected } from './prected';
import { Procody } from './procody';
import { Quirm, QuirmTuple } from './quirm';
import { Tabilly } from './tabilly';

export type OnHubblepupAddedToVoictentsHandler = (quirm: Quirm) => void;

export type DigikikifierInput = {
  initialQuirmTuple: QuirmTuple;
  estinantTuple: EstinantTuple;
  onHubblepupAddedToVoictents: OnHubblepupAddedToVoictentsHandler;
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
    };

    return platomity;
  });

  const canPlatomityAdvance = (platomity: Platomity): boolean => {
    return getDreanorTuple(platomity).some((dreanor) =>
      dreanor.lanbe.hasNext(),
    );
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
                zornTuple = [dreanor.lanbe];
              } else {
                zornTuple = rightDreanor.framate(leftInput);
              }

              return [rightDreanor.gepp, zornTuple];
            },
          );

          const cology: Cology = {
            leftGepp: dreanor.gepp,
            leftInput,
            mabz: new Mabz(mabzEntryList),
          };

          getCologyEntryList(cology).forEach(([gepp, zorn]) => {
            const ajorken = platomity.procody.get(gepp) ?? new Ajorken();
            const cologySet = ajorken.get(zorn) ?? new CologySet();

            cologySet.add(cology);
            ajorken.set(zorn, cologySet);
            platomity.procody.set(gepp, ajorken);
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

          const zornTuple = cology.mabz.get(rightDreanor.gepp) as ZornTuple;
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

        const zornTuple = cology.mabz.get(rightDreanor.gepp) as ZornTuple;
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

    addToTabilly(outputQuirmTuple);
  };

  addToTabilly(initialQuirmTuple);

  while (platomityList.some(canPlatomityAdvance)) {
    [...tabilly.values()].forEach((voictent) => {
      voictent.onTickStart();
    });

    platomityList
      .flatMap((platomity) => {
        return getCologyExecutionContextList(platomity);
      })
      .forEach((context) => {
        // Note: it's important that execution is separated from evaluation since executing a platomity can affect other platomities
        executeContext(context);
      });
  }
};
