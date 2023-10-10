import { posix } from 'path';
import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
import {
  LINT_ASSERTION_GEPP,
  LintAssertion,
  LintAssertionVoque,
} from '../../programmable-units/linting/lintAssertion';
import {
  TypedRule,
  EmptyMessageContext,
} from '../../programmable-units/linting/rule';
import { EstinantSourceInstance } from '../../programmable-units/linting/source/estinantSource';
import {
  FILE_PATH_LIKE_STRING_LITERAL_GEPP,
  FilePathLikeStringLiteralVoque,
} from './filePathLikeStringLiteral';
import { FileLineColumnSourceInstance } from '../../programmable-units/linting/source/fileLineColumnSource';

const ESTINANT_NAME = 'assertFileSystemNodePathLiteralExists' as const;

const fileSystemNodePathLiteralExistsRule = new TypedRule<EmptyMessageContext>({
  name: 'file-system-node-path-literal-exists',
  description: `Any string literal that looks like a file system node path should reference an existing file system node.`,
  source: new EstinantSourceInstance({
    filePath: posix.relative('', __filename),
    estinantName: ESTINANT_NAME,
  }),
  getErrorMessage: (): string => {
    return `A string literal that looks like a file system node path does not reference a real path`;
  },
});

/**
 * Checks that a string literal with a file system path-like value has one or
 * more resolvable on disk paths
 */
export const assertFileSystemNodePathLiteralExists = buildEstinant({
  name: 'assertFileSystemNodePathLiteralExists',
})
  .fromHubblepup2<FilePathLikeStringLiteralVoque>({
    gepp: FILE_PATH_LIKE_STRING_LITERAL_GEPP,
  })
  .toHubblepup2<LintAssertionVoque>({
    gepp: LINT_ASSERTION_GEPP,
  })
  .onPinbe((filePathLikeStringLiteral) => {
    return new LintAssertion({
      rule: fileSystemNodePathLiteralExistsRule,
      lintSource: new FileLineColumnSourceInstance({
        filePath: filePathLikeStringLiteral.sourceFileFilePath.serialized,
        lineNumber: filePathLikeStringLiteral.lineNumber,
        columnNumber: filePathLikeStringLiteral.columnNumber,
      }),
      isValid: filePathLikeStringLiteral.resolvedFilePath.length > 0,
      errorMessageContext: {},
      context: {
        filePathLikeStringLiteral,
      },
    });
  })
  .assemble();
