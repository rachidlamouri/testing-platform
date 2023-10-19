import { AdaptedProgramFileParserInput } from '../adaptedProgramFileParserInput';
import { isSpecificConstantTypeScriptAsExpression } from '../../../../../../package-agnostic-utilities/type-script-ast/isSpecificConstantTypeScriptAsExpression';
import { isArrayExpression } from '../../../../../../package-agnostic-utilities/type-script-ast/isArrayExpression';
import {
  ParsedCollectionInstanceListNode,
  parseCollectionInstanceListNode,
} from './parseCollectionInstanceListNode';

/**
 * Gathers various locators from the array of expressions passed to
 * "explicitCollectionTuple"
 */
export const parseExplicitCollectionInstanceTuple = (
  adaptedParserContext: AdaptedProgramFileParserInput,
): (ParsedCollectionInstanceListNode | null)[] | null => {
  const { programLocator, engineCallParameterList } = adaptedParserContext;

  const explicitCollectionTupleProperty = engineCallParameterList.find(
    (property) =>
      property.key.name ===
      programLocator.engineFunctionConfiguration
        .explicitCollectionTupleKeyIdentifierName,
  );

  const explicitCollectionTupleValueNode =
    explicitCollectionTupleProperty?.value;

  const explicitCollectionInstanceNodeList =
    isSpecificConstantTypeScriptAsExpression(
      explicitCollectionTupleValueNode,
      isArrayExpression,
    )
      ? explicitCollectionTupleValueNode.expression.elements
      : null;

  if (explicitCollectionInstanceNodeList === null) {
    return null;
  }

  const result = explicitCollectionInstanceNodeList.map((node) => {
    return parseCollectionInstanceListNode({
      adaptedParserContext,
      node,
    });
  });

  return result;
};
