import { TestingPlatformPackageATarget } from '../customTargets/testingPlatformPackage/targets';
import { Rule } from '../types/rule';

export const packageAHasPackageFile: Rule<TestingPlatformPackageATarget> = (
  target,
) => {
  const { packageFile } = target;
  return (
    packageFile.isOnDisk &&
    packageFile.isParseable &&
    typeof packageFile.parsedContents === 'object' &&
    packageFile.parsedContents !== null &&
    !Array.isArray(packageFile.parsedContents)
  );
};
