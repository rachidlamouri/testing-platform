import {
  AST_TOKEN_TYPES,
  TSESTree,
} from '@typescript-eslint/typescript-estree';
import * as commentParser from 'comment-parser';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  PARSED_TYPE_SCRIPT_FILE_GEPP,
  ParsedTypeScriptFileVoque,
} from './parsedTypeScriptFile';
import { getIdentifiableProgramBodyStatementNode } from './getIdentifiableProgramBodyStatementNode';
import {
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP,
  FileCommentedProgramBodyDeclarationGroupInstance,
  FileCommentedProgramBodyDeclarationGroupVoque,
} from './fileCommentedProgramBodyDeclarationGroup';
import { CommentedProgramBodyDeclarationInstance } from './commentedProgramBodyDeclaration';

/**
 * Grabs the top level list of AST nodes in the root Program AST node's
 * statement list. It also associates any comment that is one line before a top
 * level AST node with that node. Note that this transforms gets all nodes, even
 * uncommented ones.
 *
 * @todo rename this so the file name matches the output collection name
 */
export const getCommentedProgramBodyDeclarationList = buildEstinant({
  name: 'getCommentedProgramBodyDeclarationList',
})
  .fromHubblepup2<ParsedTypeScriptFileVoque>({
    gepp: PARSED_TYPE_SCRIPT_FILE_GEPP,
  })
  .toHubblepup2<FileCommentedProgramBodyDeclarationGroupVoque>({
    gepp: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP,
  })
  .onPinbe((parsedTypeScriptFile) => {
    const commentList: TSESTree.Comment[] =
      parsedTypeScriptFile.program.comments ?? [];

    const programBodyStatementList = parsedTypeScriptFile.program.body;

    const declarationList = programBodyStatementList.map(
      (programBodyStatement) => {
        const comment = commentList.find((nextComment) => {
          return (
            programBodyStatement.loc.start.line === nextComment.loc.end.line + 1
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

        return new CommentedProgramBodyDeclarationInstance({
          commentText,
          bodyStatement: programBodyStatement,
          identifiableNode,
        });
      },
    );

    return new FileCommentedProgramBodyDeclarationGroupInstance({
      filePath: parsedTypeScriptFile.filePath,
      list: declarationList,
    });
  })
  .assemble();
