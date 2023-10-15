import { Simplify, UnionToIntersection } from 'type-fest';
import {
  GenericStreamMetatypeTuple,
  UnsafeStreamMetatypeTuple,
} from '../stream-metatype/streamMetatype';

type OutputRecordTuple<
  TOutputStreamMetatypeOptionTuple extends GenericStreamMetatypeTuple,
> = {
  [Index in keyof TOutputStreamMetatypeOptionTuple]: {
    [TKey in TOutputStreamMetatypeOptionTuple[Index]['collectionId']]: TOutputStreamMetatypeOptionTuple[Index]['itemEggStreamable'][];
  };
};

type OutputRecordUnion<
  TOutputStreamMetatypeOptionTuple extends GenericStreamMetatypeTuple,
> = OutputRecordTuple<TOutputStreamMetatypeOptionTuple>[number];

type OutputCollectionIdTuple<
  TOutputStreamMetatypeOptionTuple extends GenericStreamMetatypeTuple,
> = {
  [Index in keyof TOutputStreamMetatypeOptionTuple]: TOutputStreamMetatypeOptionTuple[Index]['collectionId'];
};

/**
 * The type information needed to configure zero or more strongly typed output streams
 *
 * @readableName OutputStreamConnectionGroupMetatype
 *
 * @canonicalDeclaration
 */
export type OutputStreamConnectionMetatype<
  TOutputStreamMetatypeOptionTuple extends GenericStreamMetatypeTuple,
> = {
  outputStreamMetatypeOptionTuple: TOutputStreamMetatypeOptionTuple;
  collectionIdTuple: OutputCollectionIdTuple<TOutputStreamMetatypeOptionTuple>;
  coreTransformOutput: Simplify<
    UnionToIntersection<OutputRecordUnion<TOutputStreamMetatypeOptionTuple>>
  >;
};

export type GenericOutputStreamConnectionMetatype =
  OutputStreamConnectionMetatype<GenericStreamMetatypeTuple>;

// TODO: tie this type back to OutputVicken
export type UnsafeOutputStreamConnectionMetatype = {
  outputStreamMetatypeOptionTuple: UnsafeStreamMetatypeTuple;
  collectionIdTuple: OutputCollectionIdTuple<UnsafeStreamMetatypeTuple>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coreTransformOutput: Record<any, any>;
};
