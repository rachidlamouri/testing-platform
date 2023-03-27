import { TSESTree } from '@typescript-eslint/typescript-estree';
import fs from 'fs';
import * as parser from '@typescript-eslint/typescript-estree';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { ErrorVoictent, ERROR_GEPP } from '../error/error';
import {
  TypeScriptFileConfigurationVoictent,
  TYPE_SCRIPT_FILE_CONFIGURATION_GEPP,
} from './associateTypeScriptFileToTypescriptConfiguration';
import {
  ParsedTypeScriptFileVoictent,
  PARSED_TYPE_SCRIPT_FILE_GEPP,
} from './parsedTypeScriptFile';

export const parseTypeScriptFile = buildEstinant()
  .fromHubblepup<TypeScriptFileConfigurationVoictent>({
    gepp: TYPE_SCRIPT_FILE_CONFIGURATION_GEPP,
  })
  .toHubblepupTuple<ParsedTypeScriptFileVoictent>({
    gepp: PARSED_TYPE_SCRIPT_FILE_GEPP,
  })
  .toHubblepupTuple<ErrorVoictent>({
    gepp: ERROR_GEPP,
  })
  .onPinbe((input) => {
    const inputGrition = input.grition;

    const fileContents = fs.readFileSync(inputGrition.sourceFilePath, 'utf8');

    try {
      const program: TSESTree.Program = parser.parse(fileContents, {
        project: './tsconfig.json',
        tsconfigRootDir: inputGrition.rootDirectory,
        comment: true,
      });

      return {
        [PARSED_TYPE_SCRIPT_FILE_GEPP]: [
          {
            zorn: input.zorn,
            grition: {
              filePath: inputGrition.sourceFilePath,
              program,
            },
          },
        ],
        [ERROR_GEPP]: [],
      };
    } catch (error) {
      return {
        [PARSED_TYPE_SCRIPT_FILE_GEPP]: [],
        [ERROR_GEPP]: [
          {
            zorn: input.zorn,
            grition: error,
          },
        ],
      };
    }
  })
  .assemble();
