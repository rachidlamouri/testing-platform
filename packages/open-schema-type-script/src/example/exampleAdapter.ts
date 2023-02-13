import { digikikify } from '../core/digikikify';
import { Gepp } from '../core/gepp';
import { blindCastEstinants } from './blindCastEstinants';
import {
  buildWortinatorHamletive,
  Haqueler,
} from '../type-script-adapter/hamletive/wortinator';
import { Odeshin } from '../type-script-adapter/odeshin';
import { Grition } from '../type-script-adapter/grition';
import { buildPlifal, Plifal } from '../type-script-adapter/plifal';
import { eventDebuggerEstinant } from './core-debugger/eventDebuggerEstinant';
import { quirmDebuggerEstinant } from './core-debugger/quirmDebuggerEstinant';

type InitialInputGepp = Gepp<'initial-input'>;

type AGepp = Gepp<'a'>;
type BGepp = Gepp<'b'>;

type ExampleGrition = Grition<string>;

type ExampleOdeshin = Odeshin<string, ExampleGrition>;

type AInitialGeppTuple = [InitialInputGepp, AGepp];
type ExampleAPlifal = Plifal<AInitialGeppTuple, ExampleOdeshin>;

const examplePlifalA1 = buildPlifal<'a1', ExampleGrition, AInitialGeppTuple>({
  geppTuple: ['initial-input', 'a'],
  identifier: 'a1',
  grition: 'a-1',
});

const examplePlifalA2 = buildPlifal<'a2', ExampleGrition, AInitialGeppTuple>({
  geppTuple: ['initial-input', 'a'],
  identifier: 'a2',
  grition: 'a-2',
});

type BInitialGeppTuple = [InitialInputGepp, BGepp];
type ExampleBPlifal = Plifal<BInitialGeppTuple, ExampleOdeshin>;

const examplePlifalB1 = buildPlifal<'b1', ExampleGrition, BInitialGeppTuple>({
  geppTuple: ['initial-input', 'b'],
  identifier: 'b1',
  grition: 'b-1',
});

const examplePlifalB2 = buildPlifal<'b2', ExampleGrition, BInitialGeppTuple>({
  geppTuple: ['initial-input', 'b'],
  identifier: 'b2',
  grition: 'b-2',
});

const worWortWort: Haqueler<ExampleAPlifal | ExampleBPlifal> = (input) => {
  // eslint-disable-next-line no-console
  console.log(`Wort Wort Wort: ${input.hubblepup.grition}`);
};

const exampleWortinatorHamletive = buildWortinatorHamletive<
  ExampleAPlifal | ExampleBPlifal
>({
  inputGepp: 'initial-input',
  haquel: worWortWort,
});

digikikify({
  initialQuirmTuple: [
    examplePlifalA1,
    examplePlifalA2,
    examplePlifalB1,
    examplePlifalB2,
  ],
  estinantTuple: blindCastEstinants([
    eventDebuggerEstinant,
    quirmDebuggerEstinant,
    exampleWortinatorHamletive,
  ]),
});

// TODO: figure out how to not have to do this
export type ExampleAdapter = symbol;
