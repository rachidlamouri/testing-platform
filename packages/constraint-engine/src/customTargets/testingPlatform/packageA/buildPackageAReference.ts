import { posix } from 'path';
import { DeprecatedDerivedReferenceBuilder } from '../../../types/builders/deprecatedDerivedReferenceBuilder';
import { UnknownTargetPath } from '../../../types/targetPath';
import { TargetReferenceTuple } from '../../../types/targetReference';
import { buildJsonFileInstance } from '../../file/jsonFile/buildBuildJsonFileInstance';
import { buildUtf8FileInstance } from '../../file/utf8File/buildUtf8FileInstance';
import {
  TestingPlatformPackageDirectoryTargetPath,
  TestingPlatformPackageDirectoryTargetReference,
} from '../packageDirectory/buildPackageDirectoryReferenceSet';
import { PackageDirectoryTypedTarget } from '../packageDirectory/packageDirectoryTarget';
import { TargetTypeId } from '../targetTypeId';
import { PackageATarget, PackageATypedTarget } from './packageATarget';
import { buildUtf8FileMetadataInstanceSet } from '../../file/utf8File/buildUtf8FileMetdataInstanceSet';
import {
  CategorizedTestFileMetadataTarget,
  fileTypesByExtension,
  SupportedTestFileType,
} from '../categorizedTestFileMetadata';

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
  const testFilePathGlob = `${directoryPath}/**/*.test.{sh,ts}`;

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
    testFileMetadataSet: buildUtf8FileMetadataInstanceSet({
      fileGlob: testFilePathGlob,
    }).map(
      (
        metadata,
      ): CategorizedTestFileMetadataTarget<{
        fileType: SupportedTestFileType | null;
      }> => ({
        ...metadata,
        fileType:
          (fileTypesByExtension[
            posix.extname(metadata.filePath).replace(/\./, '')
          ] as SupportedTestFileType) ?? null,
      }),
    ),
  };

  return [
    {
      typeId: TargetTypeId.PackageA,
      instance,
      path: directoryTargetReference.path,
    },
  ];
}) satisfies DeprecatedDerivedReferenceBuilder<{
  InputTypedTarget: PackageDirectoryTypedTarget;
  InputTargetPath: TestingPlatformPackageDirectoryTargetPath<UnknownTargetPath>;
  OutputTypedTargetOptionsTuple: [PackageATypedTarget];
  OutputTargetPathTuple: [TestingPlatformPackageTargetPath<UnknownTargetPath>];
}>;
