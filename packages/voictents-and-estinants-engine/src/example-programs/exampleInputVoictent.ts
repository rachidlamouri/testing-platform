import { digikikify } from '../core/engine/digikikify';
import { Voictent } from '../core/engine/voictent';
import { QuirmList } from '../type-script-adapter/quirm';

digikikify({
  inputVoictentList: [new Voictent('example-1')],
  initialQuirmTuple: [
    {
      gepp: 'example-1',
      hubblepup: {
        value: 2,
      },
    },
  ],
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
