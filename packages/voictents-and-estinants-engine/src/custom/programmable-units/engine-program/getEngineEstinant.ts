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
  PROGRAM_BODY_STATEMENTS_BY_IDENTIFIER_GEPP,
  ProgramBodyDeclarationsByIdentifier,
  ProgramBodyDeclarationsByIdentifierVoque,
} from '../type-script-file/programBodyDeclarationsByIdentifier';
import {
  ENGINE_ESTINANT_LOCATOR_2_GEPP,
  EngineEstinantBuildAddMetadataForSerializationLocator,
  EngineEstinantLocator2TypeName,
  EngineEstinantLocator2Voque,
  EngineEstinantTopLevelDeclarationLocator,
} from './engineEstinantLocator2';
import {
  ENGINE_ESTINANT_2_GEPP,
  EngineEstinant2Instance,
  EngineEstinant2Voque,
  EngineEstinant2,
} from './engineEstinant2';
import { CommentedProgramBodyDeclaration } from '../type-script-file/commentedProgramBodyDeclarationList';
import { isNode } from '../../../utilities/type-script-ast/isNode';
import {
  buildIsTypeScriptTypeParameterInstantiationWithSpecificParameterTuple,
  isTypeScriptTypeParameterInstantiationWithParameterTuple,
} from '../../../utilities/type-script-ast/isTypeScriptTypeParameterInstantiation';
import {
  PROGRAM_ERROR_GEPP,
  ProgramErrorElementLocatorTypeName,
  GenericProgramErrorVoque,
  ReportedProgramError,
  ReportingEstinantLocator,
} from '../error/programError';
import { isIdentifier } from '../../../utilities/type-script-ast/isIdentifier';
import { isSpecificConstantTypeScriptAsExpression } from '../../../utilities/type-script-ast/isConstantTypeScriptAsExpression';
import {
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImportListVoque,
} from '../type-script-file/typeScriptFileImportList';
import { EngineVoqueLocatorInstance } from './engineVoqueLocator';
import {
<<<<<<< HEAD
  EngineVoqueLocatorInstance,
  EngineVoqueLocator,
} from './engineVoqueLocator';
import {
  EstinantVoqueRelationshipVoque,
  ESTINANT_VOQUE_RELATIONSHIP_GEPP,
  EstinantVoqueRelationshipInstance,
} from './estinantVoqueRelationship';
=======
  ESTINANT_INPUT_2_GEPP,
  EstinantInput2,
  EstinantInput2Instance,
  EstinantInput2Voque,
} from './input-output/engineEstinantInput2';
import {
  ESTINANT_OUTPUT_2_GEPP,
  EstinantOutput2,
  EstinantOutput2Instance,
  EstinantOutput2Voque,
} from './input-output/engineEstinantOutput2';
>>>>>>> deb685c (Save next program model changes that affect the current modeler)

const ESTINANT_NAME = 'getEngineEstinant' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingEstinantLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName: ProgramErrorElementLocatorTypeName.ReportingEstinantLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

type IdentifierOriginFilePathAccessor = (identifierName: string) => string;

type CoreEstinantAccessorInput = {
  estinantLocator: EngineEstinantTopLevelDeclarationLocator;
  commentedBodyDeclaration: CommentedProgramBodyDeclaration | undefined;
};

type CoreEstinantAccessorResult = {
  errorList: ReportedProgramError<ReportingLocator>[];
  estinant: EngineEstinant2 | null;
};

