import {
  AST_TOKEN_TYPES,
  TSESTree,
} from '@typescript-eslint/typescript-estree';
import * as commentParser from 'comment-parser';
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

          let commentText: string | null;
          if (comment === undefined) {
            commentText = null;
          } else if (comment.type === AST_TOKEN_TYPES.Block) {
            const originalValue = `/*${comment.value}*/`;

            const parsedCommentBlockList = commentParser.parse(originalValue);
            if (parsedCommentBlockList.length === 0) {
              // Note: I don't fully understand comment parser's output, so I don't know when this would happen
              throw Error('Unhandled empty parsed comment');
            }

            const [parsedCommentBlock] = parsedCommentBlockList;

            commentText = parsedCommentBlock.description;
          } else {
            commentText = comment.value;
          }

          return {
            commentText,
            bodyStatement: programBodyStatement,
            identifiableNode,
          } satisfies CommentedProgramBodyDeclaration;
        },
      );

    return outputList;
  })
  .assemble();
