import { GenericVoque } from '../../../core/engine/voque';
import { Tuple } from '../../../utilities/semantic-types/tuple';
import { OutputVicken as CoreOutputVicken } from '../../../core/engine-shell/vicken/outputVicken';
import { ZornTuple } from '../../../utilities/semantic-types/zorn';

export enum AdaptedVickenTypeName {
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

export type AdaptedLeftInputIndexedHubblepupVicken<
  TVoque extends GenericVoque,
> = BaseLeftInputVicken<
  TVoque,
  TVoque['indexedEmittedHubblepup'],
  false,
  TVoque['indexedEmittedHubblepup']
>;

export type GenericAdaptedLeftInputIndexedHubblepupVicken =
  AdaptedLeftInputIndexedHubblepupVicken<GenericVoque>;

export type GenericAdaptedLeftInputVicken =
  | GenericAdaptedLeftInputHubblepupVicken
  | GenericAdaptedLeftInputIndexedHubblepupVicken;

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

export type GenericAdaptedRightInputHubblepupTupleVicken =
  AdaptedRightInputHubblepupTupleVicken<GenericVoque, ZornTuple>;

export type GenericAdaptedRightInputVicken =
  GenericAdaptedRightInputHubblepupTupleVicken;

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
