import { posix } from 'path';
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
import { isPredicateFunctionish } from '../../../package-agnostic-utilities/type-script-ast/isPredicateFunctionish';
import {
  LINT_ASSERTION_OMISSION_GEPP,
  LintAssertionOmissionInstance,
  LintAssertionOmissionVoque,
} from '../linting/lintAssertionOmission';
import { EstinantSourceInstance } from '../linting/source/estinantSource';
import {
  FileCommentedProgramBodyDeclarationGroupVoque,
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP,
} from './fileCommentedProgramBodyDeclarationGroup';
import { LintAssertionZorn } from '../linting/lintAssertion';
import { typeScriptFileHasCanonicalCommentRule } from './assertTypeScriptFileHasCanonialComment';
import { FileSourceInstance } from '../linting/source/fileSource';
import { isExportNamedFunctionDeclaration } from '../../../package-agnostic-utilities/type-script-ast/isExportNamedFunctionDeclaration';
import { IdentifiableFunctionDeclaration } from '../../../package-agnostic-utilities/type-script-ast/isIdentifiableFunctionDeclaration';
import { IdentifiableProgramBodyStatementNode } from './getIdentifiableProgramBodyStatementNode';

const ESTINANT_NAME = 'exemptPredicatesFromCanonicalComment' as const;

/**
 * Predicates (which includes assertions) should have fairly literal names, so a
 * canonical comment is rather redundant.
 */
export const exemptPredicatesFromCanonicalComment = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<FileCommentedProgramBodyDeclarationGroupVoque>({
    gepp: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP,
  })
  .toHubblepupTuple2<LintAssertionOmissionVoque>({
    gepp: LINT_ASSERTION_OMISSION_GEPP,
  })
  .onPinbe((declarationGroup) => {
    const { canonicalDeclaration } = declarationGroup;

    let parentDeclaration:
      | Exclude<IdentifiableProgramBodyStatementNode, { type?: never }>
      | IdentifiableFunctionDeclaration;
    if (
      canonicalDeclaration !== null &&
      canonicalDeclaration.identifiableNode.type !== undefined
    ) {
      parentDeclaration = canonicalDeclaration.identifiableNode;
    } else if (
      canonicalDeclaration !== null &&
      isExportNamedFunctionDeclaration(canonicalDeclaration.bodyStatement)
    ) {
      parentDeclaration = canonicalDeclaration.bodyStatement.declaration;
    } else {
      return [];
    }

    // TODO: move logic to get canonicalNode elsewhere, and clean up "getIdentifiableProgramBodyStatementNode" because it makes this way harder than it needs to be
    let canonicalNode:
      | TSESTree.FunctionDeclaration
      | TSESTree.Expression
      | null;
    switch (parentDeclaration.type) {
      case AST_NODE_TYPES.ClassDeclaration:
      case AST_NODE_TYPES.TSEnumDeclaration:
      case AST_NODE_TYPES.TSTypeAliasDeclaration:
        return [];
      case AST_NODE_TYPES.FunctionDeclaration: {
        canonicalNode = parentDeclaration;
        break;
      }
      case AST_NODE_TYPES.VariableDeclarator: {
        canonicalNode = parentDeclaration.init;
      }
    }

    if (canonicalNode === null) {
      return [];
    }

    if (!isPredicateFunctionish(canonicalNode)) {
      return [];
    }

    return [
      new LintAssertionOmissionInstance({
        omitterSource: new EstinantSourceInstance({
          filePath: posix.resolve('', __filename),
          estinantName: ESTINANT_NAME,
        }),
        omittedAssertionZorn: new LintAssertionZorn({
          rule: typeScriptFileHasCanonicalCommentRule,
          lintSource: new FileSourceInstance({
            filePath: declarationGroup.filePath,
          }),
        }),
      }),
    ];
  })
  .assemble();
