import fs from 'fs';
import { posix } from 'path';
import { WortinatorEstinant } from '../../core/estinant';
import { TropoignantTypeName } from '../../core/tropoignant';
import {
  DigikikifierEvent,
  digikikifierGeppsByIdentifer,
  EngineEventName,
} from '../../core/yek';
import { logger } from '../../utilities/logger';

const DEBUG_DIR_PATH = './debug/' as const;
const ENGINE_EVENTS_PATH = posix.join(DEBUG_DIR_PATH, 'engine-events');

fs.rmSync(DEBUG_DIR_PATH, { recursive: true, force: true });
fs.mkdirSync(ENGINE_EVENTS_PATH, { recursive: true });

let eventCount = 0;

export const eventLogger: WortinatorEstinant<DigikikifierEvent> = {
  inputGepp: digikikifierGeppsByIdentifer.OnEvent,
  tropoignant: {
    typeName: TropoignantTypeName.Wortinator,
    process: function logEvent(event) {
      eventCount += 1;
      const eventId = `${event.time}--${event.name}`;

      const eventFilePath = posix.join(ENGINE_EVENTS_PATH, `${eventId}.txt`);

      if (
        event.name !== EngineEventName.OnEstinantResult ||
        eventCount % 50 === 0
      ) {
        fs.writeFileSync(eventFilePath, logger.stringifyAsMultipleLines(event));
        logger.logText(eventFilePath);
      }
    },
  },
};
