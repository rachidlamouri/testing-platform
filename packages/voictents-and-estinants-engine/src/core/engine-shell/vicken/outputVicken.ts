import { Simplify, UnionToIntersection } from 'type-fest';
import { GenericVoqueTuple, UnsafeVoqueTuple } from '../../engine/voque';

type OutputRecordTuple<TOutputVoqueOptionTuple extends GenericVoqueTuple> = {
  [Index in keyof TOutputVoqueOptionTuple]: {
    [TKey in TOutputVoqueOptionTuple[Index]['gepp']]: TOutputVoqueOptionTuple[Index]['hubblepupPelue'][];
  };
};

type OutputRecordUnion<TOutputVoqueOptionTuple extends GenericVoqueTuple> =
  OutputRecordTuple<TOutputVoqueOptionTuple>[number];

type OutputGeppTuple<TOutputVoqueOptionTuple extends GenericVoqueTuple> = {
  [Index in keyof TOutputVoqueOptionTuple]: TOutputVoqueOptionTuple[Index]['gepp'];
};

export type OutputVicken<TOutputVoqueOptionTuple extends GenericVoqueTuple> = {
  outputVoqueOptionTuple: TOutputVoqueOptionTuple;
  geppTuple: OutputGeppTuple<TOutputVoqueOptionTuple>;
  tropoignantOutput: Simplify<
    UnionToIntersection<OutputRecordUnion<TOutputVoqueOptionTuple>>
  >;
};

export type GenericOutputVicken = OutputVicken<GenericVoqueTuple>;

// TODO: tie this type back to OutputVicken
export type UnsafeOutputVicken = {
  outputVoqueOptionTuple: UnsafeVoqueTuple;
  geppTuple: OutputGeppTuple<UnsafeVoqueTuple>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tropoignantOutput: Record<any, any>;
};
