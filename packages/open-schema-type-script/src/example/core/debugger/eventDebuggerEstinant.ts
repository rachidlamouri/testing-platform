import { Estinant2 } from '../../../core/estinant';
import {
  DigikikifierEvent,
  DigikikifierEventQuirm,
  digikikifierGeppsByIdentifer,
  EventTropoignant,
} from '../../../core/yek';
import { kodatar } from '../../../type-script-adapter/kodataring';
import { logger } from '../../../utilities/logger';
import { Struss } from '../../../utilities/struss';
import { fileUtilities } from './fileUtilities';

const debugEvent: EventTropoignant<[]> = (input) => {
  const event: DigikikifierEvent = input.hubblepup;
  const eventId = `${event.time}--${event.name}`;
  const eventFilePath = fileUtilities.getEventFilePath(eventId);

  fileUtilities.writeFile(
    eventFilePath,
    logger.stringifyAsMultipleLines(event),
  );
  logger.logText(eventFilePath);

  return [];
};

export const eventDebuggerEstinant: Estinant2<
  [DigikikifierEventQuirm],
  [],
  Struss
> = {
  inputGeppTuple: [digikikifierGeppsByIdentifer.OnEvent],
  croard: kodatar,
  tropoig: debugEvent,
};
