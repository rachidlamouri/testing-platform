import { EstinantTuple } from './estinant';
import { Platomity } from './platomity';
import { Quirm, QuirmTuple } from './quirm';
import { NullStraline, NULL_STRALINE } from './straline';
import { Tabilly } from './tabilly';
import { TropoignantTypeName } from './tropoignant';
import {
  digikikifierGeppsByIdentifer,
  EngineEventName,
  OnEstinantResultEvent,
  OnEstinantsRegisteredEvent,
  OnFinishEvent,
  OnInitialQuirmsCachedEvent,
  OnTabillyInitializedEvent,
  yek,
} from './yek';

export type DigikikifierInput = {
  initialQuirmTuple: QuirmTuple;
  estinantTuple: EstinantTuple;
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
      name: EngineEventName.OnTabillyInitialized,
      tabilly,
      data: null,
    }),
  ]);

  const platomities = estinantTuple.map<Platomity>((estinant) => {
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
      name: EngineEventName.OnEstinantsRegistered,
      tabilly,
      data: null,
    }),
  ]);

  tabilly.addQuirmsToVoictents(initialQuirmTuple);

  tabilly.addQuirmsToVoictents([
    yek.createEventQuirm<OnInitialQuirmsCachedEvent>({
      name: EngineEventName.OnInitialQuirmsCached,
      tabilly,
      data: null,
    }),
  ]);

  const executePlatomity = (platomity: Platomity): void => {
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
          name: EngineEventName.OnEstinantResult,
          data: {
            tropoignant: platomity.estinant.tropoignant,
            inputGepp: platomity.estinant.inputGepp.toString(),
            inputs: [inputHubblepup],
            outputs: outputQuirmTuple,
          },
          tabilly,
        }),
      ]);
    }
  };

  while (platomities.some((platomity) => platomity.lanbe.canAdvance())) {
    platomities
      .filter((platomity) => platomity.lanbe.canAdvance())
      .forEach((platomity) => {
        executePlatomity(platomity);
      });
  }

  tabilly.addQuirmsToVoictents([
    yek.createEventQuirm<OnFinishEvent>({
      name: EngineEventName.OnFinish,
      tabilly,
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
        platomity.estinant.inputGepp === digikikifierGeppsByIdentifer.OnEvent,
    )
    .forEach((platomity) => {
      executePlatomity(platomity);
    });

  platomities
    .filter(
      (platomity) =>
        platomity.estinant.inputGepp === digikikifierGeppsByIdentifer.OnFinish,
    )
    .forEach((platomity) => {
      executePlatomity(platomity);
    });
};
