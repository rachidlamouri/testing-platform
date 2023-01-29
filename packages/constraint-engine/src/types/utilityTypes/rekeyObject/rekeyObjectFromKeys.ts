import { Merge } from '../merge/merge';
import { StringKeys } from '../stringKeys';
import { UnknownObject, UnknownString } from '../unknownHelpers';

export type UnknownKey = UnknownString;

export type ObjectAndNewKeyOptionParameter = {
  Object: UnknownObject;
  NewKeyOption: UnknownKey;
};

export type KeyMapParameter<T extends ObjectAndNewKeyOptionParameter> = {
  KeyMap: Partial<Record<StringKeys<T['Object']>, T['NewKeyOption']>>;
};

export type RekeyObjectFromKeys<
  T1 extends ObjectAndNewKeyOptionParameter,
  T2 extends KeyMapParameter<T1>,
> = Merge<
  Omit<T1['Object'], keyof T2['KeyMap']>,
  {
    [TKey in keyof T2['KeyMap'] as Extract<
      T2['KeyMap'][TKey],
      string
    >]: TKey extends keyof T1['Object'] ? T1['Object'][TKey] : never;
  }
>;
