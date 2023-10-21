import { TSESTree } from '@typescript-eslint/typescript-estree';
import { buildCollectionByCollectionId } from '../../../../../../adapter/engine/runEngine';
import { isSpecificIdentifiableCallExpression } from '../../../../../../package-agnostic-utilities/type-script-ast/isCallExpression';
import { AdaptedProgramFileParserInput } from '../adaptedProgramFileParserInput';
import { isSpecificConstantTypeScriptAsExpression } from '../../../../../../package-agnostic-utilities/type-script-ast/isSpecificConstantTypeScriptAsExpression';
import { isArrayExpression } from '../../../../../../package-agnostic-utilities/type-script-ast/isArrayExpression';
import {
  ParsedCollectionInstanceListNode,
  parseCollectionInstanceListNode,
} from './parseCollectionInstanceListNode';

type ParsedUninferableCollectionByCollectionId = {
  expectedBuilderFunctionName: string;
  parsedCollectionList: ParsedCollectionInstanceListNode[] | null;
};

/**
 * Gathers various locators from the array that is passed to the standard
 * builder that is passed to "uninferableCollectionByCollectionId"
 */
export const parseUninferableCollectionByCollectionId = (
  adaptedParserContext: AdaptedProgramFileParserInput,
): ParsedUninferableCollectionByCollectionId => {
  const { programLocator, engineCallParameterList } = adaptedParserContext;

  const uninferableCollectionByCollectionIdProperty =
    engineCallParameterList.find((property) => {
      return (
        property.key.name ===
        programLocator.engineFunctionConfiguration
          .uninferableCollectionByCollectionIdKeyIdentifierName
      );
    });

  const uninferableCollectionByCollectionValueNode =
    uninferableCollectionByCollectionIdProperty?.value;

  const expectedBuilderFunctionName = buildCollectionByCollectionId.name;

  const buildCollectionByCollectionIdCallExpression =
    isSpecificIdentifiableCallExpression(
      uninferableCollectionByCollectionValueNode,
      expectedBuilderFunctionName,
    )
      ? uninferableCollectionByCollectionValueNode
      : null;

  const buildCollectionByCollectionIdInput =
    buildCollectionByCollectionIdCallExpression !== null &&
    isSpecificConstantTypeScriptAsExpression<TSESTree.ArrayExpression>(
      buildCollectionByCollectionIdCallExpression.arguments[0],
      isArrayExpression,
    )
      ? buildCollectionByCollectionIdCallExpression.arguments[0]
      : null;

  const parsedCollectionList =
    buildCollectionByCollectionIdInput !== null
      ? buildCollectionByCollectionIdInput.expression.elements.map((node) => {
          return parseCollectionInstanceListNode({
            adaptedParserContext,
            node,
          });
        })
      : null;

  return {
    expectedBuilderFunctionName,
    parsedCollectionList,
  };
};
