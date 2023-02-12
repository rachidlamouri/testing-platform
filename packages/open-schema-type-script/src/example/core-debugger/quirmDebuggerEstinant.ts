import { Estinant2 } from '../../core/estinant';
import { Quirm } from '../../core/quirm';
import {
  DigikikifierEvent,
  DigikikifierEventName,
  DigikikifierEventQuirm,
  digikikifierGeppsByIdentifer,
  EventTropoignant,
} from '../../core/yek';
import { kodatar } from '../../type-script-adapter/kodataring';
import { logger } from '../../utilities/logger';
import { Struss } from '../../utilities/struss';
import { fileUtilities } from './fileUtilities';

const debugQuirm = (quirm: Quirm): void => {
  const filePath = fileUtilities.getCacheFilePath();
  fileUtilities.writeFile(filePath, logger.stringifyAsMultipleLines(quirm));
};

const debugOutputQuirmTuple: EventTropoignant<[]> = (input) => {
  const event: DigikikifierEvent = input.hubblepup;

  if (event.name !== DigikikifierEventName.OnEstinant2Result) {
    return [];
  }

  const outputQuirmTuple = event.data.outputTuple;
  outputQuirmTuple.forEach((quirm) => {
    debugQuirm(quirm);
  });

  return [];
};

export const quirmDebuggerEstinant: Estinant2<
  [DigikikifierEventQuirm],
  Struss
> = {
  inputGeppTuple: [digikikifierGeppsByIdentifer.OnEvent],
  croard: kodatar,
  tropoig: debugOutputQuirmTuple,
};
