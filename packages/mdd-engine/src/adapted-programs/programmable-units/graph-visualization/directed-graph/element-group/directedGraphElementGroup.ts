import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { DirectedGraphConstituent } from '../element/directedGraphElement';
import { DirectedGraph } from '../element/directedGraph';
import { GlobalDirectedGraphId } from '../id/derived/global/globalDirectedGraph';
import { isDirectedEdge, isDirectedSubgraphLike } from '../element/utilities';
import { splitList2 } from '../../../../../package-agnostic-utilities/array/splitList2';
import { RootGroup, RootGroupInput } from './rootGroup';
import { SubgroupInput } from './subgroup';
import { assertNotUndefined } from '../../../../../package-agnostic-utilities/nil/assertNotUndefined';

export type DirectedGraphElementGroupInput = {
  directedGraph: DirectedGraph;
  constituentList: DirectedGraphConstituent[];
};

/**
 * A directed graph element and all of its constituent elements
 *
 * @note A group may be incomplete. That is, elements in the constituent list
 * may not have a parent element in the constituent list. See
 * "groupGraphElements" for error handling.
 */
export class DirectedGraphElementGroup
  implements DirectedGraphElementGroupInput
{
  get id(): GlobalDirectedGraphId {
    return this.directedGraph.globalId;
  }

  directedGraph: DirectedGraph;

  constituentList: DirectedGraphConstituent[];

  rootGroup: RootGroup;

  constructor(input: DirectedGraphElementGroupInput) {
    this.directedGraph = input.directedGraph;
    this.constituentList = input.constituentList;
    this.rootGroup = this.createRootGroupTree(input);
  }

  private createRootGroupTree(
    input: DirectedGraphElementGroupInput,
  ): RootGroup {
    const [edgeList, otherConstituentList] = splitList2({
      list: input.constituentList,
      isElementA: isDirectedEdge,
    });

    const mutableRootGroupInput: RootGroupInput = {
      graphLike: input.directedGraph,
      nodeList: [],
      edgeList,
      subgroupInputList: [],
    };

    const mutableSubgroupInputList = otherConstituentList
      .filter(isDirectedSubgraphLike)
      .map<SubgroupInput>((subgraphLike) => {
        return {
          graphLike: subgraphLike,
          nodeList: [],
          subgroupInputList: [],
        };
      });

    const mutableGroupById = new Map(
      [mutableRootGroupInput, ...mutableSubgroupInputList].map((group) => {
        return [group.graphLike.localIdDigest, group];
      }),
    );

    otherConstituentList.forEach((constituent) => {
      const parentGroup = mutableGroupById.get(constituent.localParentIdDigest);

      // note: this edge case is handled by "groupGraphElements"
      if (parentGroup === undefined) {
        return;
      }

      if (isDirectedSubgraphLike(constituent)) {
        const constituentInput = mutableGroupById.get(
          constituent.localIdDigest,
        );
        assertNotUndefined(constituentInput);
        const subgroupInput = constituentInput as SubgroupInput;
        parentGroup.subgroupInputList.push(subgroupInput);
        return;
      }

      parentGroup.nodeList.push(constituent);
    });

    return new RootGroup(mutableRootGroupInput);
  }
}

export const DIRECTED_GRAPH_ELEMENT_GROUP_COLLECTION_ID =
  'directed-graph-element-group';

type DirectedGraphElementGroupCollectionId =
  typeof DIRECTED_GRAPH_ELEMENT_GROUP_COLLECTION_ID;

export type DirectedGraphElementGroupStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    DirectedGraphElementGroupCollectionId,
    DirectedGraphElementGroup
  >;
