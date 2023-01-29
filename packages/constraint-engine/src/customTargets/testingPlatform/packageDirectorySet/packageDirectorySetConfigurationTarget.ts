import { TypedTarget } from '../../../types/typedTarget';
import { TargetTypeId } from '../targetTypeId';

export type PackageDirectorySetConfigurationTarget = {
  rootDirectoryRelativeToCurrentWorkingDirectory: string;
};

export type PackageDirectorySetConfigurationTypedTarget = TypedTarget<
  TargetTypeId.PackageDirectorySetConfiguration,
  PackageDirectorySetConfigurationTarget
>;
