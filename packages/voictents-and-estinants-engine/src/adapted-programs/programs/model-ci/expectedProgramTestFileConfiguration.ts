import { InMemoryOdeshin2ListVoque } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';
import { TypeScriptFile } from '../../programmable-units/type-script-file/typeScriptFile';

const EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_ZORN_TEMPLATE = [
  'testFilePath',
] as const satisfies GenericComplexIdTemplate;
type ExpectedProgramTestFileConfigurationZornTemplate =
  typeof EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_ZORN_TEMPLATE;
class ExpectedProgramTestFileConfigurationZorn extends ComplexId<ExpectedProgramTestFileConfigurationZornTemplate> {
  get rawTemplate(): ExpectedProgramTestFileConfigurationZornTemplate {
    return EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_ZORN_TEMPLATE;
  }
}

type ExpectedProgramTestFileConfigurationConstructorInput = {
  programName: string;
  programFile: TypeScriptFile;
  testFilePath: string;
};

/**
 * The expected file path of a program's test file
 */
type ExpectedProgramTestFileConfiguration = SimplifyN<
  [
    {
      zorn: ExpectedProgramTestFileConfigurationZorn;
    },
    ExpectedProgramTestFileConfigurationConstructorInput,
  ]
>;

export const { ExpectedProgramTestFileConfigurationInstance } =
  buildNamedConstructorFunction({
    constructorName: 'ExpectedProgramTestFileConfigurationInstance' as const,
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'zorn',
      'programName',
      'programFile',
      'testFilePath',
    ] as const satisfies readonly (keyof ExpectedProgramTestFileConfiguration)[],
  })
    .withTypes<
      ExpectedProgramTestFileConfigurationConstructorInput,
      ExpectedProgramTestFileConfiguration
    >({
      typeCheckErrorMessage: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { testFilePath } = input;

        const zorn = new ExpectedProgramTestFileConfigurationZorn({
          testFilePath,
        });

        return {
          zorn,
          ...input,
        } satisfies ExpectedProgramTestFileConfiguration;
      },
    })
    .assemble();

export const EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_GEPP =
  'expected-program-test-file-configuration';

type ExpectedProgramTestFileConfigurationGepp =
  typeof EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_GEPP;

export type ExpectedProgramTestFileConfigurationVoque =
  InMemoryOdeshin2ListVoque<
    ExpectedProgramTestFileConfigurationGepp,
    ExpectedProgramTestFileConfiguration
  >;
