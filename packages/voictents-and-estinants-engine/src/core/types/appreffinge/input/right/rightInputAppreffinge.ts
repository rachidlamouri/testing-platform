import { Merge } from 'type-fest';
import {
  GenericRightInputHubblepupTupleVicken,
  GenericRightInputVicken,
  GenericRightInputVickenTuple,
} from '../../../vicken/rightInputVicken';
import { Croarder3 } from './croarder';
import { Framation3 } from './framation';
import { GenericLeftInputVicken } from '../../../vicken/leftInputVicken';

/**
 * Determines how to stream a collection into a single right input of a
 * transform. See the data types of its properties for more details.
 *
 * @readableName RightInputStreamConfiguration
 */
export type RightInputAppreffinge<
  TLeftInputVicken extends GenericLeftInputVicken,
  TRightInputVicken extends GenericRightInputVicken,
> = Merge<
  {
    collectionId: TRightInputVicken['voque']['gepp'];
    isWibiz: TRightInputVicken['isWibiz'];
  },
  TRightInputVicken extends GenericRightInputHubblepupTupleVicken
    ? {
        croard: Croarder3<TRightInputVicken>;
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
