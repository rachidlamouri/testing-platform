import { digikikify } from '../core/engine/digikikify';
import { InMemoryVoictent } from '../core/engine/inMemoryVoictent';
import { QuirmList } from '../type-script-adapter/quirm';

digikikify({
  inputVoictentList: [
    new InMemoryVoictent({
      gepp: 'voictent-1',
      initialHubblepupTuple: [{ value: 3 }],
    }),
  ],
  initialQuirmTuple: [],
  estinantTuple: [
    {
      leftAppreffinge: {
        gepp: 'example-1',
      },
      rightAppreffingeTuple: [],
      tropoig: (input): QuirmList => {
        // eslint-disable-next-line no-console
        console.log(input);
        return [];
      },
    },
  ],
  onHubblepupAddedToVoictents: () => {},
});
