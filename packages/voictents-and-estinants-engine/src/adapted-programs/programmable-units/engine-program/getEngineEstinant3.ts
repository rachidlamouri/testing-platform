import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { splitList } from '../../../package-agnostic-utilities/array/splitList';
import {
  flattenCallExpressionChain,
  FlattenedCallExpressionOrError,
} from '../../../package-agnostic-utilities/type-script-ast/flattenCallExpressionChain';
import { isCallExpression } from '../../../package-agnostic-utilities/type-script-ast/isCallExpression';
import { IdentifiableCallExpression } from '../../../package-agnostic-utilities/type-script-ast/isIdentifiableCallExpression';
import {
  IdentifiableTypeScriptTypeReference,
  isIdentifiableTypeScriptTypeReference,
} from '../../../package-agnostic-utilities/type-script-ast/isIdentifiableTypeScriptTypeReference';
import { IdentifiableMemberExpressionCallExpression } from '../../../package-agnostic-utilities/type-script-ast/isMemberExpressionCallExpression';
import {
  isObjectExpressionWithIdentifiableProperties,
  IdentifiableProperty,
} from '../../../package-agnostic-utilities/type-script-ast/isObjectExpressionWithIdentifiableProperties';
import { isStringLiteral } from '../../../package-agnostic-utilities/type-script-ast/isStringLiteral';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  ENGINE_ESTINANT_LOCATOR_2_GEPP,
  EngineEstinantBuildAddMetadataForSerializationLocator,
  EngineProgrammedTransformLocator2TypeName,
  EngineEstinantLocator2Voque,
  EngineEstinantTopLevelDeclarationLocator,
} from './engineEstinantLocator2';
import {
  ENGINE_PROGRAMMED_TRANSFORM_3_COLLECTION_ID,
  EngineProgrammedTransform3StreamMetatype,
  EngineEstinant3,
  EngineEstinant3Instance,
} from './engineEstinant3';
import { isNode } from '../../../package-agnostic-utilities/type-script-ast/isNode';
import {
  buildIsTypeScriptTypeParameterInstantiationWithSpecificParameterTuple,
  isTypeScriptTypeParameterInstantiationWithParameterTuple,
} from '../../../package-agnostic-utilities/type-script-ast/isTypeScriptTypeParameterInstantiation';
import {
  PROGRAM_ERROR_COLLECTION_ID,
  ProgramErrorElementLocatorTypeName,
  GenericProgramErrorStreamMetatype,
  ReportedProgramError,
  ReportingProgrammedTransformLocator,
} from '../error/programError';
import { isIdentifier } from '../../../package-agnostic-utilities/type-script-ast/isIdentifier';
import { isSpecificConstantTypeScriptAsExpression } from '../../../package-agnostic-utilities/type-script-ast/isSpecificConstantTypeScriptAsExpression';
import {
  TYPE_SCRIPT_FILE_IMPORT_LIST_COLLECTION_ID,
  TypeScriptFileImportListStreamMetatype,
} from '../type-script-file/typeScriptFileImportList';
import {
  PROGRAMMED_TRANSFORM_OUTPUT_2_COLLECTION_ID,
  EngineEstinantOutput2,
  EstinantOutput2Instance,
  EngineProgrammedTransformOutput2StreamMetatype,
} from './input-output/engineEstinantOutput2';
import {
  PROGRAMMED_TRANSFORM_INPUT_2_COLLECTION_ID,
  EngineEstinantInput2,
  EstinantInput2Instance,
  EngineProgrammedTransformInput2StreamMetatype,
} from './input-output/engineEstinantInput2';
import { EngineVoqueLocator2Instance } from './engineVoqueLocator2';
import {
  ESTINANT_VOQUE_RELATIONSHIP_2_GEPP,
  EstinantVoqueRelationship2Instance,
  EstinantVoqueRelationship2Voque,
} from './estinantVoqueRelationship2';
import { IdentifiableItemId } from '../../../adapter/identifiable-item/identifiableItem';
import { CommentedProgramBodyDeclaration } from '../type-script-file/commentedProgramBodyDeclaration';
import {
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
  FileCommentedProgramBodyDeclarationGroup,
  FileCommentedProgramBodyDeclarationGroupStreamMetatype,
} from '../type-script-file/fileCommentedProgramBodyDeclarationGroup';

const ESTINANT_NAME = 'getEngineEstinant3' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingProgrammedTransformLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName:
    ProgramErrorElementLocatorTypeName.ReportingProgrammedTransformLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

