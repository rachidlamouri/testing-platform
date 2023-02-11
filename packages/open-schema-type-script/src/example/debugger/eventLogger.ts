import { WortinatorEstinant } from '../../core/estinant';
import { TropoignantTypeName } from '../../core/tropoignant';
import {
  DigikikifierEvent,
  digikikifierGeppsByIdentifer,
  EngineEventName,
} from '../../core/yek';
import { logger } from '../../utilities/logger';
import { fileUtilities } from './fileUtilities';

export const eventLogger: WortinatorEstinant<DigikikifierEvent> = {
  inputGepp: digikikifierGeppsByIdentifer.OnEvent,
  tropoignant: {
    typeName: TropoignantTypeName.Wortinator,
    process: function logEvent(event) {
      const eventId = `${event.time}--${event.name}`;
      const eventFilePath = fileUtilities.getEventFilePath(eventId);

      if (
        event.name !== EngineEventName.OnEstinantResult &&
        event.name !== EngineEventName.OnEstinant2Result
      ) {
        fileUtilities.writeFile(
          eventFilePath,
          logger.stringifyAsMultipleLines(event),
        );
        logger.logText(eventFilePath);
      }
    },
  },
};
