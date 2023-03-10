import { TSESTree } from '@typescript-eslint/typescript-estree';
import * as parser from '@typescript-eslint/typescript-estree';
import fs from 'fs';
import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import {
  TypeScriptFileConfigurationVoictent,
  TYPE_SCRIPT_FILE_CONFIGURATION_GEPP,
} from './typeScriptFileConfiguration';
import { ErrorVoictent, ERROR_GEPP } from '../error/error';
import { Voictent } from '../../adapter/voictent';
import { buildMentursection } from '../../adapter/estinant/mentursection';

export type ParsedTypeScriptFile = {
  filePath: string;
  program: TSESTree.Program;
};

export type ParsedTypeScriptFileGrition = Grition<ParsedTypeScriptFile>;

export type ParsedTypeScriptFileOdeshin =
  OdeshinFromGrition<ParsedTypeScriptFileGrition>;

export const PARSED_TYPE_SCRIPT_FILE_GEPP = 'parsed-type-script-file';

export type ParsedTypeScriptFileGepp = typeof PARSED_TYPE_SCRIPT_FILE_GEPP;

export type ParsedTypeScriptFileVoictent = Voictent<
  ParsedTypeScriptFileGepp,
  ParsedTypeScriptFileOdeshin
>;

export const parsedTypeScriptFileMentursection = buildMentursection<
  TypeScriptFileConfigurationVoictent,
  [ParsedTypeScriptFileVoictent, ErrorVoictent]
>({
  inputGepp: TYPE_SCRIPT_FILE_CONFIGURATION_GEPP,
  outputGeppTuple: [PARSED_TYPE_SCRIPT_FILE_GEPP, ERROR_GEPP],
  pinbe: (input) => {
    const fileContents = fs.readFileSync(input.sourceFilePath, 'utf8');

    try {
      const program: TSESTree.Program = parser.parse(fileContents, {
        project: './tsconfig.json',
        tsconfigRootDir: input.rootDirectory,
        comment: true,
      });

      return {
        [PARSED_TYPE_SCRIPT_FILE_GEPP]: [
          {
            filePath: input.sourceFilePath,
            program,
          },
        ],
        [ERROR_GEPP]: [],
      };
    } catch (error) {
      return {
        [PARSED_TYPE_SCRIPT_FILE_GEPP]: [],
        [ERROR_GEPP]: [error],
      };
    }
  },
});