type IdentifierOriginFilePathAccessor = (identifierName: string) => string;

type CoreEstinantAccessorInput = {
  estinantLocator: EngineEstinantTopLevelDeclarationLocator;
  estinantDeclaration: CommentedProgramBodyDeclaration | undefined;
};

type CoreEstinantAccessorResult = {
  errorList: ReportedProgramError<ReportingLocator>[];
  estinant: EngineEstinant3 | null;
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
      estinant: new EngineEstinant3Instance({
        // TODO: why do we include both of these?
        programmedTransformName: 'UNKNOWN',
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
  const programmedTransformName = `serialize/${inputVoictentName}`;

  const inputVoqueLocator = new EngineVoqueLocator2Instance({
    filePath: estinantLocator.filePath,
    identifierName: inputVoqueName,
    isCoreVoque: true,
  });

  const outputVoqueLocator = new EngineVoqueLocator2Instance({
    filePath: estinantLocator.filePath,
    identifierName: outputVoqueName,
    isCoreVoque: true,
  });

  return {
    errorList: [],
    estinant: new EngineEstinant3Instance({
      // TODO: why do we include both of these?
      programmedTransformName,
      identifierName: programmedTransformName,
      filePath: estinantLocator.filePath,
      commentText:
        'Prepares each item in one collection to be sent to a serialized collection',
      inputList: [
        new EstinantInput2Instance({
          collectionName: inputVoictentName,
          isInput: true,
          index: 0,
          estinantLocator,
          programmedTransformName,
          streamMetatypeLocator: inputVoqueLocator,
        }),
      ],
      outputList: [
        new EstinantOutput2Instance({
          collectionName: outputVoictentName,
          isInput: false,
          estinantLocator,
          estinantName: programmedTransformName,
          streamMetatypeLocator: outputVoqueLocator,
        }),
      ],
      locator: estinantLocator,
    }),
  };
};

const getCoreEstinant = ({
  estinantLocator,
  estinantDeclaration,
}: CoreEstinantAccessorInput): CoreEstinantAccessorResult => {
  const programmedTransformName = estinantLocator.identifierName;

  const typeNode =
    estinantDeclaration !== undefined &&
    estinantDeclaration.identifiableNode !== null &&
    estinantDeclaration.identifiableNode.type !== undefined &&
    isNode(estinantDeclaration.identifiableNode)
      ? estinantDeclaration?.identifiableNode
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
            estinantDeclaration,
          },
        } satisfies ReportedProgramError<ReportingLocator>,
      ],
      estinant: new EngineEstinant3Instance({
        filePath: estinantLocator.filePath,
        identifierName: estinantLocator.identifierName,
        programmedTransformName,
        commentText: estinantDeclaration?.commentText ?? '',
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

      const collectionName = voqueName.replace(/Voque$/, '');

      const streamMetatypeLocator = new EngineVoqueLocator2Instance({
        identifierName: voqueName,
        filePath: estinantLocator.filePath,
        isCoreVoque: true,
      });

      return new EstinantInput2Instance({
        collectionName,
        isInput: true,
        index,
        estinantLocator,
        programmedTransformName,
        streamMetatypeLocator,
      });
    })
    .filter((input): input is EngineEstinantInput2 => input !== null);

  const outputList = (outputVoqueNameTuple ?? []).map((voqueName) => {
    const collectionName = voqueName.replace(/Voque$/, '');

    const voqueLocator = new EngineVoqueLocator2Instance({
      identifierName: voqueName,
      filePath: estinantLocator.filePath,
      isCoreVoque: true,
    });

    return new EstinantOutput2Instance({
      collectionName,
      isInput: false,
      estinantLocator,
      estinantName: programmedTransformName,
      streamMetatypeLocator: voqueLocator,
    });
  });

  return {
    errorList: parallelErrorList,
    estinant: new EngineEstinant3Instance({
      filePath: estinantLocator.filePath,
      identifierName: estinantLocator.identifierName,
      programmedTransformName,
      commentText: estinantDeclaration?.commentText ?? '',
      inputList,
      outputList,
      locator: estinantLocator,
    }),
  };
};

type AdaptedEstinantAccessorInput = {
  estinantLocator: EngineEstinantTopLevelDeclarationLocator;
  estinantDeclaration: CommentedProgramBodyDeclaration | undefined;
  bodyDeclarationGroup: FileCommentedProgramBodyDeclarationGroup;
  getIdentifierOriginFilePath: IdentifierOriginFilePathAccessor;
};

