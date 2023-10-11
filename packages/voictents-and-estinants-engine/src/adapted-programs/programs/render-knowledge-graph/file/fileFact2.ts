import { InMemoryOdeshin2ListVoque } from '../../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { FileSystemNodeZorn } from '../../../programmable-units/file/fileSystemNode';
import {
  DirectedGraphNode2,
  DirectedGraphNode2Instance,
} from '../../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { GraphConstituentLocatorInstance } from '../../../programmable-units/graph-visualization/directed-graph/graphConstituentLocator';
import { FileCommentedProgramBodyDeclarationGroup } from '../../../programmable-units/type-script-file/fileCommentedProgramBodyDeclarationGroup';
import { Metadata, MetadataField } from '../app/browser/dynamicComponentTypes';
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
] as const satisfies GenericComplexIdTemplate;
type FileFact2ZornTemplate = typeof FILE_FACT_2_ZORN_TEMPLATE;
class FileFact2Zorn extends ComplexId<FileFact2ZornTemplate> {
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
  declarationGroup: FileCommentedProgramBodyDeclarationGroup;
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
    Omit<
      FileFact2ConstructorInput,
      'parentBoundedDirectory' | 'declarationGroup'
    >,
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
        declarationGroup,
      } = input;

      const zorn = new FileFact2Zorn({
        partitionFact: partitionFact.zorn,
        boundedFile: boundedFile.zorn,
      });

      const {
        canonicalComment,
        canonicalName,
        readableNameAnnotation,
        hasSensibleCanonicalName,
      } = declarationGroup;
      const extensionlessName = boundedFile.nodePath.name.extensionless;

      const canonicalDescription =
        canonicalComment !== null ? canonicalComment.description : null;

      const label =
        readableNameAnnotation !== null
          ? `${extensionlessName}\n(${readableNameAnnotation})`
          : extensionlessName;

      const graphElement = new DirectedGraphNode2Instance({
        locator: new GraphConstituentLocatorInstance({
          rootGraphLocator: partitionFact.rootGraphLocator,
          parentId: parentBoundedDirectory.localGraphElementZorn.forMachine,
          localZorn: boundedFile.localGraphElementZorn,
        }),
        inputAttributeByKey: {
          label,
          ...THEME.file,
        },
      });

      const metadataFieldList: MetadataField[] = [
        {
          label: 'Canonical Name',
          value: canonicalName ?? '—',
        },
      ];

      if (!hasSensibleCanonicalName) {
        metadataFieldList.push({
          label: 'Readable Name',
          value: readableNameAnnotation ?? '—',
        });
      }

      metadataFieldList.push(
        {
          label: 'Canonical Description',
          value: canonicalDescription ?? '—',
        },
        {
          label: 'Directory Path',
          value: boundedFile.file.filePath.parentDirectoryPath.replace(
            boundedFile.boundary.directory.directoryPath.serialized,
            '~b',
          ),
        },
      );

      const graphMetadata: Metadata = {
        id: graphElement.id,
        title: boundedFile.file.nodePath.name.serialized,
        fileSystemPath: boundedFile.file.filePath.serialized,
        fieldList: metadataFieldList,
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
