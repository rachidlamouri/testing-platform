import { errorUtil, assertUtil } from 'mouse-test/type-script/agnostic';
import { ThrowableResult } from 'mouse-test/type-script/agnostic/errorUtils/tryThrowable';
import { ParseableOnDiskJsonFileTarget } from '../customTargets/file/jsonFileTarget';
import { TestingPlatformPackageTarget } from '../customTargets/testingPlatformPackage/targets';
import { Rule } from '../types/rule';
import { packageHasTestingPlatformConfiguration } from './packageHasTestingPlatformConfiguration';

export const packageExtendsBaseTypeScriptConfiguration: Rule<
  TestingPlatformPackageTarget
> = (target) => {
  if (target.directoryName === 'base-tsconfig') {
    return true;
  }

  if (!target.typeScriptConfigFile.isParseable) {
    return true;
  }

  if (!packageHasTestingPlatformConfiguration(target)) {
    return true;
  }

  const { parsedContents } = target.typeScriptConfigFile;

  const packageTypeId = (
    (target.packageFile as ParseableOnDiskJsonFileTarget)
      .parsedContents as Record<
      'testingPlatformConfiguration',
      { typeId: string }
    >
  ).testingPlatformConfiguration.typeId;

  let result: ThrowableResult<void>;

  if (packageTypeId === 'TestFramework') {
    result = errorUtil.tryThrowable(() => {
      assertUtil.isDeepEqual(parsedContents, {
        extends: 'base-tsconfig',
        include: ['type-script/'],
      });
    });
  } else {
    result = errorUtil.tryThrowable(() => {
      assertUtil.isDeepEqual(parsedContents, {
        extends: 'base-tsconfig',
        include: ['src/'],
      });
    });
  }

  return !result.didThrow;
};
