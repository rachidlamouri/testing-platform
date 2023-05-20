import { GenericVoque } from '../../../core/engine/voque';
import { Tuple } from '../../../utilities/semantic-types/tuple';
import { OutputVicken as CoreOutputVicken } from '../../../core/engine-shell/vicken/outputVicken';

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

export type GenericAdaptedLeftInputVicken =
  GenericAdaptedLeftInputHubblepupVicken;

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
