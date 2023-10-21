import { ArrayExpressionElement } from '../../../../../../package-agnostic-utilities/type-script-ast/isArrayExpression';
import { isNewExpression } from '../../../../../../package-agnostic-utilities/type-script-ast/isNewExpression';
import { AdaptedProgramFileParserInput } from '../adaptedProgramFileParserInput';
import {
  ParsedCollectionInstantiationNode,
  parseCollectionInstantiationNode,
} from './parseCollectionInstantiationNode';

type CollectionInstanceListNodeParserInput = {
  adaptedParserContext: AdaptedProgramFileParserInput;
  node: ArrayExpressionElement;
};

export type ParsedCollectionInstanceListNode =
  ParsedCollectionInstantiationNode;

/**
 * Reusable function for parsing the explicit collection list and the
 * uninferable list. Right now it only supports the NewExpression node type.
 */
export const parseCollectionInstanceListNode = ({
  adaptedParserContext,
  node,
}: CollectionInstanceListNodeParserInput): ParsedCollectionInstanceListNode | null => {
  if (!isNewExpression(node)) {
    return null;
  }

  return parseCollectionInstantiationNode({
    adaptedParserContext,
    node,
  });
};
