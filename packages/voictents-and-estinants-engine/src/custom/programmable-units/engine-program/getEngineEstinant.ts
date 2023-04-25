import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import * as uuid from 'uuid';
import { splitList } from '../../../utilities/splitList';
import {
  flattenCallExpressionChain,
  FlattenedCallExpressionOrError,
} from '../../../utilities/type-script-ast/flattenIdentifiableCallExpressionChain';
import { isCallExpression } from '../../../utilities/type-script-ast/isCallExpression';
import { IdentifiableCallExpression } from '../../../utilities/type-script-ast/isIdentifiableCallExpression';
import {
  IdentifiableTypeScriptTypeReference,
  isIdentifiableTypeScriptTypeReference,
} from '../../../utilities/type-script-ast/isIdentifiableTypeScriptTypeReference';
import { IdentifiableMemberExpressionCallExpression } from '../../../utilities/type-script-ast/isMemberExpressionCallExpression';
import {
  isObjectExpressionWithIdentifierProperties,
  IdentifiableProperty,
} from '../../../utilities/type-script-ast/isObjectLiteralExpressionWithIdentifierProperties';
import { isStringLiteral } from '../../../utilities/type-script-ast/isStringLiteral';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ProgramErrorVoictent,
  PROGRAM_ERROR_GEPP,
  ErrorLocatorTypeName,
  ProgramErrorOdeshin,
  ProgramErrorId,
} from '../error/programError';
import {
  ProgramBodyDeclarationsByIdentifierVoictent,
  PROGRAM_BODY_STATEMENTS_BY_IDENTIFIER_GEPP,
} from '../type-script-file/programBodyDeclarationsByIdentifier';
import {
  ENGINE_ESTINANT_LOCATOR_2_GEPP,
  EngineEstinantLocator2Voictent,
} from './engineEstinantLocator2';
import { EstinantInput } from './estinant-input-output/estinantInputList';
import { EstinantOutput } from './estinant-input-output/estinantOutputList';
import {
  ENGINE_ESTINANT_2_GEPP,
  EngineEstinant2,
  EngineEstinant2Voictent,
  EstinantInput2,
  EstinantOutput2,
} from './engineEstinant2';

type EstinantName = 'getEngineEstinant';

type ErrorId = ProgramErrorId<EstinantName>;

