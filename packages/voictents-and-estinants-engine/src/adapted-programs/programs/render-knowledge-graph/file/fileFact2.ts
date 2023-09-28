import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/namedConstructorFunctionBuilder';
import { isNotNull } from '../../../../package-agnostic-utilities/nil/isNotNull';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../package-agnostic-utilities/datastructure/zorn';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { FileSystemNodeZorn } from '../../../programmable-units/file/fileSystemNode';
import {
  DirectedGraphNode2,
  DirectedGraphNode2Instance,
} from '../../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { GraphConstituentLocatorInstance } from '../../../programmable-units/graph-visualization/directed-graph/graphConstituentLocator';
import { CategorizedCommentTypeName } from '../../../programmable-units/type-script-file/comment/categorized/categorizedCommentTypeName';
import { FileCommentedProgramBodyDeclarationGroup } from '../../../programmable-units/type-script-file/fileCommentedProgramBodyDeclarationGroup';
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

      const { canonicalDeclaration } = declarationGroup;

      const canonicalDeclarationIdentifierName =
        canonicalDeclaration !== null
          ? canonicalDeclaration.identifiableNode.id.name
          : 'Missing Canonical Declaration';

      const canonicalDeclarationDescription =
        canonicalDeclaration?.comment?.typeName ===
        CategorizedCommentTypeName.Descriptive
          ? canonicalDeclaration.comment.description
          : '—';

      const readableTag =
        canonicalDeclaration?.comment?.typeName ===
        CategorizedCommentTypeName.Descriptive
          ? canonicalDeclaration.comment.tagTuple.find(
              (tag) => tag.tag === 'readable',
            ) ?? null
          : null;

      const extensionlessName = boundedFile.nodePath.name.extensionless;
      const label =
        readableTag !== null
          ? `${extensionlessName}\n(${readableTag.name})`
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

      const graphMetadata: Metadata = {
        id: graphElement.id,
        title: boundedFile.file.nodePath.name.serialized,
        fileSystemPath: boundedFile.file.filePath.serialized,
        fieldList: [
          {
            label: canonicalDeclarationIdentifierName,
            value: canonicalDeclarationDescription,
          },
          {
            label: 'Readable Name',
            value: readableTag?.name ?? '—',
          },
          {
            label: 'Directory Path',
            value: boundedFile.file.filePath.parentDirectoryPath.replace(
              boundedFile.boundary.directory.directoryPath.serialized,
              '~b',
            ),
          },
        ].filter(isNotNull),
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
