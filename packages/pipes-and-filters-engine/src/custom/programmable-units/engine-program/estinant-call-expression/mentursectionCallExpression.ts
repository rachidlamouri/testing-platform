import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { PredicateAssertionType } from '../../../../utilities/predicate';
import { buildIsEstinantCallExpression } from './baseEstinantCallExpression';

export const isMentursectionCallExpression = buildIsEstinantCallExpression<
  'buildMentursection',
  [TSESTree.TSTypeReference, TSESTree.TSTupleType]
>('buildMentursection', [
  AST_NODE_TYPES.TSTypeReference,
  AST_NODE_TYPES.TSTupleType,
]);

export type MentursectionCallExpression = PredicateAssertionType<
  typeof isMentursectionCallExpression
>;
