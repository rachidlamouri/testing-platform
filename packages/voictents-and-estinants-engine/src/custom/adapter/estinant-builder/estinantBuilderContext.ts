import { Gepp } from '../../../type-script-adapter/gepp';
import {
  Voictent,
  VoictentTuple,
  VoictentTupleToQuirmList,
} from '../../../type-script-adapter/voictent';
import {
  Straline,
  StralineTuple,
} from '../../../utilities/semantic-types/straline';
import { Tuple } from '../../../utilities/semantic-types/tuple';

export type TropoignantInput<
  TVoictent extends Voictent,
  TIsWibiz extends boolean,
> = [TIsWibiz] extends [true]
  ? TVoictent['hubblepupTuple']
  : TVoictent['hubblepupTuple'][number];

export type LeftContext = {
  gepp: Gepp;
  isWibiz: boolean;
  modifyTropoignantInput: (leftInput: any) => any;
};

export type RightContext = {
  gepp: Gepp;
  isWibiz: boolean;
  framate: (leftInput: any) => any;
  croard: (rightInput: any) => any;
  modifyTropoignantInput: (rightInput: any) => any;
};

export type RightContextTuple = Tuple<RightContext>;

export type OutputContext = {
  gepp: Gepp;
  normalizePinbetunfOutput: (modifiedOutput: any) => any;
};

export type RightContextTupleToModifiedInputTuple<
  TRightContextTuple extends RightContextTuple,
> = {
  [Index in keyof TRightContextTuple]: ReturnType<
    TRightContextTuple[Index]['modifyTropoignantInput']
  >;
};

export type Pinbetunf<
  TInputTuple extends StralineTuple,
  TOutput extends Straline,
> = (...input: TInputTuple) => TOutput;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyPinbetunf = Pinbetunf<any, any>;
