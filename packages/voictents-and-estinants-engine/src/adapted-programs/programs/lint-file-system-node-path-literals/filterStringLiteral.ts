import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  STRING_LITERAL_NODE_LOCATOR_COLLECTION_ID,
  StringLiteralNodeLocator,
  StringLiteralNodeLocatorStreamMetatype,
} from './stringLiteralNodeLocator';
import {
  GenericAstNodeLocator,
  AstNodeLocatorStreamMetatype,
  AST_NODE_LOCATOR_COLLECTION_ID,
} from '../rename-nonsense/astNodeLocator';

const isStringLiteralLocator = (
  nodeLocator: GenericAstNodeLocator,
): nodeLocator is StringLiteralNodeLocator => {
  return (
    nodeLocator.node.type === AST_NODE_TYPES.Literal &&
    typeof nodeLocator.node.value === 'string'
  );
};

/**
 * Pipes string literal ast node locators into their own collection
 */
export const filterStringLiteral = buildProgrammedTransform({
  name: 'filterStringLiteral',
})
  .fromItem2<AstNodeLocatorStreamMetatype>({
    collectionId: AST_NODE_LOCATOR_COLLECTION_ID,
  })
  .toItemTuple2<StringLiteralNodeLocatorStreamMetatype>({
    collectionId: STRING_LITERAL_NODE_LOCATOR_COLLECTION_ID,
  })
  .onTransform((nodeLocator) => {
    if (isStringLiteralLocator(nodeLocator)) {
      return [nodeLocator];
    }

    return [];
  })
  .assemble();
