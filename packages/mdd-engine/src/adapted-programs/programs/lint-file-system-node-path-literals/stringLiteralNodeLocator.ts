import { TSESTree } from '@typescript-eslint/typescript-estree';
import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { AstNodeLocator } from '../rename-nonsense/astNodeLocator';

/**
 * The information needed to find a string literal node
 */
export type StringLiteralNodeLocator = AstNodeLocator<TSESTree.StringLiteral>;

export const STRING_LITERAL_NODE_LOCATOR_COLLECTION_ID =
  'string-literal-node-locator';

type StringLiteralNodeLocatorCollectionId =
  typeof STRING_LITERAL_NODE_LOCATOR_COLLECTION_ID;

export type StringLiteralNodeLocatorStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    StringLiteralNodeLocatorCollectionId,
    StringLiteralNodeLocator
  >;
