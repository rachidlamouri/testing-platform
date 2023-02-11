import { digikikify } from '../core/digikikify';
import { Estinant } from '../core/estinant';
import { Gepp } from '../core/gepp';
import { Quirm, QuirmTuple } from '../core/quirm';
import { TropoignantTypeName } from '../core/tropoignant';
import { blindCastEstinants } from './blindCastEstinants';
import { eventLogger } from './debugger/eventLogger';

const myGeppA: Gepp = 'example-1';
const myGeppB: Gepp = 'example-2';
const myGeppC: Gepp = 'example-3';
const myGeppHello: Gepp = 'example-hello';
const myGeppGoodbye: Gepp = 'example-goodbye';

const myQuirm1: Quirm<string> = {
  geppTuple: [myGeppA, myGeppB],
  hubblepup: 'myself!',
};

const myQuirm2: Quirm<string> = {
  geppTuple: [myGeppA, myGeppC],
  hubblepup: 'someone else',
};

const myEstinant1: Estinant<string, QuirmTuple<string>> = {
  inputGepp: myGeppA,
  tropoignant: {
    typeName: TropoignantTypeName.Onama,
    process: function sayHello(input) {
      return [
        {
          geppTuple: [myGeppHello],
          hubblepup: `Hello ${input}`,
        },
      ];
    },
  },
};

const myEstinant2: Estinant<string, QuirmTuple<string>> = {
  inputGepp: myGeppC,
  tropoignant: {
    typeName: TropoignantTypeName.Onama,
    process: function sayGoodbye(input) {
      return [
        {
          geppTuple: [myGeppGoodbye],
          hubblepup: `Goodbye ${input}`,
        },
      ];
    },
  },
};

digikikify({
  initialQuirmTuple: [
    myQuirm1,
    myQuirm2,
  ],
  estinantTuple: blindCastEstinants([
    myEstinant1,
    myEstinant2,
    eventLogger,
  ]),
});

// TODO: figure out how to not have to do this
export type Example1 = symbol;
