import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
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
  ProgramError,
  ProgramErrorOdeshin,
} from '../error/programError';
import {
  ProgramBodyDeclarationsByIdentifierVoictent,
  PROGRAM_BODY_STATEMENTS_BY_IDENTIFIER_GEPP,
} from '../type-script-file/programBodyDeclarationsByIdentifier';
import {
  ENGINE_ESTINANT_LOCATOR_2_GEPP,
  EngineEstinantLocator2,
  EngineEstinantLocator2Voictent,
} from './engineEstinantLocator2';
import { EstinantInput } from './estinant-input-output/estinantInputList';
import { EstinantOutput } from './estinant-input-output/estinantOutputList';
import {
  ENGINE_ESTINANT_2_GEPP,
  EngineEstinant2,
  EngineEstinant2Odeshin,
  EngineEstinant2Voictent,
  EstinantInput2,
  EstinantOutput2,
} from './engineEstinant2';
import { getTextDigest } from '../../../utilities/getTextDigest';
import { CommentedProgramBodyDeclaration } from '../type-script-file/commentedProgramBodyDeclarationList';
import { isNode } from '../../../utilities/type-script-ast/isNode';
import {
  buildIsTypeScriptTypeParameterInstantiationWithSpecificParameterTuple,
  isTypeScriptTypeParameterInstantiationWithParameterTuple,
} from '../../../utilities/type-script-ast/isTypeScriptTypeParameterInstantiation';

type EstinantName = 'getEngineEstinant';

type CoreEstinantAccessorInput = {
  estinantLocator: EngineEstinantLocator2;
  commentedBodyDeclaration: CommentedProgramBodyDeclaration | undefined;
};

type CoreEstinantAccessorResult = {
  errorList: ProgramError<EstinantName>[];
  estinant: EngineEstinant2 | null;
};

