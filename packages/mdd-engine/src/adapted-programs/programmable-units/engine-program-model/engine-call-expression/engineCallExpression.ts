import { TSESTree, AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import {
  ObjectExpressionWithIdentifierProperties,
  isObjectExpressionWithIdentifiableProperties,
} from '../../../../package-agnostic-utilities/type-script-ast/isObjectExpressionWithIdentifiableProperties';
import { isSpecificExpressionStatement } from '../../../../package-agnostic-utilities/type-script-ast/isSpecificExpressionStatement';
import { CommentedProgramBodyDeclaration } from '../../type-script-file/commentedProgramBodyDeclaration';

/**
 * The type of the AST node that represents running the engine in a program
 */
type EngineCallExpression = TSESTree.CallExpression & {
  arguments: [ObjectExpressionWithIdentifierProperties];
};

type EngineCallExpressionStatement = TSESTree.ExpressionStatement & {
  expression: EngineCallExpression;
};

export const isEngineCallExpressionStatement = (
  node: TSESTree.Node,
  engineFunctionIdentifier: string,
): node is EngineCallExpressionStatement =>
  isSpecificExpressionStatement(node, AST_NODE_TYPES.CallExpression) &&
  node.expression.callee.type === AST_NODE_TYPES.Identifier &&
  node.expression.callee.name === engineFunctionIdentifier &&
  isObjectExpressionWithIdentifiableProperties(node.expression.arguments[0]);

export type EngineCallDeclaration = CommentedProgramBodyDeclaration<
  EngineCallExpressionStatement,
  null
>;
