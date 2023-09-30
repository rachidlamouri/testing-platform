import Case from 'case';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
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
import { TypeScriptFileVoque, TYPE_SCRIPT_FILE_GEPP } from './typeScriptFile';
import {
  FILE_PARSED_COMMENT_GROUP_GEPP,
  FileParsedCommentGroupVoque,
} from './fileParsedCommentGroup';
import { CategorizedCommentTypeName } from './comment/categorized/categorizedCommentTypeName';
import { shishKebab } from '../../../package-agnostic-utilities/case/shishKebab';

const allowedDerivativePrefixSet = [
  // keep as multiline list
  'generic',
] as const;

const allowedDerivativeSuffixSet = [
  // keep as multiline list
  '2',
  '3',
  'pelue',
] as const;

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
  .andFromHubblepupTuple2<TypeScriptFileVoque, [string]>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
    framate: (parsedFile) => {
      return [parsedFile.hubblepup.filePath];
    },
    croard: (file) => {
      return file.hubblepup.filePath.serialized;
    },
  })
  .andFromHubblepupTuple2<FileParsedCommentGroupVoque, [string]>({
    gepp: FILE_PARSED_COMMENT_GROUP_GEPP,
    framate: (parsedFile) => {
      return [parsedFile.hubblepup.filePath];
    },
    croard: (file) => {
      return file.hubblepup.filePath;
    },
  })
  .toHubblepup2<FileCommentedProgramBodyDeclarationGroupVoque>({
    gepp: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP,
  })
  .onPinbe((parsedTypeScriptFile, [typescriptFile], [commentGroup]) => {
    const kebabExtensionlessName = Case.kebab(
      typescriptFile.filePath.name.extensionless,
    );

    const allowedDerivativeNameSet = new Set([
      ...allowedDerivativePrefixSet.map((prefix) => {
        return `${prefix}-${kebabExtensionlessName}`;
      }),
      ...allowedDerivativeSuffixSet.map((suffix) => {
        return `${kebabExtensionlessName}-${suffix}`;
      }),
    ]);

    const commentList = commentGroup.list;

    const programBodyStatementList = parsedTypeScriptFile.program.body;

    const declarationList = programBodyStatementList.map(
      (programBodyStatement) => {
        const comment =
          commentList.find((nextComment) => {
            return (
              programBodyStatement.loc.start.line ===
              nextComment.endingLineNumber + 1
            );
          }) ?? null;

        const commentText =
          comment?.typeName === CategorizedCommentTypeName.Descriptive
            ? comment.description
            : null;

        const identifiableNode =
          getIdentifiableProgramBodyStatementNode(programBodyStatement);

        const hasCanonicalTag =
          comment?.typeName === CategorizedCommentTypeName.Descriptive &&
          comment.tagIdSet.has('canonical');

        const normalizedIdentifierName =
          identifiableNode !== null
            ? shishKebab(identifiableNode.id.name)
            : null;

        const isCanonical =
          hasCanonicalTag ||
          (normalizedIdentifierName !== null &&
            normalizedIdentifierName === kebabExtensionlessName);

        const isDerivative =
          !isCanonical &&
          normalizedIdentifierName !== null &&
          allowedDerivativeNameSet.has(normalizedIdentifierName);

        return new CommentedProgramBodyDeclarationInstance({
          hasCanonicalTag,
          isCanonical,
          isDerivative,
          comment,
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
