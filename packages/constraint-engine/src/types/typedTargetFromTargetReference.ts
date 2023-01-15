import { TypedTarget } from './typedTarget';
import {
  UnknownTargetReference,
  UnknownTargetReferenceTuple,
} from './targetReference';

export type TypedTargetFromTargetReference<
  TTargetReference extends UnknownTargetReference,
> = TypedTarget<TTargetReference['typeId'], TTargetReference['instance']>;

export type TypedTargetTupleFromTargetReferenceTuple<
  TargetReferenceTuple extends UnknownTargetReferenceTuple,
> = {
  [Index in keyof TargetReferenceTuple]: TypedTargetFromTargetReference<
    TargetReferenceTuple[Index]
  >;
};
