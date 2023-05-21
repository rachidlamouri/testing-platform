import { TSESTree } from '@typescript-eslint/typescript-estree';
import { Voictent } from '../../adapter/voictent';
import { IdentifiableProgramBodyStatementNode } from './getIdentifiableProgramBodyStatementNode';
import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';

export type CommentedProgramBodyDeclaration = {
  commentText: string | null;
  bodyStatement: TSESTree.ProgramStatement;
  identifiableNode: IdentifiableProgramBodyStatementNode | null;
};

export type IdentifiableCommentedProgramBodyDeclaration = {
  commentText: string | null;
  bodyStatement: TSESTree.ProgramStatement;
  identifiableNode: IdentifiableProgramBodyStatementNode;
};

// TODO: fix this weird nested list type
export type CommentedProgramBodyDeclarationList = {
  zorn: string;
  list: CommentedProgramBodyDeclaration[];
};

export const COMMENTED_PROGRAM_BODY_DECLARATION_LIST_GEPP =
  'commented-program-body-declaration-list';

export type CommentedProgramBodyDeclarationListGepp =
  typeof COMMENTED_PROGRAM_BODY_DECLARATION_LIST_GEPP;

export type CommentedProgramBodyDeclarationListVoictent = Voictent<
  CommentedProgramBodyDeclarationListGepp,
  CommentedProgramBodyDeclarationList
>;

export type CommentedProgramBodyDeclarationListVoque = InMemoryOdeshin2Voque<
  CommentedProgramBodyDeclarationListGepp,
  CommentedProgramBodyDeclarationList
>;
