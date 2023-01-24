import assert from 'assert';
import { buildBuilderConfiguration } from '../type-script/buildBuilderConfiguration';
import { UnknownBuilderConfigurationTuple } from '../core/builderConfiguration';
import { representationEngine } from '../core/representation-engine';
import { validationEngine } from '../core/validation-engine';
import {
  ActualCiYamlFileTypeScriptConfiguration,
  buildActualCiYamlFileContents,
} from './datum-instance-type-script-configuration-definitions/testingPlatform/ciYamlFile/actualCiYamlFile';
import {
  AssertableCiYamlFile,
  AssertableCiYamlFileTypeScriptConfiguration,
  buildAssertableCiYamlFileContentsConfiguration,
} from './datum-instance-type-script-configuration-definitions/testingPlatform/ciYamlFile/assertableCiYamlFile';
import {
  buildExpectedCiYamlContents,
  ExpectedCiYamlFileContentsTypeScriptConfiguration,
} from './datum-instance-type-script-configuration-definitions/testingPlatform/ciYamlFile/expectedCiYamlFileContents';
import {
  buildExpectedCiYamlFileContentsConfiguration,
  ExpectedCiYamlFileContentsConfigurationTypeScriptConfiguration,
} from './datum-instance-type-script-configuration-definitions/testingPlatform/ciYamlFile/expectedCiYamlFileContentsConfiguration';
import {
  buildPackageDirectoryNameSet,
  PackageDirectoryNameSetTypeScriptConfiguration,
} from './datum-instance-type-script-configuration-definitions/testingPlatform/packageDirectory/packageDirectoryASet';
import {
  buildPackageDirectoryNameSetConfiguration,
  PackageDirectoryNameSetConfigurationTypeScriptConfiguration,
} from './datum-instance-type-script-configuration-definitions/testingPlatform/packageDirectory/packageDirectoryASetConfiguration';
import {
  buildFileATuple,
  FileATypeScriptConfiguration,
} from './datum-instance-type-script-configuration-definitions/testingPlatform/file/fileA';
import { TypeScriptSemanticsIdentifier as TestingPlatformSemanticsIds } from './datum-instance-type-script-configuration-definitions/testingPlatform/typeScriptSemanticsIdentifier';
// import {
//   buildTypeScriptFile,
//   TypeScriptFileTypeScriptConfiguration,
// } from './datum-instance-type-script-configuration-definitions/testingPlatform/file/typeScriptFile';

const builderConfigurationCollection = [
  buildBuilderConfiguration<{
    InputCollection: [];
    OutputCollection: [
      PackageDirectoryNameSetConfigurationTypeScriptConfiguration,
    ];
  }>({
    buildCollection: buildPackageDirectoryNameSetConfiguration,
    inputPredicateLocatorTuple: [],
  }),
  buildBuilderConfiguration<{
    InputCollection: [
      PackageDirectoryNameSetConfigurationTypeScriptConfiguration,
    ];
    OutputCollection: [PackageDirectoryNameSetTypeScriptConfiguration];
  }>({
    buildCollection: buildPackageDirectoryNameSet,
    inputPredicateLocatorTuple: [
      {
        instanceIdentifier: 'package-directory-name-set-configuration',
        predicateIdentifiers: [
          TestingPlatformSemanticsIds.PackageDirectoryNameSetConfiguration,
        ],
      },
    ],
  }),

  buildBuilderConfiguration<{
    InputCollection: [];
    OutputCollection: [ActualCiYamlFileTypeScriptConfiguration];
  }>({
    buildCollection: buildActualCiYamlFileContents,
    inputPredicateLocatorTuple: [],
  }),
  buildBuilderConfiguration<{
    InputCollection: [];
    OutputCollection: [
      ExpectedCiYamlFileContentsConfigurationTypeScriptConfiguration,
    ];
  }>({
    buildCollection: buildExpectedCiYamlFileContentsConfiguration,
    inputPredicateLocatorTuple: [],
  }),
  buildBuilderConfiguration<{
    InputCollection: [
      ExpectedCiYamlFileContentsConfigurationTypeScriptConfiguration,
    ];
    OutputCollection: [ExpectedCiYamlFileContentsTypeScriptConfiguration];
  }>({
    buildCollection: buildExpectedCiYamlContents,
    inputPredicateLocatorTuple: [
      {
        instanceIdentifier: 'expected-ci-yaml-file-contents-configuration',
        predicateIdentifiers: [
          TestingPlatformSemanticsIds.ExpectedCiYamlFileContentsConfiguration,
        ],
      },
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
    inputPredicateLocatorTuple: [
      {
        instanceIdentifier: 'actual-ci-yaml-file',
        predicateIdentifiers: [
          TestingPlatformSemanticsIds.ActualCiYamlFileType,
        ],
      },
      {
        instanceIdentifier: 'expected-ci-yaml-file-contents',
        predicateIdentifiers: [
          TestingPlatformSemanticsIds.ExpectedCiYamlFileContents,
        ],
      },
    ],
  }),

  buildBuilderConfiguration<{
    InputCollection: [];
    OutputCollection: FileATypeScriptConfiguration[];
  }>({
    buildCollection: buildFileATuple,
    inputPredicateLocatorTuple: [],
  }),

  // TODO: use aliases and semantics to handle this transformation
  // buildBuilderConfiguration<{
  //   InputCollection: [FileATypeScriptConfiguration];
  //   OutputCollection: TypeScriptFileTypeScriptConfiguration[];
  // }>({
  //   buildCollection: buildTypeScriptFile,
  //   inputCollectionLocatorCollection: [''],
  // }),
] as const satisfies UnknownBuilderConfigurationTuple;

const [task] = process.argv.slice(2);

if (task === 'r') {
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

  process.exit();
}

if (task === 'v') {
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

  process.exit();
}

// TODO: make an open-schema CLI
throw Error('Missing argv <task>. See this file for more details');
