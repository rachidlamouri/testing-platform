import { buildEstinant } from '../../../../adapter/estinant-builder/buildEstinant';
import { GraphLikeStyle } from '../../graph-visualization/directed-graph/attributeByKeyGSC';
import {
  BOUNDARY_CONFIGURATION_GEPP,
  BoundaryConfigurationVoque,
  EXTERNAL_BOUNDARY_ZORN,
  LIMBO_BOUNDARY_ZORN,
  OVERVIEW_BOUNDARY_ZORN,
} from './boundaryConfiguration';
import {
  BOUNDARY_METADATA_GEPP,
  BoundaryMetadata,
  BoundaryMetadataVoque,
} from './boundaryMetadata';
import { FONT_SIZE, COMMON_ATTRIBUTE_BY_KEY } from './commonAttributeByKey';

/**
 * Gets information that is used to present Boundary items and to associate them
 * with items from other collections.
 */
export const getBoundaryMetadata = buildEstinant({
  name: 'getBoundaryMetadata',
})
  .fromHubblepup2<BoundaryConfigurationVoque>({
    gepp: BOUNDARY_CONFIGURATION_GEPP,
  })
  .toHubblepupTuple2<BoundaryMetadataVoque>({
    gepp: BOUNDARY_METADATA_GEPP,
  })
  .onPinbe((boundaryConfiguration) => {
    const COMMON_BOUNDARY_ATTRIBUTE_BY_KEY = {
      fontsize: FONT_SIZE.boundary,
      style: GraphLikeStyle.Bold,
      ...COMMON_ATTRIBUTE_BY_KEY,
    };

    const overviewBoundaryMetadata: BoundaryMetadata = {
      zorn: OVERVIEW_BOUNDARY_ZORN,

      isInternal: null,
      id: boundaryConfiguration.overview.instanceId,
      description:
        'A visualization for the relationship between the other boundaries',
      attributeByKey: {
        label: 'Boundary: Overview',
        ...COMMON_BOUNDARY_ATTRIBUTE_BY_KEY,
      },
    };

    const internalBoundaryMetadataList =
      boundaryConfiguration.internal.map<BoundaryMetadata>(
        (internalConfiguration) => {
          return {
            zorn: `internal/${internalConfiguration.directoryPath}`,

            isInternal: true,
            id: internalConfiguration.instanceId,
            directoryPath: internalConfiguration.directoryPath,
            attributeByKey: {
              label: `Boundary: ${internalConfiguration.displayName}`,
              ...COMMON_BOUNDARY_ATTRIBUTE_BY_KEY,
            },
          };
        },
      );

    const externalBoundaryMetadata: BoundaryMetadata = {
      zorn: EXTERNAL_BOUNDARY_ZORN,
      isInternal: false,
      id: boundaryConfiguration.external.instanceId,
      description: 'Modules from Node and NPM',
      attributeByKey: {
        label: 'Boundary: External Modules',
        ...COMMON_BOUNDARY_ATTRIBUTE_BY_KEY,
      },
    };

    const limboBoundaryMetadata: BoundaryMetadata = {
      zorn: LIMBO_BOUNDARY_ZORN,
      isInternal: null,
      id: boundaryConfiguration.limbo.instanceId,
      description:
        'If you are seeing this then something is most likely misconfigured. This boundary catches all other items without a boundary',
      attributeByKey: {
        label: 'Boundary: Limbo',
        ...COMMON_BOUNDARY_ATTRIBUTE_BY_KEY,
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
