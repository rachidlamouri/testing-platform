import fs from 'fs';
import { KnownDerivedReferenceBuilder } from '../../../types/builders/derivedReferenceBuilder';
import { TargetReference } from '../../../types/targetReference';
import { TargetTypeId } from '../targetTypeIds';
import { PackageDirectorySetConfigurationTypedTarget } from './packageDirectorySetConfigurationTarget';
import {
  PackageDirectorySetTypedTarget,
  PackageDirectorySetTarget,
} from './packageDirectorySetTarget';

export const TESTING_PLATFORM_PACKAGE_DIRECTORY_SET_TARGET_PATH =
  'testingPlatformPackageDirectorySet';

export type PackageDirectorySetTargetPath =
  typeof TESTING_PLATFORM_PACKAGE_DIRECTORY_SET_TARGET_PATH;

export type PackageDirectorySetTargetReference = TargetReference<
  PackageDirectorySetTypedTarget,
  PackageDirectorySetTargetPath
>;

export const buildPackageDirectorySetReference: KnownDerivedReferenceBuilder<
  PackageDirectorySetConfigurationTypedTarget,
  PackageDirectorySetTargetPath,
  [PackageDirectorySetTypedTarget],
  [PackageDirectorySetTargetPath]
> = (inputReference) => {
  const relativeRootDirectory =
    inputReference.instance.rootDirectoryRelativeToCurrentWorkingDirectory;

  const packageDirectoryPaths = fs
    .readdirSync(relativeRootDirectory)
    .map((objectName) => `${relativeRootDirectory}/${objectName}`)
    .filter((objectPath) => fs.statSync(objectPath).isDirectory());

  const instance: PackageDirectorySetTarget = packageDirectoryPaths;

  return [
    {
      typeId: TargetTypeId.PackageDirectorySet,
      instance,
      path: TESTING_PLATFORM_PACKAGE_DIRECTORY_SET_TARGET_PATH,
    },
  ];
};
