import { WortinatorEstinant } from '../../../core/estinant';
import { TropoignantTypeName } from '../../../core/tropoignant';
import {
  DigikikifierEventHubblepup,
  digikikifierGeppsByIdentifer,
} from '../../../core/yek';
import { logger } from '../../../utilities/logger';
import { fileUtilities } from './fileUtilities';

export const eventLogger: WortinatorEstinant<DigikikifierEventHubblepup> = {
  inputGepp: digikikifierGeppsByIdentifer.OnEvent,
  tropoignant: {
    typeName: TropoignantTypeName.Wortinator,
    process: function logEvent(event) {
      const eventId = `${event.time}--${event.name}`;
      const eventFilePath = fileUtilities.getEventFilePath(eventId);

      fileUtilities.writeFile(
        eventFilePath,
        logger.stringifyAsMultipleLines(event),
      );
      logger.logText(eventFilePath);
    },
  },
};
