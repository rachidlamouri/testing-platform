import { digikikify } from '../../core/digikikify';
import { Gepp } from '../../core/gepp';
import { blindCastEstinants } from './blindCastEstinants';
import {
  buildWortinatorHamletive,
  Haqueler,
} from '../../type-script-adapter/hamletive/wortinator';
import { eventDebuggerEstinant } from '../core/debugger/eventDebuggerEstinant';
import { quirmDebuggerEstinant } from '../core/debugger/quirmDebuggerEstinant';
import { Hubblepup } from '../../core/hubblepup';
import { Quirm2 } from '../../core/quirm';

type InitialInputGepp = Gepp<'initial-input'>;

type AGepp = Gepp<'a'>;
type BGepp = Gepp<'b'>;

type ExampleHubblepup = Hubblepup<string>;

type AInitialGeppTuple = [InitialInputGepp, AGepp];
type ExampleAQuirm = Quirm2<AInitialGeppTuple, ExampleHubblepup>;

const quirmA1: ExampleAQuirm = {
  geppTuple: ['initial-input', 'a'],
  hubblepup: 'a-1',
};

const quirmA2: ExampleAQuirm = {
  geppTuple: ['initial-input', 'a'],
  hubblepup: 'a-2',
};

type BInitialGeppTuple = [InitialInputGepp, BGepp];
type ExampleBQuirm = Quirm2<BInitialGeppTuple, ExampleHubblepup>;

const quirmB1: ExampleBQuirm = {
  geppTuple: ['initial-input', 'b'],
  hubblepup: 'b-1',
};

const examplePlifalB2: ExampleBQuirm = {
  geppTuple: ['initial-input', 'b'],
  hubblepup: 'b-2',
};

const worWortWort: Haqueler<ExampleAQuirm | ExampleBQuirm> = (input) => {
  // eslint-disable-next-line no-console
  console.log(`Wort Wort Wort: ${input.hubblepup}`);
};

const exampleWortinatorHamletive = buildWortinatorHamletive<
  ExampleAQuirm | ExampleBQuirm
>({
  inputGepp: 'initial-input',
  haquel: worWortWort,
});

digikikify({
  initialQuirmTuple: [quirmA1, quirmA2, quirmB1, examplePlifalB2],
  estinantTuple: blindCastEstinants([
    eventDebuggerEstinant,
    quirmDebuggerEstinant,
    exampleWortinatorHamletive,
  ]),
});

// TODO: figure out how to not have to do this
export type ExampleAdapter = symbol;
