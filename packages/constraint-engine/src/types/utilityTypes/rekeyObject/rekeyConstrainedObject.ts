import { ConstrainObject } from '../constrainObject';
import { SimplifyObject } from '../simplify/simplifyObject';
import { StringKeys } from '../stringKeys';
import { UnknownObject } from '../unknownHelpers';
import { RekeyObjectFromKeys } from './rekeyObjectFromKeys';

type ConstraintObjectsParameter = {
  OldConstraintObject: UnknownObject;
  NewConstraintObject: UnknownObject;
};

type ConstrainedAndKeyMapParameter<T extends ConstraintObjectsParameter> = {
  ConstrainedObject: T['OldConstraintObject'];
  KeyMap: Partial<
    Record<
      StringKeys<T['OldConstraintObject']>,
      StringKeys<T['NewConstraintObject']>
    >
  >;
};

type ConstrainedObjectAndConstrainedNewKeyOptionParameter<
  T1 extends ConstraintObjectsParameter,
  T2 extends ConstrainedAndKeyMapParameter<T1>,
> = {
  Object: ConstrainObject<
    { ConstraintObject: T1['OldConstraintObject'] },
    { ConstrainedObject: T2['ConstrainedObject'] }
  >;
  NewKeyOption: StringKeys<T1['NewConstraintObject']>;
};

type NewConstraintObjectParameter<T1 extends ConstraintObjectsParameter> = {
  ConstraintObject: T1['NewConstraintObject'];
};

type RekeyedConstrainedObjectParameter<
  TConstraintsParameter extends ConstraintObjectsParameter,
  TConstrainedParmeter extends ConstrainedAndKeyMapParameter<TConstraintsParameter>,
> = {
  ConstrainedObject: RekeyObjectFromKeys<
    ConstrainedObjectAndConstrainedNewKeyOptionParameter<
      TConstraintsParameter,
      TConstrainedParmeter
    >,
    TConstrainedParmeter
  >;
};

export type RekeyConstrainedObject<
  TConstraintObjectsParameter extends ConstraintObjectsParameter,
  TConstrainedObjectAndKeyMapParameter extends ConstrainedAndKeyMapParameter<TConstraintObjectsParameter>,
> = SimplifyObject<
  ConstrainObject<
    NewConstraintObjectParameter<TConstraintObjectsParameter>,
    RekeyedConstrainedObjectParameter<
      TConstraintObjectsParameter,
      TConstrainedObjectAndKeyMapParameter
    >
  >
>;
