import { TSESTree } from '@typescript-eslint/typescript-estree';
import { Voictent } from '../../adapter/voictent';
import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';

export type ParsedTypeScriptFile = {
  zorn: string;
  filePath: string;
  program: TSESTree.Program;
};

export const PARSED_TYPE_SCRIPT_FILE_GEPP = 'parsed-type-script-file';

export type ParsedTypeScriptFileGepp = typeof PARSED_TYPE_SCRIPT_FILE_GEPP;

export type ParsedTypeScriptFileVoictent = Voictent<
  ParsedTypeScriptFileGepp,
  ParsedTypeScriptFile
>;

export type ParsedTypeScriptFileVoque = InMemoryOdeshin2Voque<
  ParsedTypeScriptFileGepp,
  ParsedTypeScriptFile
>;
