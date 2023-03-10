import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { PredicateAssertionType } from '../../../../utilities/predicate';
import { buildIsEstinantCallExpression } from './baseEstinantCallExpression';

export const isMattomerCallExpression = buildIsEstinantCallExpression<
  'buildMattomer',
  [TSESTree.TSTypeReference, TSESTree.TSTupleType]
>('buildMattomer', [
  AST_NODE_TYPES.TSTypeReference,
  AST_NODE_TYPES.TSTupleType,
]);

export type MattomerCallExpression = PredicateAssertionType<
  typeof isMattomerCallExpression
>;
