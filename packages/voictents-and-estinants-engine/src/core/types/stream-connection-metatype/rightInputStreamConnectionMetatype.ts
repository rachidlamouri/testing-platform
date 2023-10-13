import { GenericStreamMetatype } from '../stream-metatype/streamMetatype';
import { IdTuple } from '../../../package-agnostic-utilities/data-structure/id';
import { Tuple } from '../../../package-agnostic-utilities/type/tuple';

type BaseRightInputStreamConnectionMetatype<
  TStreamMetatype extends GenericStreamMetatype,
  TCoreTransformInput,
  TIsCollectionStream extends boolean,
  TIdTuple extends IdTuple,
> = {
  streamMetatype: TStreamMetatype;
  coreTransformInput: TCoreTransformInput;
  isCollectionStream: TIsCollectionStream;
  idTuple: TIdTuple;
  idTupleOption: TIdTuple[number];
};

type RightCoreTransformInputTupleFromIdTuple<
  TStreamMetatype extends GenericStreamMetatype,
  TIdTuple extends IdTuple,
> = {
  readonly [Index in keyof TIdTuple]: TStreamMetatype['indexedItemStreamable'];
};

export type RightInputItemTupleStreamConnectionMetatype<
  TStreamMetatype extends GenericStreamMetatype,
  TIdTuple extends IdTuple,
> = BaseRightInputStreamConnectionMetatype<
  TStreamMetatype,
  RightCoreTransformInputTupleFromIdTuple<TStreamMetatype, TIdTuple>,
  false,
  TIdTuple
>;

export type GenericRightInputItemTupleStreamConnectionMetatype =
  RightInputItemTupleStreamConnectionMetatype<GenericStreamMetatype, IdTuple>;

export type RightInputCollectionStreamConnectionMetatype<
  TStreamMetatype extends GenericStreamMetatype,
> = BaseRightInputStreamConnectionMetatype<
  TStreamMetatype,
  TStreamMetatype['collectionStreamable'],
  true,
  never
>;

/**
 * The type information needed to configure a strongly typed right input stream
 *
 * @readableName RightInputStreamConnectionMetatype
 */
export type RightInputStreamConnectionMetatype<
  TStreamMetatype extends GenericStreamMetatype,
  TIdTuple extends IdTuple = never,
> =
  | RightInputItemTupleStreamConnectionMetatype<TStreamMetatype, TIdTuple>
  | RightInputCollectionStreamConnectionMetatype<TStreamMetatype>;

export type GenericRightInputCollectionStreamConnectionMetatype =
  RightInputCollectionStreamConnectionMetatype<GenericStreamMetatype>;

export type GenericRightInputStreamConnectionMetatype =
  | GenericRightInputItemTupleStreamConnectionMetatype
  | GenericRightInputCollectionStreamConnectionMetatype;

export type GenericRightInputStreamConnectionMetatypeTuple =
  Tuple<GenericRightInputStreamConnectionMetatype>;

export type RightInputStreamConnectionMetatypeTupleCoreTransformInputTuple<
  TRightInputStreamConnectionMetatypeTuple extends GenericRightInputStreamConnectionMetatypeTuple,
> = {
  [Index in keyof TRightInputStreamConnectionMetatypeTuple]: TRightInputStreamConnectionMetatypeTuple[Index]['coreTransformInput'];
};
