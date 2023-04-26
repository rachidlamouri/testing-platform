import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { DirectedGraphStyle } from '../../graph-visualization/directed-graph/directedGraph';
import { RootDirectoryVoictent, ROOT_DIRECTORY_GEPP } from '../rootDirectory';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from '../typeScriptFileRelationshipGraphZorn';
import {
  BOUNDARY_CONFIGURATION_GEPP,
  BoundaryConfigurationVoictent,
  EXTERNAL_BOUNDARY_ZORN,
  LIMBO_BOUNDARY_ZORN,
  OVERVIEW_BOUNDARY_ZORN,
} from './boundaryConfiguration';
import {
  BOUNDARY_METADATA_GEPP,
  BoundaryMetadataOdeshin,
  BoundaryMetadataVoictent,
} from './boundaryMetadata';
import { FONT_SIZE, COMMON_ATTRIBUTE_BY_KEY } from './commonAttributeByKey';

/**
 * Gets information that is used to present Boundary items and to associate them
 * with items from other collections.
 */
export const getBoundaryMetadata = buildEstinant({
  name: 'getBoundaryMetadata',
})
  .fromGrition<BoundaryConfigurationVoictent>({
    gepp: BOUNDARY_CONFIGURATION_GEPP,
  })
  .andFromGritionTuple<RootDirectoryVoictent, [string]>({
    gepp: ROOT_DIRECTORY_GEPP,
    framate: () => [TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN],
    croard: (rightInput) => rightInput.zorn,
  })
  .toHubblepupTuple<BoundaryMetadataVoictent>({
    gepp: BOUNDARY_METADATA_GEPP,
  })
  .onPinbe((boundaryConfiguration, [rootDirectory]) => {
    const COMMON_BOUNDARY_ATTRIBUTE_BY_KEY = {
      fontsize: FONT_SIZE.boundary,
      style: DirectedGraphStyle.Bold,
      ...COMMON_ATTRIBUTE_BY_KEY,
    };

    const overviewBoundaryMetadata: BoundaryMetadataOdeshin = {
      zorn: OVERVIEW_BOUNDARY_ZORN,
      grition: {
        isInternal: null,
        id: boundaryConfiguration.overview.instanceId,
        description:
          'A visualization for the relationship between the other boundaries',
        attributeByKey: {
          label: 'Boundary: Overview',
          ...COMMON_BOUNDARY_ATTRIBUTE_BY_KEY,
        },
      },
    };

    const internalBoundaryMetadataList =
      boundaryConfiguration.internal.map<BoundaryMetadataOdeshin>(
        (internalConfiguration) => {
          const relativeDirectoryPath =
            internalConfiguration.directoryPath.replace(
              `${rootDirectory.directoryPath}/`,
              '',
            );

          return {
            zorn: `internal/${internalConfiguration.directoryPath}`,
            grition: {
              isInternal: true,
              id: internalConfiguration.instanceId,
              directoryPath: internalConfiguration.directoryPath,
              attributeByKey: {
                label: `Boundary: ${relativeDirectoryPath}`,
                ...COMMON_BOUNDARY_ATTRIBUTE_BY_KEY,
              },
            },
          };
        },
      );

    const externalBoundaryMetadata: BoundaryMetadataOdeshin = {
      zorn: EXTERNAL_BOUNDARY_ZORN,
      grition: {
        isInternal: false,
        id: boundaryConfiguration.external.instanceId,
        description: 'Modules from Node and NPM',
        attributeByKey: {
          label: 'Boundary: External Modules',
          ...COMMON_BOUNDARY_ATTRIBUTE_BY_KEY,
        },
      },
    };

    const limboBoundaryMetadata: BoundaryMetadataOdeshin = {
      zorn: LIMBO_BOUNDARY_ZORN,
      grition: {
        isInternal: null,
        id: boundaryConfiguration.limbo.instanceId,
        description:
          'If you are seeing this then something is most likely misconfigured. This boundary catches all other items without a boundary',
        attributeByKey: {
          label: 'Boundary: Limbo',
          ...COMMON_BOUNDARY_ATTRIBUTE_BY_KEY,
        },
      },
    };

    return [
      overviewBoundaryMetadata,
      ...internalBoundaryMetadataList,
      externalBoundaryMetadata,
      limboBoundaryMetadata,
    ];
  })
  .assemble();
