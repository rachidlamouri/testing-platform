import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { splitList } from '../../../../utilities/splitList';
import {
  flattenCallExpressionChain,
  FlattenedCallExpressionOrError,
} from '../../../../utilities/type-script-ast/flattenIdentifiableCallExpressionChain';
import { isCallExpression } from '../../../../utilities/type-script-ast/isCallExpression';
import {
  IdentifiableCallExpression,
  isIdentifiableCallExpression,
} from '../../../../utilities/type-script-ast/isIdentifiableCallExpression';
import {
  IdentifiableTypeScriptTypeReference,
  isIdentifiableTypeScriptTypeReference,
} from '../../../../utilities/type-script-ast/isIdentifiableTypeScriptTypeReference';
import { IdentifiableMemberExpressionCallExpression } from '../../../../utilities/type-script-ast/isMemberExpressionCallExpression';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { ErrorVoictent, ERROR_GEPP, ErrorOdeshin } from '../../error/error';
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
  EstinantInput,
  EstinantInputListVoictent,
  ESTINANT_INPUT_LIST_GEPP,
} from '../estinant-input-output/estinantInputList';
import {
  EstinantOutput,
  EstinantOutputListVoictent,
  ESTINANT_OUTPUT_LIST_GEPP,
} from '../estinant-input-output/estinantOutputList';
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
import {
  IdentifiableProperty,
  isObjectExpressionWithIdentifierProperties,
} from '../../../../utilities/type-script-ast/isObjectLiteralExpressionWithIdentifierProperties';
import { isStringLiteral } from '../../../../utilities/type-script-ast/isStringLiteral';

