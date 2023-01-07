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
import { buildTestingPlatformPackageBReference } from '../customTargets/testingPlatformPackage/buildTestingPlatformPackageBReference';
import { packageAHasPackageFile } from '../customRules/packageAHasPackagefile';
import { packageAHasTypeScriptConfigFile } from '../customRules/packageAHasTypeScriptConfigFile';
import { buildTestingPlatformPackageCReference } from '../customTargets/testingPlatformPackage/buildTestingPlatformPackageC';
import { packageBExtendsBaseTypeScriptConfiguration } from '../customRules/packageBExtendsBaseTypeScriptConfiguration';
import { packageBHasTestingPlatformConfiguration } from '../customRules/packageBHasTestingPlatformConfiguration';

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
  buildDerivedTargetReferenceConfiguration<
    TestingPlatformPackageATypedTarget,
    TestingPlatformPackageATargetPath<TestingPlatformPackageDirectorySetTargetPath>,
    [TestingPlatformPackageBTypedTarget],
    TestingPlatformPackageATargetPath<TestingPlatformPackageDirectorySetTargetPath>
  >({
    buildReference: buildTestingPlatformPackageBReference,
    inputTargetTypeId: TestingPlatformTargetTypeId.PackageA,
    normalizedInputTargetPath:
      'testingPlatformPackageDirectorySet/:directoryName',
    outputTargetTypeId: [TestingPlatformTargetTypeId.PackageB],
    normalizedOutputTargetPath:
      'testingPlatformPackageDirectorySet/:directoryName',
    conditions: [packageAHasPackageFile, packageAHasTypeScriptConfigFile],
  }),
  buildDerivedTargetReferenceConfiguration<
    TestingPlatformPackageBTypedTarget,
    TestingPlatformPackageATargetPath<TestingPlatformPackageDirectorySetTargetPath>,
    [TestingPlatformPackageCTypedTarget],
    TestingPlatformPackageATargetPath<TestingPlatformPackageDirectorySetTargetPath>
  >({
    buildReference: buildTestingPlatformPackageCReference,
    inputTargetTypeId: TestingPlatformTargetTypeId.PackageB,
    normalizedInputTargetPath:
      'testingPlatformPackageDirectorySet/:directoryName',
    outputTargetTypeId: [TestingPlatformTargetTypeId.PackageC],
    normalizedOutputTargetPath:
      'testingPlatformPackageDirectorySet/:directoryName',
    conditions: [
      packageBHasTestingPlatformConfiguration,
      packageBExtendsBaseTypeScriptConfiguration,
    ],
  }),
] as const satisfies readonly UnknownTargetReferenceConfiguration[];
