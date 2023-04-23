import { TSESTree } from '@typescript-eslint/typescript-estree';
import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import { IdentifiableProgramBodyStatementNode } from './getIdentifiableProgramBodyStatementNode';

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

export type CommentedProgramBodyDeclarationList =
  CommentedProgramBodyDeclaration[];

export type CommentedProgramBodyDeclarationListGrition =
  Grition<CommentedProgramBodyDeclarationList>;

export type CommentedProgramBodyDeclarationListOdeshin =
  OdeshinFromGrition<CommentedProgramBodyDeclarationListGrition>;

export const COMMENTED_PROGRAM_BODY_DECLARATION_LIST_GEPP =
  'commented-program-body-declaration-list';

export type CommentedProgramBodyDeclarationListGepp =
  typeof COMMENTED_PROGRAM_BODY_DECLARATION_LIST_GEPP;

export type CommentedProgramBodyDeclarationListVoictent = Voictent<
  CommentedProgramBodyDeclarationListGepp,
  CommentedProgramBodyDeclarationListOdeshin
>;