const getCoreEstinant = ({
  estinantLocator,
  commentedBodyDeclaration,
}: CoreEstinantAccessorInput): CoreEstinantAccessorResult => {
  const estinantName = estinantLocator.identifierName;

  const typeNode = isNode(commentedBodyDeclaration?.identifiableNode)
    ? commentedBodyDeclaration?.identifiableNode
    : null;

  const typeParameterNodeList =
    typeNode?.type === AST_NODE_TYPES.VariableDeclarator &&
    typeNode.id.typeAnnotation?.type === AST_NODE_TYPES.TSTypeAnnotation &&
    typeNode.id.typeAnnotation.typeAnnotation.type ===
      AST_NODE_TYPES.TSTypeReference &&
    isTypeScriptTypeParameterInstantiationWithParameterTuple(
      typeNode.id.typeAnnotation.typeAnnotation.typeParameters,
      [
        AST_NODE_TYPES.TSTypeReference,
        AST_NODE_TYPES.TSTupleType,
        AST_NODE_TYPES.TSTypeReference,
      ] as const,
    )
      ? typeNode.id.typeAnnotation.typeAnnotation.typeParameters.params
      : null;

  if (typeParameterNodeList === null) {
    return {
      errorList: [
        {
          errorId: `getEngineEstinant/missing-type-parameter-list`,
          message: 'Unable to locate type parameter list',
          locator: {
            typeName: ErrorLocatorTypeName.FileErrorLocator,
            filePath: estinantLocator.filePath,
          },
          metadata: {
            typeNode,
            commentedBodyDeclaration,
          },
        },
      ],
      estinant: {
        id: getTextDigest(estinantName),
        estinantName,
        ...estinantLocator,
        commentText: commentedBodyDeclaration?.commentText ?? '',
        inputList: [],
        outputList: [],
      } satisfies EngineEstinant2,
    };
  }

  const [leftTypeReference, rightTypeTuple, outputTypeReference] =
    typeParameterNodeList;

  const parallelErrorList: ProgramError<EstinantName>[] = [];

  const leftVoqueName =
    isTypeScriptTypeParameterInstantiationWithParameterTuple(
      leftTypeReference.typeParameters,
      [AST_NODE_TYPES.TSTypeReference] as const,
    ) &&
    isIdentifiableTypeScriptTypeReference(
      leftTypeReference.typeParameters.params[0],
    )
      ? leftTypeReference.typeParameters.params[0].typeName.name
      : null;

  const rightTypeParameterInstantiationTuple =
    rightTypeTuple.elementTypes.every(isIdentifiableTypeScriptTypeReference)
      ? rightTypeTuple.elementTypes.map(
          (elementType) => elementType.typeParameters,
        )
      : null;

  const isTypeScriptTypeParameterInstantiationWithSpecificParameterTuple =
    buildIsTypeScriptTypeParameterInstantiationWithSpecificParameterTuple([
      AST_NODE_TYPES.TSTypeReference,
    ] as const);

  const rightTypeReferenceTuple = rightTypeParameterInstantiationTuple?.every(
    isTypeScriptTypeParameterInstantiationWithSpecificParameterTuple,
  )
    ? rightTypeParameterInstantiationTuple.map(
        (parameterInstantiation) => parameterInstantiation.params[0],
      )
    : null;

  const rightVoqueNameTuple = rightTypeReferenceTuple?.every(
    isIdentifiableTypeScriptTypeReference,
  )
    ? rightTypeReferenceTuple?.map(
        (typeReference) => typeReference.typeName.name,
      )
    : null;

  const outputVoqueNameTuple =
    isTypeScriptTypeParameterInstantiationWithParameterTuple(
      outputTypeReference.typeParameters,
      [AST_NODE_TYPES.TSTupleType] as const,
    ) &&
    outputTypeReference.typeParameters.params[0].elementTypes.every(
      isIdentifiableTypeScriptTypeReference,
    )
      ? outputTypeReference.typeParameters.params[0].elementTypes.map(
          (element) => {
            return element.typeName.name;
          },
        )
      : null;

  if (leftVoqueName === null) {
    parallelErrorList.push({
      errorId: 'getEngineEstinant/unparseable-core-left-estinant-input',
      message: 'Left estiant input is unparseable',
      locator: {
        typeName: ErrorLocatorTypeName.FileErrorLocator,
        filePath: estinantLocator.filePath,
      },
      metadata: {
        leftVoqueName,
        leftTypeReference,
      },
    });
  }

  if (rightVoqueNameTuple === null) {
    parallelErrorList.push({
      errorId: 'getEngineEstinant/unparseable-core-right-estinant-input-tuple',
      message: 'Unable to parse the right input tuple type',
      locator: {
        typeName: ErrorLocatorTypeName.FileErrorLocator,
        filePath: estinantLocator.filePath,
      },
      metadata: {
        rightVoqueNameTuple,
        rightTypeReferenceTuple,
        rightTypeParameterInstantiationTuple,
        rightTypeTuple,
      },
    });
  }

  if (outputVoqueNameTuple === null) {
    parallelErrorList.push({
      errorId: 'getEngineEstinant/unparseable-core-estinant-output',
      message: 'Estinant output tuple is unparseable',
      locator: {
        typeName: ErrorLocatorTypeName.FileErrorLocator,
        filePath: estinantLocator.filePath,
      },
      metadata: {
        outputVoqueNameTuple,
        outputTypeReference,
      },
    });
  }

  const inputList = [leftVoqueName, rightVoqueNameTuple]
    .flat()
    .map((voqueName, index) => {
      if (voqueName === null) {
        return null;
      }

      const voictentName = voqueName.replace(/Voque$/, '');

      return {
        id: getTextDigest(`${estinantName} | input-${voqueName}-${index}`),
        voictentName,
        isInput: true,
        index,
      } satisfies EstinantInput2;
    })
    .filter((input): input is EstinantInput2 => input !== null);

  const outputList = (outputVoqueNameTuple ?? []).map((voqueName) => {
    const voictentName = voqueName.replace(/Voque$/, '');

    return {
      id: getTextDigest(`${estinantName} | output-${voqueName}`),
      voictentName,
      isInput: false,
      index: null,
    } satisfies EstinantOutput2;
  });

  return {
    errorList: parallelErrorList,
    estinant: {
      id: getTextDigest(estinantName),
      estinantName,
      ...estinantLocator,
      commentText: commentedBodyDeclaration?.commentText ?? '',
      inputList,
      outputList,
    } satisfies EngineEstinant2,
  };
};

type AdaptedEstinantAccessorInput = {
  estinantLocator: EngineEstinantLocator2;
  commentedBodyDeclaration: CommentedProgramBodyDeclaration | undefined;
};

type AdaptedEstinantAccessorResult = {
  errorList: ProgramError<EstinantName>[];
  estinant: EngineEstinant2 | null;
};

