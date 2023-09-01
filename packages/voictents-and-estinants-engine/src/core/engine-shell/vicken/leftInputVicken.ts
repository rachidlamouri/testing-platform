import { GenericVoque } from '../../engine/voque';

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
  BaseLeftInputVicken<TVoque, TVoque['indexedEmittedHubblepup'], false>;

export type LeftInputVoictentVicken<TVoque extends GenericVoque> =
  BaseLeftInputVicken<TVoque, TVoque['emittedVoictent'], true>;

export type LeftInputVicken<TVoque extends GenericVoque> =
  | LeftInputHubblepupVicken<TVoque>
  | LeftInputVoictentVicken<TVoque>;

export type GenericLeftInputVicken = LeftInputVicken<GenericVoque>;
