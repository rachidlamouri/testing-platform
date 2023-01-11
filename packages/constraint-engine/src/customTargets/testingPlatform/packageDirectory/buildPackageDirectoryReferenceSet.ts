import { PackageDirectorySetTargetPath } from '../packageDirectorySet/buildPackageDirectorySetReference';
import {
  PrefixedTargetPath,
  UnknownTargetPath,
} from '../../../types/targetPath';
import { TargetReference } from '../../../types/targetReference';
import { DerivedReferenceSetBuilder } from '../../../types/builders/derivedReferenceSetBuilder';
import { PackageDirectorySetTypedTarget } from '../packageDirectorySet/packageDirectorySetTarget';
import { TargetTypeId } from '../targetTypeIds';
import {
  PackageDirectoryTypedTarget,
  PackageDirectoryTarget,
} from './packageDirectoryTarget';

export type TestingPlatformPackageDirectoryTargetPath<
  TPrefix extends UnknownTargetPath,
> = PrefixedTargetPath<TPrefix, ':directoryName'>;

export type TestingPlatformPackageDirectoryTargetReference<
  TPrefix extends UnknownTargetPath,
> = TargetReference<
  PackageDirectoryTypedTarget,
  TestingPlatformPackageDirectoryTargetPath<TPrefix>
>;

export const buildTestingPlatformPackageDirectoryReferenceSet = (<
  TPrefix extends UnknownTargetPath,
>(
  directorySetReference: TargetReference<
    PackageDirectorySetTypedTarget,
    TPrefix
  >,
): TestingPlatformPackageDirectoryTargetReference<TPrefix>[] => {
  const targetReferences: TestingPlatformPackageDirectoryTargetReference<TPrefix>[] =
    directorySetReference.instance.map(
      (
        directoryPath,
        index,
      ): TestingPlatformPackageDirectoryTargetReference<TPrefix> => {
        const instance: PackageDirectoryTarget = {
          directoryPath,
          index,
        };

        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const targetPath: TestingPlatformPackageDirectoryTargetPath<TPrefix> = `${directorySetReference.path}/:directoryName`;

        return {
          typeId: TargetTypeId.PackageDirectory,
          instance,
          path: targetPath,
        };
      },
    );

  return targetReferences;
}) satisfies DerivedReferenceSetBuilder<
  PackageDirectorySetTypedTarget,
  PackageDirectorySetTargetPath,
  PackageDirectoryTypedTarget,
  TestingPlatformPackageDirectoryTargetPath<string>
>;