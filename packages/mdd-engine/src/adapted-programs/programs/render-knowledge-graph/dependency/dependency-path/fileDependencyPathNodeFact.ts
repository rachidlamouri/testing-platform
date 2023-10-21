import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { SimplifyN } from '../../../../../package-agnostic-utilities/type/simplify';
import { DirectedGraphElement2 } from '../../../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { DirectedGraphNode2Instance } from '../../../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { GraphConstituentLocatorInstance } from '../../../../programmable-units/graph-visualization/directed-graph/graphConstituentLocator';
import { BoundedDirectory } from '../../directory/boundedDirectory';
import { FactTypeName } from '../../fact/factTypeName';
import { THEME } from '../../theme';
import {
  PartitionedFileDependencyPathNode,
  PartitionedFileDependencyPathNodeId,
} from './partitionedFileDependencyPathNode';

type FileDependencyPathNodeFactConstructorInput = {
  pathNode: PartitionedFileDependencyPathNode;
  directory: BoundedDirectory;
};

/**
 * Contains the graph element for a FileDependencyPathNode. A piece of knowledge.
 */
export type FileDependencyPathNodeFact = SimplifyN<
  [
    {
      typeName: FactTypeName.FileDependencyPathNodeFact;
      id: PartitionedFileDependencyPathNodeId;
    },
    FileDependencyPathNodeFactConstructorInput,
    {
      graphElement: DirectedGraphElement2;
    },
  ]
>;

export const { FileDependencyPathNodeFactInstance } =
  buildNamedConstructorFunction({
    constructorName: 'FileDependencyPathNodeFactInstance',
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'typeName',
      'id',
      'pathNode',
      'directory',
      'graphElement',
    ],
  } as const)
    .withTypes<
      FileDependencyPathNodeFactConstructorInput,
      FileDependencyPathNodeFact
    >({
      typeCheckErrorMessage: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { pathNode, directory } = input;

        const graphElement = new DirectedGraphNode2Instance({
          locator: new GraphConstituentLocatorInstance({
            rootGraphLocator: pathNode.partitionFact.rootGraphLocator,
            parentId: directory.localGraphElementId.forMachine,
            localId: pathNode.localGraphElementId,
          }),
          inputAttributeByKey: {
            label: 'X',
            ...THEME.dependencyPathNode,
          },
        });

        return {
          typeName: FactTypeName.FileDependencyPathNodeFact,
          id: pathNode.id,
          pathNode,
          directory,
          graphElement,
        } satisfies FileDependencyPathNodeFact;
      },
    })
    .assemble();

export const FILE_DEPENDENCY_PATH_NODE_FACT_COLLECTION_ID =
  'file-dependency-path-node-fact';

type FileDependencyPathNodeFactCollectionId =
  typeof FILE_DEPENDENCY_PATH_NODE_FACT_COLLECTION_ID;

export type FileDependencyPathNodeFactStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    FileDependencyPathNodeFactCollectionId,
    FileDependencyPathNodeFact
  >;
