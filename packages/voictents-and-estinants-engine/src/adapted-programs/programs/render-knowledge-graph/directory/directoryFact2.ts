import { posix } from 'path';
import { assertNotNull } from '../../../../utilities/nil/assertNotNull';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../../utilities/types/simplify';
import { FileSystemNodeZorn } from '../../../programmable-units/file/fileSystemNode';
import { GraphConstituentLocatorInstance } from '../../../programmable-units/graph-visualization/directed-graph/graphConstituentLocator';
import {
  PartitionFact,
  PartitionFactZorn,
} from '../partition-fact/partitionFact';
import { THEME } from '../theme';
import { BoundedDirectory } from './boundedDirectory';
import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { DirectedCluster2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedCluster2';
import { DirectedGraphElement2 } from '../../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { FactTypeName } from '../fact/factTypeName';

const DIRECTORY_FACT_2_ZORN_TEMPLATE = [
  ['partitionFact', PartitionFactZorn],
  ['directory', FileSystemNodeZorn],
] as const satisfies GenericZorn2Template;
type DirectoryFact2ZornTemplate = typeof DIRECTORY_FACT_2_ZORN_TEMPLATE;
class DirectoryFact2Zorn extends Zorn2<DirectoryFact2ZornTemplate> {
  get rawTemplate(): DirectoryFact2ZornTemplate {
    return DIRECTORY_FACT_2_ZORN_TEMPLATE;
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
      zorn: DirectoryFact2Zorn;
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
    'zorn',
    'partitionFact',
    'directory',
    'graphElement',
  ],
} as const)
  .withTypes<DirectoryFact2ConstructorInput, DirectoryFact2>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { partitionFact, parentDirectory, directory } = input;

      const zorn = new DirectoryFact2Zorn({
        partitionFact: partitionFact.zorn,
        directory: directory.zorn,
      });

      let parentId: string;
      let label: string;
      if (directory.isBoundaryDirectory) {
        parentId = partitionFact.rootGraphLocator.id;
        label = directory.directoryPathFromCommonBoundaryRoot + posix.sep;
      } else {
        assertNotNull(parentDirectory);
        parentId = parentDirectory.localGraphElementZorn.forMachine;
        label = directory.directory.directoryPath.name.serialized + posix.sep;
      }

      const graphElement = new DirectedCluster2Instance({
        locator: new GraphConstituentLocatorInstance({
          rootGraphLocator: partitionFact.rootGraphLocator,
          parentId,
          localZorn: directory.localGraphElementZorn,
        }),
        inputAttributeByKey: {
          label,
          ...THEME.directorySubgraph,
        },
      });

      return {
        typeName: FactTypeName.DirectoryFact2,
        zorn,
        partitionFact,
        directory,
        graphElement,
      };
    },
  })
  .assemble();

export const DIRECTORY_FACT_2_GEPP = 'directory-fact-2';

type DirectoryFact2Gepp = typeof DIRECTORY_FACT_2_GEPP;

export type DirectoryFact2Voque = InMemoryOdeshin2ListVoque<
  DirectoryFact2Gepp,
  DirectoryFact2
>;