import { digikikify } from '../../core/digikikify';
import { blindCastEstinants } from './blindCastEstinants';
import { eventDebuggerEstinant } from '../core/debugger/eventDebuggerEstinant';
import { quirmDebuggerEstinant } from '../core/debugger/quirmDebuggerEstinant';
import { exampleAQuirmTuple } from './constructs/exampleA';
import { exampleBQuirmTuple } from './constructs/exampleB';
import { exampleWortinatorHamletive } from './constructs/exampleWortinatorHamletive';
import { exampleOnamaHamletive } from './constructs/exampleOnamaHamletive';

digikikify({
  initialQuirmTuple: [...exampleAQuirmTuple, ...exampleBQuirmTuple],
  estinantTuple: blindCastEstinants([
    eventDebuggerEstinant,
    quirmDebuggerEstinant,
    exampleWortinatorHamletive,
    exampleOnamaHamletive,
  ]),
});

// TODO: figure out how to not have to do this
export type ExampleAdapter = symbol;
