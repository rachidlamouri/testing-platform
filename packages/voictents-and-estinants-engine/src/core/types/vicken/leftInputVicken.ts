import { GenericVoque } from '../voque/voque';

type BaseLeftInputVicken<
  TVoque extends GenericVoque,
  TTropoignantInput,
  TIsWibiz extends boolean,
> = {
  voque: TVoque;
  tropoignantInput: TTropoignantInput;
  isWibiz: TIsWibiz;
};

// TODO: rename this to "LeftInputIndexedHubblepupVicken"
export type LeftInputItemStreamConnectionMetatype<TVoque extends GenericVoque> =
  BaseLeftInputVicken<TVoque, TVoque['indexedHubblepupPelie'], false>;

export type LeftInputVoictentVicken<TVoque extends GenericVoque> =
  BaseLeftInputVicken<TVoque, TVoque['voictentPelie'], true>;

/**
 * The type information needed to configure a strongly typed left input stream
 *
 * @readableName LeftInputStreamConnectionMetatype
 */
export type LeftInputVicken<TVoque extends GenericVoque> =
  | LeftInputItemStreamConnectionMetatype<TVoque>
  | LeftInputVoictentVicken<TVoque>;

export type GenericLeftInputVicken = LeftInputVicken<GenericVoque>;
