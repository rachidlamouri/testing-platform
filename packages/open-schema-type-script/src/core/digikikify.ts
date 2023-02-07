import { EstinantTuple } from './estinant';
import { Platomity } from './platomity';
import { Quirm, QuirmTuple } from './quirm';
import { Tabilly } from './tabilly';
import {
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

  yek.emitEvent<OnTabillyInitializedEvent>({
    eventName: EngineEventName.OnTabillyInitialized,
    tabilly,
    data: null,
  });

  const platomities = estinantTuple.map<Platomity>((estinant) => {
    const voictent = tabilly.getOrInstantiateAndGetVoictent(estinant.inputGepp);

    // TODO: consider using an estinant identifier instead of the tropoignant name
    const lanbe = voictent.createPointer(estinant.tropoignant.name);

    return {
      estinant,
      lanbe,
    };
  });

  yek.emitEvent<OnEstinantsRegisteredEvent>({
    eventName: EngineEventName.OnEstinantsRegistered,
    tabilly,
    data: null,
  });

  tabilly.addQuirmsToVoictents(initialQuirmTuple);

  yek.emitEvent<OnInitialQuirmsCachedEvent>({
    eventName: EngineEventName.OnInitialQuirmsCached,
    tabilly,
    data: null,
  });

  while (platomities.some((platomity) => platomity.lanbe.canAdvance())) {
    platomities
      .filter((platomity) => platomity.lanbe.canAdvance())
      .forEach((platomity) => {
        platomity.lanbe.advance();

        const nextQuirm = platomity.lanbe.dereference() as Quirm;
        const inputHubblepup = nextQuirm.hubblepup;
        const outputQuirmTuple = platomity.estinant.tropoignant(inputHubblepup);

        tabilly.addQuirmsToVoictents(outputQuirmTuple);

        yek.emitEvent<OnEstinantResultEvent>({
          eventName: EngineEventName.OnEstinantResult,
          data: {
            tropoignant: platomity.estinant.tropoignant,
            inputGepp: platomity.estinant.inputGepp,
            inputs: [inputHubblepup],
            outputs: outputQuirmTuple,
          },
          tabilly,
        });
      });
  }

  yek.emitEvent<OnFinishEvent>({
    eventName: EngineEventName.OnFinish,
    tabilly,
    data: null,
  });
};
