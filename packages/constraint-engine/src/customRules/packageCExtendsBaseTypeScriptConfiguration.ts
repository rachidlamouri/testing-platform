import { errorUtil, assertUtil } from 'mouse-test/type-script/agnostic';
import { ThrowableResult } from 'mouse-test/type-script/agnostic/errorUtils/tryThrowable';
import {
  PackageConfigurationTypeId,
  TestingPlatformPackageCTarget,
} from '../customTargets/testingPlatform/targets';
import { Rule } from '../types/rule';

export const packageCExtendsBaseTypeScriptConfiguration: Rule<
  TestingPlatformPackageCTarget
> = (target) => {
  if (target.directoryName === 'base-tsconfig') {
    return true;
  }

  const { parsedContents } = target.typeScriptConfigFile;

  const packageTypeId =
    target.packageFile.parsedContents.testingPlatformConfiguration.typeId;

  let result: ThrowableResult<void>;

  switch (packageTypeId) {
    case PackageConfigurationTypeId.TestFramework:
      result = errorUtil.tryThrowable(() => {
        assertUtil.isDeepEqual(parsedContents, {
          extends: 'base-tsconfig',
          include: ['type-script/'],
        });
      });
      break;
    case PackageConfigurationTypeId.NonTestFramework:
      result = errorUtil.tryThrowable(() => {
        assertUtil.isDeepEqual(parsedContents, {
          extends: 'base-tsconfig',
          include: ['src/'],
        });
      });
      break;
  }

  return !result.didThrow;
};
