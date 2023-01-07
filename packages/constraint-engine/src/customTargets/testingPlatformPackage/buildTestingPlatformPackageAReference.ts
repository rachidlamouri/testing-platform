import { posix } from 'path';
import { KnownDerivedReferenceBuilder } from '../../types/builders/derivedReferenceBuilder';
import { UnknownTargetPath } from '../../types/targetPath';
import { TargetReference } from '../../types/targetReference';
import { buildJsonFileInstance } from '../file/buildJsonFileInstance';
import { TestingPlatformPackageDirectoryTargetReference } from './buildTestingPlatformPackageDirectoryReferenceSet';
import {
  TestingPlatformPackageDirectoryTypedTarget,
  TestingPlatformPackageATarget,
  TestingPlatformPackageATypedTarget,
  TestingPlatformTargetTypeId,
} from './targets';

export type TestingPlatformPackageATargetPath<
  TPrefix extends UnknownTargetPath,
> = `${TPrefix}/${string}`;

export type TestingPlatformPackageATargetReference<
  TTargetPath extends UnknownTargetPath,
> = TargetReference<
  TestingPlatformPackageATypedTarget,
  TestingPlatformPackageATargetPath<TTargetPath>
>;

export const buildTestingPlatformPackageAReference = (<
  TPrefix extends UnknownTargetPath,
>(
  directoryTargetReference: TestingPlatformPackageDirectoryTargetReference<TPrefix>,
): TestingPlatformPackageATargetReference<TPrefix> => {
  const { directoryPath } = directoryTargetReference.instance;

  const directoryName = posix.basename(directoryPath);

  const instance: TestingPlatformPackageATarget = {
    directoryName,
    packageFile: buildJsonFileInstance({
      filePath: `${directoryPath}/package.json`,
    }),
    typeScriptConfigFile: buildJsonFileInstance({
      filePath: `${directoryPath}/tsconfig.json`,
    }),
  };

  const targetPath = directoryTargetReference.path.replace(
    /\d+$/,
    directoryName,
  ) as TestingPlatformPackageATargetPath<TPrefix>;

  return {
    typeId: TestingPlatformTargetTypeId.PackageA,
    instance,
    path: targetPath,
  };
}) satisfies KnownDerivedReferenceBuilder<
  TestingPlatformPackageDirectoryTypedTarget,
  TestingPlatformPackageATargetPath<string>,
  [TestingPlatformPackageATypedTarget],
  UnknownTargetPath
>;
