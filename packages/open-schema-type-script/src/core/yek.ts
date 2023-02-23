import { Hubblepup, HubblepupTuple } from './hubblepup';
import { Quirm, Quirm2, QuirmTuple } from './quirm';
import { Tropoignant2 } from './tropoignant';

export enum DigikikifierGeppIdentifer {
  OnEvent = 'OnEvent',
  OnQuirmTuple = 'OnQuirmTuple',
  OnFinish = 'OnFinish',
}

export const DIGIKIKIFIER_ON_FINISH_EVENT_GEPP = Symbol(
  DigikikifierGeppIdentifer.OnFinish,
);

export const digikikifierGeppsByIdentifer = {
  [DigikikifierGeppIdentifer.OnEvent]: Symbol(
    DigikikifierGeppIdentifer.OnEvent,
  ),
  [DigikikifierGeppIdentifer.OnQuirmTuple]: Symbol(
    DigikikifierGeppIdentifer.OnQuirmTuple,
  ),
  [DigikikifierGeppIdentifer.OnFinish]: DIGIKIKIFIER_ON_FINISH_EVENT_GEPP,
} as const satisfies Record<DigikikifierGeppIdentifer, symbol>;

export enum DigikikifierEventName {
  OnTabillyInitialized = 'OnTabillyInitialized',
  OnEstinantsRegistered = 'OnEstinantsRegistered',
  OnInitialQuirmsCached = 'OnInitialQuirmsCached',
  OnQuirmTuple = 'OnQuirmTuple',
  OnLoopStart = 'OnLoopStart',
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

export type OnLoopStartEvent = Event<DigikikifierEventName.OnLoopStart>;

export type OnFinishEvent = Event<DigikikifierEventName.OnFinish>;

export type DigikikifierEvent =
  | OnTabillyInitializedEvent
  | OnEstinantsRegisteredEvent
  | OnInitialQuirmsCachedEvent
  | OnQuirmTupleEvent
  | OnLoopStartEvent
  | OnFinishEvent;

export type DigikikifierEventHubblepup = Hubblepup<DigikikifierEvent>;

export type DigikikifierEventHubblepupTuple = HubblepupTuple<DigikikifierEvent>;

export type DigikikifierEventQuirm = Quirm<DigikikifierEventHubblepup>;

export type DigikikifierEventQuirmTuple =
  QuirmTuple<DigikikifierEventHubblepup>;

export type EventTropoignant<TOutputQuirmTuple extends QuirmTuple> =
  Tropoignant2<[input: DigikikifierEventQuirm], TOutputQuirmTuple | []>;

export type QuirmTupleHubblepup = Hubblepup<QuirmTuple>;

export type DigikikifierQuirmTupleEventQuirm = Quirm<QuirmTupleHubblepup>;

export type DigikikifierOnFinishEventQuirm = Quirm2<
  [typeof DIGIKIKIFIER_ON_FINISH_EVENT_GEPP],
  null
>;

export type QuirmTupleTropoignant<TOutputQuirmTuple extends QuirmTuple> =
  Tropoignant2<
    [input: DigikikifierQuirmTupleEventQuirm],
    TOutputQuirmTuple | []
  >;

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
