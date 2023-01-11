import { ParseableOnDiskJsonFileTarget } from '../customTargets/file/jsonFile/jsonFileTarget';
import { TestingPlatformPackageATarget } from '../customTargets/testingPlatform/packageA/packageATarget';
import { ObjectTarget } from '../customTargets/type-script/objectTarget';
import { GuardRule } from '../types/rule';
import { isObject } from './isObject';

type NarrowedPackageATarget = TestingPlatformPackageATarget & {
  typeScriptConfigFile: ParseableOnDiskJsonFileTarget<ObjectTarget>;
};

export const packageAHasTypeScriptConfigFile: GuardRule<
  TestingPlatformPackageATarget,
  NarrowedPackageATarget
> = (target): target is NarrowedPackageATarget => {
  const { typeScriptConfigFile } = target;
  return (
    typeScriptConfigFile.isOnDisk &&
    typeScriptConfigFile.isParseable &&
    isObject(typeScriptConfigFile.parsedContents)
  );
};
