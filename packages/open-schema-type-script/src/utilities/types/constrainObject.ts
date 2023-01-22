import { UnknownObject } from './unknownHelpers';

type ConstraintParameter = {
  ConstraintObject: UnknownObject;
};

type ConstrainedParameter<T extends ConstraintParameter> = {
  ConstrainedObject: T['ConstraintObject'];
};

export type ConstrainObject<
  T1 extends ConstraintParameter,
  T2 extends ConstrainedParameter<ConstraintParameter>,
> = Pick<T2['ConstrainedObject'], keyof T1['ConstraintObject']>;
