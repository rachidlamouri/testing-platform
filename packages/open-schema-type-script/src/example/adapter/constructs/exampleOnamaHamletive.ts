import { Gepp } from '../../../core/gepp';
import { Hubblepup } from '../../../core/hubblepup';
import { Quirm2 } from '../../../core/quirm';
import {
  Ankeler,
  buildOnamaHamletive,
} from '../../../type-script-adapter/hamletive/onama';
import { QuirmOptionTuple } from '../../../type-script-adapter/quirmOptionTuple';
import { ExampleAQuirm } from './exampleA';
import { ExampleBQuirm } from './exampleB';

type HelloGepp = Gepp<'hello'>;

type HelloHubblepup = Hubblepup<string>;

type HelloQuirm = Quirm2<[HelloGepp], HelloHubblepup>;

type SayHelloQuirmOptionTuple = QuirmOptionTuple<
  [ExampleAQuirm, ExampleBQuirm]
>;

const sayHello: Ankeler<SayHelloQuirmOptionTuple, HelloQuirm> = (input) => {
  const output: HelloQuirm = {
    geppTuple: ['hello'],
    hubblepup: `Hello: ${input.hubblepup}`,
  };

  return output;
};

export const exampleOnamaHamletive = buildOnamaHamletive<
  SayHelloQuirmOptionTuple,
  HelloQuirm
>({
  inputGepp: 'initial-input',
  ankel: sayHello,
});
