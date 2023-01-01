import { UnknownTargetInstance } from '../targetInstance';

export type InstanceBuilder<
  TInputData extends UnknownTargetInstance,
  TOutputTargetInstance extends UnknownTargetInstance,
> = (inputData: TInputData) => TOutputTargetInstance;
