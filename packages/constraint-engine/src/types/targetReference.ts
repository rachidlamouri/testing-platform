import { UnknownTypedTarget } from './typedTarget';
import { UnknownTargetPath } from './targetPath';

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
