import { TSESTree } from '@typescript-eslint/typescript-estree';
import { InMemoryOdeshin2ListVoque } from '../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';
import { FilePath } from '../../programmable-units/file/filePath';

const AST_NODE_LOCATOR_ZORN_TEMPLATE = [
  'filePath',
  'astPath',
] as const satisfies GenericComplexIdTemplate;
type AstNodeLocatorZornTemplate = typeof AST_NODE_LOCATOR_ZORN_TEMPLATE;
class AstNodeLocatorZorn extends ComplexId<AstNodeLocatorZornTemplate> {
  get rawTemplate(): AstNodeLocatorZornTemplate {
    return AST_NODE_LOCATOR_ZORN_TEMPLATE;
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
      zorn: AstNodeLocatorZorn;
    },
    AstNodeLocatorConstructorInput<TNode>,
  ]
>;

export type GenericAstNodeLocator = AstNodeLocator<TSESTree.Node>;

export const { AstNodeLocatorInstance } = buildNamedConstructorFunction({
  constructorName: 'AstNodeLocatorInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'filePath',
    'astPath',
    'node',
  ] as const satisfies readonly (keyof GenericAstNodeLocator)[],
})
  .withTypes<GenericAstNodeLocatorConstructorInput, GenericAstNodeLocator>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { filePath, astPath } = input;

      const zorn = new AstNodeLocatorZorn({
        filePath: filePath.serialized,
        astPath,
      });

      return {
        zorn,
        ...input,
      } satisfies GenericAstNodeLocator;
    },
  })
  .assemble();

export const AST_NODE_LOCATOR_GEPP = 'ast-node-locator';

type AstNodeLocatorGepp = typeof AST_NODE_LOCATOR_GEPP;

export type AstNodeLocatorVoque = InMemoryOdeshin2ListVoque<
  AstNodeLocatorGepp,
  GenericAstNodeLocator
>;
