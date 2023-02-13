import {
  Haqueler,
  buildWortinatorHamletive,
} from '../../../type-script-adapter/hamletive/wortinator';
import { QuirmOptionTuple } from '../../../type-script-adapter/quirmOptionTuple';
import { ExampleAQuirm } from './exampleA';
import { ExampleBQuirm } from './exampleB';

type WortWortWortQuirmOptionTuple = QuirmOptionTuple<
  [ExampleAQuirm, ExampleBQuirm]
>;

const worWortWort: Haqueler<WortWortWortQuirmOptionTuple> = (input) => {
  // eslint-disable-next-line no-console
  console.log(`Wort Wort Wort: ${input.hubblepup}`);
};

export const exampleWortinatorHamletive =
  buildWortinatorHamletive<WortWortWortQuirmOptionTuple>({
    inputGepp: 'initial-input',
    haquel: worWortWort,
  });
