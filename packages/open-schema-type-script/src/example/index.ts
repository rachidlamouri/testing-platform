import { digikikify } from '../core/digikikify';
import { Estinant } from '../core/estinant';
import { Gipp } from '../core/gipp';
import { Quirm } from '../core/quirm';

const myGipp1: Gipp = 'foo';
const myGipp2: Gipp = 'bar';
const myGipp3: Gipp = 'baz';

const myQuirm1: Quirm = {
  gippTuple: [myGipp1, myGipp2],
  hubblepup: 'myself!',
};

const myQuirm2: Quirm = {
  gippTuple: [myGipp1, myGipp3],
  hubblepup: 'someone else',
};

const myEstinant1: Estinant = {
  tropoignant: function sayHello(input) {
    return `Hello ${input as string}`;
  },
  inputGipp: myGipp1,
};

const myEstinant2: Estinant = {
  tropoignant: function sayGoodbye(input) {
    return `Goodbye ${input as string}`;
  },
  inputGipp: myGipp3,
};

digikikify({
  initialQuirmTuple: [myQuirm1, myQuirm2],
  estinantTuple: [myEstinant1, myEstinant2],
});
