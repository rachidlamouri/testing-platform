import {
  AST_TOKEN_TYPES,
  TSESTree,
} from '@typescript-eslint/typescript-estree';
import * as commentParser from 'comment-parser';
import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
import {
  PARSED_TYPE_SCRIPT_FILE_GEPP,
  ParsedTypeScriptFileVoque,
} from './parsedTypeScriptFile';
import { CategorizedComment } from './comment/categorized/categorizedComment';
import { assertHasZeroOrOneElements } from '../../../package-agnostic-utilities/array/assertHasZeroOrOneElements';
import {
  GenericLintAssertion,
  LINT_ASSERTION_GEPP,
  LintAssertionVoque,
} from '../linting/lintAssertion';
import { AdaptedComment } from './comment/adapted/adaptedComment';
import { AdaptedLineCommentInstance } from './comment/adapted/adaptedLineComment';
import { AdaptedJsdocLikeBlockCommentInstance } from './comment/adapted/adaptedJsdocLikeBlockComment';
import { AdaptedNormalBlockCommentInstance } from './comment/adapted/adaptedNormalBlockComment';
import { AdaptedCommentTypeName } from './comment/adapted/adaptedCommentTypeName';
import {
  CustomDirectiveCommentInstance,
  CustomDirectiveTypeName,
} from './comment/categorized/customDirectiveComment';
import {
  InformativeCommentInstance,
  InformativeCommentTypeName,
} from './comment/categorized/informativeComment';
import { UnknownCommentInstance } from './comment/categorized/unknownComment';
import { EslintDirectiveCommentInstance } from './comment/categorized/eslintDirectiveComment';
import { DescriptiveBlockCommentInstance } from './comment/categorized/descriptiveBlockComment';
import {
  FILE_PARSED_COMMENT_GROUP_GEPP,
  FileParsedCommentGroupInstance,
  FileParsedCommentGroupVoque,
} from './fileParsedCommentGroup';
import { CategorizedCommentTypeName } from './comment/categorized/categorizedCommentTypeName';

const getAdaptedComment = (
  filePath: string,
  rawComment: TSESTree.Comment,
): AdaptedComment => {
  if (rawComment.type === AST_TOKEN_TYPES.Line) {
    return new AdaptedLineCommentInstance({
      filePath,
      rawComment,
    });
  }

  const originalText = `/*${rawComment.value}*/`;
  const parsedCommentBlockList = commentParser.parse(originalText);
  assertHasZeroOrOneElements(parsedCommentBlockList);

  const [parsedCommentBlock] = parsedCommentBlockList;

  if (parsedCommentBlock !== undefined) {
    return new AdaptedJsdocLikeBlockCommentInstance({
      filePath,
      rawComment,
      parsedBlock: parsedCommentBlock,
    });
  }

  return new AdaptedNormalBlockCommentInstance({
    filePath,
    rawComment,
  });
};

const getCategorizedComment = (
  adaptedComment: AdaptedComment,
): CategorizedComment => {
  if (adaptedComment.typeName === AdaptedCommentTypeName.Line) {
    if (adaptedComment.text === 'multiline-keep') {
      return new CustomDirectiveCommentInstance({
        adaptedComment,
        subtypeName: CustomDirectiveTypeName.MultilineKeep,
      });
    }

    if (adaptedComment.text === 'no op') {
      return new CustomDirectiveCommentInstance({
        adaptedComment,
        subtypeName: CustomDirectiveTypeName.NoOperation,
      });
    }

    if (/^note: .+/.test(adaptedComment.text)) {
      return new InformativeCommentInstance({
        adaptedComment,
        subtypeName: InformativeCommentTypeName.Note,
      });
    }

    if (/^TODO: .+/.test(adaptedComment.text)) {
      return new InformativeCommentInstance({
        adaptedComment,
        subtypeName: InformativeCommentTypeName.Todo,
      });
    }

    if (/^eslint-disable-next-line .+/.test(adaptedComment.text)) {
      return new EslintDirectiveCommentInstance({
        adaptedComment,
      });
    }

    return new UnknownCommentInstance({
      adaptedComment,
    });
  }

  if (adaptedComment.typeName === AdaptedCommentTypeName.NormalBlock) {
    if (
      (adaptedComment.isSingleLine &&
        /^eslint-disable .+/.test(adaptedComment.text)) ||
      /^eslint-enable .+/.test(adaptedComment.text)
    ) {
      return new EslintDirectiveCommentInstance({
        adaptedComment,
      });
    }

    return new UnknownCommentInstance({
      adaptedComment,
    });
  }

  // TODO: maybe "descriptive" isn't the right word since it doesn't have to have a description
  const description = adaptedComment.parsedBlock.description.trim();
  return new DescriptiveBlockCommentInstance({
    adaptedComment,
    description,
  });
};

