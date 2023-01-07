import { ParseableOnDiskJsonFileTarget } from '../customTargets/file/jsonFileTarget';
import {
  ObjectTarget,
  TestingPlatformPackageATarget,
} from '../customTargets/testingPlatformPackage/targets';
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
