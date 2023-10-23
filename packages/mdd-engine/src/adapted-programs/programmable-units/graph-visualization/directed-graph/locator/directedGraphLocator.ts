import { IdLike } from '../../../../../package-agnostic-utilities/data-structure/id';
import { Source } from '../../../linting/source/source';
import { GlobalDirectedGraphId } from '../id/derived/global/globalDirectedGraphId';
import { DirectedGraphId } from '../id/directedGraphId';
import { DirectedGraphElementLocator } from './directedGraphElementLocator';
import { DirectedGraphLocatorInterface } from './directedGraphLikeLocatorInterface';

type DirectedGraphLocatorInput = {
  source: Source;
  distinguisher?: IdLike;
};

/**
 * The information needed to find a graph
 */
export class DirectedGraphLocator
  extends DirectedGraphElementLocator<
    DirectedGraphId,
    DirectedGraphId,
    GlobalDirectedGraphId
  >
  implements DirectedGraphLocatorInterface
{
  constructor(input: DirectedGraphLocatorInput) {
    const graphId = new DirectedGraphId({
      source: input.source,
      distinguisher: input.distinguisher ?? '',
    });

    const globalId = new GlobalDirectedGraphId({
      graph: graphId,
      local: '',
    });

    super({
      source: input.source,
      localComplexId: graphId,
      parentComplexId: graphId,
      graphId,
      globalId,
    });
  }
}
