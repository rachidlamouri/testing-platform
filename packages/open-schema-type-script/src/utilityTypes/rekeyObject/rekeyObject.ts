import { MergePick } from '../merge/mergePick';
import {
  KeyMapParameter,
  ObjectAndNewKeyOptionParameter,
  RekeyObjectFromKeys,
} from './rekeyObjectFromKeys';

type ObjectParameter = Pick<ObjectAndNewKeyOptionParameter, 'Object'>;

type UnknownNewKeyOptionParameter = Pick<
  ObjectAndNewKeyOptionParameter,
  'NewKeyOption'
>;

type ConstrainedObjectAndUnknownNewKeyOptionParameter<
  TObjectParameter extends ObjectParameter,
> = MergePick<
  {
    A: UnknownNewKeyOptionParameter;
    BConstraint: ObjectParameter;
  },
  { B: TObjectParameter }
>;

type UnknownKeyMapParameter<TObjectParameter extends ObjectParameter> =
  KeyMapParameter<
    ConstrainedObjectAndUnknownNewKeyOptionParameter<TObjectParameter>
  >;

export type RekeyObject<
  TObjectParameter extends ObjectParameter,
  TUnknownKeyMapParameter extends UnknownKeyMapParameter<TObjectParameter>,
> = RekeyObjectFromKeys<
  ConstrainedObjectAndUnknownNewKeyOptionParameter<TObjectParameter>,
  TUnknownKeyMapParameter
>;
