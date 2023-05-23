import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { DIRECTORY_GEPP, DirectoryVoque } from '../../file/directory';
import { DirectedGraphStyle } from '../../graph-visualization/directed-graph/directedGraph';
import { LIMBO_BOUNDARY_ZORN } from './boundaryConfiguration';
import {
  BOUNDARY_METADATA_GEPP,
  BoundaryMetadataVoque,
} from './boundaryMetadata';
import { FONT_SIZE, COMMON_ATTRIBUTE_BY_KEY } from './commonAttributeByKey';
import {
  DIRECTORY_METADATA_GEPP,
  DirectoryMetadataVoque,
} from './directoryMetadata';

/**
 * Gets information that is used to present Directory items and to associate
 * them with items from other collections.
 */
export const getDirectoryMetadata = buildEstinant({
  name: 'getDirectoryMetadata',
})
  .fromHubblepup2<DirectoryVoque>({
    gepp: DIRECTORY_GEPP,
  })
  .andFromHubblepupTuple2<BoundaryMetadataVoque, [string]>({
    gepp: BOUNDARY_METADATA_GEPP,
    framate: () => [LIMBO_BOUNDARY_ZORN],
    croard: (rightInput) => rightInput.indexByName.zorn,
  })
  .andFromVoictent2<BoundaryMetadataVoque>({
    gepp: BOUNDARY_METADATA_GEPP,
  })
  .toHubblepup2<DirectoryMetadataVoque>({
    gepp: DIRECTORY_METADATA_GEPP,
  })
  .onPinbe((directory, [limboBoundary], boundaryList) => {
    const foundBoundary =
      boundaryList.find(
        (boundary) =>
          boundary.isInternal &&
          directory.directoryPath.startsWith(boundary.directoryPath),
      ) ?? limboBoundary;

    return {
      zorn: directory.instanceId,
      id: directory.instanceId,
      boundaryId: foundBoundary.id,
      attributeByKey: {
        label: `Directory: ${directory.directoryName}`,
        fontsize: FONT_SIZE.directory,
        style: DirectedGraphStyle.Rounded,
        color: 'gray',
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
    };
  })
  .assemble();
