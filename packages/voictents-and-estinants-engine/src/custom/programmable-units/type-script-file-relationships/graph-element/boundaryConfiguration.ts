import fs from 'fs';
import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from '../typeScriptFileRelationshipGraphZorn';

type OverviewBoundaryConfiguration = {
  instanceId: string;
};

type InternalBoundaryConfiguration = {
  instanceId: string;
  directoryPath: string;
  displayName: string;
};

type ExternalBoundaryConfiguration = {
  instanceId: string;
};

type LimboBoundaryConfiguration = {
  instanceId: string;
};

/**
 * The information needed to establish an arbitrary grouping of files in the
 * TypeScript knowledge graph
 */
type BoundaryConfiguration = {
  zorn: string;
  overview: OverviewBoundaryConfiguration;
  internal: InternalBoundaryConfiguration[];
  external: ExternalBoundaryConfiguration;
  limbo: LimboBoundaryConfiguration;
};

export const BOUNDARY_CONFIGURATION_GEPP = 'boundary-configuration';

type BoundaryConfigurationGepp = typeof BOUNDARY_CONFIGURATION_GEPP;

export type BoundaryConfigurationVoque = InMemoryOdeshin2Voque<
  BoundaryConfigurationGepp,
  BoundaryConfiguration
>;

export const createBoundaryConfiguration = (
  manualInputList: Pick<
    InternalBoundaryConfiguration,
    'displayName' | 'directoryPath'
  >[],
): BoundaryConfiguration => {
  // TODO: move this logic elsewhere. Perhaps something that creates a program error
  const invalidBoundaryList = manualInputList.filter((manualInput) => {
    return !fs.existsSync(manualInput.directoryPath);
  });

  if (invalidBoundaryList.length > 0) {
    const errorMessage = [
      'The following declared boundaries do not exist',
      ...invalidBoundaryList.map((manualInput) => {
        return `  ${manualInput.displayName}: ${manualInput.directoryPath}`;
      }),
    ].join('\n');
    throw Error(errorMessage);
  }

  return {
    zorn: TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN,
    overview: {
      instanceId: 'overview-boundary',
    },
    internal: manualInputList.map((manualInput, index) => {
      return {
        instanceId: `internal-directory-boundary-${index}`,
        ...manualInput,
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
