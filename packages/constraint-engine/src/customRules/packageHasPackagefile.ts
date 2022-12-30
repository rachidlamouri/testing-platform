import { TestingPlatformPackageTarget } from '../customTargets/testingPlatformPackage/targets';
import { Rule } from '../types/rule';

export const packageHasPackageFile: Rule<TestingPlatformPackageTarget> = (
  target,
) => {
  const { packageFile } = target;
  return packageFile.isOnDisk && packageFile.isParseable;
};