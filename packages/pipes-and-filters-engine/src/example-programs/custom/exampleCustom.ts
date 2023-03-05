import { debugOdeshin } from '../../custom/debugger/debugOdeshin';
import { digikikify } from '../../type-script-adapter/digikikify';
import {
  exampleInputOdeshin,
  EXAMPLE_INPUT_GEPP,
} from './entities/exampleInput';
import { exampleOutputEstinant } from './entities/exampleOutput';

digikikify({
  initialVoictentsByGepp: {
    [EXAMPLE_INPUT_GEPP]: [exampleInputOdeshin],
  },
  estinantTuple: [exampleOutputEstinant],
  onHubblepupAddedToVoictents: debugOdeshin,
});
