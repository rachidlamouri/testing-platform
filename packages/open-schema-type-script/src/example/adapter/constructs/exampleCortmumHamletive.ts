import {
  buildCortmumHamletive,
  Cortmum,
  CortmumCroader,
} from '../../../type-script-adapter/hamletive/cortmum';
import { ExampleAQuirm } from './exampleA';
import { ExampleAggregateQuirm } from './exampleAggregate';
import { ExampleBQuirm } from './exampleB';

type InputQuirmTuple = [ExampleAQuirm, ExampleBQuirm];
type OutputQuirmTuple = [ExampleAggregateQuirm];

type InputZorn = number;

const aggregateByNumber: Cortmum<InputQuirmTuple, OutputQuirmTuple> = (
  inputA,
  inputB,
) => {
  const output: ExampleAggregateQuirm = {
    geppTuple: ['example-aggregate'],
    hubblepup: {
      a: inputA.hubblepup,
      b: inputB.hubblepup,
    },
  };

  return [output];
};

const croard: CortmumCroader<InputQuirmTuple, InputZorn> = (input) => {
  const zorn: InputZorn = parseInt(input.hubblepup.split('-')[1], 10);
  return zorn;
};

export const exampleCortmumHamletive = buildCortmumHamletive<
  InputQuirmTuple,
  OutputQuirmTuple,
  InputZorn
>({
  inputGeppTuple: ['example-a', 'example-b'],
  croard,
  tropoig: aggregateByNumber,
});
