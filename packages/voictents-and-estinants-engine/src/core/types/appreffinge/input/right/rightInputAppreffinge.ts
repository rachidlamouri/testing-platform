import { Merge } from 'type-fest';
import {
  GenericRightInputHubblepupTupleVicken,
  GenericRightInputVicken,
  GenericRightInputVickenTuple,
} from '../../../vicken/rightInputVicken';
import { Croader3 } from './croarder';
import { Framation3 } from './framation';
import { GenericLeftInputVicken } from '../../../vicken/leftInputVicken';

/**
 * The stream configuration for a right input
 */
export type RightInputAppreffinge<
  TLeftInputVicken extends GenericLeftInputVicken,
  TRightInputVicken extends GenericRightInputVicken,
> = Merge<
  {
    gepp: TRightInputVicken['voque']['gepp'];
    isWibiz: TRightInputVicken['isWibiz'];
  },
  TRightInputVicken extends GenericRightInputHubblepupTupleVicken
    ? {
        croard: Croader3<TRightInputVicken>;
        framate: Framation3<TLeftInputVicken, TRightInputVicken>;
      }
    : {
        croard?: never;
        framate?: never;
      }
>;

type GenericRightInputHubblepupTupleAppreffinge = RightInputAppreffinge<
  GenericLeftInputVicken,
  GenericRightInputHubblepupTupleVicken
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

export const getIsRightInputHubblepupTupleAppreffinge = (
  appreffinge: GenericRightInputAppreffinge,
): appreffinge is GenericRightInputHubblepupTupleAppreffinge => {
  // Note: we are returning the negation here, because making the opposite type guard does not cause the type system to infer the negative case for some reason.
  return !appreffinge.isWibiz;
};
