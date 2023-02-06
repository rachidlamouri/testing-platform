import { EstinantTuple } from './estinant';
import { Platomity } from './platomity';
import { Quirm, QuirmTuple } from './quirm';
import { NULL_STRALINE } from './straline';
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
    tabilly: tabilly.debugData,
    data: {},
  });

  const platomities = estinantTuple.map<Platomity>((estinant) => {
    const voictent = tabilly.getOrInstantiateAndGetVoictent(estinant.inputGipp);

    // TODO: consider using an estinant identifier instead of the tropoignant name
    const lanbe = voictent.createPointer(estinant.tropoignant.name);

    return {
      estinant,
      lanbe,
    };
  });

  yek.emitEvent<OnEstinantsRegisteredEvent>({
    eventName: EngineEventName.OnEstinantsRegistered,
    tabilly: tabilly.debugData,
    data: {},
  });

  tabilly.addQuirmsToVoictents(initialQuirmTuple);

  yek.emitEvent<OnInitialQuirmsCachedEvent>({
    eventName: EngineEventName.OnInitialQuirmsCached,
    tabilly: tabilly.debugData,
    data: {},
  });

  let nextPlatomities = platomities.slice();

  do {
    nextPlatomities.forEach((platomity) => {
      platomity.lanbe.advance();
    });

    nextPlatomities = nextPlatomities.filter((platomity) => {
      return platomity.lanbe.dereference() !== NULL_STRALINE;
    });

    nextPlatomities.forEach((platomity) => {
      const nextQuirm = platomity.lanbe.dereference() as Quirm;
      const inputHubblepup = nextQuirm.hubblepup;
      const outputQuirmTuple = platomity.estinant.tropoignant(inputHubblepup);

      tabilly.addQuirmsToVoictents(outputQuirmTuple);

      yek.emitEvent<OnEstinantResultEvent>({
        eventName: EngineEventName.OnEstinantResult,
        data: {
          tropoignantName: platomity.estinant.tropoignant.name,
          inputGipp: platomity.estinant.inputGipp,
          inputs: [inputHubblepup],
          outputs: outputQuirmTuple,
        },
        tabilly: tabilly.debugData,
      });
    });
  } while (nextPlatomities.length > 0);

  yek.emitEvent<OnFinishEvent>({
    eventName: EngineEventName.OnFinish,
    tabilly: tabilly.debugData,
    data: {},
  });
};
