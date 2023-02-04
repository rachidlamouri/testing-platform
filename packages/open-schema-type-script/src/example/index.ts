import { digikikify } from '../core/digikikify';
import { Estinant } from '../core/estinant';
import { Gipp } from '../core/gipp';
import { Quirm } from '../core/quirm';

const myGipp: Gipp = 'foo';

const myQuirm: Quirm = {
  gippTuple: [myGipp],
  hubblepup: 'myself!',
};

const myEstinant: Estinant = {
  tropoignant: function sayHello(input) {
    return `Hello ${input as string}`;
  },
  inputGipp: myGipp,
};

digikikify({
  initialQuirmTuple: [myQuirm],
  estinantTuple: [myEstinant],
});
