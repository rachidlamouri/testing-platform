import assert from 'assert';
import { buildBuilderConfiguration } from '../type-script/buildBuilderConfiguration';
import { UnknownBuilderConfigurationTuple } from '../core/builderConfiguration';
import {
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
  RootDatumInstanceTypeScriptConfiguration,
} from '../type-script/datumInstanceTypeScriptConfiguration';
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
} from './testingPlatform/packageDirectoryNameSet/packageDirectoryNameSetConfiguration';
import { ROOT_DATUM_INSTANCE_LOCATOR } from '../core/collectionLocator';
import { TypeScriptSemanticsIdentifier as TypeScriptIds } from '../type-script/typeScriptSemanticsIdentifier';

// type A = DatumInstanceConfigurationToDatumInstancePredicateTuple<
//   DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<RootDatumInstanceTypeScriptConfiguration>
// >;

// type B = DatumInstanceConfigurationTupleToDatumInstancePredicateTuple<
//   [
//     DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<RootDatumInstanceTypeScriptConfiguration>,
//   ]
// >;

// type B =
//   DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<RootDatumInstanceTypeScriptConfiguration>;

// type G<T extends readonly unknown[], X extends object> = {
//   [Index in keyof T]: Merge<{ a: T[Index] }, X>;
// };

// type C = G<B['predicateIdentifiers'], { x: 2 }>;

// type Q = C[0];

// type A = DatumInstanceConfigurationToDatumInstancePredicateTuple<
//   DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<RootDatumInstanceTypeScriptConfiguration>
// >;

// type A = DatumInstanceConfigurationTupleToDatumInstancePredicateTuple<
//   [
//     DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<RootDatumInstanceTypeScriptConfiguration>,
//   ]
// >;

// type B = A[0][0];

const builderConfigurationCollection = [
  buildBuilderConfiguration<{
    InputCollection: [RootDatumInstanceTypeScriptConfiguration];
    OutputCollection: [
      PackageDirectoryNameSetConfigurationTypeScriptConfiguration,
    ];
  }>({
    buildCollection: buildPackageDirectoryNameSetConfiguration,
    inputPredicateCollection: [
      {
        instanceIdentifier: ROOT_DATUM_INSTANCE_LOCATOR,
        predicateIdentifiers: [TypeScriptIds.null],
      },
    ],
  }),
  // buildBuilderConfiguration<{
  //   InputCollection: [
  //     PackageDirectoryNameSetConfigurationTypeScriptConfiguration,
  //   ];
  //   OutputCollection: [PackageDirectoryNameSetTypeScriptConfiguration];
  // }>({
  //   buildCollection: buildPackageDirectoryNameSet,
  //   inputPredicateCollection: [
  //     {
  //       datumInstanceIdentifier: 'package-directory-name-set-configuration',
  //       semanticsIdentifier: '',
  //     },
  //   ],
  // }),
  // buildBuilderConfiguration<{
  //   InputCollection: [RootDatumInstanceTypeScriptConfiguration];
  //   OutputCollection: [ActualCiYamlFileTypeScriptConfiguration];
  // }>({
  //   buildCollection: buildActualCiYamlFileContents,
  //   inputPredicateCollection: [''],
  // }),
  // buildBuilderConfiguration<{
  //   InputCollection: [RootDatumInstanceTypeScriptConfiguration];
  //   OutputCollection: [
  //     ExpectedCiYamlFileContentsConfigurationTypeScriptConfiguration,
  //   ];
  // }>({
  //   buildCollection: buildExpectedCiYamlFileContentsConfiguration,
  //   inputPredicateCollection: [''],
  // }),
  // buildBuilderConfiguration<{
  //   InputCollection: [
  //     ExpectedCiYamlFileContentsConfigurationTypeScriptConfiguration,
  //   ];
  //   OutputCollection: [ExpectedCiYamlFileContentsTypeScriptConfiguration];
  // }>({
  //   buildCollection: buildExpectedCiYamlContents,
  //   inputPredicateCollection: ['expected-ci-yaml-file-contents-configuration'],
  // }),
  // buildBuilderConfiguration<{
  //   InputCollection: [
  //     ActualCiYamlFileTypeScriptConfiguration,
  //     ExpectedCiYamlFileContentsTypeScriptConfiguration,
  //   ];
  //   OutputCollection: [AssertableCiYamlFileTypeScriptConfiguration];
  // }>({
  //   buildCollection: buildAssertableCiYamlFileContentsConfiguration,
  //   inputPredicateCollection: [
  //     'actual-ci-yaml-file',
  //     'expected-ci-yaml-file-contents',
  //   ],
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
