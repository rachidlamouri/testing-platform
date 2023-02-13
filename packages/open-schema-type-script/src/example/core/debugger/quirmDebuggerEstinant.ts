import { Estinant2 } from '../../../core/estinant';
import { Quirm } from '../../../core/quirm';
import {
  digikikifierGeppsByIdentifer,
  QuirmTupleQuirm,
  QuirmTupleTropoignant,
} from '../../../core/yek';
import { kodatar } from '../../../type-script-adapter/kodataring';
import { logger } from '../../../utilities/logger';
import { Struss } from '../../../utilities/struss';
import { fileUtilities } from './fileUtilities';

const debugQuirm = (quirm: Quirm): void => {
  quirm.geppTuple.forEach((gepp) => {
    const geppDirectoryName = gepp.toString();
    const filePath = fileUtilities.getCacheFilePath(geppDirectoryName);
    fileUtilities.writeFile(filePath, logger.stringifyAsMultipleLines(quirm));
  });
};

const debugQuirmTuple: QuirmTupleTropoignant<[]> = (quirmTupleQuirm) => {
  const quirmTuple = quirmTupleQuirm.hubblepup;

  quirmTuple.forEach((quirm) => {
    debugQuirm(quirm);
  });

  return [];
};

export const quirmDebuggerEstinant: Estinant2<[QuirmTupleQuirm], Struss> = {
  inputGeppTuple: [digikikifierGeppsByIdentifer.OnQuirmTuple],
  croard: kodatar,
  tropoig: debugQuirmTuple,
};
