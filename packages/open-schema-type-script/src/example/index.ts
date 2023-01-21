import assert from 'assert';
import { buildBuilderConfiguration } from '../buildBuilderConfiguration';
import { UnknownBuilderConfigurationTuple } from '../builderConfiguration';
import { RootDatumInstanceTypeScriptConfiguration } from '../datumInstanceTypeScriptConfiguration';
import { representationEngine } from '../representation-engine';
import { validationEngine } from '../validation-engine';
import {
  ActualCiYamlFileTypeScriptConfiguration,
  buildActualCiYamlFileContents,
} from './testingPlatform/ciYamlFile/actualCiYamlFile';
import {
  AssertableCiYamlFile,
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

representationEngine.run({
  builderConfigurationCollection,
  onDatumInstanceConfiguration: (configuration) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    configuration;
    // /* eslint-disable no-console */
    // console.log(`Built ${configuration.instanceIdentifier}`);
    // console.log(JSON.stringify(configuration, null, 2));
    // console.log();
    // /* eslint-enable no-console */
  },
});

validationEngine.run({
  builderConfigurationCollection,
  semanticsConfigurationCollection: [
    {
      semanticsIdentifier: 'example',
      collectionLocator: 'assertable-ci-yaml-file',
      processDatum: (instance: unknown): true => {
        const { actualStringContents, expectedStringContents } =
          instance as AssertableCiYamlFile;

        assert.strictEqual(actualStringContents, expectedStringContents);

        return true;
      },
    },
  ],
});