export const getEstinantCallExpressionParts = buildEstinant({
  name: 'getEstinantCallExpressionParts',
})
  .fromHubblepup<EngineEstinantVoictent>({
    gepp: ENGINE_ESTINANT_GEPP,
  })
  .andFromHubblepupTuple<ProgramBodyDeclarationsByIdentifierVoictent, [string]>(
    {
      gepp: PROGRAM_BODY_STATEMENTS_BY_IDENTIFIER_GEPP,
      croard: (rightInput) => rightInput.zorn,
      framate: (leftInput) => [leftInput.grition.estinantFilePath],
    },
  )
  .toHubblepupTuple<EstinantInputOutputParentVoictent>({
    gepp: ESTINANT_INPUT_OUTPUT_PARENT_GEPP,
  })
  .toHubblepupTuple<EstinantCallExpressionInputParameterVoictent>({
    gepp: ESTINANT_CALL_EXPRESSION_INPUT_PARAMETER_GEPP,
  })
  .toHubblepupTuple<EstinantCallExpressionOutputParameterVoictent>({
    gepp: ESTINANT_CALL_EXPRESSION_OUTPUT_PARAMETER_GEPP,
  })
  .toHubblepupTuple<EstinantInputListVoictent>({
    gepp: ESTINANT_INPUT_LIST_GEPP,
  })
  .toHubblepupTuple<EstinantOutputListVoictent>({
    gepp: ESTINANT_OUTPUT_LIST_GEPP,
  })
  .toHubblepupTuple<ErrorVoictent>({
    gepp: ERROR_GEPP,
  })
  .onPinbe(
    (engineEstinantInput, [{ grition: bodyDeclarationsByIdentifier }]) => {
      const basicErrorZorn = `estinantCallExpressionParameterCortmum/${engineEstinantInput.zorn}`;
      const missingNameErrorZorn = `estinantCallExpressionParameterCortmum/missing-name/${engineEstinantInput.zorn}`;
      const invalidNameErrorZorn = `estinantCallExpressionParameterCortmum/invalid-name/${engineEstinantInput.zorn}`;

      const engineEstinant = engineEstinantInput.grition;
      const { programName, estinantName } = engineEstinant;

      const node = bodyDeclarationsByIdentifier.get(
        engineEstinant.exportedIdentifierName,
      );

      const initExpression =
        node?.type === AST_NODE_TYPES.VariableDeclarator ? node.init : null;

      const callExpression = isCallExpression(initExpression)
        ? initExpression
        : null;

      if (callExpression === null) {
        return {
          [ESTINANT_INPUT_OUTPUT_PARENT_GEPP]: [],
          [ESTINANT_CALL_EXPRESSION_INPUT_PARAMETER_GEPP]: [],
          [ESTINANT_CALL_EXPRESSION_OUTPUT_PARAMETER_GEPP]: [],
          [ESTINANT_INPUT_LIST_GEPP]: [],
          [ESTINANT_OUTPUT_LIST_GEPP]: [],
          [ERROR_GEPP]: [
            {
              zorn: basicErrorZorn,
              grition: {
                message: 'Export declaration is missing a call expression',
                hasNode: node !== undefined,
                hasInitExpression: initExpression !== null,
                hasCallExpression: callExpression !== null,
                initExpression,
              },
            },
          ],
        };
      }

      if (
        isIdentifiableCallExpression(callExpression) &&
        (isCortmumCallExpression(callExpression) ||
          isMentursectionCallExpression(callExpression) ||
          isOnamaCallExpression(callExpression) ||
          isMattomerCallExpression(callExpression) ||
          isWattlectionCallExpression(callExpression) ||
          isWortinatorCallExpression(callExpression) ||
          isDisatingerCallExpression(callExpression))
      ) {
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
          [ESTINANT_INPUT_LIST_GEPP]: [],
          [ESTINANT_OUTPUT_LIST_GEPP]: [],
          [ERROR_GEPP]: [],
        };
      }

      const flattenedCallExpressionAndErrorList =
        flattenCallExpressionChain(callExpression);

      const errorList: Error[] = [];

      const flattenedCallExpressionList: Exclude<
        FlattenedCallExpressionOrError,
        Error
      >[] = [];

      splitList({
        list: flattenedCallExpressionAndErrorList,
        isElementA: (element): element is Error => element instanceof Error,
        accumulatorA: errorList,
        accumulatorB: flattenedCallExpressionList,
      });

      if (errorList.length > 0) {
        return {
          [ESTINANT_INPUT_OUTPUT_PARENT_GEPP]: [],
          [ESTINANT_CALL_EXPRESSION_INPUT_PARAMETER_GEPP]: [],
          [ESTINANT_CALL_EXPRESSION_OUTPUT_PARAMETER_GEPP]: [],
          [ESTINANT_INPUT_LIST_GEPP]: [],
          [ESTINANT_OUTPUT_LIST_GEPP]: [],
          [ERROR_GEPP]: errorList.map((error, index) => {
            return {
              zorn: `${basicErrorZorn}/${index}`,
              grition: error,
            };
          }),
        };
      }

      type ParsedExpression1 = {
        functionName: string;
        isInput: boolean | null;
        typeNode: TSESTree.TypeNode | null;
      };

      type ParsedExpression2 = {
        functionName: string;
        isInput: boolean;
        typeNode: IdentifiableTypeScriptTypeReference;
      };

      const getTypeParameterList = (
        expression:
          | IdentifiableCallExpression
          | IdentifiableMemberExpressionCallExpression
          | undefined,
      ): TSESTree.TypeNode[] | undefined => {
        if (expression === undefined) {
          return undefined;
        }

        if (expression.type === AST_NODE_TYPES.CallExpression) {
          return expression.typeParameters?.params;
        }

        return expression.object.typeParameters?.params;
      };

      const parsedFlattenedCallExpressionList =
        flattenedCallExpressionList.map<ParsedExpression1>(
          (expression, index) => {
            // TODO: clean up the logic for a flattened call expression list. The type parameters are on the next element's node which is confusing
            const typeParameterNodeList = getTypeParameterList(
              flattenedCallExpressionList[index + 1],
            );

            const typeNode: TSESTree.TypeNode | null =
              (typeParameterNodeList ?? [])[0] ?? null;

            let functionName: string;
            if (expression.type === AST_NODE_TYPES.CallExpression) {
              functionName = expression.callee.name;
            } else {
              functionName = expression.property.name;
            }

            let isInput: boolean | null;
            if (
              functionName.startsWith('from') ||
              functionName.startsWith('andFrom')
            ) {
              isInput = true;
            } else if (
              functionName.startsWith('to') ||
              functionName.startsWith('andTo')
            ) {
              isInput = false;
            } else {
              isInput = null;
            }

            return {
              functionName,
              isInput,
              typeNode,
            };
          },
        );

      if (
        parsedFlattenedCallExpressionList[0].functionName !== buildEstinant.name
      ) {
        return {
          [ESTINANT_INPUT_OUTPUT_PARENT_GEPP]: [],
          [ESTINANT_CALL_EXPRESSION_INPUT_PARAMETER_GEPP]: [],
          [ESTINANT_CALL_EXPRESSION_OUTPUT_PARAMETER_GEPP]: [],
          [ESTINANT_INPUT_LIST_GEPP]: [],
          [ESTINANT_OUTPUT_LIST_GEPP]: [],
          [ERROR_GEPP]: [
            {
              zorn: basicErrorZorn,
              grition: {
                message: `Call expression chain does not start with "${buildEstinant.name}"`,
                parsedFlattenedCallExpressionList,
              },
            },
          ],
        };
      }

      // TODO: tie these function names back to the estinant builder function names
      if (
        parsedFlattenedCallExpressionList[
          parsedFlattenedCallExpressionList.length - 1
        ]?.functionName !== 'assemble'
      ) {
        return {
          [ESTINANT_INPUT_OUTPUT_PARENT_GEPP]: [],
          [ESTINANT_CALL_EXPRESSION_INPUT_PARAMETER_GEPP]: [],
          [ESTINANT_CALL_EXPRESSION_OUTPUT_PARAMETER_GEPP]: [],
          [ESTINANT_INPUT_LIST_GEPP]: [],
          [ESTINANT_OUTPUT_LIST_GEPP]: [],
          [ERROR_GEPP]: [
            {
              zorn: basicErrorZorn,
              grition: {
                message:
                  'Estinant builder call expression chain does not end in "assemble"',
                parsedFlattenedCallExpressionList,
              },
            },
          ],
        };
      }

      const inputOutputExpressionList =
        parsedFlattenedCallExpressionList.filter(
          (parsedExpression) =>
            // TODO: tie these function names back to the estinant builder function names
            !['buildEstinant', 'onPinbe', 'assemble'].includes(
              parsedExpression.functionName,
            ),
        );
      const inputOutputCallExpressionList: ParsedExpression2[] = [];
      const errorParsedExpressionList: ParsedExpression1[] = [];
      splitList({
        list: inputOutputExpressionList,
        isElementA: (element): element is ParsedExpression2 =>
          element.isInput !== null &&
          isIdentifiableTypeScriptTypeReference(element.typeNode),
        accumulatorA: inputOutputCallExpressionList,
        accumulatorB: errorParsedExpressionList,
      });

      if (errorParsedExpressionList.length > 0) {
        return {
          [ESTINANT_INPUT_OUTPUT_PARENT_GEPP]: [],
          [ESTINANT_CALL_EXPRESSION_INPUT_PARAMETER_GEPP]: [],
          [ESTINANT_CALL_EXPRESSION_OUTPUT_PARAMETER_GEPP]: [],
          [ESTINANT_INPUT_LIST_GEPP]: [],
          [ESTINANT_OUTPUT_LIST_GEPP]: [],
          [ERROR_GEPP]: errorParsedExpressionList.map(
            (parsedExpression, index) => {
              return {
                zorn: `${basicErrorZorn}/${index}`,
                grition: {
                  message: `Estinant builder expression "${parsedExpression.functionName}" is missing a type parameter`,
                  parsedExpression,
                },
              };
            },
          ),
        };
      }

      const inputListZorn = `${engineEstinantInput.zorn}/input`;
      const outputListZorn = `${engineEstinantInput.zorn}/output`;

      const estinantInputOutputList = inputOutputCallExpressionList.map<
        EstinantInput | EstinantOutput
      >(({ isInput, typeNode }, index) => {
        // TODO: make the convention where we chop off the suffix more discoverable
        const voictentName = typeNode.typeName.name.replace(/Voictent$/, '');

        if (isInput) {
          return {
            programName,
            estinantName,
            voictentName,
            isInput,
            index,
          } satisfies EstinantInput;
        }

        return {
          programName,
          estinantName,
          voictentName,
          isInput,
          index: null,
        } satisfies EstinantOutput;
      });

      const inputList = estinantInputOutputList.filter<EstinantInput>(
        (inputOrOutput): inputOrOutput is EstinantInput =>
          inputOrOutput.isInput,
      );
      const outputList = estinantInputOutputList.filter<EstinantOutput>(
        (inputOrOutput): inputOrOutput is EstinantOutput =>
          !inputOrOutput.isInput,
      );

      const instantiationExpression = flattenedCallExpressionList[0];
      const instantiationArgument = isCallExpression(instantiationExpression)
        ? instantiationExpression.arguments[0]
        : null;
      const estinantNameProperty = isObjectExpressionWithIdentifierProperties(
        instantiationArgument,
      )
        ? instantiationArgument.properties.find(
            (property: IdentifiableProperty) => {
              return property.key.name === 'name';
            },
          ) ?? null
        : null;

      const instantiatedName =
        estinantNameProperty !== null &&
        isStringLiteral(estinantNameProperty.value)
          ? estinantNameProperty.value.value
          : null;

      const parallelErrorList: ErrorOdeshin[] = [];

      if (instantiatedName === null) {
        parallelErrorList.push({
          zorn: missingNameErrorZorn,
          grition: {
            message: `Estinant builder instantiation is missing a name`,
          },
        });
      } else if (instantiatedName !== estinantName) {
        parallelErrorList.push({
          zorn: invalidNameErrorZorn,
          grition: {
            message: `Estinant builder instantiation name does not match the variable name`,
            expected: estinantName,
            actual: instantiatedName,
          },
        });
      }

      return {
        [ESTINANT_INPUT_OUTPUT_PARENT_GEPP]: [
          {
            zorn: engineEstinantInput.zorn,
            grition: {
              programName,
              estinantName,
              inputListIdentifier: inputListZorn,
              outputListIdentifier: outputListZorn,
            },
          },
        ],
        [ESTINANT_CALL_EXPRESSION_INPUT_PARAMETER_GEPP]: [],
        [ESTINANT_CALL_EXPRESSION_OUTPUT_PARAMETER_GEPP]: [],
        [ESTINANT_INPUT_LIST_GEPP]: [
          {
            zorn: inputListZorn,
            grition: inputList,
          },
        ],
        [ESTINANT_OUTPUT_LIST_GEPP]: [
          {
            zorn: outputListZorn,
            grition: outputList,
          },
        ],
        [ERROR_GEPP]: parallelErrorList,
      };
    },
  )
  .assemble();
