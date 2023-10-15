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
  ENGINE_PROGRAMMED_TRANSFORM_LOCATOR_2_COLLECTION_ID,
  EngineProgrammedTransformBuildAddMetadataForSerializationLocator,
  EngineProgrammedTransformLocator2TypeName,
  EngineProgrammedTransformLocator2StreamMetatype,
  EngineProgrammedTransformTopLevelDeclarationLocator,
} from './engineProgrammedTransformLocator2';
import {
  ENGINE_PROGRAMMED_TRANSFORM_3_COLLECTION_ID,
  EngineProgrammedTransform3StreamMetatype,
  EngineProgrammedTransform3,
  EngineProgrammedTransform3Instance,
} from './engineProgrammedTransform3';
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
  EngineProgrammedTransformOutput2,
  ProgrammedTransformOutput2Instance,
  EngineProgrammedTransformOutput2StreamMetatype,
} from './input-output/engineProgrammedTransformOutput2';
import {
  PROGRAMMED_TRANSFORM_INPUT_2_COLLECTION_ID,
  EngineProgrammedTransformInput2,
  ProgrammedTransformInput2Instance,
  EngineProgrammedTransformInput2StreamMetatype,
} from './input-output/engineProgrammedTransformInput2';
import { EngineStreamMetatypeLocator2Instance } from './engineStreamMetatypeLocator2';
import {
  PROGRAMMED_TRANSFORM_STREAM_METATYPE_RELATIONSHIP_2_COLLECTION_ID,
  ProgrammedTransformStreamMetatypeRelationship2Instance,
  ProgrammedTransformStreamMetatypeRelationship2StreamMetatype,
} from './programmedTransformStreamMetatypeRelationship2';
import { IdentifiableItemId } from '../../../adapter/identifiable-item/identifiableItem';
import { CommentedProgramBodyDeclaration } from '../type-script-file/commentedProgramBodyDeclaration';
import {
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
  FileCommentedProgramBodyDeclarationGroup,
  FileCommentedProgramBodyDeclarationGroupStreamMetatype,
} from '../type-script-file/fileCommentedProgramBodyDeclarationGroup';

const PROGRAMMED_TRANSFORM_NAME = 'getEngineProgrammedTransform3' as const;
type ProgrammedTransformName = typeof PROGRAMMED_TRANSFORM_NAME;
type ReportingLocator =
  ReportingProgrammedTransformLocator<ProgrammedTransformName>;
const reporterLocator: ReportingLocator = {
  typeName:
    ProgramErrorElementLocatorTypeName.ReportingProgrammedTransformLocator,
  name: PROGRAMMED_TRANSFORM_NAME,
  filePath: __filename,
};

type IdentifierOriginFilePathAccessor = (identifierName: string) => string;

type CoreProgrammedTransformAccessorInput = {
  programmedTransformLocator: EngineProgrammedTransformTopLevelDeclarationLocator;
  programmedTransformDeclaration: CommentedProgramBodyDeclaration | undefined;
};

type CoreProgrammedTransformAccessorResult = {
  errorList: ReportedProgramError<ReportingLocator>[];
  programmedTransform: EngineProgrammedTransform3 | null;
};

