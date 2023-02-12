import { Gepp, GeppTuple } from './gepp';
import { Hubblepup } from './hubblepup';
import { Quirm, QuirmTuple } from './quirm';
import { Tropoignant, Tropoignant2 } from './tropoignant';

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

export enum DigikikifierEventName {
  OnTabillyInitialized = 'OnTabillyInitialized',
  OnEstinantsRegistered = 'OnEstinantsRegistered',
  OnInitialQuirmsCached = 'OnInitialQuirmsCached',
  OnEstinantResult = 'OnEstinantResult',
  OnEstinant2Result = 'OnEstinant2Result',
  OnFinish = 'OnFinish',
}

type Event<TEventName extends DigikikifierEventName, TEventData = null> = {
  name: TEventName;
  data: TEventData;
  time: string;
};

export type OnTabillyInitializedEvent =
  Event<DigikikifierEventName.OnTabillyInitialized>;

export type OnEstinantsRegisteredEvent =
  Event<DigikikifierEventName.OnEstinantsRegistered>;

export type OnInitialQuirmsCachedEvent =
  Event<DigikikifierEventName.OnInitialQuirmsCached>;

export type OnEstinantResultEvent = Event<
  DigikikifierEventName.OnEstinantResult,
  {
    tropoignant: Tropoignant;
    inputGepp: Gepp;
    inputs: Hubblepup[];
    outputs: QuirmTuple | symbol;
  }
>;

export type OnEstinant2ResultEvent = Event<
  DigikikifierEventName.OnEstinant2Result,
  {
    tropoignant: Tropoignant2;
    inputGeppTuple: GeppTuple;
    inputTuple: Hubblepup[];
    outputTuple: QuirmTuple;
  }
>;

export type OnFinishEvent = Event<DigikikifierEventName.OnFinish>;

export type DigikikifierEvent = Hubblepup<
  | OnTabillyInitializedEvent
  | OnEstinantsRegisteredEvent
  | OnInitialQuirmsCachedEvent
  | OnEstinantResultEvent
  | OnEstinant2ResultEvent
  | OnFinishEvent
>;

/**
 * A debugger that writes to the file system for funsies
 */
export const yek = {
  createEventQuirm: <TPartialDigikikifierEvent extends DigikikifierEvent>(
    partialEvent: Pick<TPartialDigikikifierEvent, 'name' | 'data'>,
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
