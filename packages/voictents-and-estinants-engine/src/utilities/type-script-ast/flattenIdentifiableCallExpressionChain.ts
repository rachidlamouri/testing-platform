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

const recursivlyFlattenCallExpressionChain = (
  callExpression: TSESTree.CallExpression,
  flattenedCallExpressionAndErrorList: FlattenedCallExpressionAndErrorList,
): void => {
  if (isIdentifiableCallExpression(callExpression)) {
    flattenedCallExpressionAndErrorList.push(callExpression);
    return;
  }

  if (isIdentifiableMemberExpressionCallExpression(callExpression.callee)) {
    const memberExpression = callExpression.callee;

    recursivlyFlattenCallExpressionChain(
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

export const flattenCallExpressionChain = (
  callExpression: TSESTree.CallExpression,
): FlattenedCallExpressionAndErrorList => {
  const flattenedCallExpressionAndErrorList: FlattenedCallExpressionAndErrorList =
    [];
  recursivlyFlattenCallExpressionChain(
    callExpression,
    flattenedCallExpressionAndErrorList,
  );
  return flattenedCallExpressionAndErrorList;
};
