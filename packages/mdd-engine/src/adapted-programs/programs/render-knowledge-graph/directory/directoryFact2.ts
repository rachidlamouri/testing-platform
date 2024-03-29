import { posix } from 'path';
import { assertNotNull } from '../../../../package-agnostic-utilities/nil/assertNotNull';
import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { FileSystemNodeId } from '../../../programmable-units/file/fileSystemNode';
import { GraphConstituentLocatorInstance } from '../../../programmable-units/graph-visualization/directed-graph/graphConstituentLocator';
import {
  PartitionFact,
  PartitionFactId,
} from '../partition-fact/partitionFact';
import { THEME } from '../theme';
import { BoundedDirectory } from './boundedDirectory';
import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { DirectedCluster2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedCluster2';
import { DirectedGraphElement2 } from '../../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { FactTypeName } from '../fact/factTypeName';

const DIRECTORY_FACT_2_ID_TEMPLATE = [
  ['partitionFact', PartitionFactId],
  ['directory', FileSystemNodeId],
] as const satisfies GenericComplexIdTemplate;
type DirectoryFact2IdTemplate = typeof DIRECTORY_FACT_2_ID_TEMPLATE;
class DirectoryFact2Id extends ComplexId<DirectoryFact2IdTemplate> {
  get rawTemplate(): DirectoryFact2IdTemplate {
    return DIRECTORY_FACT_2_ID_TEMPLATE;
  }
}

type DirectoryFact2ConstructorInput = {
  partitionFact: PartitionFact;
  parentDirectory: BoundedDirectory | null;
  directory: BoundedDirectory;
};

/**
 * Contains the graph element for a directory within a specific partition. A
 * piece of knowledge.
 */
export type DirectoryFact2 = SimplifyN<
  [
    {
      typeName: FactTypeName.DirectoryFact2;
      id: DirectoryFact2Id;
    },
    Omit<DirectoryFact2ConstructorInput, 'parentDirectory'>,
    {
      graphElement: DirectedGraphElement2;
    },
  ]
>;

export const { DirectoryFact2Instance } = buildNamedConstructorFunction({
  constructorName: 'DirectoryFact2Instance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'typeName',
    'id',
    'partitionFact',
    'directory',
    'graphElement',
  ],
} as const)
  .withTypes<DirectoryFact2ConstructorInput, DirectoryFact2>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { partitionFact, parentDirectory, directory } = input;

      const id = new DirectoryFact2Id({
        partitionFact: partitionFact.id,
        directory: directory.id,
      });

      let parentId: string;
      let label: string;
      if (directory.isBoundaryDirectory) {
        parentId = partitionFact.rootGraphLocator.oldId;
        label = directory.directoryPathFromCommonBoundaryRoot + posix.sep;
      } else {
        assertNotNull(parentDirectory);
        parentId = parentDirectory.localGraphElementId.forMachine;
        label = directory.directory.directoryPath.name.serialized + posix.sep;
      }

      const graphElement = new DirectedCluster2Instance({
        locator: new GraphConstituentLocatorInstance({
          rootGraphLocator: partitionFact.rootGraphLocator,
          parentId,
          localId: directory.localGraphElementId,
        }),
        inputAttributeByKey: {
          label,
          ...THEME.directorySubgraph,
        },
      });

      return {
        typeName: FactTypeName.DirectoryFact2,
        id,
        partitionFact,
        directory,
        graphElement,
      };
    },
  })
  .assemble();

export const DIRECTORY_FACT_2_COLLECTION_ID = 'directory-fact-2';

type DirectoryFact2CollectionId = typeof DIRECTORY_FACT_2_COLLECTION_ID;

export type DirectoryFact2StreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    DirectoryFact2CollectionId,
    DirectoryFact2
  >;
