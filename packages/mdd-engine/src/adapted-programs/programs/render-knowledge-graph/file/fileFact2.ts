import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { FileSystemNodeId } from '../../../programmable-units/file/fileSystemNode';
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
  PartitionFactId,
} from '../partition-fact/partitionFact';
import { THEME } from '../theme';
import { BoundedFile } from './boundedFile';

const FILE_FACT_2_ID_TEMPLATE = [
  ['partitionFact', PartitionFactId],
  ['boundedFile', FileSystemNodeId],
] as const satisfies GenericComplexIdTemplate;
type FileFact2IdTemplate = typeof FILE_FACT_2_ID_TEMPLATE;
class FileFact2Id extends ComplexId<FileFact2IdTemplate> {
  get rawTemplate(): FileFact2IdTemplate {
    return FILE_FACT_2_ID_TEMPLATE;
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
      id: FileFact2Id;
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
    'id',
    'partitionFact',
    'boundedFile',
    'graphElement',
    'importedNodeIdSet',
    'importingNodeIdSet',
    'graphMetadata',
  ],
} as const)
  .withTypes<FileFact2ConstructorInput, FileFact2>({
    typeCheckErrorMessage: {
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

      const id = new FileFact2Id({
        partitionFact: partitionFact.id,
        boundedFile: boundedFile.id,
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
          parentId: parentBoundedDirectory.localGraphElementId.forMachine,
          localId: boundedFile.localGraphElementId,
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
        id: graphElement.oldId,
        title: boundedFile.file.nodePath.name.serialized,
        fileSystemPath: boundedFile.file.filePath.serialized,
        fieldList: metadataFieldList,
      };

      return {
        typeName: FactTypeName.FileFact2,
        id,
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

export const FILE_FACT_2_COLLECTION_ID = 'file-fact-2';

type FileFact2CollectionId = typeof FILE_FACT_2_COLLECTION_ID;

export type FileFact2StreamMetatype = InMemoryIdentifiableItem3StreamMetatype<
  FileFact2CollectionId,
  FileFact2
>;
