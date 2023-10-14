import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  AST_NODE_LOCATOR_COLLECTION_ID,
  AstNodeLocatorStreamMetatype,
  GenericAstNodeLocator,
} from './astNodeLocator';
import {
  IDENTIFIER_NODE_LOCATOR_COLLECTION_ID,
  IdentifierNodeLocator,
  IdentifierNodeLocatorStreamMetatype,
} from './identifierNodeLocator';

const isIdentifierLocator = (
  nodeLocator: GenericAstNodeLocator,
): nodeLocator is IdentifierNodeLocator => {
  return nodeLocator.node.type === AST_NODE_TYPES.Identifier;
};

/**
 * Pipes identifier ast node locators into their own collection
 */
export const filterIdentifier = buildProgrammedTransform({
  name: 'filterIdentifier',
})
  .fromItem2<AstNodeLocatorStreamMetatype>({
    collectionId: AST_NODE_LOCATOR_COLLECTION_ID,
  })
  .toItemTuple2<IdentifierNodeLocatorStreamMetatype>({
    collectionId: IDENTIFIER_NODE_LOCATOR_COLLECTION_ID,
  })
  .onTransform((nodeLocator) => {
    if (isIdentifierLocator(nodeLocator) && nodeLocator.node.name !== 'const') {
      return [nodeLocator];
    }

    return [];
  })
  .assemble();
