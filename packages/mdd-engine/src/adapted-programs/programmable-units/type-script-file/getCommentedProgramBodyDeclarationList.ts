import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  PARSED_TYPE_SCRIPT_FILE_COLLECTION_ID,
  ParsedTypeScriptFileStreamMetatype,
} from './parsedTypeScriptFile';
import { getIdentifiableProgramBodyStatementNode } from './getIdentifiableProgramBodyStatementNode';
import {
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
  FileCommentedProgramBodyDeclarationGroupInstance,
  FileCommentedProgramBodyDeclarationGroupStreamMetatype,
} from './fileCommentedProgramBodyDeclarationGroup';
import { CommentedProgramBodyDeclarationInstance } from './commentedProgramBodyDeclaration';
import {
  TypeScriptFileStreamMetatype,
  TYPE_SCRIPT_FILE_COLLECTION_ID,
} from './typeScriptFile';
import {
  FILE_PARSED_COMMENT_GROUP_COLLECTION_ID,
  FileParsedCommentGroupStreamMetatype,
} from './fileParsedCommentGroup';
import { CategorizedCommentTypeName } from './comment/categorized/categorizedCommentTypeName';
import { shishKebab } from '../../../package-agnostic-utilities/case/shishKebab';
import { CommentTagId } from './comment/commentTagId';

const allowedCanonicalVariationDeclarationPrefixSet = [
  // keep as multiline list
  'generic',
] as const;

const allowedCanonicalVariationDeclarationSuffixSet = [
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
export const getCommentedProgramBodyDeclarationList = buildProgrammedTransform({
  name: 'getCommentedProgramBodyDeclarationList',
})
  .fromItem2<ParsedTypeScriptFileStreamMetatype>({
    collectionId: PARSED_TYPE_SCRIPT_FILE_COLLECTION_ID,
  })
  .andFromItemTuple2<TypeScriptFileStreamMetatype, [string]>({
    collectionId: TYPE_SCRIPT_FILE_COLLECTION_ID,
    getRightKeyTuple: (parsedFile) => {
      return [parsedFile.item.filePath];
    },
    getRightKey: (file) => {
      return file.item.filePath.serialized;
    },
  })
  .andFromItemTuple2<FileParsedCommentGroupStreamMetatype, [string]>({
    collectionId: FILE_PARSED_COMMENT_GROUP_COLLECTION_ID,
    getRightKeyTuple: (parsedFile) => {
      return [parsedFile.item.filePath];
    },
    getRightKey: (file) => {
      return file.item.filePath;
    },
  })
  .toItem2<FileCommentedProgramBodyDeclarationGroupStreamMetatype>({
    collectionId: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
  })
  .onTransform((parsedTypeScriptFile, [typescriptFile], [commentGroup]) => {
    const normalizedFileName = shishKebab(
      typescriptFile.filePath.name.extensionless,
    );

    const allowedDerivativeNameSet = new Set([
      ...allowedCanonicalVariationDeclarationPrefixSet.map((prefix) => {
        return `${prefix}-${normalizedFileName}`;
      }),
      ...allowedCanonicalVariationDeclarationSuffixSet.map((suffix) => {
        return `${normalizedFileName}-${suffix}`;
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

        const normalizedIdentifierName =
          identifiableNode !== null
            ? shishKebab(identifiableNode.id.name)
            : null;

        const isImplicitlyCanonical =
          normalizedIdentifierName === normalizedFileName;

        const isImplicitCanonicalVariant =
          normalizedIdentifierName !== null &&
          allowedDerivativeNameSet.has(normalizedIdentifierName);

        const isExplicitlyCanonical =
          comment?.typeName === CategorizedCommentTypeName.Descriptive &&
          comment.tagIdSet.has(CommentTagId.ExplicitCanonicalDeclaration);

        return new CommentedProgramBodyDeclarationInstance({
          isImplicitlyCanonical,
          isImplicitCanonicalVariant,
          isExplicitlyCanonical,
          comment,
          commentText,
          bodyStatement: programBodyStatement,
          identifiableNode,
        });
      },
    );

    return new FileCommentedProgramBodyDeclarationGroupInstance({
      filePath: parsedTypeScriptFile.filePath,
      filePathObject: parsedTypeScriptFile.filePathObject,
      list: declarationList,
      commentGroup,
    });
  })
  .assemble();
