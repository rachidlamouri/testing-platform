import { logger } from '../../../utilities/logger';
import {
  buildWortinatorHamletive,
  Haqueler,
} from '../../../type-script-adapter/hamletive/wortinator';
import { ODESHIN_GEPP } from '../custom-constructs/odeshin';
import { Plifal } from '../custom-constructs/plifal';
import { fileUtilities } from './fileUtilities';
import { QuirmOptionTuple } from '../../../type-script-adapter/quirmOptionTuple';

const cacheOdeshin: Haqueler<QuirmOptionTuple<[Plifal]>> = (plifal) => {
  const odeshin = plifal.hubblepup;

  // TODO: standardize this convention somehow
  const typeName = odeshin.identifier.split(':')[0];

  const filePath = fileUtilities.getCacheFilePath(
    typeName,
    odeshin.identifier.replaceAll(/\//g, '_'),
  );

  fileUtilities.writeFile(filePath, logger.stringifyAsMultipleLines(odeshin));
};

export const odeshinLogger = buildWortinatorHamletive({
  inputGepp: ODESHIN_GEPP,
  haquel: cacheOdeshin,
});
