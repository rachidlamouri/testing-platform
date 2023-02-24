import { digikikify } from '../../core/digikikify';
import { identifiableQuirmDebuggerEstinant } from '../../custom-adapter/identifiableQuirmDebuggerEstinant';
import { quirmDebuggerEstinant } from '../core/debugger/quirmDebuggerEstinant';
import { fileAEstinant } from './file/fileA';
import { SIMPLE_FILE_A_CONFIGURATION_QUIRM } from './file/fileAConfiguration';
import { fileAMentursection } from './file/fileAMentursection';
import { typeScriptFileBEstinant } from './file/typeScriptFileB';
import { buildPlifalFileA } from './plifalFile/plifalFileA';
import { buildPlifalFileB } from './plifalFile/plifalFileB';
import { createPlifalFileConfigurationPlifal } from './plifalFile/plifalFileConfiguration';
import { updatePlifalFile } from './plifalFile/updatePlifalFile';

const [filePath] = process.argv.slice(2);

if (!filePath) {
  throw Error('Missing file path');
}

digikikify({
  initialQuirmTuple: [
    SIMPLE_FILE_A_CONFIGURATION_QUIRM,
    createPlifalFileConfigurationPlifal(filePath),
  ],
  estinantTuple: [
    identifiableQuirmDebuggerEstinant,
    quirmDebuggerEstinant,
    fileAEstinant,
    fileAMentursection,
    typeScriptFileBEstinant,
    buildPlifalFileA,
    buildPlifalFileB,
    updatePlifalFile,
  ],
});
