import { digikikify } from '../core/digikikify';
import {
  Estinant2,
  MentursectionEstinant,
  OnamaEstinant,
} from '../core/estinant';
import { Gepp } from '../core/gepp';
import { Quirm } from '../core/quirm';
import { TropoignantTypeName } from '../core/tropoignant';
import { blindCastEstinants } from './blindCastEstinants';
import { eventLogger } from '../type-script-adapter/debugger/eventLogger';

const exampleGeppInitialInput: Gepp = 'gepp-initial-input';
const exampleGeppA: Gepp = 'gepp-a';
const exampleGeppB: Gepp = 'gepp-b';

const exampleGeppHello: Gepp = 'gepp-hello';
const exampleGeppDash1: Gepp = 'gepp-dash-1';
const exampleGeppDash2: Gepp = 'gepp-dash-2';

const exampleGeppC: Gepp = 'gepp-c';
const exampleGeppWhattup: Gepp = 'gepp-whattup';
const exampleGeppA2: Gepp = 'gepp-aa';
const exampleGeppB2: Gepp = 'gepp-bb';

type ExampleHubblepup = string;

type ExampleQuirm = Quirm<ExampleHubblepup>;

const exampleQuirmA1: ExampleQuirm = {
  geppTuple: [exampleGeppInitialInput, exampleGeppA],
  hubblepup: 'a-1',
};

const exampleQuirmA2: ExampleQuirm = {
  geppTuple: [exampleGeppInitialInput, exampleGeppA],
  hubblepup: 'a-2',
};

const exampleQuirmB1: ExampleQuirm = {
  geppTuple: [exampleGeppInitialInput, exampleGeppB],
  hubblepup: 'b-1',
};

const exampleQuirmB2: ExampleQuirm = {
  geppTuple: [exampleGeppInitialInput, exampleGeppB],
  hubblepup: 'b-2',
};

const exampleOnamaEstinant: OnamaEstinant<ExampleHubblepup, [ExampleQuirm]> = {
  inputGepp: exampleGeppInitialInput,
  tropoignant: {
    typeName: TropoignantTypeName.Onama,
    process: function sayHello(input: ExampleHubblepup) {
      const output: ExampleQuirm = {
        geppTuple: [exampleGeppHello],
        hubblepup: `Hello: ${input}`,
      };

      return [output];
    },
  },
};

const exampleMentursectionEstinant: MentursectionEstinant<ExampleHubblepup> = {
  inputGepp: exampleGeppInitialInput,
  tropoignant: {
    typeName: TropoignantTypeName.Mentursection,
    process: function categorizeByDash(input: ExampleHubblepup) {
      const [, numberText] = input.split('-') as [string, '1' | '2'];

      if (numberText === '1') {
        return [exampleGeppDash1];
      }

      return [exampleGeppDash2];
    },
  },
};

const exampleWortinatorEstinant = eventLogger;

const exampleCortmumEstinant2: Estinant2<[ExampleQuirm, ExampleQuirm], string> =
  {
    inputGeppTuple: [exampleGeppA, exampleGeppB],
    croard: function getId(input) {
      const [, numberText] = input.split('-') as [string, '1' | '2'];
      return numberText;
    },
    tropoig: function join(hubblepupA, hubblepupB) {
      const outputQuirm: Quirm = {
        geppTuple: [exampleGeppC],
        hubblepup: {
          hubblepupA,
          hubblepupB,
        },
      };

      return [outputQuirm];
    },
  };

const exampleOnamaEstinant2: Estinant2<[ExampleQuirm], symbol> = {
  inputGeppTuple: [exampleGeppInitialInput],
  croard: function getId(input) {
    return Symbol(input);
  },
  tropoig: function sayWhattup(input) {
    const output: ExampleQuirm = {
      geppTuple: [exampleGeppWhattup],
      hubblepup: `Whattup: ${input}`,
    };

    return [output];
  },
};

const exampleWortinatorEstinant2: Estinant2<[ExampleQuirm], symbol> = {
  inputGeppTuple: [exampleGeppInitialInput],
  croard: function getId(input) {
    return Symbol(input);
  },
  tropoig: function sayWhattup(input) {
    // eslint-disable-next-line no-console
    console.log(`Wort Wort Wort: ${input}`);

    return [];
  },
};

const exampleMentursectionEstinant2: Estinant2<[ExampleQuirm], symbol> = {
  inputGeppTuple: [exampleGeppInitialInput],
  croard: function getId(input) {
    return Symbol(input);
  },
  tropoig: function sayWhattup(input) {
    const isA = input.startsWith('a');

    const output: ExampleQuirm = {
      geppTuple: [isA ? exampleGeppA2 : exampleGeppB2],
      hubblepup: input,
    };

    return [output];
  },
};

digikikify({
  initialQuirmTuple: [
    exampleQuirmA1,
    exampleQuirmA2,
    exampleQuirmB1,
    exampleQuirmB2,
  ],
  estinantTuple: blindCastEstinants([
    exampleOnamaEstinant,
    exampleWortinatorEstinant,
    exampleMentursectionEstinant,
    exampleCortmumEstinant2,
    exampleOnamaEstinant2,
    exampleWortinatorEstinant2,
    exampleMentursectionEstinant2,
  ]),
});

// TODO: figure out how to not have to do this
export type ExampleCore = symbol;
