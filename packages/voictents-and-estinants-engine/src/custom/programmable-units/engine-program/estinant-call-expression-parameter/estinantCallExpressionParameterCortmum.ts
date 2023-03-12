import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import { buildCortmum } from '../../../../type-script-adapter/estinant/cortmum';
import { Vicken } from '../../../../type-script-adapter/vicken';
import { Vition } from '../../../../type-script-adapter/vition';
import { isIdentifiableCallExpression } from '../../../../utilities/type-script-ast/isIdentifiableCallExpression';
import { ErrorVoictent, ERROR_GEPP } from '../../error/error';
import {
  ProgramBodyDeclarationsByIdentifierVoictent,
  PROGRAM_BODY_STATEMENTS_BY_IDENTIFIER_GEPP,
} from '../../type-script-file/programBodyDeclarationsByIdentifier';
import {
  EngineEstinantVoictent,
  ENGINE_ESTINANT_GEPP,
} from '../engineEstinant';
import { isCortmumCallExpression } from '../estinant-call-expression/cortmumCallExpression';
import { isDisatingerCallExpression } from '../estinant-call-expression/disatingerCallExpression';
import { isMattomerCallExpression } from '../estinant-call-expression/mattomerCallExpression';
import { isMentursectionCallExpression } from '../estinant-call-expression/mentursectionCallExpression';
import { isOnamaCallExpression } from '../estinant-call-expression/onamaCallExpression';
import { isWattlectionCallExpression } from '../estinant-call-expression/wattlectionCallExpression';
import { isWortinatorCallExpression } from '../estinant-call-expression/wortinatorCallExpression';
import {
  EstinantCallExpressionInputParameterVoictent,
  ESTINANT_CALL_EXPRESSION_INPUT_PARAMETER_GEPP,
} from './estinantCallExpressionInputParameter';
import {
  EstinantCallExpressionOutputParameterVoictent,
  ESTINANT_CALL_EXPRESSION_OUTPUT_PARAMETER_GEPP,
} from './estinantCallExpressionOutputParameter';
import {
  EstinantInputOutputParentVoictent,
  ESTINANT_INPUT_OUTPUT_PARENT_GEPP,
} from './estinantInputOutputParent';

export const estinantCallExpressionParameterCortmum = buildCortmum<
  Vition<
    EngineEstinantVoictent,
    [
      Vicken<
        ProgramBodyDeclarationsByIdentifierVoictent,
        [ProgramBodyDeclarationsByIdentifierVoictent],
        string
      >,
    ]
  >,
  [
    EstinantInputOutputParentVoictent,
    EstinantCallExpressionInputParameterVoictent,
    EstinantCallExpressionOutputParameterVoictent,
    ErrorVoictent,
  ]
>({
  leftGepp: ENGINE_ESTINANT_GEPP,
  rightAppreffingeTuple: [
    {
      gepp: PROGRAM_BODY_STATEMENTS_BY_IDENTIFIER_GEPP,
      croard: (rightInput): string => rightInput.zorn,
      framate: (leftInput) => [leftInput.grition.estinantFilePath] as const,
    },
  ],
  outputGeppTuple: [
    ESTINANT_INPUT_OUTPUT_PARENT_GEPP,
    ESTINANT_CALL_EXPRESSION_INPUT_PARAMETER_GEPP,
    ESTINANT_CALL_EXPRESSION_OUTPUT_PARAMETER_GEPP,
    ERROR_GEPP,
  ],
  pinbe: (engineEstinantInput, [{ grition: bodyDeclarationsByIdentifier }]) => {
    const engineEstinant = engineEstinantInput.grition;

    const node = bodyDeclarationsByIdentifier.get(
      engineEstinant.exportedIdentifierName,
    );

    const initExpression =
      node?.type === AST_NODE_TYPES.VariableDeclarator ? node.init : null;

    const callExpression = isIdentifiableCallExpression(initExpression)
      ? initExpression
      : null;

    if (
      isCortmumCallExpression(callExpression) ||
      isMentursectionCallExpression(callExpression) ||
      isOnamaCallExpression(callExpression) ||
      isMattomerCallExpression(callExpression) ||
      isWattlectionCallExpression(callExpression) ||
      isWortinatorCallExpression(callExpression) ||
      isDisatingerCallExpression(callExpression)
    ) {
      const { programName, estinantName } = engineEstinant;

      const inputListIdentifier = `${engineEstinantInput.zorn}/input`;
      const outputListIdentifier = `${engineEstinantInput.zorn}/output`;

      return {
        [ESTINANT_INPUT_OUTPUT_PARENT_GEPP]: [
          {
            zorn: engineEstinantInput.zorn,
            grition: {
              programName,
              estinantName,
              inputListIdentifier,
              outputListIdentifier,
            },
          },
        ],
        [ESTINANT_CALL_EXPRESSION_INPUT_PARAMETER_GEPP]: [
          {
            zorn: inputListIdentifier,
            grition: {
              programName,
              estinantName,
              isInput: true,
              node: callExpression.typeParameters.params[0],
            },
          },
        ],
        [ESTINANT_CALL_EXPRESSION_OUTPUT_PARAMETER_GEPP]: [
          {
            zorn: outputListIdentifier,
            grition: {
              programName,
              estinantName,
              isInput: false,
              node: callExpression.typeParameters.params[1],
            },
          },
        ],
        [ERROR_GEPP]: [],
      };
    }

    return {
      [ESTINANT_INPUT_OUTPUT_PARENT_GEPP]: [],
      [ESTINANT_CALL_EXPRESSION_INPUT_PARAMETER_GEPP]: [],
      [ESTINANT_CALL_EXPRESSION_OUTPUT_PARAMETER_GEPP]: [],
      [ERROR_GEPP]: [
        {
          zorn: engineEstinantInput.zorn,
          grition: {
            hasNode: node !== undefined,
            hasInitExpression: initExpression !== null,
            hasCallExpression: callExpression !== null,
            callExpression,
          },
        },
      ],
    };
  },
});
