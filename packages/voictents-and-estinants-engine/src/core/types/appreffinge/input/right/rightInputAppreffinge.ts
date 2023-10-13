import { Merge } from 'type-fest';
import {
  GenericRightInputItemTupleStreamConnectionMetatype,
  GenericRightInputStreamConnectionMetatype,
  GenericRightInputStreamConnectionMetatypeTuple,
} from '../../../stream-connection-metatype/rightInputStreamConnectionMetatype';
import { Croarder3 } from './croarder';
import { Framation3 } from './framation';
import { GenericLeftInputStreamConnectionMetatype } from '../../../stream-connection-metatype/leftInputStreamConnectionMetatype';

/**
 * Determines how to stream a collection into a single right input of a
 * transform. See the data types of its properties for more details.
 *
 * @readableName RightInputStreamConfiguration
 */
export type RightInputAppreffinge<
  TLeftInputVicken extends GenericLeftInputStreamConnectionMetatype,
  TRightInputVicken extends GenericRightInputStreamConnectionMetatype,
> = Merge<
  {
    collectionId: TRightInputVicken['streamMetatype']['collectionId'];
    isWibiz: TRightInputVicken['isCollectionStream'];
  },
  TRightInputVicken extends GenericRightInputItemTupleStreamConnectionMetatype
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
  GenericLeftInputStreamConnectionMetatype,
  GenericRightInputItemTupleStreamConnectionMetatype
>;

export type GenericRightInputAppreffinge = RightInputAppreffinge<
  GenericLeftInputStreamConnectionMetatype,
  GenericRightInputStreamConnectionMetatype
>;

export type InputVickenTupleToRightInputAppreffingeTuple<
  TLeftInputVicken extends GenericLeftInputStreamConnectionMetatype,
  TRightInputVickenTuple extends GenericRightInputStreamConnectionMetatypeTuple,
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
