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
import { Metadata } from '../app/browser/dynamicComponentTypes';
import { BoundedDirectory } from '../directory/boundedDirectory';
import { FactTypeName } from '../fact/factTypeName';
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
  importedNodeIdSet: Set<string>;
  importingNodeIdSet: Set<string>;
};

/**
 * Contains the graph element for a file within a
 * specific partition. A piece of knowledge.
 */
export type FileFact2 = SimplifyN<
  [
    {
      typeName: FactTypeName.FileFact2;
      zorn: FileFact2Zorn;
    },
    Omit<FileFact2ConstructorInput, 'parentBoundedDirectory'>,
    {
      graphElement: DirectedGraphNode2;
      graphMetadata: Metadata;
    },
  ]
>;

export const { FileFact2Instance } = buildNamedConstructorFunction({
  constructorName: 'FileFact2Instance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'typeName',
    'zorn',
    'partitionFact',
    'boundedFile',
    'graphElement',
    'importedNodeIdSet',
    'importingNodeIdSet',
    'graphMetadata',
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
      const {
        partitionFact,
        parentBoundedDirectory,
        boundedFile,
        importedNodeIdSet,
        importingNodeIdSet,
      } = input;

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

      const graphMetadata: Metadata = {
        id: graphElement.id,
        title: boundedFile.file.onDiskFileName.asIs,
        fileSystemPath: boundedFile.file.filePath,
        fieldList: [
          {
            label: 'Boundary',
            value: boundedFile.boundary.displayName,
          },
          {
            label: 'Boundary Path',
            value: boundedFile.boundary.directory.directoryPath,
          },
          {
            label: 'Directory Path from Boundary',
            value: boundedFile.file.directoryPath.replace(
              boundedFile.boundary.directory.directoryPath,
              '<boundary>',
            ),
          },
        ],
      };

      return {
        typeName: FactTypeName.FileFact2,
        zorn,
        partitionFact,
        boundedFile,
        graphElement,
        importedNodeIdSet,
        importingNodeIdSet,
        graphMetadata,
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
