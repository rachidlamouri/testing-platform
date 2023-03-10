import { digikikify } from '../../type-script-adapter/digikikify';
import { debugHubblepup } from '../debugger/debugHubblepup';
import {
  FILE_MENTURSECTION_CONFIGURATION_GEPP,
  PIPES_AND_FILTERS_FILE_MENTURSECTION_CONFIGURATION,
} from '../programmable-units/file/fileMentursectionConfiguration';
import { fileMattomer } from '../programmable-units/file/fileMattomer';
import { fileMentursection } from '../programmable-units/file/fileMentursection';

digikikify({
  initialVoictentsByGepp: {
    [FILE_MENTURSECTION_CONFIGURATION_GEPP]: [
      PIPES_AND_FILTERS_FILE_MENTURSECTION_CONFIGURATION,
    ],
  },
  estinantTuple: [fileMentursection, fileMattomer],
  onHubblepupAddedToVoictents: debugHubblepup,
});
