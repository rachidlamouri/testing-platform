import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import * as uuid from 'uuid';
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
  EngineEstinant,
} from '../engineEstinant';
import { EstinantInput } from '../estinant-input-output/estinantInputList';
import { EstinantOutput } from '../estinant-input-output/estinantOutputList';
import {
  IdentifiableProperty,
  isObjectExpressionWithIdentifierProperties,
} from '../../../../utilities/type-script-ast/isObjectLiteralExpressionWithIdentifierProperties';
import { isStringLiteral } from '../../../../utilities/type-script-ast/isStringLiteral';
import {
  ENGINE_ESTINANT_LOCATOR_GEPP,
  EngineEstinantLocatorVoictent,
} from '../engineEstinantLocator';

type EstinantName = 'getEstinantBuilderCallExpressionParts';

export const getEstinantBuilderCallExpressionParts = buildEstinant({
  name: 'getEstinantBuilderCallExpressionParts',
})
  .fromHubblepup<EngineEstinantLocatorVoictent>({
    gepp: ENGINE_ESTINANT_LOCATOR_GEPP,
  })
  .andFromHubblepupTuple<ProgramBodyDeclarationsByIdentifierVoictent, [string]>(
    {
      gepp: PROGRAM_BODY_STATEMENTS_BY_IDENTIFIER_GEPP,
      croard: (rightInput) => rightInput.zorn,
      framate: (leftInput) => [leftInput.grition.estinantFilePath],
    },
  )
  .toHubblepupTuple<ProgramErrorVoictent<EstinantName>>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .toHubblepupTuple<EngineEstinantVoictent>({
    gepp: ENGINE_ESTINANT_GEPP,
  })
  .onPinbe(
    (
      engineEstinantLocatorInput,
      [{ grition: bodyDeclarationsByIdentifier }],
    ) => {
      const basicErrorZorn = `getEstinantBuilderCallExpressionParts/${engineEstinantLocatorInput.zorn}`;
      const missingNameErrorZorn = `getEstinantBuilderCallExpressionParts/missing-name/${engineEstinantLocatorInput.zorn}`;
      const invalidNameErrorZorn = `getEstinantBuilderCallExpressionParts/invalid-name/${engineEstinantLocatorInput.zorn}`;

      const engineEstinantLocator = engineEstinantLocatorInput.grition;
      const { programName, estinantName } = engineEstinantLocator;

      const commentedBodyDeclaration = bodyDeclarationsByIdentifier.get(
        engineEstinantLocator.exportedIdentifierName,
      );

      const initExpression =
        commentedBodyDeclaration?.identifiableNode?.type ===
        AST_NODE_TYPES.VariableDeclarator
          ? commentedBodyDeclaration.identifiableNode.init
          : null;

      const callExpression = isCallExpression(initExpression)
        ? initExpression
        : null;

      if (callExpression === null) {
        return {
          [PROGRAM_ERROR_GEPP]: [
            {
              zorn: basicErrorZorn,
              grition: {
                errorId: `getEstinantBuilderCallExpressionParts/missing-call-expression`,
                message: 'Export declaration is missing a call expression',
                locator: {
                  typeName: ErrorLocatorTypeName.FileErrorLocator,
                  filePath: engineEstinantLocator.estinantFilePath,
                },
                metadata: {
                  hasIdentifiableNode:
                    commentedBodyDeclaration?.identifiableNode !== undefined,
                  hasInitExpression: initExpression !== null,
                  hasCallExpression: callExpression !== null,
                  initExpression,
                },
              },
            },
          ],
          [ENGINE_ESTINANT_GEPP]: [],
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
          [PROGRAM_ERROR_GEPP]: errorList.map((error, index) => {
            return {
              zorn: `${basicErrorZorn}/${index}`,
              grition: {
                errorId: `getEstinantBuilderCallExpressionParts/idk`,
                message: 'I have no idea',
                locator: {
                  typeName: ErrorLocatorTypeName.FileErrorLocator,
                  filePath: engineEstinantLocator.estinantFilePath,
                },
                metadata: {
                  error,
                },
              },
            };
          }),
          [ENGINE_ESTINANT_GEPP]: [],
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
          [PROGRAM_ERROR_GEPP]: [
            {
              zorn: basicErrorZorn,
              grition: {
                errorId: `getEstinantBuilderCallExpressionParts/invalid-call-expression-chain-start`,
                message: `Call expression chain does not start with "${buildEstinant.name}"`,
                locator: {
                  typeName: ErrorLocatorTypeName.FileErrorLocator,
                  filePath: engineEstinantLocator.estinantFilePath,
                },
                metadata: {
                  parsedFlattenedCallExpressionList,
                },
              },
            },
          ],
          [ENGINE_ESTINANT_GEPP]: [],
        };
      }

      // TODO: tie these function names back to the estinant builder function names
      if (
        parsedFlattenedCallExpressionList[
          parsedFlattenedCallExpressionList.length - 1
        ]?.functionName !== 'assemble'
      ) {
        return {
          [PROGRAM_ERROR_GEPP]: [
            {
              zorn: basicErrorZorn,
              grition: {
                errorId: `getEstinantBuilderCallExpressionParts/invalid-call-expression-chain-end`,
                message:
                  'Estinant builder call expression chain does not end in "assemble"',
                locator: {
                  typeName: ErrorLocatorTypeName.FileErrorLocator,
                  filePath: engineEstinantLocator.estinantFilePath,
                },
                metadata: {
                  parsedFlattenedCallExpressionList,
                },
              },
            },
          ],
          [ENGINE_ESTINANT_GEPP]: [],
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
          [PROGRAM_ERROR_GEPP]: errorParsedExpressionList.map(
            (parsedExpression, index) => {
              return {
                zorn: `${basicErrorZorn}/${index}`,
                grition: {
                  errorId: `getEstinantBuilderCallExpressionParts/missing-type-parameter`,
                  message: `Estinant builder expression "${parsedExpression.functionName}" is missing a type parameter`,
                  locator: {
                    typeName: ErrorLocatorTypeName.FileErrorLocator,
                    filePath: engineEstinantLocator.estinantFilePath,
                  },
                  metadata: {
                    parsedExpression,
                  },
                },
              };
            },
          ),
          [ENGINE_ESTINANT_GEPP]: [],
        };
      }

      const estinantInputOutputList = inputOutputCallExpressionList.map<
        EstinantInput | EstinantOutput
      >(({ isInput, typeNode }, index) => {
        // TODO: make the convention where we chop off the suffix more discoverable
        const voictentName = typeNode.typeName.name.replace(/Voictent$/, '');

        if (isInput) {
          return {
            id: uuid.v4(),
            programName,
            estinantName,
            voictentName,
            isInput,
            index,
          } satisfies EstinantInput;
        }

        return {
          id: uuid.v4(),
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
            errorId: `getEstinantBuilderCallExpressionParts/missing-estinant-name`,
            message: `Estinant builder instantiation is missing a name`,
            locator: {
              typeName: ErrorLocatorTypeName.FileErrorLocator,
              filePath: engineEstinantLocator.estinantFilePath,
            },
            metadata: null,
          },
        });
      } else if (instantiatedName !== estinantName) {
        parallelErrorList.push({
          zorn: invalidNameErrorZorn,
          grition: {
            errorId: `getEstinantBuilderCallExpressionParts/invalid-estinant-name`,
            message: `Estinant builder instantiation name does not match the variable name`,
            locator: {
              typeName: ErrorLocatorTypeName.FileErrorLocator,
              filePath: engineEstinantLocator.estinantFilePath,
            },
            metadata: {
              expected: estinantName,
              actual: instantiatedName,
            },
          },
        });
      }

      return {
        [PROGRAM_ERROR_GEPP]: parallelErrorList,
        [ENGINE_ESTINANT_GEPP]: [
          {
            zorn: engineEstinantLocatorInput.zorn,
            grition: {
              id: uuid.v4(),
              ...engineEstinantLocator,
              commentText: commentedBodyDeclaration?.commentText ?? '',
              inputList,
              outputList,
            } satisfies EngineEstinant,
          },
        ],
      };
    },
  )
  .assemble();
