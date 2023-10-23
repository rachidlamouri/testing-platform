import { DirectedClusterId } from '../id/directedClusterId';
import { DirectedGraphLikeId } from '../id/derived/directedGraphLikeId';
import { DirectedClusterLocator } from '../locator/directedClusterLocator';
import { PartialClusterAttributeByKey } from '../directedSubgraph';
import { DirectedGraphElementLocator } from '../locator/directedGraphElementLocator';
import { GlobalDirectedClusterId } from '../id/derived/global/globalDirectedClusterId';

type DirectedClusterInput = {
  locator: DirectedClusterLocator;
  inputAttributeByKey: Omit<PartialClusterAttributeByKey, 'id'>;
};

/**
 * Custom object that can be turned into a graphviz directed cluster
 */
export class DirectedCluster
  extends DirectedGraphElementLocator<
    DirectedClusterId,
    DirectedGraphLikeId,
    GlobalDirectedClusterId
  >
  implements DirectedClusterInput
{
  inputAttributeByKey: Omit<PartialClusterAttributeByKey, 'id'>;

  locator: DirectedClusterLocator;

  constructor(input: DirectedClusterInput) {
    super(input.locator);

    this.locator = input.locator;
    this.inputAttributeByKey = input.inputAttributeByKey;
  }
}
