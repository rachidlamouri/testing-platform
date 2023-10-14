import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import { buildProgrammedTransform } from '../../../adapter/estinant-builder/buildEstinant';
import {
  AST_NODE_LOCATOR_GEPP,
  AstNodeLocatorVoque,
  GenericAstNodeLocator,
} from './astNodeLocator';
import {
  IDENTIFIER_NODE_LOCATOR_GEPP,
  IdentifierNodeLocator,
  IdentifierNodeLocatorVoque,
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
  .fromItem2<AstNodeLocatorVoque>({
    collectionId: AST_NODE_LOCATOR_GEPP,
  })
  .toItemTuple2<IdentifierNodeLocatorVoque>({
    collectionId: IDENTIFIER_NODE_LOCATOR_GEPP,
  })
  .onTransform((nodeLocator) => {
    if (isIdentifierLocator(nodeLocator) && nodeLocator.node.name !== 'const') {
      return [nodeLocator];
    }

    return [];
  })
  .assemble();
