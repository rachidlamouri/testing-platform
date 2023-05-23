import { InMemoryOdeshin2Voque } from '../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../adapter/voictent';

export type SanitySnapshotOdeshin = {
  zorn: string;
  grition: unknown;
};

export const SANITY_SNAPSHOT_GEPP = 'sanity-snapshot';

export type SanitySnapshotGepp = typeof SANITY_SNAPSHOT_GEPP;

export type SanitySnapshotVoictent = Voictent<
  SanitySnapshotGepp,
  SanitySnapshotOdeshin
>;

export type SanitySnapshotVoque = InMemoryOdeshin2Voque<
  SanitySnapshotGepp,
  SanitySnapshotOdeshin
>;
