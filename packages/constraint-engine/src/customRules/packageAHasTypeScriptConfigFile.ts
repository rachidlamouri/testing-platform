import { ParseableOnDiskJsonFileTarget } from '../customTargets/file/jsonFile/jsonFileTarget';
import { PackageATarget } from '../customTargets/testingPlatform/packageA/packageATarget';
import { ObjectTarget } from '../customTargets/type-script/objectTarget';
import { GuardRule } from '../types/rule';
import { isObject } from './isObject';

type NarrowedPackageATarget = PackageATarget & {
  typeScriptConfigFile: ParseableOnDiskJsonFileTarget<ObjectTarget>;
};

export const packageAHasTypeScriptConfigFile: GuardRule<
  PackageATarget,
  NarrowedPackageATarget
> = (target): target is NarrowedPackageATarget => {
  const { typeScriptConfigFile } = target;
  return (
    typeScriptConfigFile.isOnDisk &&
    typeScriptConfigFile.isParseable &&
    isObject(typeScriptConfigFile.parsedContents)
  );
};
