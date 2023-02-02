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
import {
  buildTypeScriptFile,
  TypeScriptFileTypeScriptConfiguration,
} from './datum-instance-type-script-configuration-definitions/testingPlatform/file/typeScriptFileA';
import { FileTypeScriptSemanticsIdentifier } from './datum-instance-type-script-configuration-definitions/testingPlatform/file/fileTypeScriptSemanticsIdentifier';
import { FileExtensionSuffixSemanticsIdentifier } from './datum-instance-type-script-configuration-definitions/testingPlatform/file/fileExtensionSuffixSemanticsIdentifier';
import {
  buildTypeScriptFileB,
  TypeScriptFileBTypeScriptConfiguration,
} from './datum-instance-type-script-configuration-definitions/testingPlatform/file/typeScriptFileB';
import {
  buildTypeScriptFileC,
  TypeScriptFileC,
  TypeScriptFileCTypeScriptConfiguration,
} from './datum-instance-type-script-configuration-definitions/testingPlatform/file/typeScriptFileC';
import {
  buildExampleFileA,
  ExampleFileA,
  ExampleFileATypeScriptConfiguration,
} from './datum-instance-type-script-configuration-definitions/testingPlatform/file/exampleFileA';
import { ExampleFileFileCommentText } from './datum-instance-type-script-configuration-definitions/testingPlatform/file/exampleFile';
import { ExampleFileBTypeScriptConfiguration } from './datum-instance-type-script-configuration-definitions/testingPlatform/file/exampleFileB';
import {
  buildExampleFileBDatumInstanceTypeScriptConfiguration,
  ExampleFileBDatumInstanceTypeScriptConfigurationTypeScriptConfiguration,
} from './datum-instance-type-script-configuration-definitions/testingPlatform/file/exampleFileBDatumInstanceTypeScriptConfiguration';

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
  buildBuilderConfiguration<{
    InputCollection: [FileATypeScriptConfiguration];
    OutputCollection: [TypeScriptFileTypeScriptConfiguration];
  }>({
    buildCollection: buildTypeScriptFile,
    inputPredicateLocatorTuple: [
      {
        // TODO: rename "instanceIdentifier" to "instanceLocator"
        instanceIdentifier: `${FileExtensionSuffixSemanticsIdentifier.TypeScript}:${FileTypeScriptSemanticsIdentifier.FileA}`,
        predicateIdentifiers: [FileTypeScriptSemanticsIdentifier.FileA],
      },
    ],
  }),
  buildBuilderConfiguration<{
    InputCollection: [TypeScriptFileTypeScriptConfiguration];
    OutputCollection: [TypeScriptFileBTypeScriptConfiguration];
  }>({
    buildCollection: buildTypeScriptFileB,
    inputPredicateLocatorTuple: [
      {
        // TODO: rename "instanceIdentifier" to "instanceLocator"
        instanceIdentifier: `${FileExtensionSuffixSemanticsIdentifier.TypeScript}:${FileTypeScriptSemanticsIdentifier.TypeScriptFileA}`,
        predicateIdentifiers: [
          FileTypeScriptSemanticsIdentifier.TypeScriptFileA,
        ],
      },
    ],
  }),
  buildBuilderConfiguration<{
    InputCollection: [TypeScriptFileBTypeScriptConfiguration];
    OutputCollection: [TypeScriptFileCTypeScriptConfiguration];
  }>({
    buildCollection: buildTypeScriptFileC,
    inputPredicateLocatorTuple: [
      {
        // TODO: rename "instanceIdentifier" to "instanceLocator"
        instanceIdentifier: `${FileExtensionSuffixSemanticsIdentifier.TypeScript}:${FileTypeScriptSemanticsIdentifier.TypeScriptFileB}`,
        predicateIdentifiers: [
          FileTypeScriptSemanticsIdentifier.TypeScriptFileB,
        ],
      },
    ],
  }),

  buildBuilderConfiguration<{
    InputCollection: [TypeScriptFileTypeScriptConfiguration];
    OutputCollection: [ExampleFileATypeScriptConfiguration] | [];
  }>({
    buildCollection: buildExampleFileA,
    inputPredicateLocatorTuple: [
      {
        // TODO: rename "instanceIdentifier" to "instanceLocator"
        instanceIdentifier: `${FileExtensionSuffixSemanticsIdentifier.TypeScript}:${FileTypeScriptSemanticsIdentifier.TypeScriptFileA}`,
        predicateIdentifiers: [
          FileTypeScriptSemanticsIdentifier.TypeScriptFileA,
        ],
      },
    ],
  }),
  buildBuilderConfiguration<{
    InputCollection: [ExampleFileBTypeScriptConfiguration];
    OutputCollection:
      | []
      | [
          ExampleFileBDatumInstanceTypeScriptConfigurationTypeScriptConfiguration,
        ];
  }>({
    buildCollection: buildExampleFileBDatumInstanceTypeScriptConfiguration,
    inputPredicateLocatorTuple: [
      {
        // TODO: rename "instanceIdentifier" to "instanceLocator"
        instanceIdentifier: `${FileExtensionSuffixSemanticsIdentifier.TypeScript}:${FileTypeScriptSemanticsIdentifier.ExampleFileA}`,
        predicateIdentifiers: [FileTypeScriptSemanticsIdentifier.ExampleFileB],
      },
    ],
  }),
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

      return [];
    },
    onFinish: () => {
      // eslint-disable-next-line no-console
      console.log('All Done!');
    },
  });

  process.exit();
}

