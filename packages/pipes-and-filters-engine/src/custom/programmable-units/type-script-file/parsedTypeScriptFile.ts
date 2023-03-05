import { TSESTree } from '@typescript-eslint/typescript-estree';
import { buildOnama } from '../../adapter/estinant/onama';
import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import {
  TypeScriptFileConfigurationVoictent,
  TYPE_SCRIPT_FILE_CONFIGURATION_GEPP,
} from './typeScriptFileConfiguration';

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

export const parsedTypeScriptFileOnama = buildOnama<
  TypeScriptFileConfigurationVoictent,
  ParsedTypeScriptFileVoictent
>({
  inputGepp: TYPE_SCRIPT_FILE_CONFIGURATION_GEPP,
  outputGepp: PARSED_TYPE_SCRIPT_FILE_GEPP,
  pinbe: (input) => {},
});
