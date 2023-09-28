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
export type LeftInputHubblepupVicken<TVoque extends GenericVoque> =
  BaseLeftInputVicken<TVoque, TVoque['indexedHubblepupPelie'], false>;

export type LeftInputVoictentVicken<TVoque extends GenericVoque> =
  BaseLeftInputVicken<TVoque, TVoque['voictentPelie'], true>;

export type LeftInputVicken<TVoque extends GenericVoque> =
  | LeftInputHubblepupVicken<TVoque>
  | LeftInputVoictentVicken<TVoque>;

export type GenericLeftInputVicken = LeftInputVicken<GenericVoque>;
