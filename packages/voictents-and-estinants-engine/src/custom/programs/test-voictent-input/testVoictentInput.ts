import * as uuid from 'uuid';
import { digikikify } from '../../../type-script-adapter/digikikify';
import { buildBasicQuirmDebugger } from '../../debugger/quirmDebugger';
import { getEvery } from './getEvery';
import { getEveryOther } from './getEveryOther';
import { getZero } from './getZero';
import { getOne } from './getOne';
import { getVoictent } from './getVoictent';
import { ITEM_A_GEPP, ItemAOdeshin } from './itemA';
import { sharedContext } from './sharedContext';

const completeItemATuple = Array.from({ length: 10 }).map<ItemAOdeshin>(
  (item, index) => {
    return {
      zorn: `${index}`,
      grition: {
        value: index,
      },
    };
  },
);

const singletonItemATuple = completeItemATuple.slice(0, 1);

const itemACouple = completeItemATuple.slice(0, 2);

const itemATriple = completeItemATuple.slice(0, 3);

const testOptionCombination = (
  inputItemATuple: ItemAOdeshin[],
  estinant:
    | typeof getEvery
    | typeof getEveryOther
    | typeof getOne
    | typeof getZero,
): void => {
  sharedContext.reset();

  const inputCount =
    inputItemATuple.length < 10 ? `${inputItemATuple.length}` : 'n';

  digikikify({
    initialVoictentsByGepp: {
      [ITEM_A_GEPP]: inputItemATuple,
    },
    estinantTuple: [estinant, getVoictent],
    quirmDebugger: buildBasicQuirmDebugger(
      `testVoictentInput-${inputCount}-${estinant.name ?? uuid.v4()}`,
      'snapshot',
    ),
  });
};

const inputTupleOptionList = [
  [],
  singletonItemATuple,
  itemACouple,
  itemATriple,
  completeItemATuple,
];

const estinantOptionList = [getEvery, getEveryOther, getOne, getZero];

inputTupleOptionList.forEach((inputItemATuple) => {
  estinantOptionList.forEach((estinant) => {
    testOptionCombination(inputItemATuple, estinant);
  });
});
