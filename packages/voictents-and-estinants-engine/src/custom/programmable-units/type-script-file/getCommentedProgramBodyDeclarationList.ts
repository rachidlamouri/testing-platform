import { TSESTree } from '@typescript-eslint/typescript-estree';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  COMMENTED_PROGRAM_BODY_DECLARATION_LIST_GEPP,
  CommentedProgramBodyDeclaration,
  CommentedProgramBodyDeclarationListVoictent,
} from './commentedProgramBodyDeclarationList';
import {
  PARSED_TYPE_SCRIPT_FILE_GEPP,
  ParsedTypeScriptFileVoictent,
} from './parsedTypeScriptFile';
import { getIdentifiableProgramBodyStatementNode } from './getIdentifiableProgramBodyStatementNode';

export const getCommentedProgramBodyDeclarationList = buildEstinant({
  name: 'getCommentedProgramBodyDeclarationList',
})
  .fromGrition<ParsedTypeScriptFileVoictent>({
    gepp: PARSED_TYPE_SCRIPT_FILE_GEPP,
  })
  .toGrition<CommentedProgramBodyDeclarationListVoictent>({
    gepp: COMMENTED_PROGRAM_BODY_DECLARATION_LIST_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((parsedTypeScriptFile) => {
    const commentList: TSESTree.Comment[] =
      parsedTypeScriptFile.program.comments ?? [];

    const programBodyStatementList = parsedTypeScriptFile.program.body;

    const outputList =
      programBodyStatementList.map<CommentedProgramBodyDeclaration>(
        (programBodyStatement) => {
          const comment = commentList.find((nextComment) => {
            return (
              programBodyStatement.loc.start.line ===
              nextComment.loc.end.line + 1
            );
          });

          const identifiableNode =
            getIdentifiableProgramBodyStatementNode(programBodyStatement);

          return {
            commentText: comment?.value ?? null,
            bodyStatement: programBodyStatement,
            identifiableNode,
          } satisfies CommentedProgramBodyDeclaration;
        },
      );

    return outputList;
  })
  .assemble();
