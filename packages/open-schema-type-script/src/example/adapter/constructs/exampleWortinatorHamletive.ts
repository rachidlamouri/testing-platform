import {
  Haqueler,
  buildWortinatorHamletive,
} from '../../../type-script-adapter/hamletive/wortinator';
import { ExampleAQuirm } from './exampleA';
import { ExampleBQuirm } from './exampleB';

type InputQuirmTuple = ExampleAQuirm | ExampleBQuirm;

const worWortWort: Haqueler<InputQuirmTuple> = (input) => {
  // eslint-disable-next-line no-console
  console.log(`Wort Wort Wort: ${input.hubblepup}`);
};

export const exampleWortinatorHamletive =
  buildWortinatorHamletive<InputQuirmTuple>({
    inputGepp: 'initial-input',
    haquel: worWortWort,
  });
