import { TestingPlatformPackageTarget } from '../customTargets/testingPlatformPackage/targets';
import { Rule } from '../types/rule';

export const packageHasTypeScriptConfigFile: Rule<
  TestingPlatformPackageTarget
> = (target) => {
  const { typeScriptConfigFile } = target;
  return typeScriptConfigFile.isOnDisk && typeScriptConfigFile.isParseable;
};