type AdaptedEstinantAccessorResult = {
  errorList: ReportedProgramError<ReportingLocator>[];
  estinant: EngineEstinant3 | null;
};

const getAdaptedEstinant = ({
  estinantLocator,
  estinantDeclaration,
  bodyDeclarationGroup,
  getIdentifierOriginFilePath,
}: AdaptedEstinantAccessorInput): AdaptedEstinantAccessorResult => {
  const initExpression =
    estinantDeclaration?.identifiableNode?.type ===
    AST_NODE_TYPES.VariableDeclarator
      ? estinantDeclaration.identifiableNode.init
      : null;

  const callExpression = isCallExpression(initExpression)
    ? initExpression
    : null;

  if (callExpression === null) {
    const programmedTransformName = estinantLocator.identifierName;

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
            estinantDeclaration?.identifiableNode !== undefined,
          hasInitExpression: initExpression !== null,
          hasCallExpression: callExpression !== null,
          initExpression,
        },
      };
    }

    return {
      errorList: [error],
      estinant: new EngineEstinant3Instance({
        filePath: estinantLocator.filePath,
        identifierName: estinantLocator.identifierName,
        programmedTransformName,
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
    parsedFlattenedCallExpressionList[0].functionName !==
    buildProgrammedTransform.name
  ) {
    return {
      errorList: [
        {
          name: `invalid-call-expression-chain-start`,
          error: new Error(
            `Call expression chain does not start with "${buildProgrammedTransform.name}"`,
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

  const programmedTransformName = estinantLocator.identifierName;

  const estinantInputOutputList = inputOutputCallExpressionList.map<
    EngineEstinantInput2 | EngineEstinantOutput2
  >(({ isInput, typeNode }, index) => {
    // TODO: make the convention where we chop off the suffix more discoverable
    const voqueName = typeNode.typeName.name;

    let collectionName: string;
    if (voqueName === 'GenericProgramErrorVoque') {
      collectionName = 'ProgramError';
    } else {
      collectionName = voqueName.replace(/Voque$/, '');
    }

    const streamMetatypeLocator = new EngineVoqueLocator2Instance({
      filePath: getIdentifierOriginFilePath(voqueName),
      identifierName: voqueName,
      isCoreVoque: false,
    });

    if (isInput) {
      return new EstinantInput2Instance({
        collectionName,
        streamMetatypeLocator,
        isInput,
        index,
        estinantLocator,
        programmedTransformName,
      });
    }

    return new EstinantOutput2Instance({
      collectionName,
      streamMetatypeLocator,
      isInput,
      estinantLocator,
      estinantName: programmedTransformName,
    });
  });

  const inputList = estinantInputOutputList.filter<EngineEstinantInput2>(
    (inputOrOutput): inputOrOutput is EngineEstinantInput2 =>
      inputOrOutput.isInput,
  );
  const outputList = estinantInputOutputList.filter<EngineEstinantOutput2>(
    (inputOrOutput): inputOrOutput is EngineEstinantOutput2 =>
      !inputOrOutput.isInput,
  );

  const instantiationExpression = flattenedCallExpressionList[0];
  const instantiationArgument = isCallExpression(instantiationExpression)
    ? instantiationExpression.arguments[0]
    : null;
  const estinantNameProperty = isObjectExpressionWithIdentifiableProperties(
    instantiationArgument,
  )
    ? instantiationArgument.properties.find(
        (property: IdentifiableProperty) => {
          return property.key.name === 'name';
        },
      ) ?? null
    : null;

  let instantiatedName: string | null;
  let declaration: CommentedProgramBodyDeclaration | undefined;
  if (
    estinantNameProperty !== null &&
    isStringLiteral(estinantNameProperty.value)
  ) {
    instantiatedName = estinantNameProperty.value.value;
  } else if (
    estinantNameProperty !== null &&
    isIdentifier(estinantNameProperty.value) &&
    // eslint-disable-next-line no-cond-assign
    (declaration = bodyDeclarationGroup.declarationByIdentifier.get(
      estinantNameProperty.value.name,
    )) !== undefined &&
    declaration.identifiableNode?.type === AST_NODE_TYPES.VariableDeclarator &&
    isSpecificConstantTypeScriptAsExpression(
      declaration.identifiableNode.init,
      isStringLiteral,
    )
  ) {
    instantiatedName = declaration.identifiableNode.init.expression.value;
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
    estinant: new EngineEstinant3Instance({
      filePath: estinantLocator.filePath,
      identifierName: estinantLocator.identifierName,
      programmedTransformName,
      commentText: estinantDeclaration?.commentText ?? '',
      inputList,
      outputList,
      locator: estinantLocator,
    }),
  };
};

/**
 * Uses the estinant locator to find and populate the information for the
 * estinant. This includes the input and output information for each estinant.
 *
 * @readableName getProgrammedTransformModel
 *
 * @canonicalDeclaration
 */
export const getEngineProgrammedTransform3 = buildProgrammedTransform({
  name: ESTINANT_NAME,
})
  .fromItem2<EngineEstinantLocator2Voque>({
    collectionId: ENGINE_ESTINANT_LOCATOR_2_GEPP,
  })
  .andFromItemTuple2<
    FileCommentedProgramBodyDeclarationGroupStreamMetatype,
    [IdentifiableItemId]
  >({
    collectionId: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
    getRightKeyTuple: (leftInput) => [leftInput.item.filePath],
    getRightKey: (rightInput) => rightInput.item.filePath,
  })
  .andFromItemTuple2<
    TypeScriptFileImportListStreamMetatype,
    [IdentifiableItemId]
  >({
    collectionId: TYPE_SCRIPT_FILE_IMPORT_LIST_COLLECTION_ID,
    getRightKeyTuple: (leftInput) => [leftInput.item.filePath],
    getRightKey: (rightInput) => rightInput.item.id,
  })
  .toItemTuple2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .toItemTuple2<EngineProgrammedTransform3StreamMetatype>({
    collectionId: ENGINE_PROGRAMMED_TRANSFORM_3_COLLECTION_ID,
  })
  .toItemTuple2<EngineProgrammedTransformInput2StreamMetatype>({
    collectionId: PROGRAMMED_TRANSFORM_INPUT_2_COLLECTION_ID,
  })
  .toItemTuple2<EngineProgrammedTransformOutput2StreamMetatype>({
    collectionId: PROGRAMMED_TRANSFORM_OUTPUT_2_COLLECTION_ID,
  })
  .toItemTuple2<EstinantVoqueRelationship2Voque>({
    collectionId: ESTINANT_VOQUE_RELATIONSHIP_2_GEPP,
  })
  .onTransform(
    (estinantLocator, [bodyDeclarationGroup], [{ list: importList }]) => {
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
      let estinant: EngineEstinant3 | null;

      if (
        estinantLocator.typeName ===
        EngineProgrammedTransformLocator2TypeName.BuildAddMetadataForSerialization
      ) {
        ({ errorList, estinant } =
          getBuildAddMetadataForSerializationEstinant(estinantLocator));
      } else {
        const estinantDeclaration =
          bodyDeclarationGroup.declarationByIdentifier.get(
            estinantLocator.identifierName,
          );
        if (estinantLocator.isCoreEstinant) {
          ({ errorList, estinant } = getCoreEstinant({
            estinantLocator,
            estinantDeclaration,
          }));
        } else {
          ({ errorList, estinant } = getAdaptedEstinant({
            estinantLocator,
            estinantDeclaration,
            bodyDeclarationGroup,
            getIdentifierOriginFilePath,
          }));
        }

        if (typeof estinantDeclaration?.commentText !== 'string') {
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

      const estinantList: [EngineEstinant3] | [] =
        estinant !== null ? [estinant] : [];

      const voqueLocatorByZorn = new Map(
        (estinant?.allVoqueLocatorList ?? []).map((voqueLocator) => {
          return [voqueLocator.id, voqueLocator];
        }),
      );

      const estinantVoqueRelationshipList = [
        ...voqueLocatorByZorn.values(),
      ].map((voqueLocator, index) => {
        return new EstinantVoqueRelationship2Instance({
          estinantLocator,
          streamMetatypeLocator: voqueLocator,
          distinguisher: `${index}`,
        });
      });

      return {
        [PROGRAM_ERROR_COLLECTION_ID]: errorList,
        [ENGINE_PROGRAMMED_TRANSFORM_3_COLLECTION_ID]: estinantList,
        [PROGRAMMED_TRANSFORM_INPUT_2_COLLECTION_ID]: estinantList.flatMap(
          (nextEstinant) => {
            return nextEstinant.inputList;
          },
        ),
        [PROGRAMMED_TRANSFORM_OUTPUT_2_COLLECTION_ID]: estinantList.flatMap(
          (nextEstinant) => {
            return nextEstinant.outputList;
          },
        ),
        [ESTINANT_VOQUE_RELATIONSHIP_2_GEPP]: estinantVoqueRelationshipList,
      };
    },
  )
  .assemble();
