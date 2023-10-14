import { posix } from 'path';
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { isPredicateFunctionish } from '../../../package-agnostic-utilities/type-script-ast/isPredicateFunctionish';
import {
  LINT_ASSERTION_OMISSION_COLLECTION_ID,
  LintAssertionOmissionInstance,
  LintAssertionOmissionVoque,
} from '../linting/lintAssertionOmission';
import { ProgrammedTransformSourceInstance } from '../linting/source/estinantSource';
import {
  FileCommentedProgramBodyDeclarationGroupStreamMetatype,
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
} from './fileCommentedProgramBodyDeclarationGroup';
import { LintAssertionZorn } from '../linting/lintAssertion';
import { typeScriptFileHasCanonicalCommentRule } from './assertTypeScriptFileHasCanonicalComment';
import { FileSourceInstance } from '../linting/source/fileSource';
import { isExportNamedFunctionDeclaration } from '../../../package-agnostic-utilities/type-script-ast/isExportNamedFunctionDeclaration';
import { IdentifiableFunctionDeclaration } from '../../../package-agnostic-utilities/type-script-ast/isIdentifiableFunctionDeclaration';
import { IdentifiableProgramBodyStatementNode } from './getIdentifiableProgramBodyStatementNode';

const ESTINANT_NAME = 'exemptPredicatesFromCanonicalComment' as const;

/**
 * Predicates (which includes assertions) should have fairly literal names, so a
 * canonical comment is rather redundant.
 */
export const exemptPredicatesFromCanonicalComment = buildProgrammedTransform({
  name: ESTINANT_NAME,
})
  .fromItem2<FileCommentedProgramBodyDeclarationGroupStreamMetatype>({
    collectionId: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
  })
  .toItemTuple2<LintAssertionOmissionVoque>({
    collectionId: LINT_ASSERTION_OMISSION_COLLECTION_ID,
  })
  .onTransform((declarationGroup) => {
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
        omitterSource: new ProgrammedTransformSourceInstance({
          filePath: posix.resolve('', __filename),
          programmedTransformName: ESTINANT_NAME,
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
