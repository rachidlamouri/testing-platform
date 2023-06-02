import { GenericVoque } from '../../../core/engine/voque';
import { Tuple } from '../../../utilities/semantic-types/tuple';
import { OutputVicken as CoreOutputVicken } from '../../../core/engine-shell/vicken/outputVicken';
import { ZornTuple } from '../../../utilities/semantic-types/zorn';

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
    TVoque['indexedEmittedHubblepup'],
    false,
    TVoque['emittedHubblepup']
  >;

export type GenericAdaptedLeftInputHubblepupVicken =
  AdaptedLeftInputHubblepupVicken<GenericVoque>;

type AdaptedLeftInputIndexedHubblepupVicken<TVoque extends GenericVoque> =
  BaseLeftInputVicken<
    TVoque,
    TVoque['indexedEmittedHubblepup'],
    false,
    TVoque['indexedEmittedHubblepup']
  >;

type GenericAdaptedLeftInputIndexedHubblepupVicken =
  AdaptedLeftInputIndexedHubblepupVicken<GenericVoque>;

export type AdaptedLeftInputVoictentVicken<TVoque extends GenericVoque> =
  BaseLeftInputVicken<
    TVoque,
    TVoque['emittedVoictent'],
    true,
    TVoque['emittedVoictent']
  >;

type GenericAdaptedLeftInputVoictentVicken =
  AdaptedLeftInputVoictentVicken<GenericVoque>;

export type GenericAdaptedLeftInputVicken =
  | GenericAdaptedLeftInputHubblepupVicken
  | GenericAdaptedLeftInputIndexedHubblepupVicken
  | GenericAdaptedLeftInputVoictentVicken;

export type AdaptedRightInputHubblepupTupleVicken<
  TRightInputVoque extends GenericVoque,
  TZornTuple extends ZornTuple,
> = {
  voque: TRightInputVoque;
  tropoignantInput: {
    [Index in keyof TZornTuple]: TRightInputVoque['indexedEmittedHubblepup'];
  };
  isWibiz: false;
  pinbetunfInput: {
    [Index in keyof TZornTuple]: TRightInputVoque['emittedHubblepup'];
  };
  zornTuple: TZornTuple;
  zornTupleOption: TZornTuple[number];
};

type GenericAdaptedRightInputHubblepupTupleVicken =
  AdaptedRightInputHubblepupTupleVicken<GenericVoque, ZornTuple>;

export type AdaptedRightInputVoictentVicken<
  TRightInputVoque extends GenericVoque,
> = {
  voque: TRightInputVoque;
  tropoignantInput: TRightInputVoque['emittedVoictent'];
  isWibiz: true;
  pinbetunfInput: TRightInputVoque['emittedVoictent'];
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
