import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import { ArrayExpressionElement } from '../../../../../../package-agnostic-utilities/type-script-ast/isArrayExpression';
import { isNewExpression } from '../../../../../../package-agnostic-utilities/type-script-ast/isNewExpression';
import { AdaptedProgramFileParserInput } from '../adaptedProgramFileParserInput';
import {
  ParsedCollectionInstantiationNode,
  parseCollectionInstantiationNode,
} from './parseCollectionInstantiationNode';

export enum ParsedCollectionStatus {
  Parseable = 'Parseable',
  PendingParserImplementation = 'PendingParserImplementation',
  Unparseable = 'Unparseable',
}

type CollectionInstanceListNodeParserInput = {
  adaptedParserContext: AdaptedProgramFileParserInput;
  node: ArrayExpressionElement;
};

type ParseableCollectionInstanceListNode = {
  status: ParsedCollectionStatus.Parseable;
  parsedNode: ParsedCollectionInstantiationNode;
};

type UnparseableCollectionInstanceListNode = {
  status: ParsedCollectionStatus.Unparseable;
  parsedNode: null;
};

type PendingParserCollectionInstanceListNode = {
  status: ParsedCollectionStatus.PendingParserImplementation;
  parsedNode: null;
};

export type ParsedCollectionInstanceListNode =
  | ParseableCollectionInstanceListNode
  | UnparseableCollectionInstanceListNode
  | PendingParserCollectionInstanceListNode;

/**
 * Reusable function for parsing the explicit collection list and the
 * uninferable list. Right now it only supports the NewExpression node type.
 */
export const parseCollectionInstanceListNode = ({
  adaptedParserContext,
  node,
}: CollectionInstanceListNodeParserInput): ParsedCollectionInstanceListNode => {
  if (node?.type === AST_NODE_TYPES.SpreadElement) {
    // TODO: implement parsing "...buildDefaultFileCollectionTuple(),"
    return {
      status: ParsedCollectionStatus.PendingParserImplementation,
      parsedNode: null,
    };
  }

  if (!isNewExpression(node)) {
    return {
      status: ParsedCollectionStatus.Unparseable,
      parsedNode: null,
    };
  }

  return {
    status: ParsedCollectionStatus.Parseable,
    parsedNode: parseCollectionInstantiationNode({
      adaptedParserContext,
      node,
    }),
  };
};
