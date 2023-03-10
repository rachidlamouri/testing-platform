import { digikikify } from '../../type-script-adapter/digikikify';
import { debugHubblepup } from '../core/debugHubblepup';
import { exampleWattlection } from './entities/exampleWattlection';
import { exampleOnama } from './entities/exampleOnama';
import {
  initialInputHubblepupTuple,
  INITIAL_INPUT_GEPP,
} from './entities/initialInputVoictent';
import { exampleWortinator } from './entities/exampleWortinator';
import { exampleMattomer } from './entities/exampleMattomer';
import { exampleCortmum } from './entities/exampleCortmum';
import { exampleDisatinger } from './entities/exampleDisatinger';
import { exampleMentursection } from './entities/exampleMentursection';

digikikify({
  initialVoictentsByGepp: {
    [INITIAL_INPUT_GEPP]: initialInputHubblepupTuple,
  },
  estinantTuple: [
    exampleMattomer,
    exampleOnama,
    exampleWattlection,
    exampleWortinator,
    exampleCortmum,
    exampleDisatinger,
    exampleMentursection,
  ] as const,
  onHubblepupAddedToVoictents: debugHubblepup,
});
