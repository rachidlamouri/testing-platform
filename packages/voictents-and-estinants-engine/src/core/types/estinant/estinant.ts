import { Tuple } from '../../../package-agnostic-utilities/type/tuple';

import { LeftInputAppreffinge } from '../appreffinge/input/leftInputAppreffinge';
import { OutputAppreffinge } from '../appreffinge/output/outputAppreffinge';
import { InputVickenTupleToRightInputAppreffingeTuple } from '../appreffinge/input/right/rightInputAppreffinge';
import { GenericLeftInputVicken } from '../vicken/leftInputVicken';
import {
  GenericOutputVicken,
  UnsafeOutputVicken,
} from '../vicken/outputVicken';
import { GenericRightInputVickenTuple } from '../vicken/rightInputVicken';
import { Tropoignant2 } from './tropoignant';

/**
 * A core transform plus its input and output stream configurations.
 *
 * @readableName ProgrammedTransform
 *
 * @canonicalDeclaration
 */
export type ProgrammedTransform2<
  TLeftInputVicken extends GenericLeftInputVicken,
  TRightInputVickenTuple extends GenericRightInputVickenTuple,
  TOutputVicken extends UnsafeOutputVicken,
> = {
  version: 2;
  name: string;
  leftInputStreamConfiguration: LeftInputAppreffinge<TLeftInputVicken>;
  rightInputStreamConfigurationTuple: InputVickenTupleToRightInputAppreffingeTuple<
    TLeftInputVicken,
    TRightInputVickenTuple
  >;
  outputStreamConfiguration: OutputAppreffinge<TOutputVicken>;
  transform: Tropoignant2<
    TLeftInputVicken,
    TRightInputVickenTuple,
    TOutputVicken
  >;
};

export type GenericEstinant2 = ProgrammedTransform2<
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
  leftInputStreamConfiguration: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rightInputStreamConfigurationTuple: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  outputStreamConfiguration: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: any;
};

export type UnsafeEstinant2Tuple = Tuple<UnsafeEstinant2>;
