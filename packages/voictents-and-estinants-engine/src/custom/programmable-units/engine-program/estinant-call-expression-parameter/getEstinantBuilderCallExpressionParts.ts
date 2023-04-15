import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { splitList } from '../../../../utilities/splitList';
import {
  flattenCallExpressionChain,
  FlattenedCallExpressionOrError,
} from '../../../../utilities/type-script-ast/flattenIdentifiableCallExpressionChain';
import { isCallExpression } from '../../../../utilities/type-script-ast/isCallExpression';
import { IdentifiableCallExpression } from '../../../../utilities/type-script-ast/isIdentifiableCallExpression';
import {
  IdentifiableTypeScriptTypeReference,
  isIdentifiableTypeScriptTypeReference,
} from '../../../../utilities/type-script-ast/isIdentifiableTypeScriptTypeReference';
import { IdentifiableMemberExpressionCallExpression } from '../../../../utilities/type-script-ast/isMemberExpressionCallExpression';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  ProgramErrorVoictent,
  PROGRAM_ERROR_GEPP,
  ProgramErrorOdeshin,
  ErrorLocatorTypeName,
} from '../../error/programError';
import {
  ProgramBodyDeclarationsByIdentifierVoictent,
  PROGRAM_BODY_STATEMENTS_BY_IDENTIFIER_GEPP,
} from '../../type-script-file/programBodyDeclarationsByIdentifier';
import {
  EngineEstinantVoictent,
  ENGINE_ESTINANT_GEPP,
} from '../engineEstinant';
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
  EstinantInputOutputParentVoictent,
  ESTINANT_INPUT_OUTPUT_PARENT_GEPP,
} from './estinantInputOutputParent';
import {
  IdentifiableProperty,
  isObjectExpressionWithIdentifierProperties,
} from '../../../../utilities/type-script-ast/isObjectLiteralExpressionWithIdentifierProperties';
import { isStringLiteral } from '../../../../utilities/type-script-ast/isStringLiteral';

type EstinantName = 'getEstinantCallExpressionParts';

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
  .toHubblepupTuple<EstinantInputListVoictent>({
    gepp: ESTINANT_INPUT_LIST_GEPP,
  })
  .toHubblepupTuple<EstinantOutputListVoictent>({
    gepp: ESTINANT_OUTPUT_LIST_GEPP,
  })
  .toHubblepupTuple<ProgramErrorVoictent<EstinantName>>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe(
    (engineEstinantInput, [{ grition: bodyDeclarationsByIdentifier }]) => {
      const basicErrorZorn = `getEstinantCallExpressionParts/${engineEstinantInput.zorn}`;
      const missingNameErrorZorn = `getEstinantCallExpressionParts/missing-name/${engineEstinantInput.zorn}`;
      const invalidNameErrorZorn = `getEstinantCallExpressionParts/invalid-name/${engineEstinantInput.zorn}`;

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
          [ESTINANT_INPUT_LIST_GEPP]: [],
          [ESTINANT_OUTPUT_LIST_GEPP]: [],
          [PROGRAM_ERROR_GEPP]: [
            {
              zorn: basicErrorZorn,
              grition: {
                errorId: `getEstinantCallExpressionParts/missing-call-expression`,
                message: 'Export declaration is missing a call expression',
                locator: {
                  typeName: ErrorLocatorTypeName.FileErrorLocator,
                  filePath: engineEstinant.estinantFilePath,
                },
                metadata: {
                  hasNode: node !== undefined,
                  hasInitExpression: initExpression !== null,
                  hasCallExpression: callExpression !== null,
                  initExpression,
                },
              },
            },
          ],
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
          [ESTINANT_INPUT_LIST_GEPP]: [],
          [ESTINANT_OUTPUT_LIST_GEPP]: [],
          [PROGRAM_ERROR_GEPP]: errorList.map((error, index) => {
            return {
              zorn: `${basicErrorZorn}/${index}`,
              grition: {
                errorId: `getEstinantCallExpressionParts/idk`,
                message: 'I have no idea',
                locator: {
                  typeName: ErrorLocatorTypeName.FileErrorLocator,
                  filePath: engineEstinant.estinantFilePath,
                },
                metadata: {
                  error,
                },
              },
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
          [ESTINANT_INPUT_LIST_GEPP]: [],
          [ESTINANT_OUTPUT_LIST_GEPP]: [],
          [PROGRAM_ERROR_GEPP]: [
            {
              zorn: basicErrorZorn,
              grition: {
                errorId: `getEstinantCallExpressionParts/invalid-call-expression-chain-start`,
                message: `Call expression chain does not start with "${buildEstinant.name}"`,
                locator: {
                  typeName: ErrorLocatorTypeName.FileErrorLocator,
                  filePath: engineEstinant.estinantFilePath,
                },
                metadata: {
                  parsedFlattenedCallExpressionList,
                },
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
          [ESTINANT_INPUT_LIST_GEPP]: [],
          [ESTINANT_OUTPUT_LIST_GEPP]: [],
          [PROGRAM_ERROR_GEPP]: [
            {
              zorn: basicErrorZorn,
              grition: {
                errorId: `getEstinantCallExpressionParts/invalid-call-expression-chain-end`,
                message:
                  'Estinant builder call expression chain does not end in "assemble"',
                locator: {
                  typeName: ErrorLocatorTypeName.FileErrorLocator,
                  filePath: engineEstinant.estinantFilePath,
                },
                metadata: {
                  parsedFlattenedCallExpressionList,
                },
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
          [ESTINANT_INPUT_LIST_GEPP]: [],
          [ESTINANT_OUTPUT_LIST_GEPP]: [],
          [PROGRAM_ERROR_GEPP]: errorParsedExpressionList.map(
            (parsedExpression, index) => {
              return {
                zorn: `${basicErrorZorn}/${index}`,
                grition: {
                  errorId: `getEstinantCallExpressionParts/missing-type-parameter`,
                  message: `Estinant builder expression "${parsedExpression.functionName}" is missing a type parameter`,
                  locator: {
                    typeName: ErrorLocatorTypeName.FileErrorLocator,
                    filePath: engineEstinant.estinantFilePath,
                  },
                  metadata: {
                    parsedExpression,
                  },
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

      const parallelErrorList: ProgramErrorOdeshin<EstinantName>[] = [];

      if (instantiatedName === null) {
        parallelErrorList.push({
          zorn: missingNameErrorZorn,
          grition: {
            errorId: `getEstinantCallExpressionParts/missing-estinant-name`,
            message: `Estinant builder instantiation is missing a name`,
            locator: {
              typeName: ErrorLocatorTypeName.FileErrorLocator,
              filePath: engineEstinant.estinantFilePath,
            },
            metadata: null,
          },
        });
      } else if (instantiatedName !== estinantName) {
        parallelErrorList.push({
          zorn: invalidNameErrorZorn,
          grition: {
            errorId: `getEstinantCallExpressionParts/invalid-estinant-name`,
            message: `Estinant builder instantiation name does not match the variable name`,
            locator: {
              typeName: ErrorLocatorTypeName.FileErrorLocator,
              filePath: engineEstinant.estinantFilePath,
            },
            metadata: {
              expected: estinantName,
              actual: instantiatedName,
            },
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
        [PROGRAM_ERROR_GEPP]: parallelErrorList,
      };
    },
  )
  .assemble();
