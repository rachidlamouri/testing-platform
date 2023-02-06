import { digikikify } from '../core/digikikify';
import { Estinant } from '../core/estinant';
import { Gipp } from '../core/gipp';
import { Quirm, QuirmTuple } from '../core/quirm';
import { JsonString } from '../utilities/json';
import { blindCastEstinants } from './blindCastEstinants';

const myGipp1: Gipp = 'foo';
const myGipp2: Gipp = 'bar';
const myGipp3: Gipp = 'baz';

const myQuirm1: Quirm<JsonString> = {
  gippTuple: [myGipp1, myGipp2],
  hubblepup: 'myself!',
};

const myQuirm2: Quirm<JsonString> = {
  gippTuple: [myGipp1, myGipp3],
  hubblepup: 'someone else',
};

const myEstinant1: Estinant<JsonString, QuirmTuple<JsonString>> = {
  tropoignant: function sayHello(input) {
    return [
      {
        gippTuple: ['hello'],
        hubblepup: `Hello ${input}`,
      },
    ];
  },
  inputGipp: myGipp1,
};

const myEstinant2: Estinant<JsonString, QuirmTuple<JsonString>> = {
  tropoignant: function sayGoodbye(input) {
    return [
      {
        gippTuple: ['goodbye'],
        hubblepup: `Goodbye ${input}`,
      },
    ];
  },
  inputGipp: myGipp3,
};

digikikify({
  initialQuirmTuple: [myQuirm1, myQuirm2],
  estinantTuple: blindCastEstinants([myEstinant1, myEstinant2]),
});
