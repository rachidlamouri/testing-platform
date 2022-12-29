import { UnknownTargetTypeId, UnknownTypedTarget } from './typedTarget';
import { UnknownTargetPath } from './targetPath';
import { UnknownTargetInstance } from './targetInstance';

export type TargetReference<
  TTypedTarget extends UnknownTypedTarget,
  TTargetPath extends UnknownTargetPath,
> = {
  typeId: TTypedTarget['typeId'];
  instance: TTypedTarget['instance'];
  path: TTargetPath;
};

export type UnknownTargetReference = TargetReference<
  UnknownTypedTarget,
  UnknownTargetPath
>;

export type UnknownNormalizedTargetReference = {
  typeId: UnknownTargetTypeId;
  instance: UnknownTargetInstance;
  instancePath: UnknownTargetPath;
  normalizedPath: UnknownTargetPath;
};
