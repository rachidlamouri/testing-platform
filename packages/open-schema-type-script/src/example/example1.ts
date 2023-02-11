import { digikikify } from '../core/digikikify';
import { MentursectionEstinant, OnamaEstinant } from '../core/estinant';
import { Gepp } from '../core/gepp';
import { Quirm } from '../core/quirm';
import { TropoignantTypeName } from '../core/tropoignant';
import { blindCastEstinants } from './blindCastEstinants';
import { eventLogger } from './debugger/eventLogger';

const exampleGeppInitialInput: Gepp = 'gepp-initial-input';
const exampleGeppA: Gepp = 'gepp-a';
const exampleGeppB: Gepp = 'gepp-b';

const exampleGeppHello: Gepp = 'gepp-hello';
const exampleGeppDash1: Gepp = 'gepp-dash-1';
const exampleGeppDash2: Gepp = 'gepp-dash-2';

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
  ]),
});

// TODO: figure out how to not have to do this
export type Example1 = symbol;
