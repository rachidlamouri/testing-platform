import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../../utilities/simplify';
import { FileSystemNodeZorn } from '../../../programmable-units/file/fileSystemNode';
import {
  DirectedGraphNode2,
  DirectedGraphNode2Instance,
} from '../../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { GraphConstituentLocatorInstance } from '../../../programmable-units/graph-visualization/directed-graph/graphConstituentLocator';
import { BoundedDirectory } from '../directory/boundedDirectory';
import {
  PartitionFact,
  PartitionFactZorn,
} from '../partition-fact/partitionFact';
import { THEME } from '../theme';
import { BoundedFile } from './boundedFile';

const FILE_FACT_2_ZORN_TEMPLATE = [
  ['partitionFact', PartitionFactZorn],
  ['boundedFile', FileSystemNodeZorn],
] as const satisfies GenericZorn2Template;
type FileFact2ZornTemplate = typeof FILE_FACT_2_ZORN_TEMPLATE;
class FileFact2Zorn extends Zorn2<FileFact2ZornTemplate> {
  get rawTemplate(): FileFact2ZornTemplate {
    return FILE_FACT_2_ZORN_TEMPLATE;
  }
}

type FileFact2ConstructorInput = {
  partitionFact: PartitionFact;
  parentBoundedDirectory: BoundedDirectory;
  boundedFile: BoundedFile;
};

/**
 * Contains the graph element for a file within a
 * specific partition. A piece of knowledge.
 */
type FileFact2 = SimplifyN<
  [
    { zorn: FileFact2Zorn },
    Omit<FileFact2ConstructorInput, 'parentBoundedDirectory'>,
    {
      graphElement: DirectedGraphNode2;
    },
  ]
>;

export const { FileFact2Instance } = buildNamedConstructorFunction({
  constructorName: 'FileFact2Instance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'partitionFact',
    'boundedFile',
    'graphElement',
  ],
} as const)
  .withTypes<FileFact2ConstructorInput, FileFact2>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { partitionFact, parentBoundedDirectory, boundedFile } = input;

      const zorn = new FileFact2Zorn({
        partitionFact: partitionFact.zorn,
        boundedFile: boundedFile.zorn,
      });

      const graphElement = new DirectedGraphNode2Instance({
        locator: new GraphConstituentLocatorInstance({
          rootGraphLocator: partitionFact.rootGraphLocator,
          parentId: parentBoundedDirectory.localGraphElementZorn.forMachine,
          localZorn: boundedFile.localGraphElementZorn,
        }),
        inputAttributeByKey: {
          label: boundedFile.nodePath.name.extensionless,
          ...THEME.file,
        },
      });

      return {
        zorn,
        partitionFact,
        boundedFile,
        graphElement,
      };
    },
  })
  .assemble();

export const FILE_FACT_2_GEPP = 'file-fact-2';

type FileFact2Gepp = typeof FILE_FACT_2_GEPP;

export type FileFact2Voque = InMemoryOdeshin2ListVoque<
  FileFact2Gepp,
  FileFact2
>;
