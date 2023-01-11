import { ParseableOnDiskJsonFileTarget } from '../customTargets/file/jsonFile/jsonFileTarget';
import { PackageATarget } from '../customTargets/testingPlatform/packageA/packageATarget';
import { ObjectTarget } from '../customTargets/type-script/objectTarget';
import { GuardRule } from '../types/rule';
import { isObject } from './isObject';

type NarrowedPackageATarget = PackageATarget & {
  packageFile: ParseableOnDiskJsonFileTarget<ObjectTarget>;
};

export const packageAHasPackageFile: GuardRule<
  PackageATarget,
  NarrowedPackageATarget
> = (target): target is NarrowedPackageATarget => {
  const { packageFile } = target;
  return (
    packageFile.isOnDisk &&
    packageFile.isParseable &&
    isObject(packageFile.parsedContents)
  );
};
