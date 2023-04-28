import { digikikify } from '../core/engine/digikikify';
import { InMemoryVoictent } from '../core/engine/inMemoryVoictent';
import { QuirmList } from '../type-script-adapter/quirm';

digikikify({
  inputVoictentList: [
    new InMemoryVoictent({
      gepp: 'voictent-1',
      initialHubblepupTuple: [{ value: 3 }],
    }),
    new InMemoryVoictent({
      gepp: 'voictent-2',
      initialHubblepupTuple: [{ value: 7 }],
    }),
  ],
  initialQuirmTuple: [],
  estinantTuple: [
    {
      leftAppreffinge: {
        gepp: 'voictent-1',
      },
      rightAppreffingeTuple: [
        {
          gepp: 'voictent-2',
          framate2: (left): [unknown] => [left.index],
          croard2: (right): unknown => right.index,
        },
      ],
      tropoig: (inputA, [inputB]): QuirmList => {
        // eslint-disable-next-line no-console
        console.log({
          inputA,
          inputB,
        });
        return [];
      },
    },
  ],
  onHubblepupAddedToVoictents: () => {},
});
