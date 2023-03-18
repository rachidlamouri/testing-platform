import { ZornTuple } from '../utilities/semantic-types/zorn';
import { Ajorken } from './ajorken';
import { Appreffinge, getIsWibiz } from './appreffinge';
import { Cology, CologySet } from './cology';
import { LeftDreanor, RightDreanor } from './dreanor';
import { Estinant, EstinantTuple } from './estinant';
import { Gepp } from './gepp';
import { Hubblepup } from './hubblepup';
import { Lanbe } from './lanbe';
import { Mabz } from './mabz';
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
      isLeft: true,
      gepp: leftAppreffinge.gepp,
      lanbe: createLanbe(estinant, leftAppreffinge),
    };

    const rightDreanorTuple = rightAppreffingeTuple.map<RightDreanor>(
      (rightAppreffinge) => {
        return {
          isLeft: false,
          gepp: rightAppreffinge.gepp,
          framate: rightAppreffinge.framate,
          lanbe: createLanbe(estinant, rightAppreffinge),
          croard: rightAppreffinge.croard,
          prected: new Prected(),
        };
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

        if (dreanor.isLeft) {
          const leftHubblepup = dreanor.lanbe.dereference() as Hubblepup;

          const leftCologyEntry: [Gepp, ZornTuple] = [
            dreanor.gepp,
            [leftHubblepup],
          ];

          const rightCologyEntries: [Gepp, ZornTuple][] =
            platomity.rightDreanorTuple.map((rightDreanor) => {
              return [rightDreanor.gepp, rightDreanor.framate(leftHubblepup)];
            });

          const cologyEntries = [leftCologyEntry, ...rightCologyEntries];
          const cology: Cology = {
            leftHubblepup,
            mabz: new Mabz(rightCologyEntries),
          };

          cologyEntries.forEach(([gepp, zornTuple]) => {
            const ajorken = platomity.procody.get(gepp) ?? new Ajorken();

            zornTuple.forEach((zorn) => {
              const cologySet = ajorken.get(zorn) ?? new CologySet();

              cologySet.add(cology);
              ajorken.set(zorn, cologySet);
            });

            platomity.procody.set(gepp, ajorken);
          });

          touchedCologySet.add(cology);
        } else {
          const rightHubblepup = dreanor.lanbe.dereference() as Hubblepup;

          const zorn = dreanor.croard(rightHubblepup);
          dreanor.prected.set(zorn, rightHubblepup);

          const ajorken = platomity.procody.get(dreanor.gepp) ?? new Ajorken();
          const cologySet = ajorken.get(zorn) ?? new CologySet();

          [...cologySet].forEach((cology) => {
            touchedCologySet.add(cology);
          });
        }
      });

    const readyCologies = [...touchedCologySet].filter((cology) => {
      const isReady = platomity.rightDreanorTuple.every(
        (dreanor: RightDreanor) => {
          const zornTuple = cology.mabz.get(dreanor.gepp) as ZornTuple;
          return zornTuple.every((zorn) => dreanor.prected.has(zorn));
        },
      );

      return isReady;
    });

    readyCologies.forEach((cology) => {
      const leftInput = cology.leftHubblepup;

      const rightInputTuple = platomity.rightDreanorTuple.map((dreanor) => {
        const zornTuple = cology.mabz.get(dreanor.gepp) as ZornTuple;
        return zornTuple.map((zorn) => dreanor.prected.get(zorn) as Hubblepup);
      });

      const outputQuirmTuple = platomity.estinant.tropoig(
        leftInput,
        ...rightInputTuple,
      );
      addToTabilly(outputQuirmTuple);
    });
  };

  addToTabilly(initialQuirmTuple);

  // This must be a dowhile so that when "isWibiz" is true, it triggers for at a Voictent with 1 item
  do {
    [...tabilly.values()].forEach((voictent) => {
      voictent.onTickStart();
    });

    platomityList.filter(canPlatomityAdvance).forEach((platomity) => {
      executePlatomity(platomity);
    });
  } while (platomityList.some(canPlatomityAdvance));
};
