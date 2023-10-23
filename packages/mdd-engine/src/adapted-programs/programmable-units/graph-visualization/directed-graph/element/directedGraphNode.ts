import { PartialNodeAttributeByKey } from '../directedGraphNode';
import { DirectedGraphLikeId } from '../id/derived/directedGraphLikeId';
import { DirectedGraphNodeId } from '../id/directedGraphNodeId';
import { DirectedGraphElementLocator } from '../locator/directedGraphElementLocator';
import { GlobalDirectedGraphNodeId } from '../id/derived/global/globalDirectedGraphNodeId';
import { DirectedGraphLikeLocator } from '../locator/directedGraphLikeLocator';
import { DirectedGraphLocator } from '../locator/directedGraphLocator';
import { Source } from '../../../linting/source/source';
import { IdLike } from '../../../../../package-agnostic-utilities/data-structure/id';

type DirectedGraphNodeInput = {
  graphLocator: DirectedGraphLocator;
  parentLocator: DirectedGraphLikeLocator;
  source: Source;
  distinguisher?: IdLike;
  inputAttributeByKey: Omit<PartialNodeAttributeByKey, 'id'>;
};

/**
 * Custom object that can be turned into a graphviz node
 */
export class DirectedGraphNode extends DirectedGraphElementLocator<
  DirectedGraphNodeId,
  DirectedGraphLikeId,
  GlobalDirectedGraphNodeId
> {
  inputAttributeByKey: Omit<PartialNodeAttributeByKey, 'id'>;

  constructor(input: DirectedGraphNodeInput) {
    const { graphId } = input.graphLocator;

    const localId = new DirectedGraphNodeId({
      source: input.source,
      distinguisher: input.distinguisher ?? '',
    });

    const globalId = new GlobalDirectedGraphNodeId({
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

    this.inputAttributeByKey = input.inputAttributeByKey;
  }
}
