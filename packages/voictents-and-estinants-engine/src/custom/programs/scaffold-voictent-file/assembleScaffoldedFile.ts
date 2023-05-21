import fs from 'fs';
import { buildBasicQuirmDebugger } from '../../debugger/quirmDebugger';
import { digikikify } from '../../../type-script-adapter/digikikify';
import { SCAFFOLD_CONFIGURATION_GEPP } from './scaffoldConfiguration';
import { scaffoldFile } from './scaffoldFile';

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
  initialHubblepupTupleByGepp: {
    [SCAFFOLD_CONFIGURATION_GEPP]: [{ filePath }],
  },
  estinantTuple: [scaffoldFile],
  quirmDebugger: buildBasicQuirmDebugger('assembleScaffoldedFile'),
});
