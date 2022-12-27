import { posix } from 'path';
import { DerivedReferenceBuilder } from '../../types/builder';
import { UnknownTargetPath } from '../../types/targetPath';
import { TargetReference } from '../../types/targetReference';
import { buildJsonFileInstance } from '../file/buildJsonFileInstance';
import { TestingPlatformPackageDirectoryTargetReference } from './buildTestingPlatformPackageDirectoryReferenceSet';
import {
  TestingPlatformPackageDirectoryTypedTarget,
  TestingPlatformPackageTarget,
  TestingPlatformPackageTypedTarget,
  TestingPlatformTargetTypeId,
} from './targets';

export type TestingPlatformPackageTargetPath<
  TPrefix extends UnknownTargetPath,
> = `${TPrefix}/${string}`;

export type TestingPlatformPackageTargetReference<
  TTargetPath extends UnknownTargetPath,
> = TargetReference<
  TestingPlatformPackageTypedTarget,
  TestingPlatformPackageTargetPath<TTargetPath>
>;

export const buildTestingPlatformPackageReference = (<
  TPrefix extends UnknownTargetPath,
>(
  directoryTargetReference: TestingPlatformPackageDirectoryTargetReference<TPrefix>,
): TestingPlatformPackageTargetReference<TPrefix> => {
  const { directoryPath } = directoryTargetReference.instance;

  const directoryName = posix.basename(directoryPath);

  const instance: TestingPlatformPackageTarget = {
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
  ) as TestingPlatformPackageTargetPath<TPrefix>;

  return {
    typeId: TestingPlatformTargetTypeId.Package,
    instance,
    path: targetPath,
  };
}) satisfies DerivedReferenceBuilder<
  TestingPlatformPackageDirectoryTypedTarget,
  TestingPlatformPackageTargetPath<string>,
  TestingPlatformPackageTypedTarget,
  UnknownTargetPath
>;
