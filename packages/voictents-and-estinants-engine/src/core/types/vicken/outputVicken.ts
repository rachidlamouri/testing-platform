import { Simplify, UnionToIntersection } from 'type-fest';
import {
  GenericStreamMetatypeTuple,
  UnsafeStreamMetatypeTuple,
} from '../stream-metatype/streamMetatype';

type OutputRecordTuple<
  TOutputVoqueOptionTuple extends GenericStreamMetatypeTuple,
> = {
  [Index in keyof TOutputVoqueOptionTuple]: {
    [TKey in TOutputVoqueOptionTuple[Index]['collectionId']]: TOutputVoqueOptionTuple[Index]['itemEggStreamable'][];
  };
};

type OutputRecordUnion<
  TOutputVoqueOptionTuple extends GenericStreamMetatypeTuple,
> = OutputRecordTuple<TOutputVoqueOptionTuple>[number];

type OutputGeppTuple<
  TOutputVoqueOptionTuple extends GenericStreamMetatypeTuple,
> = {
  [Index in keyof TOutputVoqueOptionTuple]: TOutputVoqueOptionTuple[Index]['collectionId'];
};

/**
 * The type information needed to configure zero or more strongly typed output streams
 *
 * @readableName OutputStreamConnectionGroupMetatype
 *
 * @canonicalDeclaration
 */
export type OutputStreamConnectionMetatype<
  TOutputVoqueOptionTuple extends GenericStreamMetatypeTuple,
> = {
  outputVoqueOptionTuple: TOutputVoqueOptionTuple;
  geppTuple: OutputGeppTuple<TOutputVoqueOptionTuple>;
  tropoignantOutput: Simplify<
    UnionToIntersection<OutputRecordUnion<TOutputVoqueOptionTuple>>
  >;
};

export type GenericOutputVicken =
  OutputStreamConnectionMetatype<GenericStreamMetatypeTuple>;

// TODO: tie this type back to OutputVicken
export type UnsafeOutputVicken = {
  outputVoqueOptionTuple: UnsafeStreamMetatypeTuple;
  geppTuple: OutputGeppTuple<UnsafeStreamMetatypeTuple>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tropoignantOutput: Record<any, any>;
};
