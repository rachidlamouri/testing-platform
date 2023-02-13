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
  OnEstinantResultEvent,
  OnEstinantsRegisteredEvent,
  OnFinishEvent,
  OnInitialQuirmsCachedEvent,
  OnTabillyInitializedEvent,
  yek,
  QuirmTupleQuirm,
  OnEstinant2ResultEvent,
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

  const addToTabilly = (quirmTuple: QuirmTuple): void => {
    if (quirmTuple.length === 0) {
      return;
    }

    const quirmTupleQuirm: QuirmTupleQuirm = {
      geppTuple: [digikikifierGeppsByIdentifer.OnQuirmTuple],
      hubblepup: [],
    };
    quirmTupleQuirm.hubblepup = [quirmTupleQuirm, ...quirmTuple];

    tabilly.addQuirmsToVoictents([quirmTupleQuirm]);
    tabilly.addQuirmsToVoictents(quirmTuple);
  };

  addToTabilly([
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

  addToTabilly([
    yek.createEventQuirm<OnEstinantsRegisteredEvent>({
      name: DigikikifierEventName.OnEstinantsRegistered,
      data: null,
    }),
  ]);

  addToTabilly(initialQuirmTuple);

  addToTabilly([
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
          const zorn = platomity.estinant.croard(nextQuirm);
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
        const inputQuirmTuple = platomity.estinant.inputGeppTuple.map(
          (gepp) => {
            const quirm = cology.get(gepp) as Quirm;
            return quirm;
          },
        );

        const outputQuirmTuple = platomity.estinant.tropoig(...inputQuirmTuple);

        if (
          platomity.estinant.inputGeppTuple.length !== 0 &&
          platomity.estinant.inputGeppTuple[0] !==
            digikikifierGeppsByIdentifer.OnEvent
        ) {
          addToTabilly(outputQuirmTuple);
        }

        // TODO: Reevaluate this fix. It was kind of half-baked
        if (
          platomity.estinant.inputGeppTuple.length !== 1 ||
          (platomity.estinant.inputGeppTuple[0] !==
            digikikifierGeppsByIdentifer.OnQuirmTuple &&
            platomity.estinant.inputGeppTuple[0] !==
              digikikifierGeppsByIdentifer.OnEvent)
        ) {
          addToTabilly([
            yek.createEventQuirm<OnEstinant2ResultEvent>({
              name: DigikikifierEventName.OnEstinant2Result,
              data: {
                tropoignant: platomity.estinant.tropoig,
                inputGeppTuple: platomity.estinant.inputGeppTuple,
                inputTuple: inputQuirmTuple,
                outputTuple: outputQuirmTuple,
              },
            }),
          ]);
        }
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

        const outputQuirm: Quirm = {
          geppTuple: [...nextQuirm.geppTuple, ...additionalGepps],
          hubblepup: nextQuirm.hubblepup,
        };

        additionalGepps.forEach((nextGepp) => {
          tabilly.addQuirmByGepp(outputQuirm, nextGepp);
        });
        break;
      }
    }

    if (outputQuirmTuple !== NULL_STRALINE) {
      addToTabilly(outputQuirmTuple);
    }

    if (platomity.estinant.inputGepp !== digikikifierGeppsByIdentifer.OnEvent) {
      addToTabilly([
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

  addToTabilly([
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
