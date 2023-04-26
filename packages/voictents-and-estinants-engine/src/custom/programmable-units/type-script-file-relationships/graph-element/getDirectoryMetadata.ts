import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { DIRECTORY_GEPP, DirectoryVoictent } from '../../file/directory';
import { DirectedGraphStyle } from '../../graph-visualization/directed-graph/directedGraph';
import { LIMBO_BOUNDARY_ZORN } from './boundaryConfiguration';
import {
  BOUNDARY_METADATA_GEPP,
  BoundaryMetadataVoictent,
} from './boundaryMetadata';
import { FONT_SIZE, COMMON_ATTRIBUTE_BY_KEY } from './commonAttributeByKey';
import {
  DIRECTORY_METADATA_GEPP,
  DirectoryMetadataVoictent,
} from './directoryMetadata';

/**
 * Gets information that is used to present Directory items and to associate
 * them with items from other collections.
 */
export const getDirectoryMetadata = buildEstinant({
  name: 'getDirectoryMetadata',
})
  .fromHubblepup<DirectoryVoictent>({
    gepp: DIRECTORY_GEPP,
  })
  .andFromGritionTuple<BoundaryMetadataVoictent, [string]>({
    gepp: BOUNDARY_METADATA_GEPP,
    framate: () => [LIMBO_BOUNDARY_ZORN],
    croard: (rightInput) => rightInput.zorn,
  })
  .andFromOdeshinVoictent<BoundaryMetadataVoictent>({
    gepp: BOUNDARY_METADATA_GEPP,
  })
  .toGrition<DirectoryMetadataVoictent>({
    gepp: DIRECTORY_METADATA_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((leftInput, [limboBoundary], boundaryList) => {
    const directory = leftInput.grition;

    const foundBoundary =
      boundaryList.find(
        (boundary) =>
          boundary.isInternal &&
          directory.directoryPath.startsWith(boundary.directoryPath),
      ) ?? limboBoundary;

    return {
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
