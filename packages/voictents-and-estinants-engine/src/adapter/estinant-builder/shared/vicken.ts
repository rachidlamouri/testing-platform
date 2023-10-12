/**
 * An adapted stream metatype. It contains the type information needed to
 * connect collections and transforms.
 *
 * @noCanonicalDeclaration
 *
 * @readableName AdaptedStreamConnectionMetatype
 *
 * @todo split this file into left, right tuple, and output vicken files
 */

import { GenericStreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import { OutputStreamConnectionMetatype as CoreOutputVicken } from '../../../core/types/vicken/outputVicken';
import { IdTuple } from '../../../package-agnostic-utilities/data-structure/id';

enum AdaptedVickenTypeName {
  Output = 'Output',
}

type BaseLeftInputVicken<
  TVoque extends GenericStreamMetatype,
  TTropoignantInput,
  TIsWibiz extends boolean,
  TPinbetunf,
> = {
  voque: TVoque;
  tropoignantInput: TTropoignantInput;
  isWibiz: TIsWibiz;
  pinbetunfInput: TPinbetunf;
};

export type AdaptedLeftInputHubblepupVicken<
  TVoque extends GenericStreamMetatype,
> = BaseLeftInputVicken<
  TVoque,
  TVoque['indexedItemStreamable'],
  false,
  TVoque['itemStreamable']
>;

export type GenericAdaptedLeftInputHubblepupVicken =
  AdaptedLeftInputHubblepupVicken<GenericStreamMetatype>;

type AdaptedLeftInputIndexedHubblepupVicken<
  TVoque extends GenericStreamMetatype,
> = BaseLeftInputVicken<
  TVoque,
  TVoque['indexedItemStreamable'],
  false,
  TVoque['indexedItemStreamable']
>;

type GenericAdaptedLeftInputIndexedHubblepupVicken =
  AdaptedLeftInputIndexedHubblepupVicken<GenericStreamMetatype>;

export type AdaptedLeftInputVoictentVicken<
  TVoque extends GenericStreamMetatype,
> = BaseLeftInputVicken<
  TVoque,
  TVoque['collectionStreamable'],
  true,
  TVoque['collectionStreamable']
>;

type GenericAdaptedLeftInputVoictentVicken =
  AdaptedLeftInputVoictentVicken<GenericStreamMetatype>;

export type GenericAdaptedLeftInputVicken =
  | GenericAdaptedLeftInputHubblepupVicken
  | GenericAdaptedLeftInputIndexedHubblepupVicken
  | GenericAdaptedLeftInputVoictentVicken;

export type AdaptedRightInputHubblepupTupleVicken<
  TRightInputVoque extends GenericStreamMetatype,
  TZornTuple extends IdTuple,
> = {
  voque: TRightInputVoque;
  tropoignantInput: {
    [Index in keyof TZornTuple]: TRightInputVoque['indexedItemStreamable'];
  };
  isWibiz: false;
  pinbetunfInput: {
    [Index in keyof TZornTuple]: TRightInputVoque['itemStreamable'];
  };
  zornTuple: TZornTuple;
  zornTupleOption: TZornTuple[number];
};

type GenericAdaptedRightInputHubblepupTupleVicken =
  AdaptedRightInputHubblepupTupleVicken<GenericStreamMetatype, IdTuple>;

export type AdaptedRightInputVoictentVicken<
  TRightInputVoque extends GenericStreamMetatype,
> = {
  voque: TRightInputVoque;
  tropoignantInput: TRightInputVoque['collectionStreamable'];
  isWibiz: true;
  pinbetunfInput: TRightInputVoque['collectionStreamable'];
  zornTuple: never;
  zornTupleOption: never;
};

type GenericAdaptedRightInputVoictentVicken =
  AdaptedRightInputVoictentVicken<GenericStreamMetatype>;

type GenericAdaptedRightInputVicken =
  | GenericAdaptedRightInputHubblepupTupleVicken
  | GenericAdaptedRightInputVoictentVicken;

export type GenericAdaptedRightInputVickenTuple =
  Tuple<GenericAdaptedRightInputVicken>;

export type AdaptedOutputVicken<
  TVoque extends GenericStreamMetatype,
  TPinbetunfOutput,
> = {
  typeName: AdaptedVickenTypeName.Output;
  voque: TVoque;
  pinbetunfOutput: TPinbetunfOutput;
};

export type GenericAdaptedOutputVicken = AdaptedOutputVicken<
  GenericStreamMetatype,
  unknown
>;

export type GenericAdaptedOutputVickenTuple = Tuple<GenericAdaptedOutputVicken>;

export type CoreOutputVickenFromAdaptedOutputVickenTuple<
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
> = CoreOutputVicken<{
  [Index in keyof TAdaptedOutputVickenTuple]: TAdaptedOutputVickenTuple[Index]['voque'];
}>;
