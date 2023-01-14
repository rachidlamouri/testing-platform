import { buildDeprecatedDerivedTargetReferenceConfiguration } from '../configurationHelpers/buildDeprecatedDerivedTargetReferenceConfiguration';
import { buildDerivedTargetReferenceSetConfiguration } from '../configurationHelpers/buildDeprecatedDerivedTargetReferenceSetConfiguration';
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
import {
  CiYamlFileContentsConfigurationTypedTarget,
  CiYamlFileTargetPath,
  CI_YAML_FILE_TARGET_PATH,
} from '../customTargets/testingPlatform/ciYamlFile/ciYamlFileContentsConfigurationTarget';
import { ExpectedCiYamlFileContentsTypedTarget } from '../customTargets/testingPlatform/ciYamlFile/expectedCiYamlFileContentsTarget';
import { buildExpectedCiYamlFileContentsReference } from '../customTargets/testingPlatform/ciYamlFile/buildExpectedCiYamlFileContentsReference';
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
    CiYamlFileContentsConfigurationTypedTarget,
    CiYamlFileTargetPath
  >({
    inputTargetPath: '',
    outputTargetReference: {
      typeId: TestingPlatformTargetTypeId.CiYamlFileContentsConfiguration,
      instance: {
        name: 'Continuous Integration',
        on: ['push'],
        jobs: {
          'Continuous-Integration': {
            'runs-on': 'ubuntu-latest',
            steps: {
              beforePackageRunSteps: [
                {
                  name: 'Check Out Code',
                  uses: 'actions/checkout@v3',
                },
                {
                  name: 'Install Node',
                  uses: 'actions/setup-node@v3',
                  with: {
                    'node-version-file': '.nvmrc',
                  },
                },
                {
                  name: 'Install Dependencies',
                  run: 'npm clean-install',
                },
                {
                  name: 'Lint Markdown',
                  run: 'npm run lint:md',
                },
                {
                  name: 'Lint TypeScript',
                  run: 'npm run lint:ts:all',
                },
              ],
              afterPackageRunSteps: [
                {
                  name: 'Lint Constraints',
                  run: 'npm run lint:constraints',
                },
              ],
            },
          },
        },
      },
      path: '.github/workflows/continuous-integration.yml',
    },
  }),
  buildStaticTargetReferenceConfiguration<
    RootTargetPath,
    JsonFileTypedTarget,
    CiYamlFileTargetPath
  >({
    inputTargetPath: '',
    outputTargetReference: {
      typeId: FileTargetTypeId.JsonFile,
      instance: buildJsonFileInstanceFromYaml({
        filePath: CI_YAML_FILE_TARGET_PATH,
      }),
      path: '.github/workflows/continuous-integration.yml',
    },
  }),
  buildDeprecatedDerivedTargetReferenceConfiguration<
    CiYamlFileContentsConfigurationTypedTarget,
    CiYamlFileTargetPath,
    [ExpectedCiYamlFileContentsTypedTarget],
    [CiYamlFileTargetPath]
  >({
    buildReference: buildExpectedCiYamlFileContentsReference,
    inputTargetTypeId:
      TestingPlatformTargetTypeId.CiYamlFileContentsConfiguration,
    inputTargetPath: '.github/workflows/continuous-integration.yml',
    outputTargetTypeId: [
      TestingPlatformTargetTypeId.ExpectedCiYamlFileContentsTarget,
    ],
    outputTargetPaths: ['.github/workflows/continuous-integration.yml'],
  }),
  buildDeprecatedDerivedTargetReferenceConfiguration<
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
  buildDeprecatedDerivedTargetReferenceConfiguration<
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
