import { posix } from 'path';
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import { buildProgrammedTransform } from '../../../adapter/estinant-builder/buildEstinant';
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
export const filterFilePathLikeStringLiteral = buildProgrammedTransform({
  name: 'filterFilePathLikeStringLiteral',
})
  .fromItem2<StringLiteralNodeLocatorVoque>({
    collectionId: STRING_LITERAL_NODE_LOCATOR_GEPP,
  })
  .toItemTuple2<FilePathLikeStringLiteralVoque>({
    collectionId: FILE_PATH_LIKE_STRING_LITERAL_GEPP,
  })
  .onTransform((nodeLocator) => {
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
    // Note: generated app files are linted by renderApp
    if (
      sourceFileFilePath.serialized ===
        'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/datum-test-case-input/datumTestCaseInput.ts' ||
      sourceFileFilePath.serialized ===
        'packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-knowledge-graph/constructDynamicIndexFile.ts'
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
