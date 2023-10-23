import { DirectedGraphElementLocator } from './directedGraphElementLocator';
import { GlobalDirectedClusterId } from '../id/derived/global/globalDirectedClusterId';
import { DirectedClusterId } from '../id/directedClusterId';
import { DirectedGraphLikeId } from '../id/derived/directedGraphLikeId';
import { Source } from '../../../linting/source/source';
import { IdLike } from '../../../../../package-agnostic-utilities/data-structure/id';
import {
  DirectedClusterLocatorInterface,
  DirectedGraphLikeLocatorInterface,
} from './directedGraphLikeLocatorInterface';
import { DirectedGraphLocator } from './directedGraphLocator';

type DirectedClusterLocatorInput = {
  graphLocator: DirectedGraphLocator;
  parentLocator: DirectedGraphLikeLocatorInterface;
  source: Source;
  distinguisher?: IdLike;
};

export class DirectedClusterLocator
  extends DirectedGraphElementLocator<
    DirectedClusterId,
    DirectedGraphLikeId,
    GlobalDirectedClusterId
  >
  implements DirectedClusterLocatorInterface
{
  constructor(input: DirectedClusterLocatorInput) {
    const { graphId } = input.graphLocator;

    const localId = new DirectedClusterId({
      source: input.source,
      distinguisher: input.distinguisher ?? '',
    });

    const globalId = new GlobalDirectedClusterId({
      graph: graphId,
      local: localId,
    });

    super({
      source: input.source,
      localComplexId: localId,
      parentComplexId: input.parentLocator.localComplexId,
      graphId,
      globalId,
    });
  }
}
