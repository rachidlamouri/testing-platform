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
  TestingPlatformPackageBTypedTarget,
  TestingPlatformPackageCTypedTarget,
} from '../customTargets/testingPlatformPackage/targets';
import { UnknownTargetReferenceConfiguration } from '../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { packageAHasPackageFile } from '../customRules/packageAHasPackagefile';
import { packageAHasTypeScriptConfigFile } from '../customRules/packageAHasTypeScriptConfigFile';
import { packageBHasTestingPlatformConfiguration } from '../customRules/packageBHasTestingPlatformConfiguration';
import { buildNarrowedTargetReferenceConfiguration } from '../configurationHelpers/buildNarrowedTargetReferenceConfiguration';

export const targetReferenceConfigurations = [
  buildRootTargetReferenceConfiguration<
    TestingPlatformPackageDirectorySetReferenceBuilderInput,
    TestingPlatformPackageDirectorySetTypedTarget,
    TestingPlatformPackageDirectorySetTargetPath
  >({
    buildReference: buildTestingPlatformPackageDirectorySetReference,
    inputData: { rootDirectoryRelativeToCurrentWorkingDirectory: 'packages' },
    inputTargetPath: '',
    outputTargetTypeId: TestingPlatformTargetTypeId.PackageDirectorySet,
    outputTargetPath: 'testingPlatformPackageDirectorySet',
  }),
  buildDerivedTargetReferenceSetConfiguration<
    TestingPlatformPackageDirectorySetTypedTarget,
    TestingPlatformPackageDirectorySetTargetPath,
    TestingPlatformPackageDirectoryTypedTarget,
    TestingPlatformPackageDirectoryTargetPath<TestingPlatformPackageDirectorySetTargetPath>
  >({
    buildReferenceSet: buildTestingPlatformPackageDirectoryReferenceSet,
    inputTargetTypeId: TestingPlatformTargetTypeId.PackageDirectorySet,
    inputTargetPath: 'testingPlatformPackageDirectorySet',
    outputTargetTypeId: TestingPlatformTargetTypeId.PackageDirectory,
    outputTargetPath: 'testingPlatformPackageDirectorySet/:index',
  }),
  buildDerivedTargetReferenceConfiguration<
    TestingPlatformPackageDirectoryTypedTarget,
    TestingPlatformPackageDirectoryTargetPath<TestingPlatformPackageDirectorySetTargetPath>,
    [TestingPlatformPackageATypedTarget],
    TestingPlatformPackageATargetPath<TestingPlatformPackageDirectorySetTargetPath>
  >({
    buildReference: buildTestingPlatformPackageAReference,
    inputTargetTypeId: TestingPlatformTargetTypeId.PackageDirectory,
    inputTargetPath: 'testingPlatformPackageDirectorySet/:index',
    outputTargetTypeId: [TestingPlatformTargetTypeId.PackageA],
    outputTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
  }),
  buildNarrowedTargetReferenceConfiguration<
    TestingPlatformPackageATypedTarget,
    TestingPlatformPackageATargetPath<TestingPlatformPackageDirectorySetTargetPath>,
    [typeof packageAHasPackageFile, typeof packageAHasTypeScriptConfigFile],
    TestingPlatformPackageBTypedTarget
  >({
    inputTargetTypeId: TestingPlatformTargetTypeId.PackageA,
    inputTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    conditions: [packageAHasPackageFile, packageAHasTypeScriptConfigFile],
    outputTargetTypeId: TestingPlatformTargetTypeId.PackageB,
  }),
  buildNarrowedTargetReferenceConfiguration<
    TestingPlatformPackageBTypedTarget,
    TestingPlatformPackageATargetPath<TestingPlatformPackageDirectorySetTargetPath>,
    [typeof packageBHasTestingPlatformConfiguration],
    TestingPlatformPackageCTypedTarget
  >({
    inputTargetTypeId: TestingPlatformTargetTypeId.PackageB,
    inputTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    conditions: [packageBHasTestingPlatformConfiguration],
    outputTargetTypeId: TestingPlatformTargetTypeId.PackageC,
  }),
] as const satisfies readonly UnknownTargetReferenceConfiguration[];
