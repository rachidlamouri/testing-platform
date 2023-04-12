import * as uuid from 'uuid';
import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from '../typeScriptFileRelationshipGraphZorn';

export type OverviewBoundaryConfiguration = {
  instanceId: string;
};

export type InternalBoundaryConfiguration = {
  instanceId: string;
  directoryPath: string;
};

export type ExternalBoundaryConfiguration = {
  instanceId: string;
};

export type LimboBoundaryConfiguration = {
  instanceId: string;
};

export type BoundaryConfiguration = {
  overview: OverviewBoundaryConfiguration;
  internal: InternalBoundaryConfiguration[];
  external: ExternalBoundaryConfiguration;
  limbo: LimboBoundaryConfiguration;
};

export type BoundaryConfigurationGrition = Grition<BoundaryConfiguration>;

export type BoundaryConfigurationOdeshin =
  OdeshinFromGrition<BoundaryConfigurationGrition>;

export const BOUNDARY_CONFIGURATION_GEPP = 'boundary-configuration';

export type BoundaryConfigurationGepp = typeof BOUNDARY_CONFIGURATION_GEPP;

export type BoundaryConfigurationVoictent = Voictent<
  BoundaryConfigurationGepp,
  BoundaryConfigurationOdeshin
>;

export const createBoundaryConfiguration = (
  directoryPathList: string[],
): BoundaryConfigurationOdeshin => {
  return {
    zorn: TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN,
    grition: {
      overview: {
        instanceId: uuid.v4(),
      },
      internal: directoryPathList.map((directoryPath) => {
        return {
          instanceId: uuid.v4(),
          directoryPath,
        };
      }),
      external: {
        instanceId: uuid.v4(),
      },
      limbo: {
        instanceId: uuid.v4(),
      },
    },
  };
};

export const OVERVIEW_BOUNDARY_ZORN = '* Overview';
export const EXTERNAL_BOUNDARY_ZORN = '* External';
export const LIMBO_BOUNDARY_ZORN = '* Limbo';
