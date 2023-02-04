import { Estinant } from './estinant';
import { Platomity } from './platomity';
import { Quirm } from './quirm';
import { NULL_STRALINE } from './straline';
import { Tabilly } from './tabilly';

export type DigikikifierInput = {
  initialQuirmTuple: Quirm[];
  estinantTuple: Estinant[];
};

/**
 * An Open Schema engine
 *
 * @param input (see individual properties)
 * @param input.estinantTuple the collection of Estinants to register in the engine
 * @param input.initialQuirmTuple the starting collection of Quirms to kickstart the engine
 */
export const digikikify = ({
  initialQuirmTuple,
  estinantTuple,
}: DigikikifierInput): void => {
  const tabilly = new Tabilly();

  const platomities = estinantTuple.map<Platomity>((estinant) => {
    const voictent = tabilly.getOrInstantiateAndGetVoictent(estinant.inputGipp);

    // TODO: consider using an estinant identifier instead of the tropoignant name
    const lanbe = voictent.addPointer(estinant.tropoignant.name);

    return {
      estinant,
      lanbe,
    };
  });

  const initialQuirmAndGippPairs = initialQuirmTuple.flatMap((quirm) => {
    return quirm.gippTuple.map((gipp) => {
      return {
        quirm,
        gipp,
      };
    });
  });

  initialQuirmAndGippPairs.forEach(({ quirm, gipp }) => {
    tabilly.addQuirmByGipp(quirm, gipp);
  });

  platomities.forEach((platomity) => {
    platomity.lanbe.advance();

    const nextQuirm = platomity.lanbe.dereference();
    if (nextQuirm !== NULL_STRALINE) {
      const inputHubblepup = nextQuirm.hubblepup;
      platomity.estinant.tropoignant(inputHubblepup);
    }
  });
};
