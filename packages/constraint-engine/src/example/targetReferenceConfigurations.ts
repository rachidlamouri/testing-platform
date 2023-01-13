import { buildDerivedTargetReferenceConfiguration } from '../configurationHelpers/buildDerivedTargetReferenceConfiguration';
import { buildDerivedTargetReferenceSetConfiguration } from '../configurationHelpers/buildDerivedTargetReferenceSetConfiguration';
import {
  buildTestingPlatformPackageDirectoryReferenceSet,
  TestingPlatformPackageDirectoryTargetPath,
} from '../customTargets/testingPlatform/packageDirectory/buildPackageDirectoryReferenceSet';
import {
  buildPackageDirectorySetReference,
  PackageDirectorySetTargetPath,
} from '../customTargets/testingPlatform/packageDirectorySet/buildPackageDirectorySetReference';
import {
  buildPackageAReference,
  TestingPlatformPackageTargetPath,
  TestingPlatformPackageTargetPathTuple,
} from '../customTargets/testingPlatform/packageA/buildPackageAReference';
import { UnknownTargetReferenceConfiguration } from '../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { packageAHasPackageFile } from '../customRules/packageAHasPackagefile';
import { packageAHasTypeScriptConfigFile } from '../customRules/packageAHasTypeScriptConfigFile';
import { packageBHasTestingPlatformConfiguration } from '../customRules/packageBHasTestingPlatformConfiguration';
import { buildNarrowedTargetReferenceConfiguration } from '../configurationHelpers/buildNarrowedTargetReferenceConfiguration';
import { packageAHasRunTestsScript } from '../customRules/packageAHasRunTestsScript';
import { PackageDirectorySetTypedTarget } from '../customTargets/testingPlatform/packageDirectorySet/packageDirectorySetTarget';
import { PackageDirectoryTypedTarget } from '../customTargets/testingPlatform/packageDirectory/packageDirectoryTarget';
import { TargetTypeId } from '../customTargets/testingPlatform/targetTypeIds';
import { PackageATypedTarget } from '../customTargets/testingPlatform/packageA/packageATarget';
import {
  PackageBTarget,
  PackageBTypedTarget,
} from '../customTargets/testingPlatform/packageB/packageBTarget';
import { PackageCTarget } from '../customTargets/testingPlatform/packageC/packageCTarget';
import { buildStaticTargetReferenceConfiguration } from '../configurationHelpers/buildStaticTargetReferenceConfiguration';
import { PackageDirectorySetConfigurationTypedTarget } from '../customTargets/testingPlatform/packageDirectorySet/packageDirectorySetConfigurationTarget';
import { RootTargetPath } from '../types/targetPath';

export const targetReferenceConfigurations = [
  buildStaticTargetReferenceConfiguration<
    RootTargetPath,
    PackageDirectorySetConfigurationTypedTarget,
    PackageDirectorySetTargetPath
  >({
    inputTargetPath: '',
    outputTargetReference: {
      typeId: TargetTypeId.PackageDirectorySetConfiguration,
      instance: { rootDirectoryRelativeToCurrentWorkingDirectory: 'packages' },
      path: 'testingPlatformPackageDirectorySet',
    },
  }),
  buildDerivedTargetReferenceConfiguration<
    PackageDirectorySetConfigurationTypedTarget,
    PackageDirectorySetTargetPath,
    [PackageDirectorySetTypedTarget],
    [PackageDirectorySetTargetPath]
  >({
    buildReference: buildPackageDirectorySetReference,
    inputTargetTypeId: TargetTypeId.PackageDirectorySetConfiguration,
    inputTargetPath: 'testingPlatformPackageDirectorySet',
    outputTargetTypeId: [TargetTypeId.PackageDirectorySet],
    outputTargetPaths: ['testingPlatformPackageDirectorySet'],
  }),
  buildDerivedTargetReferenceSetConfiguration<
    PackageDirectorySetTypedTarget,
    PackageDirectorySetTargetPath,
    PackageDirectoryTypedTarget,
    TestingPlatformPackageDirectoryTargetPath<PackageDirectorySetTargetPath>
  >({
    buildReferenceSet: buildTestingPlatformPackageDirectoryReferenceSet,
    inputTargetTypeId: TargetTypeId.PackageDirectorySet,
    inputTargetPath: 'testingPlatformPackageDirectorySet',
    outputTargetTypeId: TargetTypeId.PackageDirectory,
    outputTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
  }),
  buildDerivedTargetReferenceConfiguration<
    PackageDirectoryTypedTarget,
    TestingPlatformPackageDirectoryTargetPath<PackageDirectorySetTargetPath>,
    [PackageATypedTarget],
    TestingPlatformPackageTargetPathTuple<PackageDirectorySetTargetPath>
  >({
    buildReference: buildPackageAReference,
    inputTargetTypeId: TargetTypeId.PackageDirectory,
    inputTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    outputTargetTypeId: [TargetTypeId.PackageA],
    outputTargetPaths: ['testingPlatformPackageDirectorySet/:directoryName'],
  }),
  buildNarrowedTargetReferenceConfiguration<
    PackageATypedTarget,
    TestingPlatformPackageTargetPath<PackageDirectorySetTargetPath>,
    [
      typeof packageAHasPackageFile,
      typeof packageAHasTypeScriptConfigFile,
      typeof packageAHasRunTestsScript,
    ],
    TargetTypeId.PackageB,
    PackageBTarget
  >({
    inputTargetTypeId: TargetTypeId.PackageA,
    inputTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    conditions: [
      packageAHasPackageFile,
      packageAHasTypeScriptConfigFile,
      packageAHasRunTestsScript,
    ],
    outputTargetTypeId: TargetTypeId.PackageB,
  }),
  buildNarrowedTargetReferenceConfiguration<
    PackageBTypedTarget,
    TestingPlatformPackageTargetPath<PackageDirectorySetTargetPath>,
    [typeof packageBHasTestingPlatformConfiguration],
    TargetTypeId.PackageC,
    PackageCTarget
  >({
    inputTargetTypeId: TargetTypeId.PackageB,
    inputTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    conditions: [packageBHasTestingPlatformConfiguration],
    outputTargetTypeId: TargetTypeId.PackageC,
  }),
] as const satisfies readonly UnknownTargetReferenceConfiguration[];
