import { TSESTree } from '@typescript-eslint/typescript-estree';
import { InMemoryOdeshin2ListVoque } from '../../../core/engine/inMemoryOdeshinVoictent2';

/**
 * Contains the AST for a TypeScript file as well as the information needed to
 * join it back to the source file or other related objects
 */
type ParsedTypeScriptFile = {
  zorn: string;
  filePath: string;
  program: TSESTree.Program;
};

export const PARSED_TYPE_SCRIPT_FILE_GEPP = 'parsed-type-script-file';

type ParsedTypeScriptFileGepp = typeof PARSED_TYPE_SCRIPT_FILE_GEPP;

export type ParsedTypeScriptFileVoque = InMemoryOdeshin2ListVoque<
  ParsedTypeScriptFileGepp,
  ParsedTypeScriptFile
>;