const getBuildAddMetadataForSerializationProgrammedTransform = (
  programmedTransformLocator: EngineProgrammedTransformBuildAddMetadataForSerializationLocator,
): CoreProgrammedTransformAccessorResult => {
  const typeParameterTuple =
    isTypeScriptTypeParameterInstantiationWithParameterTuple(
      programmedTransformLocator.callExpression.typeParameters,
      [AST_NODE_TYPES.TSTypeReference, AST_NODE_TYPES.TSTypeReference] as const,
    )
      ? programmedTransformLocator.callExpression.typeParameters.params
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
            filePath: programmedTransformLocator.filePath,
          },
          context: {
            parameterNameTuple,
            typeParameterTuple,
          },
        } satisfies ReportedProgramError<ReportingLocator>,
      ],
      programmedTransform: new EngineProgrammedTransform3Instance({
        // TODO: why do we include both of these?
        programmedTransformName: 'UNKNOWN',
        identifierName: 'UNKNOWN',
        filePath: programmedTransformLocator.filePath,
        commentText: '',
        inputList: [],
        outputList: [],
        locator: programmedTransformLocator,
      }),
    };
  }

  const [inputStreamMetatypeName, outputStreamMetatypeName] =
    parameterNameTuple;

  const inputCollectionName = inputStreamMetatypeName.replace(
    /StreamMetatype$/,
    '',
  );
  const outputCollectionName = outputStreamMetatypeName.replace(
    /StreamMetatype$/,
    '',
  );

  // TODO: tie this logic back to the helper function itself
  const programmedTransformName = `serialize/${inputCollectionName}`;

  const inputStreamMetatypeLocator = new EngineStreamMetatypeLocator2Instance({
    filePath: programmedTransformLocator.filePath,
    identifierName: inputStreamMetatypeName,
    isCoreStreamMetatype: true,
  });

  const outputStreamMetatypeLocator = new EngineStreamMetatypeLocator2Instance({
    filePath: programmedTransformLocator.filePath,
    identifierName: outputStreamMetatypeName,
    isCoreStreamMetatype: true,
  });

  return {
    errorList: [],
    programmedTransform: new EngineProgrammedTransform3Instance({
      // TODO: why do we include both of these?
      programmedTransformName,
      identifierName: programmedTransformName,
      filePath: programmedTransformLocator.filePath,
      commentText:
        'Prepares each item in one collection to be sent to a serialized collection',
      inputList: [
        new ProgrammedTransformInput2Instance({
          collectionName: inputCollectionName,
          isInput: true,
          index: 0,
          programmedTransformLocator,
          programmedTransformName,
          streamMetatypeLocator: inputStreamMetatypeLocator,
        }),
      ],
      outputList: [
        new ProgrammedTransformOutput2Instance({
          collectionName: outputCollectionName,
          isInput: false,
          programmedTransformLocator,
          programmedTransformName,
          streamMetatypeLocator: outputStreamMetatypeLocator,
        }),
      ],
      locator: programmedTransformLocator,
    }),
  };
};

const getCoreProgrammedTransform = ({
  programmedTransformLocator,
  programmedTransformDeclaration,
}: CoreProgrammedTransformAccessorInput): CoreProgrammedTransformAccessorResult => {
  const programmedTransformName = programmedTransformLocator.identifierName;

  const typeNode =
    programmedTransformDeclaration !== undefined &&
    programmedTransformDeclaration.identifiableNode !== null &&
    programmedTransformDeclaration.identifiableNode.type !== undefined &&
    isNode(programmedTransformDeclaration.identifiableNode)
      ? programmedTransformDeclaration?.identifiableNode
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
            filePath: programmedTransformLocator.filePath,
          },
          context: {
            typeNode,
            programmedTransformDeclaration,
          },
        } satisfies ReportedProgramError<ReportingLocator>,
      ],
      programmedTransform: new EngineProgrammedTransform3Instance({
        filePath: programmedTransformLocator.filePath,
        identifierName: programmedTransformLocator.identifierName,
        programmedTransformName,
        commentText: programmedTransformDeclaration?.commentText ?? '',
        inputList: [],
        outputList: [],
        locator: programmedTransformLocator,
      }),
    };
  }

  const [leftTypeReference, rightTypeTuple, outputTypeReference] =
    typeParameterNodeList;

  const parallelErrorList: ReportedProgramError<ReportingLocator>[] = [];

  const leftStreamMetatypeName =
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

  const rightStreamMetatypeNameTuple = rightTypeReferenceTuple?.every(
    isIdentifiableTypeScriptTypeReference,
  )
    ? rightTypeReferenceTuple?.map(
        (typeReference) => typeReference.typeName.name,
      )
    : null;

  const outputStreamMetatypeNameTuple =
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

  if (leftStreamMetatypeName === null) {
    parallelErrorList.push({
      name: 'unparseable-core-left-estinant-input',
      error: new Error('Left estiant input is unparseable'),
      reporterLocator,
      sourceLocator: {
        typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
        filePath: programmedTransformLocator.filePath,
      },
      context: {
        leftStreamMetatypeName,
        leftTypeReference,
      },
    });
  }

  if (rightStreamMetatypeNameTuple === null) {
    parallelErrorList.push({
      name: 'unparseable-core-right-estinant-input-tuple',
      error: new Error('Unable to parse the right input tuple type'),
      reporterLocator,
      sourceLocator: {
        typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
        filePath: programmedTransformLocator.filePath,
      },
      context: {
        rightStreamMetatypeNameTuple,
        rightTypeReferenceTuple,
        rightTypeParameterInstantiationTuple,
        rightTypeTuple,
      },
    });
  }

  if (outputStreamMetatypeNameTuple === null) {
    parallelErrorList.push({
      name: 'unparseable-core-estinant-output',
      error: new Error('Estinant output tuple is unparseable'),
      reporterLocator,
      sourceLocator: {
        typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
        filePath: programmedTransformLocator.filePath,
      },
      context: {
        outputStreamMetatypeNameTuple,
        outputTypeReference,
      },
    });
  }

  const inputList = [leftStreamMetatypeName, rightStreamMetatypeNameTuple]
    .flat()
    .map((streamMetatypeName, index) => {
      if (streamMetatypeName === null) {
        return null;
      }

      const collectionName = streamMetatypeName.replace(/StreamMetatype$/, '');

      const streamMetatypeLocator = new EngineStreamMetatypeLocator2Instance({
        identifierName: streamMetatypeName,
        filePath: programmedTransformLocator.filePath,
        isCoreStreamMetatype: true,
      });

      return new ProgrammedTransformInput2Instance({
        collectionName,
        isInput: true,
        index,
        programmedTransformLocator,
        programmedTransformName,
        streamMetatypeLocator,
      });
    })
    .filter(
      (input): input is EngineProgrammedTransformInput2 => input !== null,
    );

  const outputList = (outputStreamMetatypeNameTuple ?? []).map(
    (streamMetatypeName) => {
      const collectionName = streamMetatypeName.replace(/StreamMetatype$/, '');

      const streamMetatypeLocator = new EngineStreamMetatypeLocator2Instance({
        identifierName: streamMetatypeName,
        filePath: programmedTransformLocator.filePath,
        isCoreStreamMetatype: true,
      });

      return new ProgrammedTransformOutput2Instance({
        collectionName,
        isInput: false,
        programmedTransformLocator,
        programmedTransformName,
        streamMetatypeLocator,
      });
    },
  );

  return {
    errorList: parallelErrorList,
    programmedTransform: new EngineProgrammedTransform3Instance({
      filePath: programmedTransformLocator.filePath,
      identifierName: programmedTransformLocator.identifierName,
      programmedTransformName,
      commentText: programmedTransformDeclaration?.commentText ?? '',
      inputList,
      outputList,
      locator: programmedTransformLocator,
    }),
  };
};

