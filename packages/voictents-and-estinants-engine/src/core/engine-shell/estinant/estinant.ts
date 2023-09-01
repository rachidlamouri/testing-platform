import { Tuple } from '../../../utilities/semantic-types/tuple';

import { LeftInputAppreffinge } from '../appreffinge/leftInputAppreffinge';
import { OutputAppreffinge } from '../appreffinge/outputApreffinge';
import { InputVickenTupleToRightInputAppreffingeTuple } from '../appreffinge/rightInputAppreffinge';
import { GenericLeftInputVicken } from '../vicken/leftInputVicken';
import {
  GenericOutputVicken,
  UnsafeOutputVicken,
} from '../vicken/outputVicken';
import { GenericRightInputVickenTuple } from '../vicken/rightInputVicken';
import { Tropoignant2 } from './tropoignant';

export type Estinant2<
  TLeftInputVicken extends GenericLeftInputVicken,
  TRightInputVickenTuple extends GenericRightInputVickenTuple,
  TOutputVicken extends UnsafeOutputVicken,
> = {
  version: 2;
  name: string;
  leftInputAppreffinge: LeftInputAppreffinge<TLeftInputVicken>;
  rightInputAppreffingeTuple: InputVickenTupleToRightInputAppreffingeTuple<
    TLeftInputVicken,
    TRightInputVickenTuple
  >;
  outputAppreffinge: OutputAppreffinge<TOutputVicken>;
  tropoig: Tropoignant2<
    TLeftInputVicken,
    TRightInputVickenTuple,
    TOutputVicken
  >;
};

export type GenericEstinant2 = Estinant2<
  GenericLeftInputVicken,
  GenericRightInputVickenTuple,
  GenericOutputVicken
>;

export type GenericEstinant2Tuple = Tuple<GenericEstinant2>;

// TODO: figure out which one of these don't need to be "any"
// TODO: Tie this type back to "Estinant2" somehow
export type UnsafeEstinant2 = {
  version: 2;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  leftInputAppreffinge: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rightInputAppreffingeTuple: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  outputAppreffinge: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tropoig: any;
};

export type UnsafeEstinant2Tuple = Tuple<UnsafeEstinant2>;
