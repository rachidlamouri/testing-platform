import { TSESTree } from '@typescript-eslint/typescript-estree';
import {
  IdentifiableCallExpression,
  isIdentifiableCallExpression,
} from './isIdentifiableCallExpression';
import {
  IdentifiableMemberExpressionCallExpression,
  isIdentifiableMemberExpressionCallExpression,
} from './isMemberExpressionCallExpression';

export type FlattenedCallExpressionOrError =
  | IdentifiableCallExpression
  | IdentifiableMemberExpressionCallExpression
  | Error;

type FlattenedCallExpressionAndErrorList = FlattenedCallExpressionOrError[];

const recursivelyFlattenCallExpressionChain = (
  callExpression: TSESTree.CallExpression,
  flattenedCallExpressionAndErrorList: FlattenedCallExpressionAndErrorList,
): void => {
  if (isIdentifiableCallExpression(callExpression)) {
    flattenedCallExpressionAndErrorList.push(callExpression);
    return;
  }

  if (isIdentifiableMemberExpressionCallExpression(callExpression.callee)) {
    const memberExpression = callExpression.callee;

    recursivelyFlattenCallExpressionChain(
      memberExpression.object,
      flattenedCallExpressionAndErrorList,
    );
    flattenedCallExpressionAndErrorList.push(memberExpression);
    return;
  }

  flattenedCallExpressionAndErrorList.push(
    new Error(`Unhandled call expression callee type "${callExpression.type}"`),
  );
};

/**
 * This is used to take each call expression in a chain of call expressions
 * (think Promise chain, or a builder chain), and to put them into a list in
 * order. That might sound simple, but the AST for a call expression chain is
 * actually inverted. The first node you find when traversing the tree is the
 * expression that gets added to the end of the list.
 */
export const flattenCallExpressionChain = (
  callExpression: TSESTree.CallExpression,
): FlattenedCallExpressionAndErrorList => {
  const flattenedCallExpressionAndErrorList: FlattenedCallExpressionAndErrorList =
    [];
  recursivelyFlattenCallExpressionChain(
    callExpression,
    flattenedCallExpressionAndErrorList,
  );
  return flattenedCallExpressionAndErrorList;
};
