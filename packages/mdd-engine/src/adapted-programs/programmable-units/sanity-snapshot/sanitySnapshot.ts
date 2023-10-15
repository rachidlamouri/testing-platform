import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

/**
 * Information to be committed that is expected to change if a program
 * fundamentally changes.
 */
type SanitySnapshot = {
  id: string;
  subitem: unknown;
};

export const SANITY_SNAPSHOT_COLLECTION_ID = 'sanity-snapshot';

type SanitySnapshotCollectionId = typeof SANITY_SNAPSHOT_COLLECTION_ID;

export type SanitySnapshotStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    SanitySnapshotCollectionId,
    SanitySnapshot
  >;
