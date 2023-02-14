import {
  buildCortmumHamletive,
  Cortmum,
  CortmumCroader,
} from '../../../type-script-adapter/hamletive/cortmum';
import { QuirmOptionTupleTuple } from '../../../type-script-adapter/quirmOptionTuple';
import { ExampleAQuirm } from './exampleA';
import { ExampleAggregateQuirm } from './exampleAggregate';
import { ExampleBQuirm } from './exampleB';

type InputQuirmOptionTupleTuple = QuirmOptionTupleTuple<
  [[ExampleAQuirm], [ExampleBQuirm]]
>;
type OutputQuirmOptionTupleTuple = QuirmOptionTupleTuple<
  [[ExampleAggregateQuirm]]
>;

type InputZorn = number;

const aggregateByNumber: Cortmum<
  InputQuirmOptionTupleTuple,
  OutputQuirmOptionTupleTuple
> = (inputA, inputB) => {
  const output: ExampleAggregateQuirm = {
    geppTuple: ['example-aggregate'],
    hubblepup: {
      a: inputA.hubblepup,
      b: inputB.hubblepup,
    },
  };

  return [output];
};

const croard: CortmumCroader<InputQuirmOptionTupleTuple, InputZorn> = (
  input,
) => {
  const zorn: InputZorn = parseInt(input.hubblepup.split('-')[1], 10);
  return zorn;
};

export const exampleCortmumHamletive = buildCortmumHamletive<
  InputQuirmOptionTupleTuple,
  OutputQuirmOptionTupleTuple,
  InputZorn
>({
  inputGeppTuple: ['example-a', 'example-b'],
  croard,
  tropoig: aggregateByNumber,
});
