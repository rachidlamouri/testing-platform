import { buildProgrammedTransform } from '../../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { splitList2 } from '../../../../../package-agnostic-utilities/array/splitList2';
import { LocatableError } from '../../../error/locatableError';
import { FileSourceInstance } from '../../../linting/source/fileSource';
import { DirectedGraph } from '../element/directedGraph';
import {
  DIRECTED_GRAPH_ELEMENT_COLLECTION_ID,
  DirectedGraphConstituent,
  DirectedGraphElementStreamMetatype,
} from '../element/directedGraphElement';
import {
  DIRECTED_GRAPH_ELEMENT_GROUP_COLLECTION_ID,
  DirectedGraphElementGroup,
  DirectedGraphElementGroupInput,
  DirectedGraphElementGroupStreamMetatype,
} from './directedGraphElementGroup';
import { assertNotUndefined } from '../../../../../package-agnostic-utilities/nil/assertNotUndefined';
import {
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
} from '../../../error/programError';
import { splitList3 } from '../../../../../package-agnostic-utilities/array/splitList3';

const reporterSource = new FileSourceInstance({
  absoluteFilePath: __filename,
});

/**
 * Groups graph elements by root directed graph
 */
export const groupGraphElements = buildProgrammedTransform({
  name: 'groupGraphElements',
})
  .fromCollection2<DirectedGraphElementStreamMetatype>({
    collectionId: DIRECTED_GRAPH_ELEMENT_COLLECTION_ID,
  })
  .toItemTuple2<DirectedGraphElementGroupStreamMetatype>({
    collectionId: DIRECTED_GRAPH_ELEMENT_GROUP_COLLECTION_ID,
  })
  .toItemTuple2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .onTransform((allElementCollection) => {
    const [directedGraphList, graphConstituentList] = splitList2({
      list: allElementCollection.list,
      isElementA: (element): element is DirectedGraph =>
        element instanceof DirectedGraph,
    });

    const mutableGroupInputByGraphId = new Map(
      directedGraphList.map((directedGraph) => {
        const mutableGroup: DirectedGraphElementGroupInput = {
          directedGraph,
          constituentList: [],
        };
        return [directedGraph.graphId.forHuman, mutableGroup];
      }),
    );

    const [groupableConstituentList, ungroupableConstituentList] = splitList3<
      DirectedGraphConstituent[]
    >({
      list: graphConstituentList,
      predicate: (constituent) => {
        return mutableGroupInputByGraphId.has(constituent.graphId.forHuman);
      },
    });

    const missingGraphConstituentErrorList = ungroupableConstituentList.map(
      (constituent) => {
        return new LocatableError({
          message: 'Unable to find graph for constituent',
          reporterSource,
          errorSource: constituent.source,
          context: {
            constituent,
          },
        });
      },
    );

    groupableConstituentList.forEach((constituent) => {
      const groupInput = mutableGroupInputByGraphId.get(
        constituent.graphId.forHuman,
      );
      assertNotUndefined(groupInput);
      groupInput.constituentList.push(constituent);
    });

    const groupInputList = [...mutableGroupInputByGraphId.values()];

    const missingParentConstituentList = groupInputList.flatMap(
      (groupInput) => {
        const constituentByLocalId = new Map(
          groupInput.constituentList.map((constituent) => {
            return [constituent.localComplexId.forHuman, constituent];
          }),
        );

        return groupInput.constituentList.filter((constituent) => {
          const parentId = constituent.parentComplexId.forHuman;
          const graphId = groupInput.directedGraph.graphId.forHuman;

          const hasParent =
            parentId === graphId || constituentByLocalId.has(parentId);

          return !hasParent;
        });
      },
    );

    const missingParentConstituentErrorList = missingParentConstituentList.map(
      (constituent) => {
        return new LocatableError({
          message: 'Unable to find parent element for constituent',
          reporterSource,
          errorSource: constituent.source,
          context: {
            constituent,
          },
        });
      },
    );

    const groupList = groupInputList.map((input) => {
      return new DirectedGraphElementGroup(input);
    });

    return {
      [DIRECTED_GRAPH_ELEMENT_GROUP_COLLECTION_ID]: groupList,
      [PROGRAM_ERROR_COLLECTION_ID]: [
        ...missingGraphConstituentErrorList,
        ...missingParentConstituentErrorList,
      ],
    };
  })
  .assemble();
