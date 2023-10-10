import { posix } from 'path';
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
import { isRelativeFilePath } from '../../../package-agnostic-utilities/file/isRelativeFilePath';
import {
  FILE_PATH_LIKE_STRING_LITERAL_GEPP,
  FilePathLikeStringLiteralInstance,
  FilePathLikeStringLiteralVoque,
} from './filePathLikeStringLiteral';
import {
  STRING_LITERAL_NODE_LOCATOR_GEPP,
  StringLiteralNodeLocatorVoque,
} from './stringLiteralNodeLocator';
import { resolveFileSystemNodePath } from '../../../package-agnostic-utilities/file/resolveFileSystemNodePath';

const FILE_SYSTEM_NODE_PATH_REGEX = /^(\.\/|\.\.\/)?[.A-Za-z0-9/-]+$/;

const IS_SINGLE_PATH_LIKE_REGEX = /^[^/]*$/;

/**
 * Filters string literal AST nodes down to those that look like a file system node path
 */
export const filterFilePathLikeStringLiteral = buildEstinant({
  name: 'filterFilePathLikeStringLiteral',
})
  .fromHubblepup2<StringLiteralNodeLocatorVoque>({
    gepp: STRING_LITERAL_NODE_LOCATOR_GEPP,
  })
  .toHubblepupTuple2<FilePathLikeStringLiteralVoque>({
    gepp: FILE_PATH_LIKE_STRING_LITERAL_GEPP,
  })
  .onPinbe((nodeLocator) => {
    const sourceFileFilePath = nodeLocator.filePath;
    const literal = nodeLocator.node.value;

    if (
      literal === '/' ||
      literal === 'n/a' ||
      literal === './' ||
      literal === '../' ||
      // TODO: the "/generated/" one is brittle
      literal === '/generated/' ||
      // TODO: this is too specific of a case. parseTypeScript file uses a path that is relative to the input file not the cwd
      literal === './tsconfig.json'
    ) {
      return [];
    }

    if (
      nodeLocator.astPath.includes(AST_NODE_TYPES.ImportDeclaration) ||
      nodeLocator.astPath.includes(AST_NODE_TYPES.ImportExpression)
    ) {
      return [];
    }

    // TODO: make this less brittle
    if (
      sourceFileFilePath.serialized ===
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/datum-test-case-input/datumTestCaseInput.ts'
    ) {
      return [];
    }

    if (IS_SINGLE_PATH_LIKE_REGEX.test(literal)) {
      return [];
    }

    if (!FILE_SYSTEM_NODE_PATH_REGEX.test(literal)) {
      return [];
    }

    const referencedFilePath = isRelativeFilePath(literal)
      ? posix.relative(sourceFileFilePath.serialized, literal)
      : literal;
    const resolvedFilePath = resolveFileSystemNodePath(referencedFilePath);

    return [
      new FilePathLikeStringLiteralInstance({
        sourceFileFilePath,
        referencedFilePath,
        resolvedFilePath,
        lineNumber: `${nodeLocator.node.loc.start.line}`,
        columnNumber: `${nodeLocator.node.loc.start.column}`,
      }),
    ];
  })
  .assemble();
