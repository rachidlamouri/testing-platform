import {
  PackageConfigurationTypeId,
  TestingPlatformPackageBTarget,
  TestingPlatformPackageCTarget,
} from '../customTargets/testingPlatform/targets';
import { GuardRule } from '../types/rule';
import { isObject } from './isObject';

export const packageBHasTestingPlatformConfiguration: GuardRule<
  TestingPlatformPackageBTarget,
  TestingPlatformPackageCTarget
> = (target): target is TestingPlatformPackageCTarget => {
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
