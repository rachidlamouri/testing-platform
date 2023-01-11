import fs from 'fs';
import { ReferenceBuilder } from '../../types/builders/referenceBuilder';
import { TargetReference } from '../../types/targetReference';
import {
  TestingPlatformPackageDirectorySetTarget,
  TestingPlatformPackageDirectorySetTypedTarget,
  TestingPlatformTargetTypeId,
} from './targets';

export type TestingPlatformPackageDirectorySetReferenceBuilderInput = {
  rootDirectoryRelativeToCurrentWorkingDirectory: string;
};

export const TESTING_PLATFORM_PACKAGE_DIRECTORY_SET_TARGET_PATH =
  'testingPlatformPackageDirectorySet';

export type TestingPlatformPackageDirectorySetTargetPath =
  typeof TESTING_PLATFORM_PACKAGE_DIRECTORY_SET_TARGET_PATH;

export type TestingPlatformPackageDirectorySetTargetReference = TargetReference<
  TestingPlatformPackageDirectorySetTypedTarget,
  TestingPlatformPackageDirectorySetTargetPath
>;

export const buildTestingPlatformPackageDirectorySetReference: ReferenceBuilder<
  TestingPlatformPackageDirectorySetReferenceBuilderInput,
  TestingPlatformPackageDirectorySetTypedTarget,
  TestingPlatformPackageDirectorySetTargetPath
> = ({
  rootDirectoryRelativeToCurrentWorkingDirectory,
}): TestingPlatformPackageDirectorySetTargetReference => {
  const relativeRootDirectory = rootDirectoryRelativeToCurrentWorkingDirectory;

  const packageDirectoryPaths = fs
    .readdirSync(rootDirectoryRelativeToCurrentWorkingDirectory)
    .map((objectName) => `${relativeRootDirectory}/${objectName}`)
    .filter((objectPath) => fs.statSync(objectPath).isDirectory());

  const instance: TestingPlatformPackageDirectorySetTarget =
    packageDirectoryPaths;

  return {
    typeId: TestingPlatformTargetTypeId.PackageDirectorySet,
    instance,
    path: TESTING_PLATFORM_PACKAGE_DIRECTORY_SET_TARGET_PATH,
  };
};
