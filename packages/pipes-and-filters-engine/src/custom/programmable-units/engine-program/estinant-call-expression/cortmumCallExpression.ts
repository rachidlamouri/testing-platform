import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { PredicateAssertionType } from '../../../../utilities/predicate';
import { buildIsEstinantCallExpression } from './baseEstinantCallExpression';

export const isCortmumCallExpression = buildIsEstinantCallExpression<
  'buildCortmum',
  [TSESTree.TSTypeReference, TSESTree.TSTupleType]
>('buildCortmum', [AST_NODE_TYPES.TSTypeReference, AST_NODE_TYPES.TSTupleType]);

export type CortmumCallExpression = PredicateAssertionType<
  typeof isCortmumCallExpression
>;
