import { Simplify, UnionToIntersection } from 'type-fest';
import { GenericVoqueTuple } from '../../engine/voque';

type OutputRecordTuple<TOutputVoqueOptionTuple extends GenericVoqueTuple> = {
  [Index in keyof TOutputVoqueOptionTuple]: {
    [TKey in TOutputVoqueOptionTuple[Index]['gepp']]: TOutputVoqueOptionTuple[Index]['receivedHubblepup'][];
  };
};

type OutputRecordUnion<TOutputVoqueOptionTuple extends GenericVoqueTuple> =
  OutputRecordTuple<TOutputVoqueOptionTuple>[number];

type OutputGeppTuple<TOutputVoqueOptionTuple extends GenericVoqueTuple> = {
  [Index in keyof TOutputVoqueOptionTuple]: TOutputVoqueOptionTuple[Index]['gepp'];
};

export type OutputVicken<TOutputVoqueOptionTuple extends GenericVoqueTuple> = {
  geppTuple: OutputGeppTuple<TOutputVoqueOptionTuple>;
  tropoignantOutput: Simplify<
    UnionToIntersection<OutputRecordUnion<TOutputVoqueOptionTuple>>
  >;
};

export type GenericOutputVicken = OutputVicken<GenericVoqueTuple>;
