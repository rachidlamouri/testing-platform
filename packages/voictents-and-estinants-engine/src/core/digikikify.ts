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
import { Platomity } from './platomity';
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
    return [platomity.leftDreanor, ...platomity.rightDreanorTuple].some(
      (dreanor) => dreanor.lanbe.hasNext(),
    );
  };

  const executePlatomity = (platomity: Platomity): void => {
    const touchedCologySet = new CologySet();

    [platomity.leftDreanor, ...platomity.rightDreanorTuple]
      .filter((dreanor) => dreanor.lanbe.hasNext())
      .forEach((dreanor) => {
        dreanor.lanbe.advance();

        if (dreanor.typeName === DreanorTypeName.LeftDreanor) {
          const leftHubblepup = dreanor.lanbe.dereference() as Hubblepup;

          const mabzEntryList = platomity.rightDreanorTuple.map<MabzEntry>(
            (rightDreanor) => {
              let zornTuple: ZornTuple;
              if (
                rightDreanor.typeName === DreanorTypeName.RightVoictentDreanor
              ) {
                zornTuple = [dreanor.lanbe];
              } else {
                zornTuple = rightDreanor.framate(leftHubblepup);
              }

              return [rightDreanor.gepp, zornTuple];
            },
          );

          const cology: Cology = {
            leftQuirm: {
              gepp: dreanor.gepp,
              hubblepup: leftHubblepup,
            },
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

    const readyCologies = [...touchedCologySet].filter((cology) => {
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

    readyCologies.forEach((cology) => {
      const leftInput = cology.leftQuirm.hubblepup;

      const rightInputTuple = platomity.rightDreanorTuple.map<HubblepupTuple>(
        (rightDreanor) => {
          if (rightDreanor.typeName === DreanorTypeName.RightVoictentDreanor) {
            const rightInput =
              rightDreanor.lanbe.dereference() as HubblepupTuple;
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
    });
  };

  addToTabilly(initialQuirmTuple);

  // This must be a dowhile so that when "isWibiz" is true, it triggers for a Voictent with 1 item
  do {
    [...tabilly.values()].forEach((voictent) => {
      voictent.onTickStart();
    });

    platomityList.filter(canPlatomityAdvance).forEach((platomity) => {
      executePlatomity(platomity);
    });
  } while (platomityList.some(canPlatomityAdvance));
};
