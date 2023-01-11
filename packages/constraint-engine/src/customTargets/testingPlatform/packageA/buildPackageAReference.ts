import { posix } from 'path';
import { KnownDerivedReferenceBuilder } from '../../../types/builders/derivedReferenceBuilder';
import { UnknownTargetPath } from '../../../types/targetPath';
import { TargetReferenceTuple } from '../../../types/targetReference';
import { buildJsonFileInstance } from '../../file/jsonFile/buildJsonFileInstance';
import { buildUtf8FileInstance } from '../../file/utf8File/buildUtf8FileInstance';
import {
  TestingPlatformPackageDirectoryTargetPath,
  TestingPlatformPackageDirectoryTargetReference,
} from '../packageDirectory/buildPackageDirectoryReferenceSet';
import { PackageDirectoryTypedTarget } from '../packageDirectory/packageDirectoryTarget';
import { TargetTypeId } from '../targetTypeIds';
import { PackageATarget, PackageATypedTarget } from './packageATarget';

export type TestingPlatformPackageTargetPath<
  TPrefix extends UnknownTargetPath,
> = TestingPlatformPackageDirectoryTargetPath<TPrefix>;

export type TestingPlatformPackageTargetPathTuple<
  TPrefix extends UnknownTargetPath,
> = [TestingPlatformPackageTargetPath<TPrefix>];

export const buildPackageAReference = (<TPrefix extends UnknownTargetPath>(
  directoryTargetReference: TestingPlatformPackageDirectoryTargetReference<TPrefix>,
): TargetReferenceTuple<
  PackageATypedTarget,
  [TestingPlatformPackageTargetPath<TPrefix>]
> => {
  const { directoryPath } = directoryTargetReference.instance;

  const directoryName = posix.basename(directoryPath);

  const instance: PackageATarget = {
    directoryName,
    runTestsScript: buildUtf8FileInstance({
      filePath: `${directoryPath}/scripts/runTests.sh`,
    }),
    packageFile: buildJsonFileInstance({
      filePath: `${directoryPath}/package.json`,
    }),
    typeScriptConfigFile: buildJsonFileInstance({
      filePath: `${directoryPath}/tsconfig.json`,
    }),
  };

  return [
    {
      typeId: TargetTypeId.PackageA,
      instance,
      path: directoryTargetReference.path,
    },
  ];
}) satisfies KnownDerivedReferenceBuilder<
  PackageDirectoryTypedTarget,
  TestingPlatformPackageDirectoryTargetPath<UnknownTargetPath>,
  [PackageATypedTarget],
  [TestingPlatformPackageTargetPath<UnknownTargetPath>]
>;
