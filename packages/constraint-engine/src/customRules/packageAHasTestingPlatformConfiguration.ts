import { ParseableOnDiskJsonFileTarget } from '../customTargets/file/jsonFileTarget';
import { TestingPlatformPackageATarget } from '../customTargets/testingPlatformPackage/targets';
import { Rule } from '../types/rule';

export const packageAHasTestingPlatformConfiguration: Rule<
  TestingPlatformPackageATarget
> = (target) => {
  const packageFile = (target.packageFile as ParseableOnDiskJsonFileTarget)
    .parsedContents as Record<string, unknown>;

  if (!('testingPlatformConfiguration' in packageFile)) {
    return false;
  }

  if (
    typeof packageFile.testingPlatformConfiguration !== 'object' ||
    packageFile.testingPlatformConfiguration === null
  ) {
    return false;
  }

  const { testingPlatformConfiguration } = packageFile;

  const hasValidTypeId =
    'typeId' in testingPlatformConfiguration &&
    typeof testingPlatformConfiguration.typeId === 'string' &&
    ['TestFramework', 'NonTestFramework'].includes(
      testingPlatformConfiguration.typeId,
    );

  return hasValidTypeId;
};
