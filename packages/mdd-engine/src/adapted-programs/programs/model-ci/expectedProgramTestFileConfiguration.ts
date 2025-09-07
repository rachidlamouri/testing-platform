import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';
import { TypeScriptFile } from '../../programmable-units/type-script-file/typeScriptFile';

const EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_ID_TEMPLATE = [
  'testFilePath',
] as const satisfies GenericComplexIdTemplate;
type ExpectedProgramTestFileConfigurationIdTemplate =
  typeof EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_ID_TEMPLATE;
class ExpectedProgramTestFileConfigurationId extends ComplexId<ExpectedProgramTestFileConfigurationIdTemplate> {
  get rawTemplate(): ExpectedProgramTestFileConfigurationIdTemplate {
    return EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_ID_TEMPLATE;
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
export type ExpectedProgramTestFileConfiguration = SimplifyN<
  [
    {
      id: ExpectedProgramTestFileConfigurationId;
    },
    ExpectedProgramTestFileConfigurationConstructorInput,
  ]
>;

export const { ExpectedProgramTestFileConfigurationInstance } =
  buildNamedConstructorFunction({
    constructorName: 'ExpectedProgramTestFileConfigurationInstance' as const,
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'id',
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

        const id = new ExpectedProgramTestFileConfigurationId({
          testFilePath,
        });

        return {
          id,
          ...input,
        } satisfies ExpectedProgramTestFileConfiguration;
      },
    })
    .assemble();

export const EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_COLLECTION_ID =
  'expected-program-test-file-configuration';

type ExpectedProgramTestFileConfigurationCollectionId =
  typeof EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_COLLECTION_ID;

export type ExpectedProgramTestFileConfigurationStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    ExpectedProgramTestFileConfigurationCollectionId,
    ExpectedProgramTestFileConfiguration
  >;
