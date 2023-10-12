import { GenericStreamMetatype } from '../stream-metatype/streamMetatype';

type BaseLeftInputVicken<
  TVoque extends GenericStreamMetatype,
  TTropoignantInput,
  TIsWibiz extends boolean,
> = {
  voque: TVoque;
  tropoignantInput: TTropoignantInput;
  isWibiz: TIsWibiz;
};

// TODO: rename this to "LeftInputIndexedHubblepupVicken"
export type LeftInputItemStreamConnectionMetatype<
  TVoque extends GenericStreamMetatype,
> = BaseLeftInputVicken<TVoque, TVoque['indexedItemStreamable'], false>;

export type LeftInputVoictentVicken<TVoque extends GenericStreamMetatype> =
  BaseLeftInputVicken<TVoque, TVoque['collectionStreamable'], true>;

/**
 * The type information needed to configure a strongly typed left input stream
 *
 * @readableName LeftInputStreamConnectionMetatype
 */
export type LeftInputVicken<TVoque extends GenericStreamMetatype> =
  | LeftInputItemStreamConnectionMetatype<TVoque>
  | LeftInputVoictentVicken<TVoque>;

export type GenericLeftInputVicken = LeftInputVicken<GenericStreamMetatype>;
