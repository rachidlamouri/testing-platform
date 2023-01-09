import { UnknownTypedTarget } from './typedTarget';
import { UnknownTargetPath } from './targetPath';
import { CustomSet } from '../utils/customSet';

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

export type UnknownTargetReferenceSet = CustomSet<UnknownTargetReference>;