const getBuildAddMetadataForSerializationEstinant = (
  estinantLocator: EngineEstinantBuildAddMetadataForSerializationLocator,
): CoreEstinantAccessorResult => {
  const typeParameterTuple =
    isTypeScriptTypeParameterInstantiationWithParameterTuple(
      estinantLocator.callExpression.typeParameters,
      [AST_NODE_TYPES.TSTypeReference, AST_NODE_TYPES.TSTypeReference] as const,
    )
      ? estinantLocator.callExpression.typeParameters.params
      : null;

  const parameterNameTuple = typeParameterTuple?.every(
    isIdentifiableTypeScriptTypeReference,
  )
    ? typeParameterTuple.map(
        (stuff: IdentifiableTypeScriptTypeReference) => stuff.typeName.name,
      )
    : null;

  if (parameterNameTuple === null) {
    return {
      errorList: [
        {
          name: 'unparseable-build-add-metadata-for-serialization',
          error: new Error(
            'Unable to parse buildAddMetadataForSerialization call. Make sure it has two type parameters.',
          ),
          reporterLocator,
          sourceLocator: {
            typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
            filePath: estinantLocator.filePath,
          },
          context: {
            parameterNameTuple,
            typeParameterTuple,
          },
        } satisfies ReportedProgramError<ReportingLocator>,
      ],
      estinant: new EngineEstinant2Instance({
        // TODO: why do we include both of these?
        estinantName: 'UNKNOWN',
        identifierName: 'UNKNOWN',
        filePath: estinantLocator.filePath,
        commentText: '',
        inputList: [],
        outputList: [],
        locator: estinantLocator,
      }),
    };
  }

  const [inputVoqueName, outputVoqueName] = parameterNameTuple;

  const inputVoictentName = inputVoqueName.replace(/Voque$/, '');
  const outputVoictentName = outputVoqueName.replace(/Voque$/, '');

  // TODO: tie this logic back to the helper function itself
  const estinantName = `serialize/${inputVoictentName}`;

  return {
    errorList: [],
    estinant: new EngineEstinant2Instance({
      // TODO: why do we include both of these?
      estinantName,
      identifierName: estinantName,
      filePath: estinantLocator.filePath,
      commentText:
        'Prepares each item in one collection to be sent to a serialized collection',
      inputList: [
        new EstinantInput2Instance({
          voictentName: inputVoictentName,
          isInput: true,
          index: 0,
          estinantLocator,
          estinantName,
        }),
      ],
      outputList: [
        new EstinantOutput2Instance({
          voictentName: outputVoictentName,
          isInput: false,
          estinantLocator,
          estinantName,
        }),
      ],
      locator: estinantLocator,
    }),
  };
};

