import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';
import { BashFile } from '../../programmable-units/bash-file/bashFile';
import { FileSystemNodeId } from '../../programmable-units/file/fileSystemNode';
import { ExpectedProgramTestFileConfiguration } from './expectedProgramTestFileConfiguration';

type ExpectedProgramTestFileConstructorInput = {
  configuration: ExpectedProgramTestFileConfiguration;
  testFile?: BashFile;
};

/**
 * Contains the actual BashFile object for a program's test file
 */
type ExpectedProgramTestFile = SimplifyN<
  [
    {
      id: FileSystemNodeId;
    },
    Omit<ExpectedProgramTestFileConstructorInput, 'configuration'>,
    // TODO: upgrade type-fest and use SetFieldType
    Omit<ExpectedProgramTestFileConfiguration, 'testFilePath' | 'id'>,
    {
      expectedTestFilePath: ExpectedProgramTestFileConfiguration['testFilePath'];
    },
  ]
>;

export const { ExpectedProgramTestFileInstance } =
  buildNamedConstructorFunction({
    constructorName: 'ExpectedProgramTestFileInstance' as const,
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'id',
      'programName',
      'programFile',
      'testFile',
      'expectedTestFilePath',
    ] as const satisfies readonly (keyof ExpectedProgramTestFile)[],
  })
    .withTypes<
      ExpectedProgramTestFileConstructorInput,
      ExpectedProgramTestFile
    >({
      typeCheckErrorMessage: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { configuration, testFile } = input;
        const { testFilePath, programFile, programName } = configuration;

        return {
          id: testFile?.id ?? configuration.programFile.id,
          programName,
          programFile,
          testFile,
          expectedTestFilePath: testFilePath,
        } satisfies ExpectedProgramTestFile;
      },
    })
    .assemble();

export const EXPECTED_PROGRAM_TEST_FILE_COLLECTION_ID =
  'expected-program-test-file';

type ExpectedProgramTestFileCollectionId =
  typeof EXPECTED_PROGRAM_TEST_FILE_COLLECTION_ID;

export type ExpectedProgramTestFileStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    ExpectedProgramTestFileCollectionId,
    ExpectedProgramTestFile
  >;
