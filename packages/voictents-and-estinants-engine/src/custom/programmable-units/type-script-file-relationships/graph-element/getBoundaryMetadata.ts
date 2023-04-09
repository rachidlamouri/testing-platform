import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { DirectedGraphStyle } from '../../graph-visualization/directed-graph/directedGraph';
import {
  BOUNDARY_CONFIGURATION_GEPP,
  BoundaryConfigurationVoictent,
} from './boundaryConfiguration';
import {
  BOUNDARY_METADATA_GEPP,
  BoundaryMetadataOdeshin,
  BoundaryMetadataVoictent,
} from './boundaryMetadata';
import { FONT_SIZE, COMMON_ATTRIBUTE_BY_KEY } from './commonAttributeByKey';

export const getBoundaryMetadata = buildEstinant({
  name: 'getBoundaryMetadata',
})
  .fromGrition<BoundaryConfigurationVoictent>({
    gepp: BOUNDARY_CONFIGURATION_GEPP,
  })
  .toHubblepupTuple<BoundaryMetadataVoictent>({
    gepp: BOUNDARY_METADATA_GEPP,
  })
  .onPinbe((boundaryConfiguration) => {
    const COMMON_BOUNDARY_ATTRIBUTE_BY_KEY = {
      fontsize: FONT_SIZE.boundary,
      style: DirectedGraphStyle.Bold,
      ...COMMON_ATTRIBUTE_BY_KEY,
    };

    const internalBoundaryMetadataList =
      boundaryConfiguration.internal.map<BoundaryMetadataOdeshin>(
        (internalConfiguration) => {
          return {
            zorn: `internal/${internalConfiguration.directoryPath}`,
            grition: {
              isInternal: true,
              id: internalConfiguration.instanceId,
              directoryPath: internalConfiguration.directoryPath,
              attributeByKey: {
                label: internalConfiguration.directoryPath,
                ...COMMON_BOUNDARY_ATTRIBUTE_BY_KEY,
              },
            },
          };
        },
      );

    const externalBoundaryMetadata: BoundaryMetadataOdeshin = {
      zorn: 'external',
      grition: {
        isInternal: false,
        id: boundaryConfiguration.external.instanceId,
        description: 'Modules from Node and NPM',
        attributeByKey: {
          label: 'External Modules',
          ...COMMON_BOUNDARY_ATTRIBUTE_BY_KEY,
        },
      },
    };

    const limboBoundaryMetadata: BoundaryMetadataOdeshin = {
      zorn: 'limbo',
      grition: {
        isInternal: null,
        id: boundaryConfiguration.limbo.instanceId,
        description:
          'If you are seeing this then something is most likely misconfigured. This boundary catches all other items without a boundary',
        attributeByKey: {
          label: 'Limbo Boundary',
          ...COMMON_BOUNDARY_ATTRIBUTE_BY_KEY,
        },
      },
    };

    return [
      ...internalBoundaryMetadataList,
      externalBoundaryMetadata,
      limboBoundaryMetadata,
    ];
  })
  .assemble();
