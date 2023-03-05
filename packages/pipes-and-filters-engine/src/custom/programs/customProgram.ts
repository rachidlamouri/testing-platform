import { digikikify } from '../../type-script-adapter/digikikify';
import { debugHubblepup } from '../debugger/debugHubblepup';
import {
  FILE_A_CONFIGURATION_GEPP,
  PIPES_AND_FILTERS_FILE_MENTURSECTION_CONFIGURATION,
} from '../programmable-units/file/fileMentursectionConfiguration';
import { fileAMattomer } from '../programmable-units/file/fileMattomer';
import { fileAMentursection } from '../programmable-units/file/fileMentursection';

digikikify({
  initialVoictentsByGepp: {
    [FILE_A_CONFIGURATION_GEPP]: [
      PIPES_AND_FILTERS_FILE_MENTURSECTION_CONFIGURATION,
    ],
  },
  estinantTuple: [fileAMentursection, fileAMattomer],
  onHubblepupAddedToVoictents: debugHubblepup,
});
