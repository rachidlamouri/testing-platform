import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { PredicateAssertionType } from '../../../../utilities/predicate';
import { buildIsEstinantCallExpression } from './baseEstinantCallExpression';

export const isWattlectionCallExpression = buildIsEstinantCallExpression<
  'buildWattlection',
  [TSESTree.TSTypeReference, TSESTree.TSTypeReference]
>('buildWattlection', [
  AST_NODE_TYPES.TSTypeReference,
  AST_NODE_TYPES.TSTypeReference,
]);

export type WattlectionCallExpression = PredicateAssertionType<
  typeof isWattlectionCallExpression
>;
