import { GenericStreamMetatype } from '../stream-metatype/streamMetatype';

type BaseLeftInputStreamConnectionMetatype<
  TStreamMetatype extends GenericStreamMetatype,
  TCoreTransformInput,
  TIsCollectionStream extends boolean,
> = {
  streamMetatype: TStreamMetatype;
  coreTransformInput: TCoreTransformInput;
  isCollectionStream: TIsCollectionStream;
};

// TODO: rename this to "LeftInputIndexedHubblepupVicken"
export type LeftInputItemStreamConnectionMetatype<
  TStreamMetatype extends GenericStreamMetatype,
> = BaseLeftInputStreamConnectionMetatype<
  TStreamMetatype,
  TStreamMetatype['indexedItemStreamable'],
  false
>;

export type LeftInputCollectionStreamConnectionMetatype<
  TStreamMetatype extends GenericStreamMetatype,
> = BaseLeftInputStreamConnectionMetatype<
  TStreamMetatype,
  TStreamMetatype['collectionStreamable'],
  true
>;

/**
 * The type information needed to configure a strongly typed left input stream
 *
 * @readableName LeftInputStreamConnectionMetatype
 */
export type LeftInputStreamConnectionMetatype<
  TStreamMetatype extends GenericStreamMetatype,
> =
  | LeftInputItemStreamConnectionMetatype<TStreamMetatype>
  | LeftInputCollectionStreamConnectionMetatype<TStreamMetatype>;

export type GenericLeftInputStreamConnectionMetatype =
  LeftInputStreamConnectionMetatype<GenericStreamMetatype>;
