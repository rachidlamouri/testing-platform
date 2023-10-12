import { TSESTree } from '@typescript-eslint/typescript-estree';
import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { AstNodeLocator } from '../rename-nonsense/astNodeLocator';

/**
 * The information needed to find a string literal node
 */
export type StringLiteralNodeLocator = AstNodeLocator<TSESTree.StringLiteral>;

export const STRING_LITERAL_NODE_LOCATOR_GEPP = 'string-literal-node-locator';

type StringLiteralNodeLocatorGepp = typeof STRING_LITERAL_NODE_LOCATOR_GEPP;

export type StringLiteralNodeLocatorVoque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    StringLiteralNodeLocatorGepp,
    StringLiteralNodeLocator
  >;
