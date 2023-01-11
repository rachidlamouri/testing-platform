import { OnDiskUtf8FileTarget } from '../customTargets/file/utf8FileTarget';
import { TestingPlatformPackageATarget } from '../customTargets/testingPlatform/targets';
import { GuardRule } from '../types/rule';

type NarrowedPackageATarget = TestingPlatformPackageATarget & {
  runTestsScript: OnDiskUtf8FileTarget;
};

export const packageAHasRunTestsScript: GuardRule<
  TestingPlatformPackageATarget,
  NarrowedPackageATarget
> = (target): target is NarrowedPackageATarget => {
  return target.runTestsScript.isOnDisk;
};
