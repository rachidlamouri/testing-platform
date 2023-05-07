import { Merge } from 'type-fest';
import {
  GenericRightInputHubblepupTupleVicken,
  GenericRightInputVicken,
  GenericRightInputVickenTuple,
} from '../vicken/rightInputVicken';
import { Croader3 } from './croarder';
import { Framation3 } from './framation';
import { GenericLeftInputVicken } from '../vicken/leftInputVicken';

export type RightInputAppreffinge<
  TLeftInputVicken extends GenericLeftInputVicken,
  TRightInputVicken extends GenericRightInputVicken,
> = Merge<
  {
    gepp: TRightInputVicken['gepp'];
    isWibiz: TRightInputVicken['isWibiz'];
  },
  TRightInputVicken extends GenericRightInputHubblepupTupleVicken
    ? {
        croard: Croader3<TRightInputVicken>;
        framate: Framation3<TLeftInputVicken, TRightInputVicken>;
      }
    : {
        croard: never;
        framate: never;
      }
>;

export type GenericRightInputAppreffinge = RightInputAppreffinge<
  GenericLeftInputVicken,
  GenericRightInputVicken
>;

export type InputVickenTupleToRightInputAppreffingeTuple<
  TLeftInputVicken extends GenericLeftInputVicken,
  TRightInputVickenTuple extends GenericRightInputVickenTuple,
> = {
  [Index in keyof TRightInputVickenTuple]: RightInputAppreffinge<
    TLeftInputVicken,
    TRightInputVickenTuple[Index]
  >;
};
