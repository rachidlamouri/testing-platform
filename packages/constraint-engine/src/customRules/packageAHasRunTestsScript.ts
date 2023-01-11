import { OnDiskUtf8FileTarget } from '../customTargets/file/utf8File/utf8FileTarget';
import { PackageATarget } from '../customTargets/testingPlatform/packageA/packageATarget';
import { GuardRule } from '../types/rule';

type NarrowedPackageATarget = PackageATarget & {
  runTestsScript: OnDiskUtf8FileTarget;
};

export const packageAHasRunTestsScript: GuardRule<
  PackageATarget,
  NarrowedPackageATarget
> = (target): target is NarrowedPackageATarget => {
  return target.runTestsScript.isOnDisk;
};
