import { TSESTree } from '@typescript-eslint/typescript-estree';

export type TypeScriptNode = TSESTree.Node | null | undefined;

export const isNode = (node: TypeScriptNode): node is TSESTree.Node =>
  node !== undefined && node !== null;
