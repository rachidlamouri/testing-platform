import fs from 'fs';
import {
  buildVoictentByGepp,
  digikikify,
} from '../../../type-script-adapter/digikikify';
import {
  SCAFFOLD_CONFIGURATION_GEPP,
  ScaffoldConfigurationVoque,
} from './scaffoldConfiguration';
import { scaffoldFile } from './scaffoldFile';
import { InMemoryVoictent } from '../../../core/engine/inMemoryVoictent';
import { ProgramFileCache } from '../../../utilities/programFileCache';

const [filePath] = process.argv.slice(2);

if (filePath === undefined) {
  throw Error('filePath is required');
}

if (!fs.existsSync(filePath)) {
  throw Error(`"${filePath}" does not exist`);
}

/**
 * Given a file path, it populates that file with a template for defining a
 * collection type and all related types
 */
digikikify({
  explicitVoictentTuple: [
    new InMemoryVoictent<ScaffoldConfigurationVoque>({
      gepp: SCAFFOLD_CONFIGURATION_GEPP,
      initialHubblepupPelueTuple: [{ filePath }],
    }),
  ] as const,
  uninferableVoictentByGepp: buildVoictentByGepp([] as const),
  estinantTuple: [scaffoldFile] as const,
  programFileCache: new ProgramFileCache({
    namespace: 'assembleScaffoldedFile',
  }),
});
