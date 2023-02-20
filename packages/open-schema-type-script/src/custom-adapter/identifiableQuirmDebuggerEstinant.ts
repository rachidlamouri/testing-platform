import { GeppTuple } from '../core/gepp';
import { Hubblepup } from '../core/hubblepup';
import { Quirm2 } from '../core/quirm';
import { digikikifierGeppsByIdentifer, QuirmTupleQuirm } from '../core/yek';
import { fileUtilities } from '../example/core/debugger/fileUtilities';
import {
  buildWortinatorHamletive,
  Haqueler,
} from '../type-script-adapter/hamletive/wortinator';
import { logger } from '../utilities/logger';

type Identifiable = {
  identifier: string;
};

type IdentifiableHubblepup = Hubblepup<Identifiable>;

type IdentifiableQuirm = Quirm2<GeppTuple, IdentifiableHubblepup>;

type InputQuirm = QuirmTupleQuirm;

const debugIdentifiableQuirm = (quirm: IdentifiableQuirm): void => {
  const rawIdentifier = quirm.hubblepup.identifier;
  const fileFriendlyIdentifier = rawIdentifier.replaceAll(/\//g, '_');

  quirm.geppTuple.forEach((gepp) => {
    const filePath = fileUtilities.getIdentityCacheFilePath(
      logger.stringifyAsMultipleLines(gepp),
      fileFriendlyIdentifier,
    );
    fileUtilities.writeFile(filePath, logger.stringifyAsMultipleLines(quirm));
  });
};

const debugIdentifiableQuirms: Haqueler<InputQuirm> = (quirmTupleQuirm) => {
  const quirmTuple = quirmTupleQuirm.hubblepup;

  quirmTuple
    .filter((quirm): quirm is IdentifiableQuirm => {
      return (
        quirm.hubblepup !== null &&
        typeof quirm.hubblepup === 'object' &&
        'identifier' in quirm.hubblepup &&
        typeof quirm.hubblepup.identifier === 'string'
      );
    })
    .forEach((quirm) => {
      debugIdentifiableQuirm(quirm);
    });

  return [];
};

export const identifiableQuirmDebuggerEstinant = buildWortinatorHamletive({
  inputGepp: digikikifierGeppsByIdentifer.OnQuirmTuple,
  haquel: debugIdentifiableQuirms,
});
