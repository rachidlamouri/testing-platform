import { InMemoryOdeshin2ListVoque } from '../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../package-agnostic-utilities/datastructure/zorn';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';

const EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_ZORN_TEMPLATE = [
  'filePath',
] as const satisfies GenericZorn2Template;
type ExpectedProgramTestFileConfigurationZornTemplate =
  typeof EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_ZORN_TEMPLATE;
class ExpectedProgramTestFileConfigurationZorn extends Zorn2<ExpectedProgramTestFileConfigurationZornTemplate> {
  get rawTemplate(): ExpectedProgramTestFileConfigurationZornTemplate {
    return EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_ZORN_TEMPLATE;
  }
}

type ExpectedProgramTestFileConfigurationConstructorInput = {
  filePath: string;
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
      'filePath',
    ] as const satisfies readonly (keyof ExpectedProgramTestFileConfiguration)[],
  })
    .withTypes<
      ExpectedProgramTestFileConfigurationConstructorInput,
      ExpectedProgramTestFileConfiguration
    >({
      typeCheckErrorMesssages: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { filePath } = input;

        const zorn = new ExpectedProgramTestFileConfigurationZorn({
          filePath,
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
