import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { PredicateAssertionType } from '../../../../utilities/predicate';
import { buildIsEstinantCallExpression } from './baseEstinantCallExpression';

export const isOnamaCallExpression = buildIsEstinantCallExpression<
  'buildOnama',
  [TSESTree.TSTypeReference, TSESTree.TSTypeReference]
>('buildOnama', [
  AST_NODE_TYPES.TSTypeReference,
  AST_NODE_TYPES.TSTypeReference,
]);

export type OnamaCallExpression = PredicateAssertionType<
  typeof isOnamaCallExpression
>;
