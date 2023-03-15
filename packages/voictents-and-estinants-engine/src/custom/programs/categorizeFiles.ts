import { digikikify } from '../../type-script-adapter/digikikify';
import {
  FILE_MENTURSECTION_CONFIGURATION_GEPP,
  VOICTENTS_AND_ESTINANTS_FILE_MENTURSECTION_CONFIGURATION,
} from '../programmable-units/file/fileMentursectionConfiguration';
import { fileMattomer } from '../programmable-units/file/fileMattomer';
import { fileMentursection } from '../programmable-units/file/fileMentursection';
import { buildBasicQuirmDebugger } from '../debugger/quirmDebugger';

digikikify({
  initialVoictentsByGepp: {
    [FILE_MENTURSECTION_CONFIGURATION_GEPP]: [
      VOICTENTS_AND_ESTINANTS_FILE_MENTURSECTION_CONFIGURATION,
    ],
  },
  estinantTuple: [fileMentursection, fileMattomer],
  quirmDebugger: buildBasicQuirmDebugger('categorizeFiles'),
});
