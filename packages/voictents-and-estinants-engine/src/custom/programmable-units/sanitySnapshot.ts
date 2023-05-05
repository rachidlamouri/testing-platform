import { Grition } from '../adapter/grition';
import { OdeshinFromGrition } from '../adapter/odeshin';
import { Voictent } from '../adapter/voictent';

export type SanitySnapshot = unknown;

export type SanitySnapshotGrition = Grition<SanitySnapshot>;

export type SanitySnapshotOdeshin = OdeshinFromGrition<SanitySnapshotGrition>;

export const SANITY_SNAPSHOT_GEPP = 'sanity-snapshot';

export type SanitySnapshotGepp = typeof SANITY_SNAPSHOT_GEPP;

export type SanitySnapshotVoictent = Voictent<
  SanitySnapshotGepp,
  SanitySnapshotOdeshin
>;
