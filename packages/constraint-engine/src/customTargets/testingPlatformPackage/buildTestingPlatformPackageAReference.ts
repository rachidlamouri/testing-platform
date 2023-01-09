import { posix } from 'path';
import { KnownDerivedReferenceBuilder } from '../../types/builders/derivedReferenceBuilder';
import {
  PrefixedTargetPath,
  UnknownTargetPath,
  UnknownTargetPathTuple,
} from '../../types/targetPath';
import { TargetReferenceTuple } from '../../types/targetReference';
import { buildJsonFileInstance } from '../file/buildJsonFileInstance';
import { TestingPlatformPackageDirectoryTargetReference } from './buildTestingPlatformPackageDirectoryReferenceSet';
import {
  TestingPlatformPackageDirectoryTypedTarget,
  TestingPlatformPackageATarget,
  TestingPlatformPackageATypedTarget,
  TestingPlatformTargetTypeId,
} from './targets';

export type TestingPlatformPackageNormalizedTargetPath<
  TPrefix extends UnknownTargetPath,
> = PrefixedTargetPath<TPrefix, ':directoryName'>;

export type TestingPlatformPackageInstanceTargetPath<
  TPrefix extends UnknownTargetPath,
> = PrefixedTargetPath<TPrefix, string>;

export type TestingPlatformPackageTargetPathTuple<
  TPrefix extends UnknownTargetPath,
> = [
  TestingPlatformPackageNormalizedTargetPath<TPrefix>,
  TestingPlatformPackageInstanceTargetPath<TPrefix>,
];

export type TestingPlatformPackageATargetReferenceTuple<
  TPrefix extends UnknownTargetPath,
> = TargetReferenceTuple<
  TestingPlatformPackageATypedTarget,
  TestingPlatformPackageTargetPathTuple<TPrefix>
>;

export const buildTestingPlatformPackageAReference = (<
  TPrefix extends UnknownTargetPath,
>(
  directoryTargetReference: TestingPlatformPackageDirectoryTargetReference<TPrefix>,
): TestingPlatformPackageATargetReferenceTuple<TPrefix> => {
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

  // TODO: convert this type of path manipulation into a typed helper function
  const normalizedPath = directoryTargetReference.path.replace(
    /\d+$/,
    directoryName,
  ) as TestingPlatformPackageNormalizedTargetPath<TPrefix>;

  const instancePath = directoryTargetReference.path.replace(
    /\d+$/,
    ':directoryName',
  ) as TestingPlatformPackageInstanceTargetPath<TPrefix>;

  return [
    {
      typeId: TestingPlatformTargetTypeId.PackageA,
      instance,
      path: normalizedPath,
    },
    {
      typeId: TestingPlatformTargetTypeId.PackageA,
      instance,
      path: instancePath,
    },
  ];
}) satisfies KnownDerivedReferenceBuilder<
  TestingPlatformPackageDirectoryTypedTarget,
  TestingPlatformPackageInstanceTargetPath<string>,
  [TestingPlatformPackageATypedTarget],
  UnknownTargetPathTuple
>;
