import { GenericVoque, UnsafeVoque } from '../../engine/voque';

type BaseLeftInputVicken<
  TVoque extends GenericVoque,
  TTropoignantInput,
  TIsWibiz extends boolean,
> = {
  voque: TVoque;
  tropoignantInput: TTropoignantInput;
  isWibiz: TIsWibiz;
};

export type LeftInputHubblepupVicken<TVoque extends GenericVoque> =
  BaseLeftInputVicken<TVoque, TVoque['indexedEmittedHubblepup'], false>;

export type GenericLeftInputHubblepupVicken =
  LeftInputHubblepupVicken<GenericVoque>;

export type UnsafeLeftInputHubblepupVicken =
  LeftInputHubblepupVicken<UnsafeVoque>;

export type LeftInputVoictentVicken<TVoque extends GenericVoque> =
  BaseLeftInputVicken<TVoque, TVoque['emittedVoictent'], true>;

export type GenericLeftInputVoictentVicken =
  LeftInputVoictentVicken<GenericVoque>;

export type UnsafeLeftInputVoictentVicken =
  LeftInputVoictentVicken<UnsafeVoque>;

export type GenericLeftInputVicken =
  | GenericLeftInputHubblepupVicken
  | GenericLeftInputVoictentVicken;

export type UnsafeLeftInputVicken =
  | UnsafeLeftInputHubblepupVicken
  | UnsafeLeftInputVoictentVicken;
