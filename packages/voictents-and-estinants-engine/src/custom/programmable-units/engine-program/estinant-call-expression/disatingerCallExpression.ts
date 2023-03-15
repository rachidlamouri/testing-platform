import { TSESTree, AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import { PredicateAssertionType } from '../../../../utilities/predicate';
import { buildIsEstinantCallExpression } from './baseEstinantCallExpression';

export const isDisatingerCallExpression = buildIsEstinantCallExpression<
  'buildDisatinger',
  [TSESTree.TSTypeReference]
>('buildDisatinger', [AST_NODE_TYPES.TSTypeReference]);

export type DisatingerCallExpression = PredicateAssertionType<
  typeof isDisatingerCallExpression
>;
