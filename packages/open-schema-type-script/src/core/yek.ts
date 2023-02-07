import fs from 'fs';
import { posix } from 'path';
import { logger } from '../utilities/logger';
import { Gepp } from './gepp';
import { Hubblepup } from './hubblepup';
import { QuirmTuple } from './quirm';
import { Tabilly } from './tabilly';
import { Tropoignant } from './tropoignant';

export enum EngineEventName {
  OnTabillyInitialized = 'OnTabillyInitialized',
  OnEstinantsRegistered = 'OnEstinantsRegistered',
  OnInitialQuirmsCached = 'OnInitialQuirmsCached',
  OnEstinantResult = 'OnEstinantResult',
  OnFinish = 'OnFinish',
}

type Event<TEventName extends EngineEventName, TEventData = null> = {
  eventName: TEventName;
  tabilly: Tabilly;
  data: TEventData;
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
    outputs: QuirmTuple;
  }
>;

export type OnFinishEvent = Event<EngineEventName.OnFinish>;

export type EngineEvent =
  | OnTabillyInitializedEvent
  | OnEstinantsRegisteredEvent
  | OnInitialQuirmsCachedEvent
  | OnEstinantResultEvent
  | OnFinishEvent;

const DEBUG_DIR_PATH = './debug/' as const;
const ENGINE_EVENTS_PATH = posix.join(DEBUG_DIR_PATH, 'engine-events');

fs.rmSync(DEBUG_DIR_PATH, { recursive: true, force: true });
fs.mkdirSync(ENGINE_EVENTS_PATH, { recursive: true });

/**
 * A debugger that writes to the file system for funsies
 */
export const yek = {
  emitEvent: <TEngineEvent extends EngineEvent>(event: TEngineEvent): void => {
    const time = process.hrtime.bigint();
    const eventId = `${time}--${event.eventName}`;

    const eventFilePath = posix.join(ENGINE_EVENTS_PATH, `${eventId}.txt`);
    fs.writeFileSync(eventFilePath, logger.stringifyAsMultipleLines(event));

    logger.logText(eventFilePath);
  },
};
