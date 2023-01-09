import { UnknownTypedTarget } from './typedTarget';
import { UnknownTargetPath, UnknownTargetPathTuple } from './targetPath';
import { CustomSet } from '../utils/customSet';

export type TargetReference<
  TTypedTarget extends UnknownTypedTarget,
  TTargetPath extends UnknownTargetPath,
> = {
  typeId: TTypedTarget['typeId'];
  instance: TTypedTarget['instance'];
  path: TTargetPath;
};

export type TargetReferenceTuple<
  TTypedTarget extends UnknownTypedTarget,
  TTargetPathTuple extends UnknownTargetPathTuple,
> = {
  [Index in keyof TTargetPathTuple]: TargetReference<
    TTypedTarget,
    TTargetPathTuple[Index]
  >;
};

export type UnknownTargetReference = TargetReference<
  UnknownTypedTarget,
  UnknownTargetPath
>;

export type UnknownTargetReferenceSet = CustomSet<UnknownTargetReference>;
