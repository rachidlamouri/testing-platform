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

type RightTropoignantInputTupleFromZornTuple<
  TVoque extends GenericVoque,
  TZornTuple extends ZornTuple,
> = {
  readonly [Index in keyof TZornTuple]: TVoque['indexedEmittedHubblepup'];
};

export type RightInputHubblepupTupleVicken<
  TVoque extends GenericVoque,
  TZornTuple extends ZornTuple,
> = BaseRightInputVicken<
  TVoque['gepp'],
  RightTropoignantInputTupleFromZornTuple<TVoque, TZornTuple>,
  false,
  TZornTuple
>;

export type GenericRightInputHubblepupTupleVicken =
  RightInputHubblepupTupleVicken<GenericVoque, ZornTuple>;

export type UnsafeRightInputHubblepupTupleVicken =
  RightInputHubblepupTupleVicken<UnsafeVoque, ZornTuple>;

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
  | GenericRightInputHubblepupTupleVicken
  | GenericRightInputVoictentVicken;

export type UnsafeRightInputVicken =
  | UnsafeRightInputHubblepupTupleVicken
  | UnsafeRightInputVoictentVicken;

export type GenericRightInputVickenTuple = Tuple<GenericRightInputVicken>;

export type UnsafeRightInputVickenTuple = Tuple<UnsafeRightInputVicken>;

export type RightInputVickenTupleTropoignantInputTuple<
  TRightInputVickenTuple extends GenericRightInputVickenTuple,
> = {
  [Index in keyof TRightInputVickenTuple]: TRightInputVickenTuple[Index]['tropoignantInput'];
};
