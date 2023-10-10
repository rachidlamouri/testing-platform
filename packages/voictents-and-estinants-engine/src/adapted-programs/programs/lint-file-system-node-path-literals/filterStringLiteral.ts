import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
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
export const filterStringLiteral = buildEstinant({
  name: 'filterStringLiteral',
})
  .fromHubblepup2<AstNodeLocatorVoque>({
    gepp: AST_NODE_LOCATOR_GEPP,
  })
  .toHubblepupTuple2<StringLiteralNodeLocatorVoque>({
    gepp: STRING_LITERAL_NODE_LOCATOR_GEPP,
  })
  .onPinbe((nodeLocator) => {
    if (isStringLiteralLocator(nodeLocator)) {
      return [nodeLocator];
    }

    return [];
  })
  .assemble();