const getAdaptedEstinant = ({
  estinantLocator,
  commentedBodyDeclaration,
}: AdaptedEstinantAccessorInput): AdaptedEstinantAccessorResult => {
  const initExpression =
    commentedBodyDeclaration?.identifiableNode?.type ===
    AST_NODE_TYPES.VariableDeclarator
      ? commentedBodyDeclaration.identifiableNode.init
      : null;

  const callExpression = isCallExpression(initExpression)
    ? initExpression
    : null;

  if (callExpression === null) {
    const estinantName = estinantLocator.identifierName;

    let error: ProgramError<EstinantName>;
    if (estinantLocator.isCoreEstinant) {
      error = {
        errorId: `getEngineEstinant/unhandled-core-estinant`,
        message: 'Parsing core engine estinants is not handled yet',
        locator: {
          typeName: ErrorLocatorTypeName.FileErrorLocator,
          filePath: estinantLocator.filePath,
        },
        metadata: null,
      };
    } else {
      error = {
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
      };
    }

    return {
      errorList: [error],
      estinant: {
        id: getTextDigest(estinantName),
        estinantName,
        ...estinantLocator,
        commentText: '',
        inputList: [],
        outputList: [],
      } satisfies EngineEstinant2,
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
      errorList: errorList.map((error) => {
        return {
          errorId: `getEngineEstinant/idk`,
          message: 'I have no idea',
          locator: {
            typeName: ErrorLocatorTypeName.FileErrorLocator,
            filePath: estinantLocator.filePath,
          },
          metadata: {
            error,
          },
        };
      }),
      estinant: null,
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
    flattenedCallExpressionList.map<ParsedExpression1>((expression, index) => {
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
    });

  if (
    parsedFlattenedCallExpressionList[0].functionName !== buildEstinant.name
  ) {
    return {
      errorList: [
        {
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
      ],
      estinant: null,
    };
  }

  // TODO: tie these function names back to the estinant builder function names
  if (
    parsedFlattenedCallExpressionList[
      parsedFlattenedCallExpressionList.length - 1
    ]?.functionName !== 'assemble'
  ) {
    return {
      errorList: [
        {
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
      ],
      estinant: null,
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
      errorList: errorParsedExpressionList.map((parsedExpression) => {
        return {
          errorId: `getEngineEstinant/missing-type-parameter`,
          message: `Estinant builder expression "${parsedExpression.functionName}" is missing a type parameter`,
          locator: {
            typeName: ErrorLocatorTypeName.FileErrorLocator,
            filePath: estinantLocator.filePath,
          },
          metadata: {
            parsedExpression,
          },
        };
      }),
      estinant: null,
    };
  }

  const estinantName = estinantLocator.identifierName;

  const estinantInputOutputList = inputOutputCallExpressionList.map<
    EstinantInput2 | EstinantOutput2
  >(({ isInput, typeNode }, index) => {
    // TODO: make the convention where we chop off the suffix more discoverable
    const voictentName = typeNode.typeName.name.replace(/Voictent$/, '');

    if (isInput) {
      return {
        id: getTextDigest(`${estinantName} | input-${index}`),
        voictentName,
        isInput,
        index,
      } satisfies EstinantInput2;
    }

    return {
      id: getTextDigest(`${estinantName} | output-${index}`),
      voictentName,
      isInput,
      index: null,
    } satisfies EstinantOutput2;
  });

  const inputList = estinantInputOutputList.filter<EstinantInput>(
    (inputOrOutput): inputOrOutput is EstinantInput => inputOrOutput.isInput,
  );
  const outputList = estinantInputOutputList.filter<EstinantOutput>(
    (inputOrOutput): inputOrOutput is EstinantOutput => !inputOrOutput.isInput,
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
    estinantNameProperty !== null && isStringLiteral(estinantNameProperty.value)
      ? estinantNameProperty.value.value
      : null;

  const parallelErrorList: ProgramError<EstinantName>[] = [];

  if (instantiatedName === null) {
    parallelErrorList.push({
      errorId: `getEngineEstinant/missing-estinant-name`,
      message: `Estinant builder instantiation is missing a name`,
      locator: {
        typeName: ErrorLocatorTypeName.FileErrorLocator,
        filePath: estinantLocator.filePath,
      },
      metadata: null,
    });
  } else if (instantiatedName !== estinantLocator.identifierName) {
    parallelErrorList.push({
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
    });
  }

  return {
    errorList: parallelErrorList,
    estinant: {
      id: getTextDigest(estinantName),
      estinantName,
      ...estinantLocator,
      commentText: commentedBodyDeclaration?.commentText ?? '',
      inputList,
      outputList,
    } satisfies EngineEstinant2,
  };
};

/**
 * Uses the estinant locator to find and populate the information for the
 * estinant. This includes the input and output information for each estinant.
 */
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
    const estinantLocator = engineEstinantLocatorOdeshin.grition;

    const commentedBodyDeclaration = bodyDeclarationsByIdentifier.get(
      estinantLocator.identifierName,
    );

    // TODO: implement custom core estinant builder "buildAddMetadataForSerialization"

    let errorList: ProgramError<EstinantName>[];
    let estinant: EngineEstinant2 | null;
    if (estinantLocator.isCoreEstinant) {
      ({ errorList, estinant } = getCoreEstinant({
        estinantLocator,
        commentedBodyDeclaration,
      }));
    } else {
      ({ errorList, estinant } = getAdaptedEstinant({
        estinantLocator,
        commentedBodyDeclaration,
      }));
    }

    const estinantList: EngineEstinant2Odeshin[] =
      estinant !== null
        ? [
            {
              zorn: engineEstinantLocatorOdeshin.zorn,
              grition: estinant,
            },
          ]
        : [];

    return {
      [PROGRAM_ERROR_GEPP]: errorList.map<ProgramErrorOdeshin<EstinantName>>(
        (programError) => {
          return {
            zorn: '',
            grition: programError,
          };
        },
      ),
      [ENGINE_ESTINANT_2_GEPP]: estinantList,
    };
  })
  .assemble();
