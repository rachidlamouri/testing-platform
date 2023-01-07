import { TestingPlatformPackageATarget } from '../customTargets/testingPlatformPackage/targets';
import { Rule } from '../types/rule';
import { isObject } from './isObject';

export const packageAHasPackageFile: Rule<TestingPlatformPackageATarget> = (
  target,
) => {
  const { packageFile } = target;
  return (
    packageFile.isOnDisk &&
    packageFile.isParseable &&
    isObject(packageFile.parsedContents)
  );
};
