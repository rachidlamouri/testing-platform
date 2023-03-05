import { digikikify } from '../../type-script-adapter/digikikify';
import { debugHubblepup } from '../debugger/debugHubblepup';
import { fileAEstinant } from '../entities/file/fileA';
import {
  FILE_A_CONFIGURATION_GEPP,
  PIPES_AND_FILTERS_FILE_A_CONFIGURATION,
} from '../entities/file/fileAConfiguration';

digikikify({
  initialVoictentsByGepp: {
    [FILE_A_CONFIGURATION_GEPP]: [PIPES_AND_FILTERS_FILE_A_CONFIGURATION],
  },
  estinantTuple: [fileAEstinant],
  onHubblepupAddedToVoictents: debugHubblepup,
});
