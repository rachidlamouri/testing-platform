import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';
import { BashFile } from '../../programmable-units/bash-file/bashFile';
import { FileSystemNodeZorn } from '../../programmable-units/file/fileSystemNode';
import { TypeScriptFile } from '../../programmable-units/type-script-file/typeScriptFile';

type ExpectedProgramTestFileConstructorInput = {
  programName: string;
  programFile: TypeScriptFile;
  testFile: BashFile;
};

/**
 * Contains the actual BashFile object for a program's test file
 */
type ExpectedProgramTestFile = SimplifyN<
  [
    {
      zorn: FileSystemNodeZorn;
    },
    ExpectedProgramTestFileConstructorInput,
  ]
>;

export const { ExpectedProgramTestFileInstance } =
  buildNamedConstructorFunction({
    constructorName: 'ExpectedProgramTestFileInstance' as const,
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'zorn',
      'programName',
      'programFile',
      'testFile',
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
        const { testFile } = input;

        return {
          zorn: testFile.zorn,
          ...input,
        } satisfies ExpectedProgramTestFile;
      },
    })
    .assemble();

export const EXPECTED_PROGRAM_TEST_FILE_GEPP = 'expected-program-test-file';

type ExpectedProgramTestFileGepp = typeof EXPECTED_PROGRAM_TEST_FILE_GEPP;

export type ExpectedProgramTestFileVoque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    ExpectedProgramTestFileGepp,
    ExpectedProgramTestFile
  >;
