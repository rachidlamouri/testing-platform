import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import { AdaptedProgramFileParserInput } from '../adaptedProgramFileParserInput';
import { ArrayExpressionElement } from '../../../../../../package-agnostic-utilities/type-script-ast/isArrayExpression';
import { parseProgrammedTransformInstanceReference } from './parseProgrammedTransformInstanceReference';
import { ProgrammedTransformLocator } from '../../../programmed-transform/programmedTransformLocator';

type ParseProgrammedTransformTupleNodeInput = {
  adaptedParserContext: AdaptedProgramFileParserInput;
  node: ArrayExpressionElement;
};

/**
 * The root ProgrammedTransform parser for the program parser. It delegates to an adapted parser
 *
 * @todo delegate to a core parser as well
 */
export const parseProgrammedTransformTupleNode = ({
  adaptedParserContext,
  node,
}: ParseProgrammedTransformTupleNodeInput): ProgrammedTransformLocator | null => {
  if (node?.type !== AST_NODE_TYPES.Identifier) {
    return null;
  }

  return parseProgrammedTransformInstanceReference({
    adaptedParserContext,
    node,
  });
};
