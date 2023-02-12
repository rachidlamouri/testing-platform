import { logger } from '../../utilities/logger';
import { buildWortinatorHamletive, Haqueler } from '../hamletive/wortinator';
import { ODESHIN_GEPP } from '../odeshin';
import { Plifal } from '../plifal';
import { fileUtilities } from './fileUtilities';

const cacheOdeshin: Haqueler<Plifal> = (odeshin) => {
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
