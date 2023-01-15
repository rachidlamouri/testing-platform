import { ConstrainObject } from '../constrainObject';
import { UnknownObject } from '../unknownHelpers';
import { Merge } from './merge';

type MergePickParameterA = {
  A: UnknownObject;
  BConstraint: UnknownObject;
};

type MergePickParameterB<T extends MergePickParameterA> = {
  B: T['BConstraint'];
};

export type MergePick<
  T1 extends MergePickParameterA,
  T2 extends MergePickParameterB<MergePickParameterA>,
> = Merge<
  T1['A'],
  ConstrainObject<
    {
      ConstraintObject: T1['BConstraint'];
    },
    { ConstrainedObject: T2['B'] }
  >
>;
