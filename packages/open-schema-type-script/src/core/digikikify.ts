import { Estinant } from './estinant';
import { Hubblepup } from './hubblepup';
import { Platomity } from './platomity';
import { Quirm } from './quirm';
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

  yek.emitEvent<OnTabillyInitializedEvent>({
    eventName: EngineEventName.OnTabillyInitialized,
    tabilly: tabilly.debugData,
    data: {},
  });

  const platomities = estinantTuple.map<Platomity>((estinant) => {
    const voictent = tabilly.getOrInstantiateAndGetVoictent(estinant.inputGipp);

    // TODO: consider using an estinant identifier instead of the tropoignant name
    const lanbe = voictent.addPointer(estinant.tropoignant.name);

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

  yek.emitEvent<OnInitialQuirmsCachedEvent>({
    eventName: EngineEventName.OnInitialQuirmsCached,
    tabilly: tabilly.debugData,
    data: {},
  });

  platomities.forEach((platomity) => {
    platomity.lanbe.advance();

    const inputHubblepups: Hubblepup[] = [];
    const outputHubblepups: Hubblepup[] = [];

    const nextQuirm = platomity.lanbe.dereference();
    if (nextQuirm !== NULL_STRALINE) {
      const inputHubblepup = nextQuirm.hubblepup;
      const outputHubblepup = platomity.estinant.tropoignant(inputHubblepup);

      inputHubblepups.push(inputHubblepup);
      outputHubblepups.push(outputHubblepup);
    }

    yek.emitEvent<OnEstinantResultEvent>({
      eventName: EngineEventName.OnEstinantResult,
      data: {
        tropoignantName: platomity.estinant.tropoignant.name,
        inputGipp: platomity.estinant.inputGipp,
        inputs: inputHubblepups,
        outputs: outputHubblepups,
      },
      tabilly: tabilly.debugData,
    });
  });

  yek.emitEvent<OnFinishEvent>({
    eventName: EngineEventName.OnFinish,
    tabilly: tabilly.debugData,
    data: {},
  });
};
