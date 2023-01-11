import { UnknownTargetInstance } from '../targetInstance';

export type InstanceBuilder<
  TInputInstance extends UnknownTargetInstance,
  TOutputTargetInstance extends UnknownTargetInstance,
> = (inputInstance: TInputInstance) => TOutputTargetInstance;
