import { buildBasicQuirmDebugger } from '../../custom/debugger/quirmDebugger';
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
  quirmDebugger: buildBasicQuirmDebugger('exampleCustom'),
});
