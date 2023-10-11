import { GenericVoque } from '../voque/voque';
import { IdTuple } from '../../../package-agnostic-utilities/data-structure/id';
import { Tuple } from '../../../package-agnostic-utilities/type/tuple';

type BaseRightInputVicken<
  TVoque extends GenericVoque,
  TTropoignantInput,
  TIsWibiz extends boolean,
  TZornTuple extends IdTuple,
> = {
  voque: TVoque;
  tropoignantInput: TTropoignantInput;
  isWibiz: TIsWibiz;
  zornTuple: TZornTuple;
  zornTupleOption: TZornTuple[number];
};

type RightTropoignantInputTupleFromZornTuple<
  TVoque extends GenericVoque,
  TZornTuple extends IdTuple,
> = {
  readonly [Index in keyof TZornTuple]: TVoque['indexedHubblepupPelie'];
};

export type RightInputHubblepupTupleVicken<
  TVoque extends GenericVoque,
  TZornTuple extends IdTuple,
> = BaseRightInputVicken<
  TVoque,
  RightTropoignantInputTupleFromZornTuple<TVoque, TZornTuple>,
  false,
  TZornTuple
>;

export type GenericRightInputHubblepupTupleVicken =
  RightInputHubblepupTupleVicken<GenericVoque, IdTuple>;

export type RightInputVoictentVicken<TVoque extends GenericVoque> =
  BaseRightInputVicken<TVoque, TVoque['voictentPelie'], true, never>;

/**
 * The type information needed to configure a strongly typed right input stream
 *
 * @readableName RightInputStreamConnectionMetatype
 */
export type RightInputVicken<
  TVoque extends GenericVoque,
  TZornTuple extends IdTuple = never,
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
