import { GenericVoque, UnsafeVoque } from '../../engine/voque';
import { ZornTuple } from '../../../utilities/semantic-types/zorn';
import { Gepp } from '../voictent/gepp';
import { Tuple } from '../../../utilities/semantic-types/tuple';

type BaseRightInputVicken<
  TGepp extends Gepp,
  TTropoignantInput,
  TIsWibiz extends boolean,
  TZornTuple extends ZornTuple,
> = {
  gepp: TGepp;
  tropoignantInput: TTropoignantInput;
  isWibiz: TIsWibiz;
  zornTuple: TZornTuple;
  zornTupleOption: TZornTuple[number];
};

export type RightInputHubblepupVicken<
  TVoque extends GenericVoque,
  TZornTuple extends ZornTuple,
> = BaseRightInputVicken<
  TVoque['gepp'],
  TVoque['indexedEmittedHubblepup'],
  false,
  TZornTuple
>;

export type GenericRightInputHubblepupVicken = RightInputHubblepupVicken<
  GenericVoque,
  ZornTuple
>;

export type UnsafeRightInputHubblepupVicken = RightInputHubblepupVicken<
  UnsafeVoque,
  ZornTuple
>;

export type RightInputVoictentVicken<TVoque extends GenericVoque> =
  BaseRightInputVicken<
    TVoque['gepp'],
    TVoque['indexedEmittedHubblepup'],
    true,
    never
  >;

export type GenericRightInputVoictentVicken =
  RightInputVoictentVicken<GenericVoque>;

export type UnsafeRightInputVoictentVicken =
  RightInputVoictentVicken<UnsafeVoque>;

export type GenericRightInputVicken =
  | GenericRightInputHubblepupVicken
  | GenericRightInputVoictentVicken;

export type UnsafeRightInputVicken =
  | UnsafeRightInputHubblepupVicken
  | UnsafeRightInputVoictentVicken;

export type GenericRightInputVickenTuple = Tuple<GenericRightInputVicken>;

export type UnsafeRightInputVickenTuple = Tuple<UnsafeRightInputVicken>;

export type RightInputVickenTupleTropoignantInputTuple<
  TRightInputVickenTuple extends GenericRightInputVickenTuple,
> = {
  [Index in keyof TRightInputVickenTuple]: TRightInputVickenTuple[Index]['tropoignantInput'];
};
