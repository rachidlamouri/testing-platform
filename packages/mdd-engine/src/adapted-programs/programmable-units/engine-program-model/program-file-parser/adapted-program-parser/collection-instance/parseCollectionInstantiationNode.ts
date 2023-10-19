import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { isIdentifiableTypeScriptTypeReference } from '../../../../../../package-agnostic-utilities/type-script-ast/isIdentifiableTypeScriptTypeReference';
import {
  isIdentifiableNewExpression,
  isNewExpressionWithSpecificTypeParameters,
} from '../../../../../../package-agnostic-utilities/type-script-ast/isNewExpression';
import { CollectionDefinitionLocator } from '../../../collection-definition/collectionDefinitionLocator';
import { CollectionInstanceSkeleton } from '../../../collection-instance/collectionInstanceSkeleton';
import { ItemDefinitionLocator } from '../../../item-definition/itemDefinitionLocator';
import { StreamMetatypeLocator } from '../../../stream-metatype/streamMetatypeLocator';
import { AdaptedProgramFileParserInput } from '../adaptedProgramFileParserInput';

type CollectionInstantiationNodeParserInput = {
  adaptedParserContext: AdaptedProgramFileParserInput;
  node: TSESTree.NewExpression;
};

export type ParsedCollectionInstantiationNode = {
  collectionDefinitionLocator: CollectionDefinitionLocator | null;
  itemDefinitionLocator: CollectionDefinitionLocator | null;
  collectionInstanceSkeleton: CollectionInstanceSkeleton | null;
};

/**
 * Parses a NewExpression thast represents a collection intance
 */
export const parseCollectionInstantiationNode = ({
  adaptedParserContext: adaptedContext,
  node,
}: CollectionInstantiationNodeParserInput): ParsedCollectionInstantiationNode => {
  const { programLocator, fileImportGroup } = adaptedContext;

  const defaultLocatorFilePath = programLocator.programFile.filePath.serialized;

  const collectionIdentifierName = isIdentifiableNewExpression(node)
    ? node.callee.name
    : null;

  let collectionDefinitionLocator: CollectionDefinitionLocator | null;
  if (collectionIdentifierName === null) {
    collectionDefinitionLocator = null;
  } else {
    const collectionDefinitionFilePath =
      fileImportGroup.fileImportByIdentifier.get(collectionIdentifierName)
        ?.sourcePath ?? defaultLocatorFilePath;

    collectionDefinitionLocator = new CollectionDefinitionLocator({
      filePath: collectionDefinitionFilePath,
      identifierName: collectionIdentifierName,
    });
  }

  const streamMetatypeReferenceNode = isNewExpressionWithSpecificTypeParameters<
    [AST_NODE_TYPES.TSTypeReference]
  >(node, [AST_NODE_TYPES.TSTypeReference])
    ? node.typeParameters.params[0]
    : null;

  const streamMetatypeIdentifierName = isIdentifiableTypeScriptTypeReference(
    streamMetatypeReferenceNode,
  )
    ? streamMetatypeReferenceNode.typeName.name
    : null;

  let itemDefinitionLocator: ItemDefinitionLocator | null;
  if (streamMetatypeIdentifierName === null) {
    itemDefinitionLocator = null;
  } else {
    const streamMetatypeFilePath =
      fileImportGroup.fileImportByIdentifier.get(streamMetatypeIdentifierName)
        ?.sourcePath ?? defaultLocatorFilePath;

    itemDefinitionLocator = ItemDefinitionLocator.fromStreamMetatypeLocator(
      new StreamMetatypeLocator({
        filePath: streamMetatypeFilePath,
        identifierName: streamMetatypeIdentifierName,
      }),
    );
  }

  const collectionInstanceSkeleton =
    collectionDefinitionLocator !== null
      ? new CollectionInstanceSkeleton({
          programLocator,
          collectionDefinitionLocator,
          itemDefinitionLocator,
        })
      : null;

  return {
    collectionDefinitionLocator,
    itemDefinitionLocator,
    collectionInstanceSkeleton,
  };
};
