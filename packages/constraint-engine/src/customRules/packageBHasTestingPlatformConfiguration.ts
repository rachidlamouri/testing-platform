import {
  PackageConfigurationTypeId,
  TestingPlatformPackageBTarget,
} from '../customTargets/testingPlatformPackage/targets';
import { Rule } from '../types/rule';
import { isObject } from './isObject';

export const packageBHasTestingPlatformConfiguration: Rule<
  TestingPlatformPackageBTarget
> = (target) => {
  const packageFileContents = target.packageFile.parsedContents;

  if (!('testingPlatformConfiguration' in packageFileContents)) {
    return false;
  }

  if (!isObject(packageFileContents.testingPlatformConfiguration)) {
    return false;
  }

  const { testingPlatformConfiguration } = packageFileContents;

  const hasValidTypeId =
    'typeId' in testingPlatformConfiguration &&
    typeof testingPlatformConfiguration.typeId === 'string' &&
    Object.values<string>(PackageConfigurationTypeId).includes(
      testingPlatformConfiguration.typeId,
    );

  return hasValidTypeId;
};