const getCoreEstinant = ({
  estinantLocator,
  commentedBodyDeclaration,
}: CoreEstinantAccessorInput): CoreEstinantAccessorResult => {
  const estinantName = estinantLocator.identifierName;

  const typeNode =
    commentedBodyDeclaration !== undefined &&
    commentedBodyDeclaration.identifiableNode !== null &&
    commentedBodyDeclaration.identifiableNode.type !== undefined &&
    isNode(commentedBodyDeclaration.identifiableNode)
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
          name: 'missing-type-parameter-list',
          error: new Error('Unable to locate type parameter list'),
          reporterLocator,
          sourceLocator: {
            typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
            filePath: estinantLocator.filePath,
          },
          context: {
            typeNode,
            commentedBodyDeclaration,
          },
        } satisfies ReportedProgramError<ReportingLocator>,
      ],
      estinant: new EngineEstinant2Instance({
        filePath: estinantLocator.filePath,
        identifierName: estinantLocator.identifierName,
        estinantName,
        commentText: commentedBodyDeclaration?.commentText ?? '',
        inputList: [],
        outputList: [],
        locator: estinantLocator,
      }),
    };
  }

  const [leftTypeReference, rightTypeTuple, outputTypeReference] =
    typeParameterNodeList;

  const parallelErrorList: ReportedProgramError<ReportingLocator>[] = [];

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
      name: 'unparseable-core-left-estinant-input',
      error: new Error('Left estiant input is unparseable'),
      reporterLocator,
      sourceLocator: {
        typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
        filePath: estinantLocator.filePath,
      },
      context: {
        leftVoqueName,
        leftTypeReference,
      },
    });
  }

  if (rightVoqueNameTuple === null) {
    parallelErrorList.push({
      name: 'unparseable-core-right-estinant-input-tuple',
      error: new Error('Unable to parse the right input tuple type'),
      reporterLocator,
      sourceLocator: {
        typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
        filePath: estinantLocator.filePath,
      },
      context: {
        rightVoqueNameTuple,
        rightTypeReferenceTuple,
        rightTypeParameterInstantiationTuple,
        rightTypeTuple,
      },
    });
  }

  if (outputVoqueNameTuple === null) {
    parallelErrorList.push({
      name: 'unparseable-core-estinant-output',
      error: new Error('Estinant output tuple is unparseable'),
      reporterLocator,
      sourceLocator: {
        typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
        filePath: estinantLocator.filePath,
      },
      context: {
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

      return new EstinantInput2Instance({
        voictentName,
        isInput: true,
        index,
        estinantLocator,
        estinantName,
      });
    })
    .filter((input): input is EstinantInput2 => input !== null);

  const outputList = (outputVoqueNameTuple ?? []).map((voqueName) => {
    const voictentName = voqueName.replace(/Voque$/, '');

    return new EstinantOutput2Instance({
      voictentName,
      isInput: false,
      estinantLocator,
      estinantName,
    });
  });

  return {
    errorList: parallelErrorList,
    estinant: new EngineEstinant2Instance({
      filePath: estinantLocator.filePath,
      identifierName: estinantLocator.identifierName,
      estinantName,
      commentText: commentedBodyDeclaration?.commentText ?? '',
      inputList,
      outputList,
      locator: estinantLocator,
    }),
  };
};

type AdaptedEstinantAccessorInput = {
  estinantLocator: EngineEstinantTopLevelDeclarationLocator;
  commentedBodyDeclaration: CommentedProgramBodyDeclaration | undefined;
  bodyDeclarationsByIdentifier: ProgramBodyDeclarationsByIdentifier;
  getIdentifierOriginFilePath: IdentifierOriginFilePathAccessor;
};

type AdaptedEstinantAccessorResult = {
  errorList: ReportedProgramError<ReportingLocator>[];
  estinant: EngineEstinant2 | null;
};

const getAdaptedEstinant = ({
  estinantLocator,
  commentedBodyDeclaration,
  bodyDeclarationsByIdentifier,
  getIdentifierOriginFilePath,
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

    let error: ReportedProgramError<ReportingLocator>;
    if (estinantLocator.isCoreEstinant) {
      error = {
        name: `unhandled-core-estinant`,
        error: new Error('Parsing core engine estinants is not handled yet'),
        reporterLocator,
        sourceLocator: {
          typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
          filePath: estinantLocator.filePath,
        },
        context: null,
      };
    } else {
      error = {
        name: `missing-call-expression`,
        error: new Error('Export declaration is missing a call expression'),
        reporterLocator,
        sourceLocator: {
          typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
          filePath: estinantLocator.filePath,
        },
        context: {
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
      estinant: new EngineEstinant2Instance({
        filePath: estinantLocator.filePath,
        identifierName: estinantLocator.identifierName,
        estinantName,
        commentText: '',
        inputList: [],
        outputList: [],
        locator: estinantLocator,
      }),
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
          name: `i-don't-remember`,
          error: new Error(
            `I seriously don't remember what this error was for`,
          ),
          reporterLocator,
          sourceLocator: {
            typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
            filePath: estinantLocator.filePath,
          },
          context: {
            error,
          },
        } satisfies ReportedProgramError<ReportingLocator>;
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
          name: `invalid-call-expression-chain-start`,
          error: new Error(
            `Call expression chain does not start with "${buildEstinant.name}"`,
          ),
          reporterLocator,
          sourceLocator: {
            typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
            filePath: estinantLocator.filePath,
          },
          context: {
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
          name: `invalid-call-expression-chain-end`,
          error: new Error(
            'Estinant builder call expression chain does not end in "assemble"',
          ),
          reporterLocator,
          sourceLocator: {
            typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
            filePath: estinantLocator.filePath,
          },
          context: {
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
          name: `missing-type-parameter`,
          error: new Error(
            `Estinant builder expression "${parsedExpression.functionName}" is missing a type parameter`,
          ),
          reporterLocator,
          sourceLocator: {
            typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
            filePath: estinantLocator.filePath,
          },
          context: {
            parsedExpression,
          },
        } satisfies ReportedProgramError<ReportingLocator>;
      }),
      estinant: null,
    };
  }

  const estinantName = estinantLocator.identifierName;

  const estinantInputOutputList = inputOutputCallExpressionList.map<
    EstinantInput2 | EstinantOutput2
  >(({ isInput, typeNode }, index) => {
    // TODO: make the convention where we chop off the suffix more discoverable
    const voqueName = typeNode.typeName.name;

    let voictentName: string;
    if (voqueName === 'GenericProgramErrorVoque') {
      voictentName = 'ProgramError';
    } else {
      voictentName = voqueName.replace(/Voque$/, '');
    }

    const voqueLocator = new EngineVoqueLocatorInstance({
      filePath: getIdentifierOriginFilePath(voqueName),
      identifierName: voqueName,
    });

    if (isInput) {
      return new EstinantInput2Instance({
        voictentName,
        voqueLocator,
        isInput,
        index,
        estinantLocator,
        estinantName,
      });
    }

    return new EstinantOutput2Instance({
      voictentName,
      voqueLocator,
      isInput,
      estinantLocator,
      estinantName,
    });
  });

  const inputList = estinantInputOutputList.filter<EstinantInput2>(
    (inputOrOutput): inputOrOutput is EstinantInput2 => inputOrOutput.isInput,
  );
  const outputList = estinantInputOutputList.filter<EstinantOutput2>(
    (inputOrOutput): inputOrOutput is EstinantOutput2 => !inputOrOutput.isInput,
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

  let instantiatedName: string | null;
  let foo: CommentedProgramBodyDeclaration | undefined;
  if (
    estinantNameProperty !== null &&
    isStringLiteral(estinantNameProperty.value)
  ) {
    instantiatedName = estinantNameProperty.value.value;
  } else if (
    estinantNameProperty !== null &&
    isIdentifier(estinantNameProperty.value) &&
    // eslint-disable-next-line no-cond-assign
    (foo = bodyDeclarationsByIdentifier.declarationByIdentifier.get(
      estinantNameProperty.value.name,
    )) !== undefined &&
    foo.identifiableNode?.type === AST_NODE_TYPES.VariableDeclarator &&
    isSpecificConstantTypeScriptAsExpression(
      foo.identifiableNode.init,
      isStringLiteral,
    )
  ) {
    instantiatedName = foo.identifiableNode.init.expression.value;
  } else {
    instantiatedName = null;
  }

  const parallelErrorList: ReportedProgramError<ReportingLocator>[] = [];

  if (instantiatedName === null) {
    parallelErrorList.push({
      name: `missing-estinant-name`,
      error: new Error(
        `Estinant builder instantiation is missing a name. Expected either a string literal or a reference to a variable declarator with "as const"`,
      ),
      reporterLocator,
      sourceLocator: {
        typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
        filePath: estinantLocator.filePath,
      },
      context: null,
    });
  } else if (instantiatedName !== estinantLocator.identifierName) {
    parallelErrorList.push({
      name: `invalid-estinant-name`,
      error: new Error(
        `Estinant builder instantiation name does not match the variable name`,
      ),
      reporterLocator,
      sourceLocator: {
        typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
        filePath: estinantLocator.filePath,
      },
      context: {
        expected: estinantLocator.identifierName,
        actual: instantiatedName,
      },
    });
  }

  return {
    errorList: parallelErrorList,
    estinant: new EngineEstinant2Instance({
      filePath: estinantLocator.filePath,
      identifierName: estinantLocator.identifierName,
      estinantName,
      commentText: commentedBodyDeclaration?.commentText ?? '',
      inputList,
      outputList,
      locator: estinantLocator,
    }),
  };
};

/**
 * Uses the estinant locator to find and populate the information for the
 * estinant. This includes the input and output information for each estinant.
 */
export const getEngineEstinant = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<EngineEstinantLocator2Voque>({
    gepp: ENGINE_ESTINANT_LOCATOR_2_GEPP,
  })
  .andFromHubblepupTuple2<ProgramBodyDeclarationsByIdentifierVoque, [string]>({
    gepp: PROGRAM_BODY_STATEMENTS_BY_IDENTIFIER_GEPP,
    framate: (leftInput) => [leftInput.hubblepup.filePath],
    croard: (rightInput) => rightInput.indexByName.zorn,
  })
  .andFromHubblepupTuple2<TypeScriptFileImportListVoque, [string]>({
    gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
    framate: (leftInput) => [leftInput.hubblepup.filePath],
    croard: (rightInput) => rightInput.indexByName.zorn,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .toHubblepupTuple2<EngineEstinant2Voque>({
    gepp: ENGINE_ESTINANT_2_GEPP,
  })
<<<<<<< HEAD
  .toHubblepupTuple2<EstinantVoqueRelationshipVoque>({
    gepp: ESTINANT_VOQUE_RELATIONSHIP_GEPP,
=======
  .toHubblepupTuple2<EstinantInput2Voque>({
    gepp: ESTINANT_INPUT_2_GEPP,
  })
  .toHubblepupTuple2<EstinantOutput2Voque>({
    gepp: ESTINANT_OUTPUT_2_GEPP,
>>>>>>> deb685c (Save next program model changes that affect the current modeler)
  })
  .onPinbe(
    (
      estinantLocator,
      [bodyDeclarationsByIdentifier],
      [{ list: importList }],
    ) => {
      const importByIdentifierName = new Map(
        importList
          .filter((importItem) => importItem.isInternal)
          .flatMap((importItem) => {
            return importItem.specifierList.map((identifierName) => {
              return [identifierName, importItem.sourcePath] as const;
            });
          }),
      );

      const getIdentifierOriginFilePath: IdentifierOriginFilePathAccessor = (
        identifierName,
      ) => {
        return (
          importByIdentifierName.get(identifierName) ?? estinantLocator.filePath
        );
      };

      let errorList: ReportedProgramError<ReportingLocator>[];
      let estinant: EngineEstinant2 | null;

      if (
        estinantLocator.typeName ===
        EngineEstinantLocator2TypeName.BuildAddMetadataForSerialization
      ) {
        ({ errorList, estinant } =
          getBuildAddMetadataForSerializationEstinant(estinantLocator));
      } else {
        const commentedBodyDeclaration =
          bodyDeclarationsByIdentifier.declarationByIdentifier.get(
            estinantLocator.identifierName,
          );

        if (estinantLocator.isCoreEstinant) {
          ({ errorList, estinant } = getCoreEstinant({
            estinantLocator,
            commentedBodyDeclaration,
          }));
        } else {
          ({ errorList, estinant } = getAdaptedEstinant({
            estinantLocator,
            commentedBodyDeclaration,
            bodyDeclarationsByIdentifier,
            getIdentifierOriginFilePath,
          }));
        }

        if (typeof commentedBodyDeclaration?.commentText !== 'string') {
          errorList.push({
            name: `missing-estinant-comment`,
            error: new Error(
              `Estinant definitions must have a comment with a description`,
            ),
            reporterLocator,
            sourceLocator: {
              typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
              filePath: estinantLocator.filePath,
            },
            context: {
              identifier: estinantLocator.identifierName,
            },
          });
        }
      }

      const estinantList: EngineEstinant2[] =
        estinant !== null ? [estinant] : [];

<<<<<<< HEAD
      const allVoqueLocatorList = [
        ...(estinant?.inputList ?? []),
        ...(estinant?.outputList ?? []),
      ]
        .map((inputOutput) => inputOutput.voqueLocator)
        .filter(
          (voqueLocator): voqueLocator is EngineVoqueLocator =>
            voqueLocator !== undefined,
        );

      const estinantVoqueRelationshipList = allVoqueLocatorList.map(
        (voqueLocator, index) => {
          return new EstinantVoqueRelationshipInstance({
            estinantLocator,
            voqueLocator,
            distinguisher: `${index}`,
          });
        },
      );

      return {
        [PROGRAM_ERROR_GEPP]: errorList,
        [ENGINE_ESTINANT_2_GEPP]: estinantList,
        [ESTINANT_VOQUE_RELATIONSHIP_GEPP]: estinantVoqueRelationshipList,
=======
      return {
        [PROGRAM_ERROR_GEPP]: errorList,
        [ENGINE_ESTINANT_2_GEPP]: estinantList,
        [ESTINANT_INPUT_2_GEPP]: estinantList.flatMap((nextEstinant) => {
          return nextEstinant.inputList;
        }),
        [ESTINANT_OUTPUT_2_GEPP]: estinantList.flatMap((nextEstinant) => {
          return nextEstinant.outputList;
        }),
>>>>>>> deb685c (Save next program model changes that affect the current modeler)
      };
    },
  )
  .assemble();