if (task === 'v') {
  validationEngine.run({
    builderConfigurationCollection,
    semanticsConfigurationCollection: [
      {
        semanticsIdentifier: 'actual-ci-yaml-file-matches-expected',
        collectionLocator: 'assertable-ci-yaml-file',
        processDatum: (instance: unknown): true => {
          const { actualStringContents, expectedStringContents } =
            instance as AssertableCiYamlFile;

          assert.strictEqual(actualStringContents, expectedStringContents);

          return true;
        },
        additionalPredicateIdentifiers: [],
      },
      {
        semanticsIdentifier:
          'type-script-file-has-named-export-matching-file-name',
        collectionLocator: `${FileExtensionSuffixSemanticsIdentifier.TypeScript}:${FileTypeScriptSemanticsIdentifier.TypeScriptFileC}`,
        processDatum: (instance: unknown): boolean => {
          const tsFileC = instance as TypeScriptFileC;
          if (tsFileC.additionalMetadata.declarations.length === 0) {
            // Ignore files that don't export anything
            return true;
          }

          const hasNamedExport = tsFileC.additionalMetadata.declarations.some(
            (enhancedDeclaration): boolean => {
              switch (enhancedDeclaration.typeName) {
                case 'code':
                  return (
                    enhancedDeclaration.identifier ===
                    tsFileC.inMemoryFileName.camelCase
                  );
                case 'hybrid':
                case 'type':
                  return (
                    enhancedDeclaration.identifier ===
                    tsFileC.inMemoryFileName.pascalCase
                  );
                case null:
                  return Object.values(tsFileC.inMemoryFileName).includes(
                    enhancedDeclaration.identifier,
                  );
                default:
                  return false;
              }
            },
          );

          return hasNamedExport;
        },
        additionalPredicateIdentifiers: [],
      },
      {
        semanticsIdentifier: 'example-file-a-has-file-comment',
        collectionLocator: `${FileExtensionSuffixSemanticsIdentifier.TypeScript}:${FileTypeScriptSemanticsIdentifier.ExampleFileA}`,
        processDatum: (instance: unknown): boolean => {
          const exampleFileA = instance as ExampleFileA;

          const hasComment = Object.values<string>(
            ExampleFileFileCommentText,
          ).includes(exampleFileA.additionalMetadata.fileCommentText.trim());

          return hasComment;
        },
        additionalPredicateIdentifiers: [
          FileTypeScriptSemanticsIdentifier.ExampleFileB,
        ],
      },
    ],
  });

  process.exit();
}

// TODO: make an open-schema CLI
throw Error('Missing argv <task>. See this file for more details');

// TODO: figure out what to do so we don't have to make an extraneous export
export type Example = symbol;
