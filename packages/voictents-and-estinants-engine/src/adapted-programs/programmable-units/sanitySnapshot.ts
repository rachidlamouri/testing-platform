import { InMemoryOdeshin2ListVoque } from '../../core/engine/inMemoryOdeshinVoictent2';

/**
 * Information to be committed that is expected to change if a program
 * fundamentally changes.
 */
type SanitySnapshot = {
  zorn: string;
  grition: unknown;
};

export const SANITY_SNAPSHOT_GEPP = 'sanity-snapshot';

type SanitySnapshotGepp = typeof SANITY_SNAPSHOT_GEPP;

export type SanitySnapshotVoque = InMemoryOdeshin2ListVoque<
  SanitySnapshotGepp,
  SanitySnapshot
>;