export const getEngineEstinant = buildEstinant({
  name: 'getEngineEstinant',
})
  .fromHubblepup<EngineEstinantLocator2Voictent>({
    gepp: ENGINE_ESTINANT_LOCATOR_2_GEPP,
  })
  .andFromGritionTuple<ProgramBodyDeclarationsByIdentifierVoictent, [string]>({
    gepp: PROGRAM_BODY_STATEMENTS_BY_IDENTIFIER_GEPP,
    croard: (rightInput) => rightInput.zorn,
    framate: (leftInput) => [leftInput.grition.filePath],
  })
  .toHubblepupTuple<ProgramErrorVoictent<EstinantName>>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .toHubblepupTuple<EngineEstinant2Voictent>({
    gepp: ENGINE_ESTINANT_2_GEPP,
  })
  .onPinbe((engineEstinantLocatorOdeshin, [bodyDeclarationsByIdentifier]) => {
    const basicErrorZorn: ErrorId = `getEngineEstinant/${engineEstinantLocatorOdeshin.zorn}`;
    const missingNameErrorZorn: ErrorId = `getEngineEstinant/missing-name/${engineEstinantLocatorOdeshin.zorn}`;
    const invalidNameErrorZorn: ErrorId = `getEngineEstinant/invalid-name/${engineEstinantLocatorOdeshin.zorn}`;
    const missingCommentErrorZorn: ErrorId = `getEngineEstinant/missing-comment/${engineEstinantLocatorOdeshin.zorn}`;

    const estinantLocator = engineEstinantLocatorOdeshin.grition;

    const commentedBodyDeclaration = bodyDeclarationsByIdentifier.get(
      estinantLocator.identifierName,
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
              errorId: `getEngineEstinant/missing-call-expression`,
              message: 'Export declaration is missing a call expression',
              locator: {
                typeName: ErrorLocatorTypeName.FileErrorLocator,
                filePath: estinantLocator.filePath,
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
        [ENGINE_ESTINANT_2_GEPP]: [],
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
              errorId: `getEngineEstinant/idk`,
              message: 'I have no idea',
              locator: {
                typeName: ErrorLocatorTypeName.FileErrorLocator,
                filePath: estinantLocator.filePath,
              },
              metadata: {
                error,
              },
            },
          };
        }),
        [ENGINE_ESTINANT_2_GEPP]: [],
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
              errorId: `getEngineEstinant/invalid-call-expression-chain-start`,
              message: `Call expression chain does not start with "${buildEstinant.name}"`,
              locator: {
                typeName: ErrorLocatorTypeName.FileErrorLocator,
                filePath: estinantLocator.filePath,
              },
              metadata: {
                parsedFlattenedCallExpressionList,
              },
            },
          },
        ],
        [ENGINE_ESTINANT_2_GEPP]: [],
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
              errorId: `getEngineEstinant/invalid-call-expression-chain-end`,
              message:
                'Estinant builder call expression chain does not end in "assemble"',
              locator: {
                typeName: ErrorLocatorTypeName.FileErrorLocator,
                filePath: estinantLocator.filePath,
              },
              metadata: {
                parsedFlattenedCallExpressionList,
              },
            },
          },
        ],
        [ENGINE_ESTINANT_2_GEPP]: [],
      };
    }

    const inputOutputExpressionList = parsedFlattenedCallExpressionList.filter(
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
                errorId: `getEngineEstinant/missing-type-parameter`,
                message: `Estinant builder expression "${parsedExpression.functionName}" is missing a type parameter`,
                locator: {
                  typeName: ErrorLocatorTypeName.FileErrorLocator,
                  filePath: estinantLocator.filePath,
                },
                metadata: {
                  parsedExpression,
                },
              },
            };
          },
        ),
        [ENGINE_ESTINANT_2_GEPP]: [],
      };
    }

    const estinantInputOutputList = inputOutputCallExpressionList.map<
      EstinantInput2 | EstinantOutput2
    >(({ isInput, typeNode }, index) => {
      // TODO: make the convention where we chop off the suffix more discoverable
      const voictentName = typeNode.typeName.name.replace(/Voictent$/, '');

      if (isInput) {
        return {
          id: uuid.v4(),
          voictentName,
          isInput,
          index,
        } satisfies EstinantInput2;
      }

      return {
        id: uuid.v4(),
        voictentName,
        isInput,
        index: null,
      } satisfies EstinantOutput2;
    });

    const inputList = estinantInputOutputList.filter<EstinantInput>(
      (inputOrOutput): inputOrOutput is EstinantInput => inputOrOutput.isInput,
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
          errorId: `getEngineEstinant/missing-estinant-name`,
          message: `Estinant builder instantiation is missing a name`,
          locator: {
            typeName: ErrorLocatorTypeName.FileErrorLocator,
            filePath: estinantLocator.filePath,
          },
          metadata: null,
        },
      });
    } else if (instantiatedName !== estinantLocator.identifierName) {
      parallelErrorList.push({
        zorn: invalidNameErrorZorn,
        grition: {
          errorId: `getEngineEstinant/invalid-estinant-name`,
          message: `Estinant builder instantiation name does not match the variable name`,
          locator: {
            typeName: ErrorLocatorTypeName.FileErrorLocator,
            filePath: estinantLocator.filePath,
          },
          metadata: {
            expected: estinantLocator.identifierName,
            actual: instantiatedName,
          },
        },
      });
    }

    if (commentedBodyDeclaration?.commentText === null) {
      parallelErrorList.push({
        zorn: missingCommentErrorZorn,
        grition: {
          errorId: `getEngineEstinant/missing-comment`,
          message: 'Estinant definitions is missing a TypeDoc comment',
          locator: {
            typeName: ErrorLocatorTypeName.FileErrorLocator,
            filePath: estinantLocator.filePath,
          },
          metadata: null,
        },
      });
    }

    return {
      [PROGRAM_ERROR_GEPP]: parallelErrorList,
      [ENGINE_ESTINANT_2_GEPP]: [
        {
          zorn: engineEstinantLocatorOdeshin.zorn,
          grition: {
            id: uuid.v4(),
            estinantName: estinantLocator.identifierName,
            ...estinantLocator,
            commentText: commentedBodyDeclaration?.commentText ?? '',
            inputList,
            outputList,
          } satisfies EngineEstinant2,
        },
      ],
    };
  })
  .assemble();
