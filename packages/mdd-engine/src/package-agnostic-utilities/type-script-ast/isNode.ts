import { TSESTree } from '@typescript-eslint/typescript-estree';
import { isNotNullish } from '../nil/isNotNullish';

export type NullishableTypeScriptNode = TSESTree.Node | null | undefined;

/** @deprecated use {@link NullishableTypeScriptNode}  */
export type TypeScriptNode = TSESTree.Node | null | undefined;

/** @deprecated just use {@link isNotNullish} */
export const isNode = (node: TypeScriptNode): node is TSESTree.Node => {
  return isNotNullish(node);
};
