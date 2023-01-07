import { TestingPlatformPackageATarget } from '../customTargets/testingPlatformPackage/targets';
import { Rule } from '../types/rule';

export const packageAHasTypeScriptConfigFile: Rule<
  TestingPlatformPackageATarget
> = (target) => {
  const { typeScriptConfigFile } = target;
  return typeScriptConfigFile.isOnDisk && typeScriptConfigFile.isParseable;
};
