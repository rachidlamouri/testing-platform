import { Gepp, GeppTuple } from './gepp';
import { Hubblepup, HubblepupTuple } from './hubblepup';
import { Quirm, QuirmTuple } from './quirm';
import { Tropoignant, Tropoignant2 } from './tropoignant';

export enum DigikikifierGeppIdentifer {
  OnEvent = 'OnEvent',
  OnQuirmTuple = 'OnQuirmTuple',
  OnFinish = 'OnFinish',
}

export const digikikifierGeppsByIdentifer: Record<
  DigikikifierGeppIdentifer,
  symbol
> = {
  [DigikikifierGeppIdentifer.OnEvent]: Symbol(
    DigikikifierGeppIdentifer.OnEvent,
  ),
  [DigikikifierGeppIdentifer.OnQuirmTuple]: Symbol(
    DigikikifierGeppIdentifer.OnQuirmTuple,
  ),
  [DigikikifierGeppIdentifer.OnFinish]: Symbol(
    DigikikifierGeppIdentifer.OnFinish,
  ),
};

export enum DigikikifierEventName {
  OnTabillyInitialized = 'OnTabillyInitialized',
  OnEstinantsRegistered = 'OnEstinantsRegistered',
  OnInitialQuirmsCached = 'OnInitialQuirmsCached',
  OnQuirmTuple = 'OnQuirmTuple',
  OnEstinantResult = 'OnEstinantResult',
  OnEstinant2Result = 'OnEstinant2Result',
  OnFinish = 'OnFinish',
}

type Event<TEventName extends DigikikifierEventName, TEventData = null> = {
  name: TEventName;
  data: TEventData;
  time: string;
};

export type OnQuirmTupleEvent = Event<
  DigikikifierEventName.OnQuirmTuple,
  { quirmTuple: QuirmTuple }
>;

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

export type DigikikifierEvent =
  | OnTabillyInitializedEvent
  | OnEstinantsRegisteredEvent
  | OnInitialQuirmsCachedEvent
  | OnQuirmTupleEvent
  | OnEstinantResultEvent
  | OnEstinant2ResultEvent
  | OnFinishEvent;

export type DigikikifierEventHubblepup = Hubblepup<DigikikifierEvent>;

export type DigikikifierEventHubblepupTuple = HubblepupTuple<DigikikifierEvent>;

export type DigikikifierEventQuirm = Quirm<DigikikifierEventHubblepup>;

export type DigikikifierEventQuirmTuple =
  QuirmTuple<DigikikifierEventHubblepup>;

export type EventTropoignant<TOutputQuirmTuple extends QuirmTuple> =
  Tropoignant2<[input: DigikikifierEventQuirm], TOutputQuirmTuple | []>;

export type QuirmTupleHubblepup = Hubblepup<QuirmTuple>;

export type QuirmTupleQuirm = Quirm<QuirmTupleHubblepup>;

export type QuirmTupleTropoignant<TOutputQuirmTuple extends QuirmTuple> =
  Tropoignant2<[input: QuirmTupleQuirm], TOutputQuirmTuple | []>;

/**
 * A debugger that writes to the file system for funsies
 */
export const yek = {
  createEventQuirm: <
    TPartialDigikikifierEvent extends DigikikifierEventHubblepup,
  >(
    partialEvent: Pick<TPartialDigikikifierEvent, 'name' | 'data'>,
  ): Quirm<DigikikifierEventHubblepup> => {
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
