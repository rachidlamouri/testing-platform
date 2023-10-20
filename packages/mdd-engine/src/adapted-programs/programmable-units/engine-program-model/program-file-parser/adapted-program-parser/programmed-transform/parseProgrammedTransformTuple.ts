import { TSESTree } from '@typescript-eslint/typescript-estree';
import { isSpecificConstantTypeScriptAsExpression } from '../../../../../../package-agnostic-utilities/type-script-ast/isSpecificConstantTypeScriptAsExpression';
import { AdaptedProgramFileParserInput } from '../adaptedProgramFileParserInput';
import { isArrayExpression } from '../../../../../../package-agnostic-utilities/type-script-ast/isArrayExpression';
import { parseProgrammedTransformTupleNode } from './parseProgrammedTransformTupleNode';
import { ProgrammedTransformLocator } from '../../../programmed-transform/programmedTransformLocator';

export const parseProgrammedTransformTuple = (
  adaptedParserContext: AdaptedProgramFileParserInput,
): (ProgrammedTransformLocator | null)[] | null => {
  const { programLocator, engineCallParameterList } = adaptedParserContext;

  const programmedTransformTupleProperty = engineCallParameterList.find(
    (property) =>
      property.key.name ===
      programLocator.engineFunctionConfiguration
        .programmedTransformListKeyIdentifierName,
  );

  const programmedTransformTupleValueNode =
    programmedTransformTupleProperty?.value;

  const programmedTransformNodeList =
    isSpecificConstantTypeScriptAsExpression<TSESTree.ArrayExpression>(
      programmedTransformTupleValueNode,
      isArrayExpression,
    )
      ? programmedTransformTupleValueNode.expression.elements
      : null;

  if (programmedTransformNodeList === null) {
    return null;
  }

  const result = programmedTransformNodeList.map((node) => {
    return parseProgrammedTransformTupleNode({
      adaptedParserContext,
      node,
    });
  });

  return result;
};
