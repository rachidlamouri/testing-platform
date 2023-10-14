import { TSESTree } from '@typescript-eslint/typescript-estree';
import fs from 'fs';
import * as parser from '@typescript-eslint/typescript-estree';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
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
import { FileExtensionSuffixIdentifier } from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';

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
export const parseTypeScriptFile = buildProgrammedTransform({
  name: ESTINANT_NAME,
})
  .fromItem2<TypeScriptFileConfigurationVoque>({
    collectionId: TYPE_SCRIPT_FILE_CONFIGURATION_GEPP,
  })
  .toItemTuple2<ParsedTypeScriptFileVoque>({
    collectionId: PARSED_TYPE_SCRIPT_FILE_GEPP,
  })
  .toItemTuple2<GenericProgramErrorVoque>({
    collectionId: PROGRAM_ERROR_GEPP,
  })
  .onTransform((typeScriptFileConfiguration) => {
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
        jsx:
          typeScriptFileConfiguration.sourceFilePathObject.name.extension
            .suffixIdentifier === FileExtensionSuffixIdentifier.TypeScriptXml,
      });

      return {
        [PARSED_TYPE_SCRIPT_FILE_GEPP]: [
          {
            id: typeScriptFileConfiguration.id,
            filePath: typeScriptFileConfiguration.sourceFilePath,
            filePathObject: typeScriptFileConfiguration.sourceFilePathObject,
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
