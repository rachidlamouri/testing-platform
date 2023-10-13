import { Merge } from 'type-fest';
import {
  GenericRightInputItemTupleStreamConnectionMetatype,
  GenericRightInputStreamConnectionMetatype,
  GenericRightInputStreamConnectionMetatypeTuple,
} from '../../../stream-connection-metatype/rightInputStreamConnectionMetatype';
import { RightKeyAccessor3 } from './rightKeyAccessor';
import { RightKeyTupleAccessor3 } from './rightKeyTupleAccessor';
import { GenericLeftInputStreamConnectionMetatype } from '../../../stream-connection-metatype/leftInputStreamConnectionMetatype';

/**
 * Determines how to stream a collection into a single right input of a
 * transform. See the data types of its properties for more details.
 *
 * @readableName RightInputStreamConfiguration
 */
export type RightInputStreamConfiguration<
  TLeftInputStreamConnectionMetatype extends GenericLeftInputStreamConnectionMetatype,
  TRightInputStreamConnectionMetatype extends GenericRightInputStreamConnectionMetatype,
> = Merge<
  {
    collectionId: TRightInputStreamConnectionMetatype['streamMetatype']['collectionId'];
    isCollectionStream: TRightInputStreamConnectionMetatype['isCollectionStream'];
  },
  TRightInputStreamConnectionMetatype extends GenericRightInputItemTupleStreamConnectionMetatype
    ? {
        getRightKey: RightKeyAccessor3<TRightInputStreamConnectionMetatype>;
        getRightKeyTuple: RightKeyTupleAccessor3<
          TLeftInputStreamConnectionMetatype,
          TRightInputStreamConnectionMetatype
        >;
      }
    : {
        getRightKey?: never;
        getRightKeyTuple?: never;
      }
>;

type GenericRightInputItemTupleStreamConfiguration =
  RightInputStreamConfiguration<
    GenericLeftInputStreamConnectionMetatype,
    GenericRightInputItemTupleStreamConnectionMetatype
  >;

export type GenericRightInputStreamConfiguration =
  RightInputStreamConfiguration<
    GenericLeftInputStreamConnectionMetatype,
    GenericRightInputStreamConnectionMetatype
  >;

export type InputStreamConnectionMetatypeTupleToRightInputStreamConfigurationTuple<
  TLeftInputStreamConnectionMetatype extends GenericLeftInputStreamConnectionMetatype,
  TRightInputStreamConnectionMetatypeTuple extends GenericRightInputStreamConnectionMetatypeTuple,
> = {
  [Index in keyof TRightInputStreamConnectionMetatypeTuple]: RightInputStreamConfiguration<
    TLeftInputStreamConnectionMetatype,
    TRightInputStreamConnectionMetatypeTuple[Index]
  >;
};

export const getIsRightInputItemTupleStreamConfiguration = (
  streamConfiguration: GenericRightInputStreamConfiguration,
): streamConfiguration is GenericRightInputItemTupleStreamConfiguration => {
  // Note: we are returning the negation here, because making the opposite type guard does not cause the type system to infer the negative case for some reason.
  return !streamConfiguration.isCollectionStream;
};
