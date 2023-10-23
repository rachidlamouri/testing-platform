import { IdLike } from '../../../../../package-agnostic-utilities/data-structure/id';
import { Source } from '../../../linting/source/source';
import { DirectedGraphLikeId } from '../id/derived/directedGraphLikeId';
import { GlobalDirectedSubgraphId } from '../id/derived/global/globalDirectedSubgraph';
import { DirectedSubgraphId } from '../id/directedSubgraphId';
import { DirectedGraphElementLocator } from './directedGraphElementLocator';
import {
  DirectedGraphLikeLocatorInterface,
  DirectedSubgraphLocatorInterface,
} from './directedGraphLikeLocatorInterface';
import { DirectedGraphLocator } from './directedGraphLocator';

type DirectedSubgraphLocatorInput = {
  graphLocator: DirectedGraphLocator;
  parentLocator: DirectedGraphLikeLocatorInterface;
  source: Source;
  distinguisher?: IdLike;
};

export class DirectedSubgraphLocator
  extends DirectedGraphElementLocator<
    DirectedSubgraphId,
    DirectedGraphLikeId,
    GlobalDirectedSubgraphId
  >
  implements DirectedSubgraphLocatorInterface
{
  constructor(input: DirectedSubgraphLocatorInput) {
    const { graphId } = input.graphLocator;

    const localId = new DirectedSubgraphId({
      source: input.source,
      distinguisher: input.distinguisher ?? '',
    });

    const globalId = new GlobalDirectedSubgraphId({
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
