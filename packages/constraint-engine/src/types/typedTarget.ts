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
