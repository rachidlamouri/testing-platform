import { buildDerivedTargetReferenceConfiguration } from '../configurationHelpers/buildDerivedTargetReferenceConfiguration';
import { buildDerivedTargetReferenceSetConfiguration } from '../configurationHelpers/buildDerivedTargetReferenceSetConfiguration';
import { buildRootTargetReferenceConfiguration } from '../configurationHelpers/buildRootTargetReferenceConfiguration';
import {
  buildTestingPlatformPackageDirectoryReferenceSet,
  TestingPlatformPackageDirectoryTargetPath,
} from '../customTargets/testingPlatform/packageDirectory/buildPackageDirectoryReferenceSet';
import {
  buildTestingPlatformPackageDirectorySetReference,
  TestingPlatformPackageDirectorySetReferenceBuilderInput,
  TestingPlatformPackageDirectorySetTargetPath,
} from '../customTargets/testingPlatform/packageDirectorySet/buildPackageDirectorySetReference';
import {
  buildTestingPlatformPackageAReference,
  TestingPlatformPackageTargetPath,
  TestingPlatformPackageTargetPathTuple,
} from '../customTargets/testingPlatform/packageA/buildPackageAReference';
import { UnknownTargetReferenceConfiguration } from '../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { packageAHasPackageFile } from '../customRules/packageAHasPackagefile';
import { packageAHasTypeScriptConfigFile } from '../customRules/packageAHasTypeScriptConfigFile';
import { packageBHasTestingPlatformConfiguration } from '../customRules/packageBHasTestingPlatformConfiguration';
import { buildNarrowedTargetReferenceConfiguration } from '../configurationHelpers/buildNarrowedTargetReferenceConfiguration';
import { packageAHasRunTestsScript } from '../customRules/packageAHasRunTestsScript';
import { TestingPlatformPackageDirectorySetTypedTarget } from '../customTargets/testingPlatform/packageDirectorySet/packageDirectorySetTarget';
import { TestingPlatformPackageDirectoryTypedTarget } from '../customTargets/testingPlatform/packageDirectory/packageDirectoryTarget';
import { TestingPlatformTargetTypeId } from '../customTargets/testingPlatform/targetTypeIds';
import { TestingPlatformPackageATypedTarget } from '../customTargets/testingPlatform/packageA/packageATarget';
import {
  TestingPlatformPackageBTarget,
  TestingPlatformPackageBTypedTarget,
} from '../customTargets/testingPlatform/packageB/packageBTarget';
import { TestingPlatformPackageCTarget } from '../customTargets/testingPlatform/packageC/packageCTarget';

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
    outputTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
  }),
  buildDerivedTargetReferenceConfiguration<
    TestingPlatformPackageDirectoryTypedTarget,
    TestingPlatformPackageDirectoryTargetPath<TestingPlatformPackageDirectorySetTargetPath>,
    [TestingPlatformPackageATypedTarget],
    TestingPlatformPackageTargetPathTuple<TestingPlatformPackageDirectorySetTargetPath>
  >({
    buildReference: buildTestingPlatformPackageAReference,
    inputTargetTypeId: TestingPlatformTargetTypeId.PackageDirectory,
    inputTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    outputTargetTypeId: [TestingPlatformTargetTypeId.PackageA],
    outputTargetPath: ['testingPlatformPackageDirectorySet/:directoryName'],
  }),
  buildNarrowedTargetReferenceConfiguration<
    TestingPlatformPackageATypedTarget,
    TestingPlatformPackageTargetPath<TestingPlatformPackageDirectorySetTargetPath>,
    [
      typeof packageAHasPackageFile,
      typeof packageAHasTypeScriptConfigFile,
      typeof packageAHasRunTestsScript,
    ],
    TestingPlatformTargetTypeId.PackageB,
    TestingPlatformPackageBTarget
  >({
    inputTargetTypeId: TestingPlatformTargetTypeId.PackageA,
    inputTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    conditions: [
      packageAHasPackageFile,
      packageAHasTypeScriptConfigFile,
      packageAHasRunTestsScript,
    ],
    outputTargetTypeId: TestingPlatformTargetTypeId.PackageB,
  }),
  buildNarrowedTargetReferenceConfiguration<
    TestingPlatformPackageBTypedTarget,
    TestingPlatformPackageTargetPath<TestingPlatformPackageDirectorySetTargetPath>,
    [typeof packageBHasTestingPlatformConfiguration],
    TestingPlatformTargetTypeId.PackageC,
    TestingPlatformPackageCTarget
  >({
    inputTargetTypeId: TestingPlatformTargetTypeId.PackageB,
    inputTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    conditions: [packageBHasTestingPlatformConfiguration],
    outputTargetTypeId: TestingPlatformTargetTypeId.PackageC,
  }),
] as const satisfies readonly UnknownTargetReferenceConfiguration[];
