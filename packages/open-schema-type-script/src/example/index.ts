import { buildBuilderConfiguration } from '../buildBuilderConfiguration';
import { UnknownBuilderConfigurationTuple } from '../builderConfiguration';
import { RootDatumInstanceTypeScriptConfiguration } from '../datumInstanceTypeScriptConfiguration';
import { run } from '../representation-engine/run';
import {
  ActualCiYamlFileTypeScriptConfiguration,
  buildActualCiYamlFileContents,
} from './testingPlatform/ciYamlFile/actualCiYamlFile';
import {
  AssertableCiYamlFileTypeScriptConfiguration,
  buildAssertableCiYamlFileContentsConfiguration,
} from './testingPlatform/ciYamlFile/assertableCiYamlFile';
import {
  buildExpectedCiYamlContents,
  ExpectedCiYamlFileContentsTypeScriptConfiguration,
} from './testingPlatform/ciYamlFile/expectedCiYamlFileContents';
import {
  buildExpectedCiYamlFileContentsConfiguration,
  ExpectedCiYamlFileContentsConfigurationTypeScriptConfiguration,
} from './testingPlatform/ciYamlFile/expectedCiYamlFileContentsConfiguration';
import {
  buildPackageDirectoryNameSet,
  PackageDirectoryNameSetTypeScriptConfiguration,
} from './testingPlatform/packageDirectoryNameSet/packageDirectoryNameSet';
import {
  buildPackageDirectoryNameSetConfiguration,
  PackageDirectoryNameSetConfigurationTypeScriptConfiguration,
} from './testingPlatform/packageDirectoryNameSet/packageDirectoryNameSetConfiguration';

const builderConfigurationCollection = [
  buildBuilderConfiguration<{
    InputCollection: [RootDatumInstanceTypeScriptConfiguration];
    OutputCollection: [
      PackageDirectoryNameSetConfigurationTypeScriptConfiguration,
    ];
  }>({
    buildCollection: buildPackageDirectoryNameSetConfiguration,
    inputCollectionLocatorCollection: [''],
  }),
  buildBuilderConfiguration<{
    InputCollection: [
      PackageDirectoryNameSetConfigurationTypeScriptConfiguration,
    ];
    OutputCollection: [PackageDirectoryNameSetTypeScriptConfiguration];
  }>({
    buildCollection: buildPackageDirectoryNameSet,
    inputCollectionLocatorCollection: [
      'package-directory-name-set-configuration',
    ],
  }),

  buildBuilderConfiguration<{
    InputCollection: [RootDatumInstanceTypeScriptConfiguration];
    OutputCollection: [ActualCiYamlFileTypeScriptConfiguration];
  }>({
    buildCollection: buildActualCiYamlFileContents,
    inputCollectionLocatorCollection: [''],
  }),
  buildBuilderConfiguration<{
    InputCollection: [RootDatumInstanceTypeScriptConfiguration];
    OutputCollection: [
      ExpectedCiYamlFileContentsConfigurationTypeScriptConfiguration,
    ];
  }>({
    buildCollection: buildExpectedCiYamlFileContentsConfiguration,
    inputCollectionLocatorCollection: [''],
  }),
  buildBuilderConfiguration<{
    InputCollection: [
      ExpectedCiYamlFileContentsConfigurationTypeScriptConfiguration,
    ];
    OutputCollection: [ExpectedCiYamlFileContentsTypeScriptConfiguration];
  }>({
    buildCollection: buildExpectedCiYamlContents,
    inputCollectionLocatorCollection: [
      'expected-ci-yaml-file-contents-configuration',
    ],
  }),
  buildBuilderConfiguration<{
    InputCollection: [
      ActualCiYamlFileTypeScriptConfiguration,
      ExpectedCiYamlFileContentsTypeScriptConfiguration,
    ];
    OutputCollection: [AssertableCiYamlFileTypeScriptConfiguration];
  }>({
    buildCollection: buildAssertableCiYamlFileContentsConfiguration,
    inputCollectionLocatorCollection: [
      'actual-ci-yaml-file',
      'expected-ci-yaml-file-contents',
    ],
  }),
] as const satisfies UnknownBuilderConfigurationTuple;

run({
  builderConfigurationCollection,
});
