import { TSESTree, AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import { PredicateAssertionType } from '../../../../utilities/predicate';
import { buildIsEstinantCallExpression } from './baseEstinantCallExpression';

export const isWortinatorCallExpression = buildIsEstinantCallExpression<
  'buildWortinator',
  [TSESTree.TSTypeReference]
>('buildWortinator', [AST_NODE_TYPES.TSTypeReference]);

export type WortinatorCallExpression = PredicateAssertionType<
  typeof isWortinatorCallExpression
>;
