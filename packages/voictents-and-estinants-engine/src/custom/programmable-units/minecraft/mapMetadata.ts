import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type Location = {
  id: number;
  name: string;
  east: number;
  south: number;
};

export type Edge = [Location, Location];

export type MapMetadata = {
  locationList: Location[];
  edgeList: Edge[];
};

export type MapMetadataGrition = Grition<MapMetadata>;

export type MapMetadataOdeshin = OdeshinFromGrition<MapMetadataGrition>;

export const MAP_METADATA_GEPP = 'map-metadata';

export type MapMetadataGepp = typeof MAP_METADATA_GEPP;

export type MapMetadataVoictent = Voictent<MapMetadataGepp, MapMetadataOdeshin>;
