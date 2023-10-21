import { TSESTree } from '@typescript-eslint/typescript-estree';
import fs from 'fs';
import * as parser from '@typescript-eslint/typescript-estree';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  PARSED_TYPE_SCRIPT_FILE_COLLECTION_ID,
  ParsedTypeScriptFileStreamMetatype,
} from './parsedTypeScriptFile';
import {
  PROGRAM_ERROR_COLLECTION_ID,
  ProgramErrorElementLocatorTypeName,
  GenericProgramErrorStreamMetatype,
  ReportingProgrammedTransformLocator,
} from '../error/programError';
import { FileExtensionSuffixIdentifier } from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import {
  TypeScriptFileConfigurationStreamMetatype,
  TYPE_SCRIPT_FILE_CONFIGURATION_COLLECTION_ID,
} from './typeScriptConfiguration';

const PROGRAMMED_TRANSFORM_NAME = 'parseTypeScriptFile' as const;
type ProgrammedTransformName = typeof PROGRAMMED_TRANSFORM_NAME;
type ReportingLocator =
  ReportingProgrammedTransformLocator<ProgrammedTransformName>;
const reporterLocator: ReportingLocator = {
  typeName:
    ProgramErrorElementLocatorTypeName.ReportingProgrammedTransformLocator,
  name: PROGRAMMED_TRANSFORM_NAME,
  filePath: __filename,
};

/**
 * Takes a file with an associated TypeScript configuration and runs the
 * \@typescript-eslint parser on it. This transform does not copy the metadata
 * from the TypeScript file, but you can join back to that collection in a later
 * transform.
 */
export const parseTypeScriptFile = buildProgrammedTransform({
  name: PROGRAMMED_TRANSFORM_NAME,
})
  .fromItem2<TypeScriptFileConfigurationStreamMetatype>({
    collectionId: TYPE_SCRIPT_FILE_CONFIGURATION_COLLECTION_ID,
  })
  .toItemTuple2<ParsedTypeScriptFileStreamMetatype>({
    collectionId: PARSED_TYPE_SCRIPT_FILE_COLLECTION_ID,
  })
  .toItemTuple2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
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
        [PARSED_TYPE_SCRIPT_FILE_COLLECTION_ID]: [
          {
            id: typeScriptFileConfiguration.id,
            filePath: typeScriptFileConfiguration.sourceFilePath,
            filePathObject: typeScriptFileConfiguration.sourceFilePathObject,
            program,
            hasCode: program.body.length > 0,
          },
        ],
        [PROGRAM_ERROR_COLLECTION_ID]: [],
      };
    } catch (error) {
      return {
        [PARSED_TYPE_SCRIPT_FILE_COLLECTION_ID]: [],
        [PROGRAM_ERROR_COLLECTION_ID]: [
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
