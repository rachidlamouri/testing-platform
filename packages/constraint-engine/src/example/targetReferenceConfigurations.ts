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
import { TargetTypeId as TestingPlatformTargetTypeId } from '../customTargets/testingPlatform/targetTypeIds';
import { PackageATypedTarget } from '../customTargets/testingPlatform/packageA/packageATarget';
import {
  PackageBTarget,
  PackageBTypedTarget,
} from '../customTargets/testingPlatform/packageB/packageBTarget';
import { PackageCTarget } from '../customTargets/testingPlatform/packageC/packageCTarget';
import { buildStaticTargetReferenceConfiguration } from '../configurationHelpers/buildStaticTargetReferenceConfiguration';
import { PackageDirectorySetConfigurationTypedTarget } from '../customTargets/testingPlatform/packageDirectorySet/packageDirectorySetConfigurationTarget';
import { RootTargetPath } from '../types/targetPath';
import { JsonFileTypedTarget } from '../customTargets/file/jsonFile/jsonFileTarget';
import { buildJsonFileInstanceFromYaml } from '../customTargets/file/jsonFile/buildBuildJsonFileInstance';
import { TargetTypeId as FileTargetTypeId } from '../customTargets/file/targetTypeIds';
import { packageAHasKnownTestFileTypes } from '../customRules/packageAHasKnownTestFileTypes';

export const targetReferenceConfigurations = [
  buildStaticTargetReferenceConfiguration<
    RootTargetPath,
    PackageDirectorySetConfigurationTypedTarget,
    PackageDirectorySetTargetPath
  >({
    inputTargetPath: '',
    outputTargetReference: {
      typeId: TestingPlatformTargetTypeId.PackageDirectorySetConfiguration,
      instance: { rootDirectoryRelativeToCurrentWorkingDirectory: 'packages' },
      path: 'testingPlatformPackageDirectorySet',
    },
  }),
  buildStaticTargetReferenceConfiguration<
    RootTargetPath,
    JsonFileTypedTarget,
    '.github/workflows/continuous-integration.yml'
  >({
    inputTargetPath: '',
    outputTargetReference: {
      typeId: FileTargetTypeId.JsonFile,
      instance: buildJsonFileInstanceFromYaml({
        filePath: '.github/workflows/continuous-integration.yml',
      }),
      path: '.github/workflows/continuous-integration.yml',
    },
  }),
  buildDerivedTargetReferenceConfiguration<
    PackageDirectorySetConfigurationTypedTarget,
    PackageDirectorySetTargetPath,
    [PackageDirectorySetTypedTarget],
    [PackageDirectorySetTargetPath]
  >({
    buildReference: buildPackageDirectorySetReference,
    inputTargetTypeId:
      TestingPlatformTargetTypeId.PackageDirectorySetConfiguration,
    inputTargetPath: 'testingPlatformPackageDirectorySet',
    outputTargetTypeId: [TestingPlatformTargetTypeId.PackageDirectorySet],
    outputTargetPaths: ['testingPlatformPackageDirectorySet'],
  }),
  buildDerivedTargetReferenceSetConfiguration<
    PackageDirectorySetTypedTarget,
    PackageDirectorySetTargetPath,
    PackageDirectoryTypedTarget,
    TestingPlatformPackageDirectoryTargetPath<PackageDirectorySetTargetPath>
  >({
    buildReferenceSet: buildTestingPlatformPackageDirectoryReferenceSet,
    inputTargetTypeId: TestingPlatformTargetTypeId.PackageDirectorySet,
    inputTargetPath: 'testingPlatformPackageDirectorySet',
    outputTargetTypeId: TestingPlatformTargetTypeId.PackageDirectory,
    outputTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
  }),
  buildDerivedTargetReferenceConfiguration<
    PackageDirectoryTypedTarget,
    TestingPlatformPackageDirectoryTargetPath<PackageDirectorySetTargetPath>,
    [PackageATypedTarget],
    TestingPlatformPackageTargetPathTuple<PackageDirectorySetTargetPath>
  >({
    buildReference: buildPackageAReference,
    inputTargetTypeId: TestingPlatformTargetTypeId.PackageDirectory,
    inputTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    outputTargetTypeId: [TestingPlatformTargetTypeId.PackageA],
    outputTargetPaths: ['testingPlatformPackageDirectorySet/:directoryName'],
  }),
  buildNarrowedTargetReferenceConfiguration<
    PackageATypedTarget,
    TestingPlatformPackageTargetPath<PackageDirectorySetTargetPath>,
    [
      typeof packageAHasPackageFile,
      typeof packageAHasTypeScriptConfigFile,
      typeof packageAHasRunTestsScript,
      typeof packageAHasKnownTestFileTypes,
    ],
    TestingPlatformTargetTypeId.PackageB,
    PackageBTarget
  >({
    inputTargetTypeId: TestingPlatformTargetTypeId.PackageA,
    inputTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    conditions: [
      packageAHasPackageFile,
      packageAHasTypeScriptConfigFile,
      packageAHasRunTestsScript,
      packageAHasKnownTestFileTypes,
    ],
    outputTargetTypeId: TestingPlatformTargetTypeId.PackageB,
  }),
  buildNarrowedTargetReferenceConfiguration<
    PackageBTypedTarget,
    TestingPlatformPackageTargetPath<PackageDirectorySetTargetPath>,
    [typeof packageBHasTestingPlatformConfiguration],
    TestingPlatformTargetTypeId.PackageC,
    PackageCTarget
  >({
    inputTargetTypeId: TestingPlatformTargetTypeId.PackageB,
    inputTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    conditions: [packageBHasTestingPlatformConfiguration],
    outputTargetTypeId: TestingPlatformTargetTypeId.PackageC,
  }),
] as const satisfies readonly UnknownTargetReferenceConfiguration[];
