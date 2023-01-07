import { buildDerivedTargetReferenceConfiguration } from '../configurationHelpers/buildDerivedTargetReferenceConfiguration';
import { buildDerivedTargetReferenceSetConfiguration } from '../configurationHelpers/buildDerivedTargetReferenceSetConfiguration';
import { buildRootTargetReferenceConfiguration } from '../configurationHelpers/buildRootTargetReferenceConfiguration';
import {
  buildTestingPlatformPackageDirectoryReferenceSet,
  TestingPlatformPackageDirectoryTargetPath,
} from '../customTargets/testingPlatformPackage/buildTestingPlatformPackageDirectoryReferenceSet';
import {
  buildTestingPlatformPackageDirectorySetReference,
  TestingPlatformPackageDirectorySetReferenceBuilderInput,
  TestingPlatformPackageDirectorySetTargetPath,
} from '../customTargets/testingPlatformPackage/buildTestingPlatformPackageDirectorySetReference';
import {
  buildTestingPlatformPackageAReference,
  TestingPlatformPackageATargetPath,
} from '../customTargets/testingPlatformPackage/buildTestingPlatformPackageAReference';
import {
  TestingPlatformPackageDirectorySetTypedTarget,
  TestingPlatformPackageDirectoryTypedTarget,
  TestingPlatformPackageATypedTarget,
  TestingPlatformTargetTypeId,
} from '../customTargets/testingPlatformPackage/targets';
import { UnknownTargetReferenceConfiguration } from '../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';

export const targetReferenceConfigurations = [
  buildRootTargetReferenceConfiguration<
    TestingPlatformPackageDirectorySetReferenceBuilderInput,
    TestingPlatformPackageDirectorySetTypedTarget,
    TestingPlatformPackageDirectorySetTargetPath
  >({
    buildReference: buildTestingPlatformPackageDirectorySetReference,
    inputData: { rootDirectoryRelativeToCurrentWorkingDirectory: 'packages' },
    normalizedInputTargetPath: '',
    outputTargetTypeId: TestingPlatformTargetTypeId.PackageDirectorySet,
    normalizedOutputTargetPath: 'testingPlatformPackageDirectorySet',
  }),
  buildDerivedTargetReferenceSetConfiguration<
    TestingPlatformPackageDirectorySetTypedTarget,
    TestingPlatformPackageDirectorySetTargetPath,
    TestingPlatformPackageDirectoryTypedTarget,
    TestingPlatformPackageDirectoryTargetPath<TestingPlatformPackageDirectorySetTargetPath>
  >({
    buildReferenceSet: buildTestingPlatformPackageDirectoryReferenceSet,
    inputTargetTypeId: TestingPlatformTargetTypeId.PackageDirectorySet,
    normalizedInputTargetPath: 'testingPlatformPackageDirectorySet',
    outputTargetTypeId: TestingPlatformTargetTypeId.PackageDirectory,
    normalizedOutputTargetPath: 'testingPlatformPackageDirectorySet/:index',
  }),
  buildDerivedTargetReferenceConfiguration<
    TestingPlatformPackageDirectoryTypedTarget,
    TestingPlatformPackageDirectoryTargetPath<TestingPlatformPackageDirectorySetTargetPath>,
    [TestingPlatformPackageATypedTarget],
    TestingPlatformPackageATargetPath<TestingPlatformPackageDirectorySetTargetPath>
  >({
    buildReference: buildTestingPlatformPackageAReference,
    inputTargetTypeId: TestingPlatformTargetTypeId.PackageDirectory,
    normalizedInputTargetPath: 'testingPlatformPackageDirectorySet/:index',
    outputTargetTypeId: [TestingPlatformTargetTypeId.PackageA],
    normalizedOutputTargetPath:
      'testingPlatformPackageDirectorySet/:directoryName',
  }),
] as const satisfies readonly UnknownTargetReferenceConfiguration[];
