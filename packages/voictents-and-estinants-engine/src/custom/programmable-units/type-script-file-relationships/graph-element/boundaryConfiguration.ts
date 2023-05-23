import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
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
  zorn: string;
  overview: OverviewBoundaryConfiguration;
  internal: InternalBoundaryConfiguration[];
  external: ExternalBoundaryConfiguration;
  limbo: LimboBoundaryConfiguration;
};

export const BOUNDARY_CONFIGURATION_GEPP = 'boundary-configuration';

export type BoundaryConfigurationGepp = typeof BOUNDARY_CONFIGURATION_GEPP;

export type BoundaryConfigurationVoictent = Voictent<
  BoundaryConfigurationGepp,
  BoundaryConfiguration
>;

export type BoundaryConfigurationVoque = InMemoryOdeshin2Voque<
  BoundaryConfigurationGepp,
  BoundaryConfiguration
>;

export const createBoundaryConfiguration = (
  directoryPathList: string[],
): BoundaryConfiguration => {
  return {
    zorn: TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN,
    overview: {
      instanceId: 'overview-boundary',
    },
    internal: directoryPathList.map((directoryPath, index) => {
      return {
        instanceId: `internal-directory-boundary-${index}`,
        directoryPath,
      };
    }),
    external: {
      instanceId: 'external-boundary',
    },
    limbo: {
      instanceId: 'limbo-boundary',
    },
  };
};

export const OVERVIEW_BOUNDARY_ZORN = '* Overview';
export const EXTERNAL_BOUNDARY_ZORN = '* External';
export const LIMBO_BOUNDARY_ZORN = '* Limbo';
