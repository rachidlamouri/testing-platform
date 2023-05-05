import { GenericVoque } from '../../engine/voque';
import { Gepp } from '../voictent/gepp';

type BaseLeftInputVicken<
  TGepp extends Gepp,
  TTropoignantInput,
  TIsWibiz extends boolean,
> = {
  gepp: TGepp;
  tropoignantInput: TTropoignantInput;
  isWibiz: TIsWibiz;
};

export type LeftInputHubblepupVicken<TVoque extends GenericVoque> =
  BaseLeftInputVicken<TVoque['gepp'], TVoque['indexedEmittedHubblepup'], false>;

export type GenericLeftInputHubblepupVicken =
  LeftInputHubblepupVicken<GenericVoque>;

export type LeftInputVoictentVicken<TVoque extends GenericVoque> =
  BaseLeftInputVicken<TVoque['gepp'], TVoque['emittedVoictent'], true>;

export type GenericLeftInputVoictentVicken =
  LeftInputVoictentVicken<GenericVoque>;

export type GenericLeftInputVicken =
  | GenericLeftInputHubblepupVicken
  | GenericLeftInputVoictentVicken;
