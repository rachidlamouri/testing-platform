import { InMemoryOdeshin2ListVoque } from '../../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../../package-agnostic-utilities/constructor-function/namedConstructorFunctionBuilder';
import { SimplifyN } from '../../../../../package-agnostic-utilities/type/simplify';
import { DirectedGraphElement2 } from '../../../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { DirectedGraphNode2Instance } from '../../../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { GraphConstituentLocatorInstance } from '../../../../programmable-units/graph-visualization/directed-graph/graphConstituentLocator';
import { BoundedDirectory } from '../../directory/boundedDirectory';
import { FactTypeName } from '../../fact/factTypeName';
import { THEME } from '../../theme';
import {
  PartitionedFileDependencyPathNode,
  PartitionedFileDependencyPathNodeZorn,
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
      zorn: PartitionedFileDependencyPathNodeZorn;
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
      'zorn',
      'pathNode',
      'directory',
      'graphElement',
    ],
  } as const)
    .withTypes<
      FileDependencyPathNodeFactConstructorInput,
      FileDependencyPathNodeFact
    >({
      typeCheckErrorMesssages: {
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
            parentId: directory.localGraphElementZorn.forMachine,
            localZorn: pathNode.localGraphElementZorn,
          }),
          inputAttributeByKey: {
            label: '',
            ...THEME.directoryPathNode,
          },
        });

        return {
          typeName: FactTypeName.FileDependencyPathNodeFact,
          zorn: pathNode.zorn,
          pathNode,
          directory,
          graphElement,
        } satisfies FileDependencyPathNodeFact;
      },
    })
    .assemble();

export const FILE_DEPENDENCY_PATH_NODE_FACT_GEPP =
  'file-dependency-path-node-fact';

type FileDependencyPathNodeFactGepp =
  typeof FILE_DEPENDENCY_PATH_NODE_FACT_GEPP;

export type FileDependencyPathNodeFactVoque = InMemoryOdeshin2ListVoque<
  FileDependencyPathNodeFactGepp,
  FileDependencyPathNodeFact
>;