// TODO: apply this rule and consider moving it its own file
// type CommentHasKnownTypeMessageContext = {
//   text?: string;
// };
// const commentHasKnownTypeRule =
//   new TypedRule<CommentHasKnownTypeMessageContext>({
//     name: 'comment-has-known-type',
//     description: 'Comments must be able to be categorized.',
//     source: new FileSourceInstance({
//       filePath: __filename,
//     }),
//     getErrorMessage: ({ text }): string => {
//       const ending = text !== undefined ? `: ${text}` : '';
//       return `Unable to categorize comment${ending}`;
//     },
//   });

/**
 * Parses TypeScript file comments into a custom set of categories
 */
export const parseTypeScriptFileComments = buildEstinant({
  name: 'parseTypeScriptFileComments',
})
  .fromHubblepup2<ParsedTypeScriptFileVoque>({
    gepp: PARSED_TYPE_SCRIPT_FILE_GEPP,
  })
  .toHubblepup2<FileParsedCommentGroupVoque>({
    gepp: FILE_PARSED_COMMENT_GROUP_GEPP,
  })
  .toHubblepupTuple2<LintAssertionVoque>({
    gepp: LINT_ASSERTION_GEPP,
  })
  .onPinbe((parsedTypeScriptFile) => {
    const { filePath } = parsedTypeScriptFile;
    const commentList = parsedTypeScriptFile.program.comments ?? [];

    const adaptedCommentList = commentList.map((rawComment) =>
      getAdaptedComment(filePath, rawComment),
    );

    const categorizedCommentList = adaptedCommentList.map((adaptedComment) =>
      getCategorizedComment(adaptedComment),
    );

    const [firstComment = null] = categorizedCommentList;

    const firstStatement = parsedTypeScriptFile.program.body[0] ?? null;

    const fileComment =
      firstComment !== null &&
      firstComment.typeName === CategorizedCommentTypeName.Descriptive &&
      (firstStatement === null ||
        firstComment.endingLineNumber < firstStatement.loc.start.line - 1)
        ? firstComment
        : null;

    // 'adaptedComment' in  firstComment && firstComment.typeName

    // TODO: apply this assertion and consider moving it to a different transform
    const lintAssertionList: GenericLintAssertion[] = [];
    // categorizedCommentList.map((comment) => {
    //   return new LintAssertion({
    //     rule: commentHasKnownTypeRule,
    //     lintSource: new FileLineSourceInstance({
    //       filePath,
    //       lineNumber: comment.startingLineNumber,
    //     }),
    //     errorMessageContext: {
    //       text: 'text' in comment ? comment.text : undefined,
    //     },
    //     isValid: comment.typeName !== CategorizedCommentTypeName.Unknown,
    //     context: {
    //       comment,
    //     },
    //   });
    // });

    return {
      [LINT_ASSERTION_GEPP]: lintAssertionList,
      [FILE_PARSED_COMMENT_GROUP_GEPP]: new FileParsedCommentGroupInstance({
        filePath,
        list: categorizedCommentList,
        fileComment,
      }),
    };
  })
  .assemble();
