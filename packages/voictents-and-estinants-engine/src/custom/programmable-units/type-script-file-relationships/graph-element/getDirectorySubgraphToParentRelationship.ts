import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { ERROR_GEPP, ErrorVoictent } from '../../error/error';
import { DIRECTORY_GEPP, DirectoryVoictent } from '../../file/directory';
import {
  BOUNDARY_CONFIGURATION_GEPP,
  BoundaryConfigurationVoictent,
} from '../boundaryConfiguration';
import { ROOT_DIRECTED_GRAPH_ATTRIBUTE_BY_KEY } from './rootDirectedGraph';
import {
  SubgraphToGraphRelationshipVoictent,
  SUBGRAPH_TO_GRAPH_RELATIONSHIP_GEPP,
} from './subgraphToGraphRelationship';

export const getDirectorySubgraphToParentRelationship = buildEstinant({
  name: 'getDirectorySubgraphToParentRelationship',
})
  .fromHubblepup<DirectoryVoictent>({
    gepp: DIRECTORY_GEPP,
  })
  .andFromOdeshinVoictent<BoundaryConfigurationVoictent>({
    gepp: BOUNDARY_CONFIGURATION_GEPP,
  })
  .toHubblepupTuple<ErrorVoictent>({
    gepp: ERROR_GEPP,
  })
  .toHubblepupTuple<SubgraphToGraphRelationshipVoictent>({
    gepp: SUBGRAPH_TO_GRAPH_RELATIONSHIP_GEPP,
  })
  .onPinbe((leftInput, boundaryList) => {
    const directory = leftInput.grition;

    const foundBoundary = boundaryList.find((boundary) =>
      directory.directoryPath.startsWith(boundary.directoryPath),
    );

    if (foundBoundary === undefined) {
      return {
        [SUBGRAPH_TO_GRAPH_RELATIONSHIP_GEPP]: [
          {
            zorn: leftInput.zorn,
            grition: {
              parentId: ROOT_DIRECTED_GRAPH_ATTRIBUTE_BY_KEY.id,
              childId: directory.instanceId,
            },
          },
        ],
        [ERROR_GEPP]: [
          {
            zorn: `getDirectorySubgraphToParentRelationship/${leftInput.zorn}`,
            grition: {
              directory,
            },
          },
        ],
      };
    }

    return {
      [SUBGRAPH_TO_GRAPH_RELATIONSHIP_GEPP]: [
        {
          zorn: leftInput.zorn,
          grition: {
            parentId: foundBoundary.instanceId,
            childId: directory.instanceId,
          },
        },
      ],
      [ERROR_GEPP]: [],
    };
  })
  .assemble();