type AdaptedProgrammedTransformAccessorInput = {
  programmedTransformLocator: EngineProgrammedTransformTopLevelDeclarationLocator;
  programmedTransformDeclaration: CommentedProgramBodyDeclaration | undefined;
  bodyDeclarationGroup: FileCommentedProgramBodyDeclarationGroup;
  getIdentifierOriginFilePath: IdentifierOriginFilePathAccessor;
};

type AdaptedProgrammedTransformAccessorResult = {
  errorList: ReportedProgramError<ReportingLocator>[];
  programmedTransform: EngineProgrammedTransform3 | null;
};

const getAdaptedProgrammedTransform = ({
  programmedTransformLocator,
  programmedTransformDeclaration,
  bodyDeclarationGroup,
  getIdentifierOriginFilePath,
}: AdaptedProgrammedTransformAccessorInput): AdaptedProgrammedTransformAccessorResult => {
  const initExpression =
    programmedTransformDeclaration?.identifiableNode?.type ===
    AST_NODE_TYPES.VariableDeclarator
      ? programmedTransformDeclaration.identifiableNode.init
      : null;

  const callExpression = isCallExpression(initExpression)
    ? initExpression
    : null;

  if (callExpression === null) {
    const programmedTransformName = programmedTransformLocator.identifierName;

    let error: ReportedProgramError<ReportingLocator>;
    if (programmedTransformLocator.isCoreProgrammedTransform) {
      error = {
        name: `unhandled-core-estinant`,
        error: new Error('Parsing core engine estinants is not handled yet'),
        reporterLocator,
        sourceLocator: {
          typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
          filePath: programmedTransformLocator.filePath,
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
          filePath: programmedTransformLocator.filePath,
        },
        context: {
          hasIdentifiableNode:
            programmedTransformDeclaration?.identifiableNode !== undefined,
          hasInitExpression: initExpression !== null,
          hasCallExpression: callExpression !== null,
          initExpression,
        },
      };
    }

    return {
      errorList: [error],
      programmedTransform: new EngineProgrammedTransform3Instance({
        filePath: programmedTransformLocator.filePath,
        identifierName: programmedTransformLocator.identifierName,
        programmedTransformName,
        commentText: '',
        inputList: [],
        outputList: [],
        locator: programmedTransformLocator,
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
            filePath: programmedTransformLocator.filePath,
          },
          context: {
            error,
          },
        } satisfies ReportedProgramError<ReportingLocator>;
      }),
      programmedTransform: null,
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
            filePath: programmedTransformLocator.filePath,
          },
          context: {
            parsedFlattenedCallExpressionList,
          },
        },
      ],
      programmedTransform: null,
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
            filePath: programmedTransformLocator.filePath,
          },
          context: {
            parsedFlattenedCallExpressionList,
          },
        },
      ],
      programmedTransform: null,
    };
  }

  const inputOutputExpressionList = parsedFlattenedCallExpressionList.filter(
    (parsedExpression) =>
      // TODO: tie these function names back to the estinant builder function names
      !['buildProgrammedTransform', 'onTransform', 'assemble'].includes(
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
            filePath: programmedTransformLocator.filePath,
          },
          context: {
            parsedExpression,
          },
        } satisfies ReportedProgramError<ReportingLocator>;
      }),
      programmedTransform: null,
    };
  }

  const programmedTransformName = programmedTransformLocator.identifierName;

  const programmedTransformInputOutputList = inputOutputCallExpressionList.map<
    EngineProgrammedTransformInput2 | EngineProgrammedTransformOutput2
  >(({ isInput, typeNode }, index) => {
    // TODO: make the convention where we chop off the suffix more discoverable
    const streamMetatypeName = typeNode.typeName.name;

    let collectionName: string;
    if (streamMetatypeName === 'GenericProgramErrorVoque') {
      collectionName = 'ProgramError';
    } else {
      collectionName = streamMetatypeName.replace(/StreamMetatype$/, '');
    }

    const streamMetatypeLocator = new EngineStreamMetatypeLocator2Instance({
      filePath: getIdentifierOriginFilePath(streamMetatypeName),
      identifierName: streamMetatypeName,
      isCoreStreamMetatype: false,
    });

    if (isInput) {
      return new ProgrammedTransformInput2Instance({
        collectionName,
        streamMetatypeLocator,
        isInput,
        index,
        programmedTransformLocator,
        programmedTransformName,
      });
    }

    return new ProgrammedTransformOutput2Instance({
      collectionName,
      streamMetatypeLocator,
      isInput,
      programmedTransformLocator,
      programmedTransformName,
    });
  });

  const inputList =
    programmedTransformInputOutputList.filter<EngineProgrammedTransformInput2>(
      (inputOrOutput): inputOrOutput is EngineProgrammedTransformInput2 =>
        inputOrOutput.isInput,
    );
  const outputList =
    programmedTransformInputOutputList.filter<EngineProgrammedTransformOutput2>(
      (inputOrOutput): inputOrOutput is EngineProgrammedTransformOutput2 =>
        !inputOrOutput.isInput,
    );

  const instantiationExpression = flattenedCallExpressionList[0];
  const instantiationArgument = isCallExpression(instantiationExpression)
    ? instantiationExpression.arguments[0]
    : null;
  const programmedTransformNameProperty =
    isObjectExpressionWithIdentifiableProperties(instantiationArgument)
      ? instantiationArgument.properties.find(
          (property: IdentifiableProperty) => {
            return property.key.name === 'name';
          },
        ) ?? null
      : null;

  let instantiatedName: string | null;
  let declaration: CommentedProgramBodyDeclaration | undefined;
  if (
    programmedTransformNameProperty !== null &&
    isStringLiteral(programmedTransformNameProperty.value)
  ) {
    instantiatedName = programmedTransformNameProperty.value.value;
  } else if (
    programmedTransformNameProperty !== null &&
    isIdentifier(programmedTransformNameProperty.value) &&
    // eslint-disable-next-line no-cond-assign
    (declaration = bodyDeclarationGroup.declarationByIdentifier.get(
      programmedTransformNameProperty.value.name,
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
        filePath: programmedTransformLocator.filePath,
      },
      context: null,
    });
  } else if (instantiatedName !== programmedTransformLocator.identifierName) {
    parallelErrorList.push({
      name: `invalid-estinant-name`,
      error: new Error(
        `Estinant builder instantiation name does not match the variable name`,
      ),
      reporterLocator,
      sourceLocator: {
        typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
        filePath: programmedTransformLocator.filePath,
      },
      context: {
        expected: programmedTransformLocator.identifierName,
        actual: instantiatedName,
      },
    });
  }

  return {
    errorList: parallelErrorList,
    programmedTransform: new EngineProgrammedTransform3Instance({
      filePath: programmedTransformLocator.filePath,
      identifierName: programmedTransformLocator.identifierName,
      programmedTransformName,
      commentText: programmedTransformDeclaration?.commentText ?? '',
      inputList,
      outputList,
      locator: programmedTransformLocator,
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
  name: PROGRAMMED_TRANSFORM_NAME,
})
  .fromItem2<EngineProgrammedTransformLocator2StreamMetatype>({
    collectionId: ENGINE_PROGRAMMED_TRANSFORM_LOCATOR_2_COLLECTION_ID,
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
  .toItemTuple2<ProgrammedTransformStreamMetatypeRelationship2StreamMetatype>({
    collectionId:
      PROGRAMMED_TRANSFORM_STREAM_METATYPE_RELATIONSHIP_2_COLLECTION_ID,
  })
  .onTransform(
    (
      programmedTransformLocator,
      [bodyDeclarationGroup],
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
          importByIdentifierName.get(identifierName) ??
          programmedTransformLocator.filePath
        );
      };

      let errorList: ReportedProgramError<ReportingLocator>[];
      let programmedTransform: EngineProgrammedTransform3 | null;

      if (
        programmedTransformLocator.typeName ===
        EngineProgrammedTransformLocator2TypeName.BuildAddMetadataForSerialization
      ) {
        ({ errorList, programmedTransform } =
          getBuildAddMetadataForSerializationProgrammedTransform(
            programmedTransformLocator,
          ));
      } else {
        const programmedTransformDeclaration =
          bodyDeclarationGroup.declarationByIdentifier.get(
            programmedTransformLocator.identifierName,
          );
        if (programmedTransformLocator.isCoreProgrammedTransform) {
          ({ errorList, programmedTransform } = getCoreProgrammedTransform({
            programmedTransformLocator,
            programmedTransformDeclaration,
          }));
        } else {
          ({ errorList, programmedTransform } = getAdaptedProgrammedTransform({
            programmedTransformLocator,
            programmedTransformDeclaration,
            bodyDeclarationGroup,
            getIdentifierOriginFilePath,
          }));
        }

        if (typeof programmedTransformDeclaration?.commentText !== 'string') {
          errorList.push({
            name: `missing-estinant-comment`,
            error: new Error(
              `Estinant definitions must have a comment with a description`,
            ),
            reporterLocator,
            sourceLocator: {
              typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
              filePath: programmedTransformLocator.filePath,
            },
            context: {
              identifier: programmedTransformLocator.identifierName,
            },
          });
        }
      }

      const programmedTransformList: [EngineProgrammedTransform3] | [] =
        programmedTransform !== null ? [programmedTransform] : [];

      const streamMetatypeLocatorById = new Map(
        (programmedTransform?.allStreamMetatypeLocatorList ?? []).map(
          (streamMetatypeLocator) => {
            return [streamMetatypeLocator.id, streamMetatypeLocator];
          },
        ),
      );

      const programmedTransformStreamMetatypeRelationshipList = [
        ...streamMetatypeLocatorById.values(),
      ].map((streamMetatypeLocator, index) => {
        return new ProgrammedTransformStreamMetatypeRelationship2Instance({
          programmedTransformLocator,
          streamMetatypeLocator,
          distinguisher: `${index}`,
        });
      });

      return {
        [PROGRAM_ERROR_COLLECTION_ID]: errorList,
        [ENGINE_PROGRAMMED_TRANSFORM_3_COLLECTION_ID]: programmedTransformList,
        [PROGRAMMED_TRANSFORM_INPUT_2_COLLECTION_ID]:
          programmedTransformList.flatMap((nextProgrammedTransform) => {
            return nextProgrammedTransform.inputList;
          }),
        [PROGRAMMED_TRANSFORM_OUTPUT_2_COLLECTION_ID]:
          programmedTransformList.flatMap((nextProgrammedTransform) => {
            return nextProgrammedTransform.outputList;
          }),
        [PROGRAMMED_TRANSFORM_STREAM_METATYPE_RELATIONSHIP_2_COLLECTION_ID]:
          programmedTransformStreamMetatypeRelationshipList,
      };
    },
  )
  .assemble();
