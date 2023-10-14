import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  STRING_LITERAL_NODE_LOCATOR_GEPP,
  StringLiteralNodeLocator,
  StringLiteralNodeLocatorVoque,
} from './stringLiteralNodeLocator';
import {
  GenericAstNodeLocator,
  AstNodeLocatorVoque,
  AST_NODE_LOCATOR_GEPP,
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
  .fromItem2<AstNodeLocatorVoque>({
    collectionId: AST_NODE_LOCATOR_GEPP,
  })
  .toItemTuple2<StringLiteralNodeLocatorVoque>({
    collectionId: STRING_LITERAL_NODE_LOCATOR_GEPP,
  })
  .onTransform((nodeLocator) => {
    if (isStringLiteralLocator(nodeLocator)) {
      return [nodeLocator];
    }

    return [];
  })
  .assemble();
