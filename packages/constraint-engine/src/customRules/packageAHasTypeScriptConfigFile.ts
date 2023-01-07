import { TestingPlatformPackageATarget } from '../customTargets/testingPlatformPackage/targets';
import { Rule } from '../types/rule';
import { isObject } from './isObject';

export const packageAHasTypeScriptConfigFile: Rule<
  TestingPlatformPackageATarget
> = (target) => {
  const { typeScriptConfigFile } = target;
  return (
    typeScriptConfigFile.isOnDisk &&
    typeScriptConfigFile.isParseable &&
    isObject(typeScriptConfigFile.parsedContents)
  );
};
