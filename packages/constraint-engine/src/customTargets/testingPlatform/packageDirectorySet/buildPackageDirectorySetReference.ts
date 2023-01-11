import fs from 'fs';
import { ReferenceBuilder } from '../../../types/builders/referenceBuilder';
import { TargetReference } from '../../../types/targetReference';
import { TargetTypeId } from '../targetTypeIds';
import {
  PackageDirectorySetTypedTarget,
  PackageDirectorySetTarget,
} from './packageDirectorySetTarget';

export type PackageDirectorySetReferenceBuilderInput = {
  rootDirectoryRelativeToCurrentWorkingDirectory: string;
};

export const TESTING_PLATFORM_PACKAGE_DIRECTORY_SET_TARGET_PATH =
  'testingPlatformPackageDirectorySet';

export type PackageDirectorySetTargetPath =
  typeof TESTING_PLATFORM_PACKAGE_DIRECTORY_SET_TARGET_PATH;

export type PackageDirectorySetTargetReference = TargetReference<
  PackageDirectorySetTypedTarget,
  PackageDirectorySetTargetPath
>;

export const buildPackageDirectorySetReference: ReferenceBuilder<
  PackageDirectorySetReferenceBuilderInput,
  PackageDirectorySetTypedTarget,
  PackageDirectorySetTargetPath
> = ({
  rootDirectoryRelativeToCurrentWorkingDirectory,
}): PackageDirectorySetTargetReference => {
  const relativeRootDirectory = rootDirectoryRelativeToCurrentWorkingDirectory;

  const packageDirectoryPaths = fs
    .readdirSync(rootDirectoryRelativeToCurrentWorkingDirectory)
    .map((objectName) => `${relativeRootDirectory}/${objectName}`)
    .filter((objectPath) => fs.statSync(objectPath).isDirectory());

  const instance: PackageDirectorySetTarget = packageDirectoryPaths;

  return {
    typeId: TargetTypeId.PackageDirectorySet,
    instance,
    path: TESTING_PLATFORM_PACKAGE_DIRECTORY_SET_TARGET_PATH,
  };
};
