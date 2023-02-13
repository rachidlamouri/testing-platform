import {
  buildMentursectionHamletive,
  Paraker,
} from '../../../type-script-adapter/hamletive/mentursection';
import { QuirmOptionTuple } from '../../../type-script-adapter/quirmOptionTuple';
import { ExampleAQuirm } from './exampleA';
import { ExampleBQuirm } from './exampleB';
import { ExampleDash1, ExampleDash1Quirm } from './exampleDash1';
import { ExampleDash2Quirm } from './exampleDash2';

type InputOptionTuple = QuirmOptionTuple<[ExampleAQuirm, ExampleBQuirm]>;
type OutputOptionTuple = QuirmOptionTuple<
  [ExampleDash1Quirm, ExampleDash2Quirm]
>;

const isDash1: Paraker<
  InputOptionTuple,
  OutputOptionTuple,
  ExampleDash1Quirm
> = (input): input is ExampleDash1 => input.endsWith('-1');

const isDash2: Paraker<
  InputOptionTuple,
  OutputOptionTuple,
  ExampleDash2Quirm
> = (input): input is ExampleDash1 => input.endsWith('-2');

export const exampleMentursectionHamletive = buildMentursectionHamletive<
  InputOptionTuple,
  OutputOptionTuple
>({
  inputGepp: 'initial-input',
  kerzTuple: [
    {
      outputGeppTuple: ['example-dash-1'],
      parak: isDash1,
    },
    {
      outputGeppTuple: ['example-dash-2'],
      parak: isDash2,
    },
  ],
});
