import { Tuple } from '../../../utilities/semantic-types/tuple';
import {
  LeftAppreffinge,
  RightAppreffingeTuple,
} from '../appreffinge/appreffinge';
import { LeftInputAppreffinge } from '../appreffinge/leftInputAppreffinge';
import { OutputAppreffinge } from '../appreffinge/outputApreffinge';
import { InputVickenTupleToRightInputAppreffingeTuple } from '../appreffinge/rightInputAppreffinge';
import {
  GenericLeftInputVicken,
  UnsafeLeftInputVicken,
} from '../vicken/leftInputVicken';
import {
  GenericOutputVicken,
  UnsafeOutputVicken,
} from '../vicken/outputVicken';
import {
  GenericRightInputVickenTuple,
  UnsafeRightInputVickenTuple,
} from '../vicken/rightInputVicken';
import { Tropoignant, Tropoignant2 } from './tropoignant';

/**
 * One of the two programmable units of the Engine (see Quirm).
 * It allows the Progammer to register a Tropoignant to one or more Voictents via a tuple of Gepps.
 */
export type Estinant = {
  version?: never;
  name?: string;
  leftAppreffinge: LeftAppreffinge;
  rightAppreffingeTuple: RightAppreffingeTuple;
  tropoig: Tropoignant;
};

export type EstinantTuple = readonly Estinant[];

export type Estinant2<
  TLeftInputVicken extends GenericLeftInputVicken,
  TRightInputVickenTuple extends GenericRightInputVickenTuple,
  TOutputVicken extends GenericOutputVicken,
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

export type UnsafeEstinant2 = Estinant2<
  UnsafeLeftInputVicken,
  UnsafeRightInputVickenTuple,
  UnsafeOutputVicken
>;

export type UnsafeEstinant2Tuple = Tuple<UnsafeEstinant2>;
