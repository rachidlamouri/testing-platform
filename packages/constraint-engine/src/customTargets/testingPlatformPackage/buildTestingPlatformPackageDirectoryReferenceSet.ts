import {
  TestingPlatformPackageDirectoryTypedTarget,
  TestingPlatformPackageDirectorySetTypedTarget,
  TestingPlatformTargetTypeId,
  TestingPlatformPackageDirectoryTarget,
} from './targets';
import { TestingPlatformPackageDirectorySetTargetPath } from './buildTestingPlatformPackageDirectorySetReference';
import { PrefixedTargetPath, UnknownTargetPath } from '../../types/targetPath';
import { TargetReference } from '../../types/targetReference';
import { DerivedReferenceSetBuilder } from '../../types/builders/derivedReferenceSetBuilder';

export type TestingPlatformPackageDirectoryTargetPath<
  TPrefix extends UnknownTargetPath,
> = PrefixedTargetPath<TPrefix, string>;

export type TestingPlatformPackageDirectoryTargetReference<
  TPrefix extends UnknownTargetPath,
> = TargetReference<
  TestingPlatformPackageDirectoryTypedTarget,
  TestingPlatformPackageDirectoryTargetPath<TPrefix>
>;

export const buildTestingPlatformPackageDirectoryReferenceSet = (<
  TPrefix extends UnknownTargetPath,
>(
  directorySetReference: TargetReference<
    TestingPlatformPackageDirectorySetTypedTarget,
    TPrefix
  >,
): TestingPlatformPackageDirectoryTargetReference<TPrefix>[] => {
  const targetReferences: TestingPlatformPackageDirectoryTargetReference<TPrefix>[] =
    directorySetReference.instance.map(
      (
        directoryPath,
        index,
      ): TestingPlatformPackageDirectoryTargetReference<TPrefix> => {
        const instance: TestingPlatformPackageDirectoryTarget = {
          directoryPath,
          index,
        };

        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const targetPath: TestingPlatformPackageDirectoryTargetPath<TPrefix> = `${directorySetReference.path}/${index}`;

        return {
          typeId: TestingPlatformTargetTypeId.PackageDirectory,
          instance,
          path: targetPath,
        };
      },
    );

  return targetReferences;
}) satisfies DerivedReferenceSetBuilder<
  TestingPlatformPackageDirectorySetTypedTarget,
  TestingPlatformPackageDirectorySetTargetPath,
  TestingPlatformPackageDirectoryTypedTarget,
  TestingPlatformPackageDirectoryTargetPath<string>
>;
