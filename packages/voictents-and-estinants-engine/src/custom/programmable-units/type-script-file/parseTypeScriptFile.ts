import { TSESTree } from '@typescript-eslint/typescript-estree';
import fs from 'fs';
import * as parser from '@typescript-eslint/typescript-estree';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  TYPE_SCRIPT_FILE_CONFIGURATION_GEPP,
  TypeScriptFileConfigurationVoque,
} from './associateTypeScriptFileToTypescriptConfiguration';
import {
  PARSED_TYPE_SCRIPT_FILE_GEPP,
  ParsedTypeScriptFileVoque,
} from './parsedTypeScriptFile';
import {
  PROGRAM_ERROR_GEPP,
  ProgramErrorElementLocatorTypeName,
  GenericProgramErrorVoque,
  ReportingEstinantLocator,
} from '../error/programError';

const ESTINANT_NAME = 'parseTypeScriptFile' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingEstinantLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName: ProgramErrorElementLocatorTypeName.ReportingEstinantLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

/**
 * Takes a file with an associated TypeScript configuration and runs the
 * \@typescript-eslint parser on it. This transform does not copy the metadata
 * from the TypeScript file, but you can join back to that collection in a later
 * transform.
 */
export const parseTypeScriptFile = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<TypeScriptFileConfigurationVoque>({
    gepp: TYPE_SCRIPT_FILE_CONFIGURATION_GEPP,
  })
  .toHubblepupTuple2<ParsedTypeScriptFileVoque>({
    gepp: PARSED_TYPE_SCRIPT_FILE_GEPP,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((typeScriptFileConfiguration) => {
    const fileContents = fs.readFileSync(
      typeScriptFileConfiguration.sourceFilePath,
      'utf8',
    );

    try {
      const program: TSESTree.Program = parser.parse(fileContents, {
        project: './tsconfig.json',
        tsconfigRootDir: typeScriptFileConfiguration.rootDirectory,
        loc: true,
        comment: true,
      });

      return {
        [PARSED_TYPE_SCRIPT_FILE_GEPP]: [
          {
            zorn: typeScriptFileConfiguration.zorn,
            filePath: typeScriptFileConfiguration.sourceFilePath,
            program,
          },
        ],
        [PROGRAM_ERROR_GEPP]: [],
      };
    } catch (error) {
      return {
        [PARSED_TYPE_SCRIPT_FILE_GEPP]: [],
        [PROGRAM_ERROR_GEPP]: [
          {
            name: 'unparseable-file',
            error: new Error('Failed to parse file'),
            reporterLocator,
            sourceLocator: {
              typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
              filePath: typeScriptFileConfiguration.sourceFilePath,
            },
            context: {
              error,
            },
          },
        ],
      };
    }
  })
  .assemble();
