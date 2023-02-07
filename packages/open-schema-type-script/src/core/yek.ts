import { Gepp } from './gepp';
import { Hubblepup } from './hubblepup';
import { Quirm, QuirmTuple } from './quirm';
import { Tabilly } from './tabilly';
import { Tropoignant } from './tropoignant';

export enum DigikikifierGeppIdentifer {
  OnEvent = 'OnEvent',
  OnFinish = 'OnFinish',
}

export const digikikifierGeppsByIdentifer: Record<
  DigikikifierGeppIdentifer,
  symbol
> = {
  [DigikikifierGeppIdentifer.OnEvent]: Symbol(
    DigikikifierGeppIdentifer.OnEvent,
  ),
  [DigikikifierGeppIdentifer.OnFinish]: Symbol(
    DigikikifierGeppIdentifer.OnFinish,
  ),
};

export enum EngineEventName {
  OnTabillyInitialized = 'OnTabillyInitialized',
  OnEstinantsRegistered = 'OnEstinantsRegistered',
  OnInitialQuirmsCached = 'OnInitialQuirmsCached',
  OnEstinantResult = 'OnEstinantResult',
  OnFinish = 'OnFinish',
}

type Event<TEventName extends EngineEventName, TEventData = null> = {
  name: TEventName;
  tabilly: Tabilly;
  data: TEventData;
  time: string;
};

export type OnTabillyInitializedEvent =
  Event<EngineEventName.OnTabillyInitialized>;

export type OnEstinantsRegisteredEvent =
  Event<EngineEventName.OnEstinantsRegistered>;

export type OnInitialQuirmsCachedEvent =
  Event<EngineEventName.OnInitialQuirmsCached>;

export type OnEstinantResultEvent = Event<
  EngineEventName.OnEstinantResult,
  {
    tropoignant: Tropoignant;
    inputGepp: Gepp;
    inputs: Hubblepup[];
    outputs: QuirmTuple | symbol;
  }
>;

export type OnFinishEvent = Event<EngineEventName.OnFinish>;

export type DigikikifierEvent = Hubblepup<
  | OnTabillyInitializedEvent
  | OnEstinantsRegisteredEvent
  | OnInitialQuirmsCachedEvent
  | OnEstinantResultEvent
  | OnFinishEvent
>;

/**
 * A debugger that writes to the file system for funsies
 */
export const yek = {
  createEventQuirm: <TPartialDigikikifierEvent extends DigikikifierEvent>(
    partialEvent: Pick<TPartialDigikikifierEvent, 'name' | 'tabilly' | 'data'>,
  ): Quirm<DigikikifierEvent> => {
    const event = {
      ...partialEvent,
      time: process.hrtime.bigint().toString(),
    } as TPartialDigikikifierEvent;

    return {
      geppTuple: [digikikifierGeppsByIdentifer.OnEvent],
      hubblepup: event,
    };
  },
};
