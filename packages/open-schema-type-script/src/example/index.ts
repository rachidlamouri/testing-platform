import { digikikify } from '../core/digikikify';
import { Estinant } from '../core/estinant';
import { Gipp } from '../core/gipp';
import { Quirm, QuirmTuple } from '../core/quirm';
import { JsonString } from '../utilities/json';
import { blindCastEstinants } from './blindCastEstinants';
import { fileAEstinant } from './file/fileA';
import { SIMPLE_FILE_A_CONFIGURATION_QUIRM } from './file/fileAConfiguration';
import { fileAHasKnownExtensionSuffixEstinant } from './file/fileAHasKnownExtensionSuffix';

const myGippA: Gipp = 'example-1';
const myGippB: Gipp = 'example-2';
const myGippC: Gipp = 'example-3';
const myGippHello: Gipp = 'example-hello';
const myGippGoodbye: Gipp = 'example-goodbye';

const myQuirm1: Quirm<JsonString> = {
  gippTuple: [myGippA, myGippB],
  hubblepup: 'myself!',
};

const myQuirm2: Quirm<JsonString> = {
  gippTuple: [myGippA, myGippC],
  hubblepup: 'someone else',
};

const myEstinant1: Estinant<JsonString, QuirmTuple<JsonString>> = {
  inputGipp: myGippA,
  tropoignant: function sayHello(input) {
    return [
      {
        gippTuple: [myGippHello],
        hubblepup: `Hello ${input}`,
      },
    ];
  },
};

const myEstinant2: Estinant<JsonString, QuirmTuple<JsonString>> = {
  inputGipp: myGippC,
  tropoignant: function sayGoodbye(input) {
    return [
      {
        gippTuple: [myGippGoodbye],
        hubblepup: `Goodbye ${input}`,
      },
    ];
  },
};

digikikify({
  initialQuirmTuple: [myQuirm1, myQuirm2, SIMPLE_FILE_A_CONFIGURATION_QUIRM],
  estinantTuple: blindCastEstinants([
    myEstinant1,
    myEstinant2,
    fileAEstinant,
    fileAHasKnownExtensionSuffixEstinant,
  ]),
});
