import { TSESTree } from '@typescript-eslint/typescript-estree';
import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

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
