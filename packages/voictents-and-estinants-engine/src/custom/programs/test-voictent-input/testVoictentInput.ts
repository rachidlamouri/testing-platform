import { digikikify } from '../../../type-script-adapter/digikikify';
import { buildBasicQuirmDebugger } from '../../debugger/quirmDebugger';
import { getEvery } from './getEvery';
import { getEveryOther } from './getEveryOther';
import { getVoictent } from './getVoictent';
import { ITEM_A_GEPP, ItemAVoictent } from './itemA';

const itemATuple: ItemAVoictent['hubblepupTuple'] = [
  { value: '0' },
  { value: '1' },
  { value: '2' },
  { value: '3' },
  { value: '4' },
  { value: '5' },
  { value: '6' },
  { value: '7' },
  { value: '8' },
  { value: '9' },
];

digikikify({
  initialVoictentsByGepp: {
    [ITEM_A_GEPP]: itemATuple,
  },
  estinantTuple: [getEvery, getVoictent],
  quirmDebugger: buildBasicQuirmDebugger('testVoictentInput1'),
});

digikikify({
  initialVoictentsByGepp: {
    [ITEM_A_GEPP]: itemATuple,
  },
  estinantTuple: [getEveryOther, getVoictent],
  quirmDebugger: buildBasicQuirmDebugger('testVoictentInput2'),
});
