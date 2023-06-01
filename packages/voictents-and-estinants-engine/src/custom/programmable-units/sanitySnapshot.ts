import { InMemoryOdeshin2Voque } from '../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../adapter/voictent';

/**
 * Information to be committed that is expected to change if a program
 * fundamentally changes.
 */
export type SanitySnapshot = {
  zorn: string;
  grition: unknown;
};

export const SANITY_SNAPSHOT_GEPP = 'sanity-snapshot';

export type SanitySnapshotGepp = typeof SANITY_SNAPSHOT_GEPP;

export type SanitySnapshotVoictent = Voictent<
  SanitySnapshotGepp,
  SanitySnapshot
>;

export type SanitySnapshotVoque = InMemoryOdeshin2Voque<
  SanitySnapshotGepp,
  SanitySnapshot
>;
