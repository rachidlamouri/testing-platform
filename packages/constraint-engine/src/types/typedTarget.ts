import { UnknownTargetInstance } from './targetInstance';

export type UnknownTargetTypeId = string;

export type TypedTarget<
  TTargetTypeId extends UnknownTargetTypeId,
  TTargetInstance extends UnknownTargetInstance,
> = {
  typeId: TTargetTypeId;
  instance: TTargetInstance;
};

export type UnknownTypedTarget = TypedTarget<
  UnknownTargetTypeId,
  UnknownTargetInstance
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyTypedTarget = any;
