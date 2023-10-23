/**
 * An adapted stream metatype. It contains the type information needed to
 * connect collections and transforms.
 *
 * @noCanonicalDeclaration
 *
 * @readableName StreamConnectionMetatype
 *
 * @todo split this file into left, right tuple, and output stream connection metatype files
 */

import { GenericStreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import { OutputStreamConnectionMetatype as CoreOutputStreamConnectionMetatype } from '../../../core/types/stream-connection-metatype/outputStreamConnectionMetatype';
import { IdTuple } from '../../../package-agnostic-utilities/data-structure/id';

enum AdaptedStreamConnectionMetatypeTypeName {
  Output = 'Output',
}

type BaseLeftInputStreamConnectionMetatype<
  TStreamMetatype extends GenericStreamMetatype,
  TCoreTransformInput,
  TIsCollectionStream extends boolean,
  TAdaptedTransform,
> = {
  streamMetatype: TStreamMetatype;
  coreTransformInput: TCoreTransformInput;
  isCollectionStream: TIsCollectionStream;
  adaptedTransformInput: TAdaptedTransform;
};

export type AdaptedLeftInputItemStreamConnectionMetatype<
  TStreamMetatype extends GenericStreamMetatype,
> = BaseLeftInputStreamConnectionMetatype<
  TStreamMetatype,
  TStreamMetatype['indexedItemStreamable'],
  false,
  TStreamMetatype['itemStreamable']
>;

export type GenericAdaptedLeftInputItemStreamConnectionMetatype =
  AdaptedLeftInputItemStreamConnectionMetatype<GenericStreamMetatype>;

type AdaptedLeftInputIndexedItemStreamConnectionMetatype<
  TStreamMetatype extends GenericStreamMetatype,
> = BaseLeftInputStreamConnectionMetatype<
  TStreamMetatype,
  TStreamMetatype['indexedItemStreamable'],
  false,
  TStreamMetatype['indexedItemStreamable']
>;

type GenericAdaptedLeftInputIndexedItemStreamConnectionMetatype =
  AdaptedLeftInputIndexedItemStreamConnectionMetatype<GenericStreamMetatype>;

export type AdaptedLeftInputCollectionStreamConnectionMetatype<
  TStreamMetatype extends GenericStreamMetatype,
> = BaseLeftInputStreamConnectionMetatype<
  TStreamMetatype,
  TStreamMetatype['collectionStreamable'],
  true,
  TStreamMetatype['collectionStreamable']
>;

type GenericAdaptedLeftInputCollectionStreamConnectionMetatype =
  AdaptedLeftInputCollectionStreamConnectionMetatype<GenericStreamMetatype>;

export type GenericAdaptedLeftInputStreamConnectionMetatype =
  | GenericAdaptedLeftInputItemStreamConnectionMetatype
  | GenericAdaptedLeftInputIndexedItemStreamConnectionMetatype
  | GenericAdaptedLeftInputCollectionStreamConnectionMetatype;

export type AdaptedRightInputItemTupleStreamConnectionMetatype<
  TRightInputStreamMetatype extends GenericStreamMetatype,
  TIdTuple extends IdTuple,
> = {
  streamMetatype: TRightInputStreamMetatype;
  coreTransformInput: {
    [Index in keyof TIdTuple]: TRightInputStreamMetatype['indexedItemStreamable'];
  };
  isCollectionStream: false;
  adaptedTransformInput: {
    [Index in keyof TIdTuple]: TRightInputStreamMetatype['itemStreamable'];
  };
  idTuple: TIdTuple;
  idTupleOption: TIdTuple[number];
};

type GenericAdaptedRightInputItemTupleStreamConnectionMetatype =
  AdaptedRightInputItemTupleStreamConnectionMetatype<
    GenericStreamMetatype,
    IdTuple
  >;

export type AdaptedRightInputCollectionStreamConnectionMetatype<
  TRightInputStreamMetatype extends GenericStreamMetatype,
> = {
  streamMetatype: TRightInputStreamMetatype;
  coreTransformInput: TRightInputStreamMetatype['collectionStreamable'];
  isCollectionStream: true;
  adaptedTransformInput: TRightInputStreamMetatype['collectionStreamable'];
  idTuple: never;
  idTupleOption: never;
};

type GenericAdaptedRightInputCollectionStreamConnectionMetatype =
  AdaptedRightInputCollectionStreamConnectionMetatype<GenericStreamMetatype>;

type GenericAdaptedRightInputStreamConnectionMetatype =
  | GenericAdaptedRightInputItemTupleStreamConnectionMetatype
  | GenericAdaptedRightInputCollectionStreamConnectionMetatype;

export type GenericAdaptedRightInputStreamConnectionMetatypeTuple =
  Tuple<GenericAdaptedRightInputStreamConnectionMetatype>;

export type AdaptedOutputStreamConnectionMetatype<
  TStreamMetatype extends GenericStreamMetatype,
  TAdaptedTransformOutput,
> = {
  typeName: AdaptedStreamConnectionMetatypeTypeName.Output;
  streamMetatype: TStreamMetatype;
  adaptedTransformOutput: TAdaptedTransformOutput;
};

export type GenericAdaptedOutputStreamConnectionMetatype =
  AdaptedOutputStreamConnectionMetatype<GenericStreamMetatype, unknown>;

export type GenericAdaptedOutputStreamConnectionMetatypeTuple =
  Tuple<GenericAdaptedOutputStreamConnectionMetatype>;

export type CoreOutputStreamConnectionMetatypeFromAdaptedOutputStreamConnectionMetatypeTuple<
  TAdaptedOutputStreamConnectionMetatypeTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
> = CoreOutputStreamConnectionMetatype<{
  [Index in keyof TAdaptedOutputStreamConnectionMetatypeTuple]: TAdaptedOutputStreamConnectionMetatypeTuple[Index]['streamMetatype'];
}>;
