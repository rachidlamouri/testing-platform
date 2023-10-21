import { TSESTree } from '@typescript-eslint/typescript-estree';
import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { AstNodeLocator } from './astNodeLocator';

/**
 * The information needed to find an identifier node
 */
export type IdentifierNodeLocator = AstNodeLocator<TSESTree.Identifier>;

export const IDENTIFIER_NODE_LOCATOR_COLLECTION_ID = 'identifier-node-locator';

type IdentifierNodeLocatorCollectionId =
  typeof IDENTIFIER_NODE_LOCATOR_COLLECTION_ID;

export type IdentifierNodeLocatorStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    IdentifierNodeLocatorCollectionId,
    IdentifierNodeLocator
  >;
