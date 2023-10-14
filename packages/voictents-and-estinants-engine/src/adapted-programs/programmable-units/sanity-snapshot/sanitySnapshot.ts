import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

/**
 * Information to be committed that is expected to change if a program
 * fundamentally changes.
 */
type SanitySnapshot = {
  zorn: string;
  grition: unknown;
};

export const SANITY_SNAPSHOT_COLLECTION_ID = 'sanity-snapshot';

type SanitySnapshotGepp = typeof SANITY_SNAPSHOT_COLLECTION_ID;

export type SanitySnapshotVoque = InMemoryIdentifiableItem2ListStreamMetatype<
  SanitySnapshotGepp,
  SanitySnapshot
>;
