import { GenericVoque } from '../voque/voque';
import { ZornTuple } from '../../../package-agnostic-utilities/datastructure/zorn';
import { Tuple } from '../../../package-agnostic-utilities/type/tuple';

type BaseRightInputVicken<
  TVoque extends GenericVoque,
  TTropoignantInput,
  TIsWibiz extends boolean,
  TZornTuple extends ZornTuple,
> = {
  voque: TVoque;
  tropoignantInput: TTropoignantInput;
  isWibiz: TIsWibiz;
  zornTuple: TZornTuple;
  zornTupleOption: TZornTuple[number];
};

type RightTropoignantInputTupleFromZornTuple<
  TVoque extends GenericVoque,
  TZornTuple extends ZornTuple,
> = {
  readonly [Index in keyof TZornTuple]: TVoque['indexedHubblepupPelie'];
};

export type RightInputHubblepupTupleVicken<
  TVoque extends GenericVoque,
  TZornTuple extends ZornTuple,
> = BaseRightInputVicken<
  TVoque,
  RightTropoignantInputTupleFromZornTuple<TVoque, TZornTuple>,
  false,
  TZornTuple
>;

export type GenericRightInputHubblepupTupleVicken =
  RightInputHubblepupTupleVicken<GenericVoque, ZornTuple>;

export type RightInputVoictentVicken<TVoque extends GenericVoque> =
  BaseRightInputVicken<TVoque, TVoque['voictentPelie'], true, never>;

/**
 * The type information needed to configure a strongly typed right input stream
 */
export type RightInputVicken<
  TVoque extends GenericVoque,
  TZornTuple extends ZornTuple = never,
> =
  | RightInputHubblepupTupleVicken<TVoque, TZornTuple>
  | RightInputVoictentVicken<TVoque>;

export type GenericRightInputVoictentVicken =
  RightInputVoictentVicken<GenericVoque>;

export type GenericRightInputVicken =
  | GenericRightInputHubblepupTupleVicken
  | GenericRightInputVoictentVicken;

export type GenericRightInputVickenTuple = Tuple<GenericRightInputVicken>;

export type RightInputVickenTupleTropoignantInputTuple<
  TRightInputVickenTuple extends GenericRightInputVickenTuple,
> = {
  [Index in keyof TRightInputVickenTuple]: TRightInputVickenTuple[Index]['tropoignantInput'];
};
