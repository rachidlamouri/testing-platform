import { Cology } from './cology';
import { Dreanor } from './dreanor';
import { Estinant, Estinant2 } from './estinant';
import { Platomity, Platomity2 } from './platomity';
import { Procody } from './procody';
import { Quirm, QuirmTuple } from './quirm';
import { NullStraline, NULL_STRALINE } from './straline';
import { Tabilly } from './tabilly';
import { TropoignantTypeName } from './tropoignant';
import {
  digikikifierGeppsByIdentifer,
  DigikikifierEventName,
  OnEstinant2ResultEvent,
  OnEstinantResultEvent,
  OnEstinantsRegisteredEvent,
  OnFinishEvent,
  OnInitialQuirmsCachedEvent,
  OnTabillyInitializedEvent,
  yek,
} from './yek';

type DigikikifierEstinantTuple = readonly (Estinant | Estinant2)[];

const isEstinant2 = (
  estinant: DigikikifierEstinantTuple[number],
): estinant is Estinant2 => 'inputGeppTuple' in estinant;

type DigikikifierPlatomity = Platomity | Platomity2;

const isPlatomity2 = (
  platomity: DigikikifierPlatomity,
): platomity is Platomity2 => 'procody' in platomity;

export type DigikikifierInput = {
  initialQuirmTuple: QuirmTuple;
  estinantTuple: DigikikifierEstinantTuple;
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

  tabilly.addQuirmsToVoictents([
    yek.createEventQuirm<OnTabillyInitializedEvent>({
      name: DigikikifierEventName.OnTabillyInitialized,
      data: null,
    }),
  ]);

  const platomities = estinantTuple.map<DigikikifierPlatomity>((estinant) => {
    if (isEstinant2(estinant)) {
      const dreanorTuple = estinant.inputGeppTuple.map<Dreanor>((inputGepp) => {
        const voictent = tabilly.getOrInstantiateAndGetVoictent(inputGepp);
        const lanbe = voictent.createPointer(estinant.tropoig.name);
        const dreanor: Dreanor = {
          gepp: inputGepp,
          lanbe,
        };

        return dreanor;
      });

      const platomity: Platomity2 = {
        estinant,
        dreanorTuple,
        procody: new Procody(),
      };

      return platomity;
    }

    const voictent = tabilly.getOrInstantiateAndGetVoictent(estinant.inputGepp);

    // TODO: consider using an estinant identifier instead of the tropoignant name
    const lanbe = voictent.createPointer(estinant.tropoignant.process.name);

    return {
      estinant,
      lanbe,
    };
  });

  tabilly.addQuirmsToVoictents([
    yek.createEventQuirm<OnEstinantsRegisteredEvent>({
      name: DigikikifierEventName.OnEstinantsRegistered,
      data: null,
    }),
  ]);

  tabilly.addQuirmsToVoictents(initialQuirmTuple);

  tabilly.addQuirmsToVoictents([
    yek.createEventQuirm<OnInitialQuirmsCachedEvent>({
      name: DigikikifierEventName.OnInitialQuirmsCached,
      data: null,
    }),
  ]);

  const canPlatomityAdvance = (platomity: DigikikifierPlatomity): boolean => {
    if (isPlatomity2(platomity)) {
      return platomity.dreanorTuple.some((dreanor) =>
        dreanor.lanbe.canAdvance(),
      );
    }

    return platomity.lanbe.canAdvance();
  };

  const executePlatomity = (platomity: DigikikifierPlatomity): void => {
    if (isPlatomity2(platomity)) {
      const readyCologies: Cology[] = [];

      platomity.dreanorTuple
        .filter((dreanor) => dreanor.lanbe.canAdvance())
        .forEach((dreanor) => {
          dreanor.lanbe.advance();

          const nextQuirm = dreanor.lanbe.dereference() as Quirm;
          const zorn = platomity.estinant.croard(nextQuirm.hubblepup);
          const cology =
            platomity.procody.get(zorn) ??
            new Cology(platomity.estinant.inputGeppTuple);

          cology.set(dreanor.gepp, nextQuirm);
          platomity.procody.set(zorn, cology);

          if (cology.isReady()) {
            readyCologies.push(cology);
          }
        });

      readyCologies.forEach((cology) => {
        const inputHubblepupTuple = platomity.estinant.inputGeppTuple.map(
          (gepp) => {
            const quirm = cology.get(gepp) as Quirm;
            const { hubblepup } = quirm;
            return hubblepup;
          },
        );

        const outputQuirmTuple = platomity.estinant.tropoig(
          ...inputHubblepupTuple,
        );

        tabilly.addQuirmsToVoictents(outputQuirmTuple);

        tabilly.addQuirmsToVoictents([
          yek.createEventQuirm<OnEstinant2ResultEvent>({
            name: DigikikifierEventName.OnEstinant2Result,
            data: {
              tropoignant: platomity.estinant.tropoig,
              inputGeppTuple: platomity.estinant.inputGeppTuple,
              inputTuple: inputHubblepupTuple,
              outputTuple: outputQuirmTuple,
            },
          }),
        ]);
      });

      return;
    }

    platomity.lanbe.advance();

    const nextQuirm = platomity.lanbe.dereference() as Quirm;
    const inputHubblepup = nextQuirm.hubblepup;

    let outputQuirmTuple: QuirmTuple | NullStraline = NULL_STRALINE;

    switch (platomity.estinant.tropoignant.typeName) {
      case TropoignantTypeName.Onama:
        outputQuirmTuple =
          platomity.estinant.tropoignant.process(inputHubblepup);
        break;
      case TropoignantTypeName.Wortinator:
        platomity.estinant.tropoignant.process(inputHubblepup);
        break;
      case TropoignantTypeName.Mentursection: {
        const additionalGepps =
          platomity.estinant.tropoignant.process(inputHubblepup);

        // TODO: evaluate the repercussions of mutating this state
        nextQuirm.geppTuple.push(...additionalGepps);

        additionalGepps.forEach((nextGepp) => {
          tabilly.addQuirmByGepp(nextQuirm, nextGepp);
        });
        break;
      }
    }

    if (outputQuirmTuple !== NULL_STRALINE) {
      tabilly.addQuirmsToVoictents(outputQuirmTuple);
    }

    if (platomity.estinant.inputGepp !== digikikifierGeppsByIdentifer.OnEvent) {
      tabilly.addQuirmsToVoictents([
        yek.createEventQuirm<OnEstinantResultEvent>({
          name: DigikikifierEventName.OnEstinantResult,
          data: {
            tropoignant: platomity.estinant.tropoignant,
            inputGepp: platomity.estinant.inputGepp.toString(),
            inputs: [inputHubblepup],
            outputs: outputQuirmTuple,
          },
        }),
      ]);
    }
  };

  while (platomities.some(canPlatomityAdvance)) {
    platomities.filter(canPlatomityAdvance).forEach((platomity) => {
      executePlatomity(platomity);
    });
  }

  tabilly.addQuirmsToVoictents([
    yek.createEventQuirm<OnFinishEvent>({
      name: DigikikifierEventName.OnFinish,
      data: null,
    }),
    {
      geppTuple: [digikikifierGeppsByIdentifer.OnFinish],
      hubblepup: null,
    },
  ]);

  platomities
    .filter(
      (platomity) =>
        !isPlatomity2(platomity) &&
        platomity.estinant.inputGepp === digikikifierGeppsByIdentifer.OnEvent,
    )
    .forEach((platomity) => {
      executePlatomity(platomity);
    });

  platomities
    .filter(
      (platomity) =>
        !isPlatomity2(platomity) &&
        platomity.estinant.inputGepp === digikikifierGeppsByIdentifer.OnFinish,
    )
    .forEach((platomity) => {
      executePlatomity(platomity);
    });
};
