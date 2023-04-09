import { SetRequired } from 'type-fest';
import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { DirectedSubgraph } from '../../graph-visualization/directed-graph/directedGraph';

export type InternalBoundaryMetadata = {
  isInternal: true;
  id: string;
  directoryPath: string;
  attributeByKey: Omit<DirectedSubgraph['attributeByKey'], 'id'>;
};

export type ExternalBoundaryMetadata = {
  isInternal: false;
  id: string;
  description: string;
  attributeByKey: SetRequired<
    Omit<DirectedSubgraph['attributeByKey'], 'id'>,
    'label'
  >;
};

export type LimboBoundaryMetadata = {
  isInternal: null;
  id: string;
  description: string;
  attributeByKey: SetRequired<
    Omit<DirectedSubgraph['attributeByKey'], 'id'>,
    'label'
  >;
};

export type BoundaryMetadata =
  | InternalBoundaryMetadata
  | ExternalBoundaryMetadata
  | LimboBoundaryMetadata;

export type BoundaryMetadataGrition = Grition<BoundaryMetadata>;

export type BoundaryMetadataOdeshin =
  OdeshinFromGrition<BoundaryMetadataGrition>;

export const BOUNDARY_METADATA_GEPP = 'boundary-metadata';

export type BoundaryMetadataGepp = typeof BOUNDARY_METADATA_GEPP;

export type BoundaryMetadataVoictent = Voictent<
  BoundaryMetadataGepp,
  BoundaryMetadataOdeshin
>;
