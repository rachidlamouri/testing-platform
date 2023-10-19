import { IdentifiableProperty } from '../../../../package-agnostic-utilities/type-script-ast/isObjectExpressionWithIdentifiableProperties';
import { CommentedProgramBodyDeclaration } from '../../type-script-file/commentedProgramBodyDeclaration';
import { ProgramLocator } from '../program/programLocator';
import {
  EngineCallDeclaration,
  isEngineCallExpressionStatement,
} from './engineCallExpression';

type EngineCallExpressionFinderInput = {
  programLocator: ProgramLocator;
  commentedProgramBodyStatementList: CommentedProgramBodyDeclaration[];
};

type EngineCallExpressionFinderOutput = {
  engineCallExpression: EngineCallDeclaration;
  engineCallParameterList: IdentifiableProperty[];
} | null;

/**
 * Looks at the top level statements of a program file to find the engine call
 * expression
 */
export const findEngineCallExpression = ({
  programLocator: locator,
  commentedProgramBodyStatementList,
}: EngineCallExpressionFinderInput): EngineCallExpressionFinderOutput => {
  const engineCallExpression = commentedProgramBodyStatementList.find(
    (commentedDeclaration): commentedDeclaration is EngineCallDeclaration =>
      isEngineCallExpressionStatement(
        commentedDeclaration.bodyStatement,
        locator.engineFunctionConfiguration.exportedIdentifier,
      ),
  );

  if (engineCallExpression === undefined) {
    return null;
  }

  const engineCallParameterList: IdentifiableProperty[] =
    engineCallExpression?.bodyStatement?.expression.arguments[0].properties ??
    [];

  return {
    engineCallExpression,
    engineCallParameterList,
  };
};
