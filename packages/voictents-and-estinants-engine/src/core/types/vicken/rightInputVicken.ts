import { GenericStreamMetatype } from '../stream-metatype/streamMetatype';
import { IdTuple } from '../../../package-agnostic-utilities/data-structure/id';
import { Tuple } from '../../../package-agnostic-utilities/type/tuple';

type BaseRightInputVicken<
  TVoque extends GenericStreamMetatype,
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
  TVoque extends GenericStreamMetatype,
  TZornTuple extends IdTuple,
> = {
  readonly [Index in keyof TZornTuple]: TVoque['indexedItemStreamable'];
};

export type RightInputHubblepupTupleVicken<
  TVoque extends GenericStreamMetatype,
  TZornTuple extends IdTuple,
> = BaseRightInputVicken<
  TVoque,
  RightTropoignantInputTupleFromZornTuple<TVoque, TZornTuple>,
  false,
  TZornTuple
>;

export type GenericRightInputHubblepupTupleVicken =
  RightInputHubblepupTupleVicken<GenericStreamMetatype, IdTuple>;

export type RightInputVoictentVicken<TVoque extends GenericStreamMetatype> =
  BaseRightInputVicken<TVoque, TVoque['collectionStreamable'], true, never>;

/**
 * The type information needed to configure a strongly typed right input stream
 *
 * @readableName RightInputStreamConnectionMetatype
 */
export type RightInputVicken<
  TVoque extends GenericStreamMetatype,
  TZornTuple extends IdTuple = never,
> =
  | RightInputHubblepupTupleVicken<TVoque, TZornTuple>
  | RightInputVoictentVicken<TVoque>;

export type GenericRightInputVoictentVicken =
  RightInputVoictentVicken<GenericStreamMetatype>;

export type GenericRightInputVicken =
  | GenericRightInputHubblepupTupleVicken
  | GenericRightInputVoictentVicken;

export type GenericRightInputVickenTuple = Tuple<GenericRightInputVicken>;

export type RightInputVickenTupleTropoignantInputTuple<
  TRightInputVickenTuple extends GenericRightInputVickenTuple,
> = {
  [Index in keyof TRightInputVickenTuple]: TRightInputVickenTuple[Index]['tropoignantInput'];
};
