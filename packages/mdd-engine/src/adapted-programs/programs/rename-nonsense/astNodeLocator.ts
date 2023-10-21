import { TSESTree } from '@typescript-eslint/typescript-estree';
import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';
import { FilePath } from '../../programmable-units/file/filePath';

const AST_NODE_LOCATOR_ID_TEMPLATE = [
  'filePath',
  'astPath',
] as const satisfies GenericComplexIdTemplate;
type AstNodeLocatorIdTemplate = typeof AST_NODE_LOCATOR_ID_TEMPLATE;
class AstNodeLocatorId extends ComplexId<AstNodeLocatorIdTemplate> {
  get rawTemplate(): AstNodeLocatorIdTemplate {
    return AST_NODE_LOCATOR_ID_TEMPLATE;
  }
}

type AstNodeLocatorConstructorInput<TNode extends TSESTree.Node> = {
  filePath: FilePath;
  astPath: string;
  node: TNode;
};

type GenericAstNodeLocatorConstructorInput =
  AstNodeLocatorConstructorInput<TSESTree.Node>;

/**
 * The information needed to find an AST node
 */
export type AstNodeLocator<TNode extends TSESTree.Node> = SimplifyN<
  [
    {
      id: AstNodeLocatorId;
    },
    AstNodeLocatorConstructorInput<TNode>,
  ]
>;

export type GenericAstNodeLocator = AstNodeLocator<TSESTree.Node>;

export const { AstNodeLocatorInstance } = buildNamedConstructorFunction({
  constructorName: 'AstNodeLocatorInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'id',
    'filePath',
    'astPath',
    'node',
  ] as const satisfies readonly (keyof GenericAstNodeLocator)[],
})
  .withTypes<GenericAstNodeLocatorConstructorInput, GenericAstNodeLocator>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { filePath, astPath } = input;

      const id = new AstNodeLocatorId({
        filePath: filePath.serialized,
        astPath,
      });

      return {
        id,
        ...input,
      } satisfies GenericAstNodeLocator;
    },
  })
  .assemble();

export const AST_NODE_LOCATOR_COLLECTION_ID = 'ast-node-locator';

type AstNodeLocatorCollectionId = typeof AST_NODE_LOCATOR_COLLECTION_ID;

export type AstNodeLocatorStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    AstNodeLocatorCollectionId,
    GenericAstNodeLocator
  >;
