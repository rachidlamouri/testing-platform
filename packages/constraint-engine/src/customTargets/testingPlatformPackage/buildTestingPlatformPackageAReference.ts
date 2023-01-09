import { posix } from 'path';
import { KnownDerivedReferenceBuilder } from '../../types/builders/derivedReferenceBuilder';
import { UnknownTargetPath } from '../../types/targetPath';
import { TargetReferenceTuple } from '../../types/targetReference';
import { buildJsonFileInstance } from '../file/buildJsonFileInstance';
import {
  TestingPlatformPackageDirectoryTargetPath,
  TestingPlatformPackageDirectoryTargetReference,
} from './buildTestingPlatformPackageDirectoryReferenceSet';
import {
  TestingPlatformPackageDirectoryTypedTarget,
  TestingPlatformPackageATarget,
  TestingPlatformPackageATypedTarget,
  TestingPlatformTargetTypeId,
} from './targets';

export type TestingPlatformPackageTargetPath<
  TPrefix extends UnknownTargetPath,
> = TestingPlatformPackageDirectoryTargetPath<TPrefix>;

export type TestingPlatformPackageTargetPathTuple<
  TPrefix extends UnknownTargetPath,
> = [TestingPlatformPackageTargetPath<TPrefix>];

export const buildTestingPlatformPackageAReference = (<
  TPrefix extends UnknownTargetPath,
>(
  directoryTargetReference: TestingPlatformPackageDirectoryTargetReference<TPrefix>,
): TargetReferenceTuple<
  TestingPlatformPackageATypedTarget,
  [TestingPlatformPackageTargetPath<TPrefix>]
> => {
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

  return [
    {
      typeId: TestingPlatformTargetTypeId.PackageA,
      instance,
      path: directoryTargetReference.path,
    },
  ];
}) satisfies KnownDerivedReferenceBuilder<
  TestingPlatformPackageDirectoryTypedTarget,
  TestingPlatformPackageDirectoryTargetPath<UnknownTargetPath>,
  [TestingPlatformPackageATypedTarget],
  [TestingPlatformPackageTargetPath<UnknownTargetPath>]
>;
