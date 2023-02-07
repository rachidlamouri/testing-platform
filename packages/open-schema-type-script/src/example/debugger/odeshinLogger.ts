import { WortinatorEstinant } from '../../core/estinant';
import { TropoignantTypeName } from '../../core/tropoignant';
import { logger } from '../../utilities/logger';
import { Odeshin, ODESHIN_GEPP } from '../core/odeshin';
import { fileUtilities } from './fileUtilities';

export const odeshinLogger: WortinatorEstinant<Odeshin> = {
  inputGepp: ODESHIN_GEPP,
  tropoignant: {
    typeName: TropoignantTypeName.Wortinator,
    process: function cacheOdeshin(odeshin) {
      // TODO: standardize this convention somehow
      const typeName = odeshin.identifier.split(':')[0];

      const filePath = fileUtilities.getCacheFilePath(
        typeName,
        odeshin.identifier.replaceAll(/\//g, '_'),
      );

      fileUtilities.writeFile(
        filePath,
        logger.stringifyAsMultipleLines(odeshin),
      );
    },
  },
};
