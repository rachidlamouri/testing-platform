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

import { GenericVoque } from '../../../core/types/voque/voque';
import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import { OutputStreamConnectionMetatype as CoreOutputVicken } from '../../../core/types/vicken/outputVicken';
import { IdTuple } from '../../../package-agnostic-utilities/data-structure/id';

enum AdaptedVickenTypeName {
  Output = 'Output',
}

type BaseLeftInputVicken<
  TVoque extends GenericVoque,
  TTropoignantInput,
  TIsWibiz extends boolean,
  TPinbetunf,
> = {
  voque: TVoque;
  tropoignantInput: TTropoignantInput;
  isWibiz: TIsWibiz;
  pinbetunfInput: TPinbetunf;
};

export type AdaptedLeftInputHubblepupVicken<TVoque extends GenericVoque> =
  BaseLeftInputVicken<
    TVoque,
    TVoque['indexedHubblepupPelie'],
    false,
    TVoque['hubblepupPelie']
  >;

export type GenericAdaptedLeftInputHubblepupVicken =
  AdaptedLeftInputHubblepupVicken<GenericVoque>;

type AdaptedLeftInputIndexedHubblepupVicken<TVoque extends GenericVoque> =
  BaseLeftInputVicken<
    TVoque,
    TVoque['indexedHubblepupPelie'],
    false,
    TVoque['indexedHubblepupPelie']
  >;

type GenericAdaptedLeftInputIndexedHubblepupVicken =
  AdaptedLeftInputIndexedHubblepupVicken<GenericVoque>;

export type AdaptedLeftInputVoictentVicken<TVoque extends GenericVoque> =
  BaseLeftInputVicken<
    TVoque,
    TVoque['voictentPelie'],
    true,
    TVoque['voictentPelie']
  >;

type GenericAdaptedLeftInputVoictentVicken =
  AdaptedLeftInputVoictentVicken<GenericVoque>;

export type GenericAdaptedLeftInputVicken =
  | GenericAdaptedLeftInputHubblepupVicken
  | GenericAdaptedLeftInputIndexedHubblepupVicken
  | GenericAdaptedLeftInputVoictentVicken;

export type AdaptedRightInputHubblepupTupleVicken<
  TRightInputVoque extends GenericVoque,
  TZornTuple extends IdTuple,
> = {
  voque: TRightInputVoque;
  tropoignantInput: {
    [Index in keyof TZornTuple]: TRightInputVoque['indexedHubblepupPelie'];
  };
  isWibiz: false;
  pinbetunfInput: {
    [Index in keyof TZornTuple]: TRightInputVoque['hubblepupPelie'];
  };
  zornTuple: TZornTuple;
  zornTupleOption: TZornTuple[number];
};

type GenericAdaptedRightInputHubblepupTupleVicken =
  AdaptedRightInputHubblepupTupleVicken<GenericVoque, IdTuple>;

export type AdaptedRightInputVoictentVicken<
  TRightInputVoque extends GenericVoque,
> = {
  voque: TRightInputVoque;
  tropoignantInput: TRightInputVoque['voictentPelie'];
  isWibiz: true;
  pinbetunfInput: TRightInputVoque['voictentPelie'];
  zornTuple: never;
  zornTupleOption: never;
};

type GenericAdaptedRightInputVoictentVicken =
  AdaptedRightInputVoictentVicken<GenericVoque>;

type GenericAdaptedRightInputVicken =
  | GenericAdaptedRightInputHubblepupTupleVicken
  | GenericAdaptedRightInputVoictentVicken;

export type GenericAdaptedRightInputVickenTuple =
  Tuple<GenericAdaptedRightInputVicken>;

export type AdaptedOutputVicken<
  TVoque extends GenericVoque,
  TPinbetunfOutput,
> = {
  typeName: AdaptedVickenTypeName.Output;
  voque: TVoque;
  pinbetunfOutput: TPinbetunfOutput;
};

export type GenericAdaptedOutputVicken = AdaptedOutputVicken<
  GenericVoque,
  unknown
>;

export type GenericAdaptedOutputVickenTuple = Tuple<GenericAdaptedOutputVicken>;

export type CoreOutputVickenFromAdaptedOutputVickenTuple<
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
> = CoreOutputVicken<{
  [Index in keyof TAdaptedOutputVickenTuple]: TAdaptedOutputVickenTuple[Index]['voque'];
}>;
