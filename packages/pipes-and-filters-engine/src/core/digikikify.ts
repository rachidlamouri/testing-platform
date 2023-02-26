import { Cology } from './cology';
import { Dreanor } from './dreanor';
import { EstinantTuple } from './estinant';
import { Hubblepup } from './hubblepup';
import { Platomity } from './platomity';
import { Procody } from './procody';
import { Quirm, QuirmTuple } from './quirm';
import { Tabilly } from './tabilly';

export type DigikikifierInput = {
  initialQuirmTuple: QuirmTuple;
  estinantTuple: EstinantTuple;
  onHubblepupAddedToVoictents: (quirm: Quirm) => void;
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

  const platomities = estinantTuple.map<Platomity>((estinant) => {
    const dreanorTuple = estinant.inputGeppTuple.map<Dreanor>((inputGepp) => {
      const voictent = tabilly.getOrInstantiateAndGetVoictent(inputGepp);
      const lanbe = voictent.createLanbe(estinant.tropoig.name);
      const dreanor: Dreanor = {
        gepp: inputGepp,
        lanbe,
      };

      return dreanor;
    });

    const platomity: Platomity = {
      estinant,
      dreanorTuple,
      procody: new Procody(),
    };

    return platomity;
  });

  addToTabilly(initialQuirmTuple);

  const canPlatomityAdvance = (platomity: Platomity): boolean => {
    return platomity.dreanorTuple.some((dreanor) => dreanor.lanbe.hasNext());
  };

  const executePlatomity = (platomity: Platomity): void => {
    const readyCologies: Cology[] = [];

    platomity.dreanorTuple
      .filter((dreanor) => dreanor.lanbe.hasNext())
      .forEach((dreanor) => {
        dreanor.lanbe.advance();

        const nextHubblepup = dreanor.lanbe.dereference() as Hubblepup;
        const zorn = platomity.estinant.croard(nextHubblepup);
        const cology =
          platomity.procody.get(zorn) ??
          new Cology(platomity.estinant.inputGeppTuple);

        cology.set(dreanor.gepp, nextHubblepup);
        platomity.procody.set(zorn, cology);

        if (cology.isReady()) {
          readyCologies.push(cology);
        }
      });

    readyCologies.forEach((cology) => {
      const inputHubblepupTuple = platomity.estinant.inputGeppTuple.map(
        (gepp) => {
          const hubblepup = cology.get(gepp) as Hubblepup;
          return hubblepup;
        },
      );

      const outputQuirmTuple = platomity.estinant.tropoig(
        ...inputHubblepupTuple,
      );
      addToTabilly(outputQuirmTuple);
    });
  };

  while (platomities.some(canPlatomityAdvance)) {
    platomities.filter(canPlatomityAdvance).forEach((platomity) => {
      executePlatomity(platomity);
    });
  }
};
