import { ParseableOnDiskJsonFileTarget } from '../customTargets/file/jsonFileTarget';
import {
  ObjectTarget,
  TestingPlatformPackageATarget,
} from '../customTargets/testingPlatformPackage/targets';
import { GuardRule } from '../types/rule';
import { isObject } from './isObject';

type NarrowedPackageATarget = TestingPlatformPackageATarget & {
  packageFile: ParseableOnDiskJsonFileTarget<ObjectTarget>;
};

export const packageAHasPackageFile: GuardRule<
  TestingPlatformPackageATarget,
  NarrowedPackageATarget
> = (target): target is NarrowedPackageATarget => {
  const { packageFile } = target;
  return (
    packageFile.isOnDisk &&
    packageFile.isParseable &&
    isObject(packageFile.parsedContents)
  );
};
