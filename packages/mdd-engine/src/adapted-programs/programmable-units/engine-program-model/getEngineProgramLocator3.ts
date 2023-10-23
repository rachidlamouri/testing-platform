import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import Case from 'case';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  ENGINE_PROGRAM_FILE_COLLECTION_ID,
  EngineProgramFile,
  EngineProgramFileStreamMetatype,
} from './engineProgramFile';
import {
  IdentifiableProperty,
  ObjectExpressionWithIdentifierProperties,
  isObjectExpressionWithIdentifiableProperties,
  isSpecificIdentifiableProperty,
} from '../../../package-agnostic-utilities/type-script-ast/isObjectExpressionWithIdentifiableProperties';
import {
  TYPE_SCRIPT_FILE_IMPORT_LIST_COLLECTION_ID,
  TypeScriptFileImport,
  TypeScriptFileImportList,
  TypeScriptFileImportListStreamMetatype,
} from '../type-script-file/typeScriptFileImportList';
import {
  ArrayExpressionOfIdentifiers,
  isArrayExpressionOfIdentifiers,
} from '../../../package-agnostic-utilities/type-script-ast/isArrayExpressionOfIdentifiers';
import { isSpecificExpressionStatement } from '../../../package-agnostic-utilities/type-script-ast/isSpecificExpressionStatement';
import {
  AdaptedEngineFunctionConfiguration,
  CoreEngineFunction2Configuration,
  EngineFunctionConfigurationTypeName,
} from './engineFunctionConfiguration';
import {
  EngineProgrammedTransformBuildAddMetadataForSerializationLocatorInstance,
  EngineProgrammedTransformLocator2,
  EngineProgrammedTransformLocator2TypeName,
  EngineProgrammedTransformTopLevelDeclarationLocatorInstance,
} from './engineProgrammedTransformLocator2';
import { isIdentifier } from '../../../package-agnostic-utilities/type-script-ast/isIdentifier';
import {
  isNewExpression,
  isNewExpressionWithObjectExpressionArgument,
  isNewExpressionWithSpecificTypeParameters,
} from '../../../package-agnostic-utilities/type-script-ast/isNewExpression';
import { buildAddMetadataForSerialization } from '../../../layer-agnostic-utilities/programmed-transform/buildAddMetadataForSerialization';
import { isSpecificIdentifiableCallExpression } from '../../../package-agnostic-utilities/type-script-ast/isCallExpression';
import { isTypeScriptTypeParameterInstantiationWithParameterTuple } from '../../../package-agnostic-utilities/type-script-ast/isTypeScriptTypeParameterInstantiation';
import { isIdentifiableTypeScriptTypeReference } from '../../../package-agnostic-utilities/type-script-ast/isIdentifiableTypeScriptTypeReference';
import { isSpecificConstantTypeScriptAsExpression } from '../../../package-agnostic-utilities/type-script-ast/isSpecificConstantTypeScriptAsExpression';
import {
  PROGRAM_ERROR_COLLECTION_ID,
  ProgramErrorElementLocatorTypeName,
  GenericProgramErrorStreamMetatype,
  ReportedProgramError,
  ReportingProgrammedTransformLocator,
} from '../error/programError';
import {
  ENGINE_PROGRAM_LOCATOR_3_COLLECTION_ID,
  EngineProgramLocator3,
  EngineProgramLocator3Instance,
  EngineProgramLocator3StreamMetatype,
} from './engineProgramLocator3';
import {
  PROGRAM_PROGRAMMED_TRANSFORM_RELATIONSHIP_COLLECTION_ID,
  ProgramProgrammedTransformRelationshipInstance,
  ProgramProgrammedTransformRelationshipStreamMetatype,
} from './programProgrammedTransformRelationship';
import {
  EngineStreamMetatypeLocator2,
  EngineStreamMetatypeLocator2Instance,
} from './engineStreamMetatypeLocator2';
import { PartialEngineProgramLocator2Instance } from './partialEngineProgramLocator2';
import { IdentifiableItemId } from '../../../adapter/identifiable-item/identifiableItem';
import { buildCollectionByCollectionId } from '../../../adapter/engine/runEngine';
import { isArrayExpression } from '../../../package-agnostic-utilities/type-script-ast/isArrayExpression';
import {
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
  FileCommentedProgramBodyDeclarationGroupStreamMetatype,
} from '../type-script-file/fileCommentedProgramBodyDeclarationGroup';
import { CommentedProgramBodyDeclaration } from '../type-script-file/commentedProgramBodyDeclaration';
import { CategorizedCommentTypeName } from '../type-script-file/comment/categorized/categorizedCommentTypeName';
import { CommentTagId } from '../type-script-file/comment/commentTagId';

const PROGRAMMED_TRANSFORM_NAME = 'getEngineProgramLocator' as const;
type ProgrammedTransformName = typeof PROGRAMMED_TRANSFORM_NAME;
type ReportingLocator =
  ReportingProgrammedTransformLocator<ProgrammedTransformName>;
const reporterLocator: ReportingLocator = {
  typeName:
    ProgramErrorElementLocatorTypeName.ReportingProgrammedTransformLocator,
  name: PROGRAMMED_TRANSFORM_NAME,
  filePath: __filename,
};

type EngineCallExpression = TSESTree.CallExpression & {
  arguments: [ObjectExpressionWithIdentifierProperties];
};

type EngineCallExpressionStatement = TSESTree.ExpressionStatement & {
  expression: EngineCallExpression;
};

const isEngineCallExpressionStatement = (
  node: TSESTree.Node,
  engineFunctionIdentifier: string,
): node is EngineCallExpressionStatement =>
  isSpecificExpressionStatement(node, AST_NODE_TYPES.CallExpression) &&
  node.expression.callee.type === AST_NODE_TYPES.Identifier &&
  node.expression.callee.name === engineFunctionIdentifier &&
  isObjectExpressionWithIdentifiableProperties(node.expression.arguments[0]);

type EngineCallDeclaration = CommentedProgramBodyDeclaration<
  EngineCallExpressionStatement,
  null
>;

type Core2EngineProgramLocatorAccessorInput = {
  engineProgramFile: EngineProgramFile['file'];
  engineFunctionConfiguration: CoreEngineFunction2Configuration;
  importList: TypeScriptFileImportList['list'];
  engineCallDeclaration: EngineCallDeclaration | null;
  engineCallExpressionPropertyList: IdentifiableProperty[];
};

type Core2EngineProgramLocatorAccessorResult = {
  parallelErrorList: ReportedProgramError<ReportingLocator>[];
  engineProgramLocator: EngineProgramLocator3;
};

const getCore2EngineProgramLocator = ({
  engineProgramFile,
  engineFunctionConfiguration,
  importList,
  engineCallDeclaration,
  engineCallExpressionPropertyList,
}: Core2EngineProgramLocatorAccessorInput): Core2EngineProgramLocatorAccessorResult => {
  const engineCallCommentText = engineCallDeclaration?.commentText;

  // TODO: move this to its own item
  const fileImportsByImportedIdentifier = new Map<
    string,
    TypeScriptFileImport
  >();

  importList
    .flatMap((fileImport) => {
      return fileImport.specifierList.map((specifier) => ({
        fileImport,
        specifier,
      }));
    })
    .forEach(({ fileImport, specifier }) => {
      fileImportsByImportedIdentifier.set(specifier, fileImport);
    });

  const getImportPathFromIdentifier = (
    identifierName: string,
  ): null | string => {
    const fileImport = fileImportsByImportedIdentifier.get(identifierName);

    if (fileImport === undefined) {
      return null;
    }

    return fileImport.sourcePath;
  };

  const programName = Case.kebab(engineProgramFile.nodePath.name.extensionless);

  const collectionListCollectionIdProperty =
    engineCallExpressionPropertyList.find(
      (property) =>
        property.key.name ===
        engineFunctionConfiguration.collectionListKeyIdentifierName,
    );

  const initialCollectionListValueNode =
    collectionListCollectionIdProperty?.value;

  const initialCollectionCollectionIdIdentifierList =
    initialCollectionListValueNode?.type === AST_NODE_TYPES.ArrayExpression
      ? initialCollectionListValueNode?.elements
      : [];

  const initialStreamMetatypeLocatorList: EngineStreamMetatypeLocator2[] = [];
  const parallelErrorList: ReportedProgramError<ReportingLocator>[] = [];

  initialCollectionCollectionIdIdentifierList.forEach((element) => {
    const streamMetatypeName =
      isNewExpression(element) &&
      isTypeScriptTypeParameterInstantiationWithParameterTuple(
        element.typeParameters,
        [AST_NODE_TYPES.TSTypeReference],
      ) &&
      isIdentifiableTypeScriptTypeReference(element.typeParameters.params[0])
        ? element.typeParameters.params[0].typeName.name
        : null;

    if (streamMetatypeName === null) {
      parallelErrorList.push({
        name: `missing-collection-type-parameter`,
        error: new Error(
          'New expressions for collection instances must have a type parameter for the corresponding stream metatype',
        ),
        reporterLocator,
        sourceLocator: {
          typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
          filePath: engineProgramFile.filePath.serialized,
        },
        context: null,
      });

      return;
    }

    let initialItemEggTupleProperty: IdentifiableProperty | undefined;
    if (isNewExpressionWithObjectExpressionArgument(element)) {
      initialItemEggTupleProperty = element.arguments[0].properties.find(
        (node): node is IdentifiableProperty => {
          return isSpecificIdentifiableProperty(
            node,
            engineFunctionConfiguration.initialItemEggTupleKeyIdentifierName,
          );
        },
      );
    } else {
      initialItemEggTupleProperty = undefined;
    }

    let hasInitialInput: boolean;
    if (initialItemEggTupleProperty === undefined) {
      hasInitialInput = false;
    } else if (isArrayExpression(initialItemEggTupleProperty.value)) {
      hasInitialInput = initialItemEggTupleProperty.value.elements.length > 0;
    } else {
      // We are defaulting to true since this implies that some potentially non-empty array was passed in
      hasInitialInput = true;
    }

    if (hasInitialInput) {
      initialStreamMetatypeLocatorList.push(
        new EngineStreamMetatypeLocator2Instance({
          identifierName: streamMetatypeName,
          filePath: engineProgramFile.filePath.serialized,
          isCoreStreamMetatype: true,
        }),
      );
    }
  });

  const programmedTransformListProperty = engineCallExpressionPropertyList.find(
    (property) =>
      property.key.name ===
      engineFunctionConfiguration.programmedTransformListKeyIdentifierName,
  );

  const programmedTransformListValueNode =
    programmedTransformListProperty?.value;
  const programmedTransformReferenceElementList =
    programmedTransformListValueNode?.type === AST_NODE_TYPES.ArrayExpression
      ? programmedTransformListValueNode?.elements
      : [];
  const engineProgrammedTransformLocatorList: EngineProgrammedTransformLocator2[] =
    [];

  programmedTransformReferenceElementList.forEach((element, index) => {
    if (isIdentifier(element)) {
      const identifierName = element.name;

      const filePath =
        getImportPathFromIdentifier(identifierName) ??
        engineProgramFile.filePath.serialized;

      engineProgrammedTransformLocatorList.push(
        new EngineProgrammedTransformTopLevelDeclarationLocatorInstance({
          typeName:
            EngineProgrammedTransformLocator2TypeName.TopLevelDeclaration,
          identifierName,
          filePath,
          isCoreProgrammedTransform: true,
        }),
      );
    } else if (
      isSpecificIdentifiableCallExpression(
        element,
        buildAddMetadataForSerialization.name,
      )
    ) {
      engineProgrammedTransformLocatorList.push(
        new EngineProgrammedTransformBuildAddMetadataForSerializationLocatorInstance(
          {
            typeName:
              EngineProgrammedTransformLocator2TypeName.BuildAddMetadataForSerialization,
            callExpression: element,
            index,
            isCoreProgrammedTransform: true,
            filePath: engineProgramFile.filePath.serialized,
          },
        ),
      );
    } else {
      parallelErrorList.push({
        name: `unparseable-programmed-transform`,
        error: new Error(
          `Engine program has an unparseable programmedTransform. Expected an identifier or a call expression to "${buildAddMetadataForSerialization.name}".`,
        ),
        reporterLocator,
        sourceLocator: {
          typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
          filePath: engineProgramFile.filePath.serialized,
        },
        context: null,
      });
    }
  });

  if (engineCallCommentText === null) {
    parallelErrorList.push({
      name: `missing-program-description`,
      error: new Error('Program is missing a description'),
      reporterLocator,
      sourceLocator: {
        typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
        filePath: engineProgramFile.filePath.serialized,
      },
      context: null,
    });
  }

  if (
    engineCallDeclaration?.comment?.typeName ===
      CategorizedCommentTypeName.Descriptive &&
    !engineCallDeclaration.comment.tagIdSet.has(
      CommentTagId.ExplicitCanonicalComment,
    )
  ) {
    parallelErrorList.push({
      name: `missing-program-canonical-comment-tag`,
      error: new Error(
        `Program description is missing an @${CommentTagId.ExplicitCanonicalComment} tag`,
      ),
      reporterLocator,
      sourceLocator: {
        typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
        filePath: engineProgramFile.filePath.serialized,
      },
      context: {
        comment: engineCallDeclaration?.comment,
      },
    });
  }

  const partialProgramLocator = new PartialEngineProgramLocator2Instance({
    programName,
    filePath: engineProgramFile.filePath.serialized,
  });

  const programmedTransformRelationshipList =
    engineProgrammedTransformLocatorList.map((programmedTransformLocator) => {
      return new ProgramProgrammedTransformRelationshipInstance({
        programName,
        programmedTransformLocator,
        rootGraphLocator: partialProgramLocator.rootGraphLocator,
      });
    });

  const engineProgramLocator = new EngineProgramLocator3Instance({
    isCoreProgram: true,
    programName,
    description: engineCallCommentText ?? '',
    filePath: engineProgramFile.filePath.serialized,
    initializedStreamMetatypeLocatorList: initialStreamMetatypeLocatorList,
    programmedTransformRelationshipList,
    rootGraphLocator: partialProgramLocator.rootGraphLocator,
    engineProgramFile,
  });

  return {
    parallelErrorList,
    engineProgramLocator,
  };
};

type AdaptedEngineProgramLocatorAccessorInput = {
  engineProgramFile: EngineProgramFile['file'];
  engineFunctionConfiguration: AdaptedEngineFunctionConfiguration;
  importList: TypeScriptFileImportList['list'];
  engineCallDeclaration: CommentedProgramBodyDeclaration | null;
  engineCallExpressionPropertyList: IdentifiableProperty[];
};

type AdaptedEngineProgramLocatorAccessorResult = {
  parallelErrorList: ReportedProgramError<ReportingLocator>[];
  engineProgramLocator: EngineProgramLocator3;
};

const getAdaptedEngineProgramLocator = ({
  engineProgramFile,
  engineFunctionConfiguration,
  importList,
  engineCallDeclaration,
  engineCallExpressionPropertyList,
}: AdaptedEngineProgramLocatorAccessorInput): AdaptedEngineProgramLocatorAccessorResult => {
  const programName = Case.kebab(engineProgramFile.nodePath.name.extensionless);
  const engineCallCommentText = engineCallDeclaration?.commentText ?? null;

  const explicitCollectionTupleProperty = engineCallExpressionPropertyList.find(
    (property) =>
      property.key.name ===
      engineFunctionConfiguration.explicitCollectionTupleKeyIdentifierName,
  );

  const explicitCollectionTupleValueNode =
    explicitCollectionTupleProperty?.value;

  const explicitCollectionInstanceList =
    isSpecificConstantTypeScriptAsExpression(
      explicitCollectionTupleValueNode,
      isArrayExpression,
    )
      ? explicitCollectionTupleValueNode.expression.elements
      : [];

  const parallelErrorList: ReportedProgramError<ReportingLocator>[] = [];
  const engineStreamMetatypeLocatorList: EngineStreamMetatypeLocator2[] = [];

  const fileImportsByImportedIdentifier = new Map<
    string,
    TypeScriptFileImport
  >();

  importList
    .flatMap((fileImport) => {
      return fileImport.specifierList.map((specifier) => ({
        fileImport,
        specifier,
      }));
    })
    .forEach(({ fileImport, specifier }) => {
      fileImportsByImportedIdentifier.set(specifier, fileImport);
    });

  if (explicitCollectionInstanceList.length === 0) {
    parallelErrorList.push({
      name: 'unparseable-explicit-collection-list',
      error: new Error(
        'Unable able to parse explicit input collection list. Expected an array expression with "as const"',
      ),
      reporterLocator,
      sourceLocator: {
        typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
        filePath: engineProgramFile.filePath.serialized,
      },
      context: {
        reason: 'A program without inputs will not do anything',
        explicitCollectionTupleProperty,
        explicitCollectionTupleValueNode,
      },
    });
  } else {
    explicitCollectionInstanceList.forEach(
      (collectionInstance, originalIndex) => {
        const streamMetatypeTypeReferenceNode =
          isNewExpressionWithSpecificTypeParameters<
            [AST_NODE_TYPES.TSTypeReference]
          >(collectionInstance, [AST_NODE_TYPES.TSTypeReference])
            ? collectionInstance.typeParameters.params[0]
            : null;

        const streamMetatypeIdentifierName =
          isIdentifiableTypeScriptTypeReference(streamMetatypeTypeReferenceNode)
            ? streamMetatypeTypeReferenceNode.typeName.name
            : null;

        if (streamMetatypeIdentifierName === null) {
          parallelErrorList.push({
            name: 'unparseable-explicit-collection',
            error: new Error(
              'Unable to parse explicit input collection. Expected a new expression with at least one type parameter',
            ),
            reporterLocator,
            sourceLocator: {
              typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
              filePath: engineProgramFile.filePath.serialized,
            },
            context: {
              originalIndex,
              streamMetatypeTypeReferenceNode,
              collectionInstance,
            },
          });
          return;
        }

        const streamMetatypeFilePath =
          fileImportsByImportedIdentifier.get(streamMetatypeIdentifierName)
            ?.sourcePath ?? engineProgramFile.filePath.serialized;

        engineStreamMetatypeLocatorList.push(
          new EngineStreamMetatypeLocator2Instance({
            identifierName: streamMetatypeIdentifierName,
            filePath: streamMetatypeFilePath,
            isCoreStreamMetatype: false,
          }),
        );
      },
    );
  }

  // TODO: rename these variables or move this code to its own function (I prefer the latter), because these are way too vague
  const keyName =
    engineFunctionConfiguration.uninferableCollectionByCollectionIdKeyIdentifierName;
  const functionName = buildCollectionByCollectionId.name;

  const uninferableCollectionByCollectionIdProperty =
    engineCallExpressionPropertyList.find((property) => {
      return property.key.name === keyName;
    });

  const uninferableCollectionByCollectionIdValueNode =
    uninferableCollectionByCollectionIdProperty?.value;

  const buildCollectionByCollectionIdCallExpression =
    isSpecificIdentifiableCallExpression(
      uninferableCollectionByCollectionIdValueNode,
      functionName,
    )
      ? uninferableCollectionByCollectionIdValueNode
      : null;

  const hasConstantListOfArguments =
    buildCollectionByCollectionIdCallExpression !== null &&
    isSpecificConstantTypeScriptAsExpression<TSESTree.ArrayExpression>(
      buildCollectionByCollectionIdCallExpression.arguments[0],
      isArrayExpression,
    );

  if (!hasConstantListOfArguments) {
    parallelErrorList.push({
      name: 'unparseable-uninferable-collection-by-collection-id',
      error: new Error(
        `Unable to parse ${keyName} property. Expected a call expression to ${functionName} with a single array literal parameter ending in "as const"`,
      ),
      reporterLocator,
      sourceLocator: {
        typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
        filePath: engineProgramFile.filePath.serialized,
      },
      context: {
        hasConstantListOfArguments,
        buildCollectionByCollectionIdCallExpression,
        uninferableCollectionByCollectionIdValueNode,
        uninferableCollectionByCollectionIdProperty,
      },
    });
  }

  const programmedTransformListProperty = engineCallExpressionPropertyList.find(
    (property) =>
      property.key.name ===
      engineFunctionConfiguration.programmedTransformListKeyIdentifierName,
  );

  const programmedTransformListValueNode =
    programmedTransformListProperty?.value;

  const programmedTransformNodeList: TSESTree.Identifier[] =
    isSpecificConstantTypeScriptAsExpression<ArrayExpressionOfIdentifiers>(
      programmedTransformListValueNode,
      isArrayExpressionOfIdentifiers,
    )
      ? programmedTransformListValueNode.expression.elements
      : [];

  if (programmedTransformNodeList.length === 0) {
    parallelErrorList.push({
      name: 'unparseable-programmed-transform-tuple',
      error: new Error(
        'Unable able to parse input programmedTransform tuple. Expected an array literal of identifiers with "as const"',
      ),
      reporterLocator,
      sourceLocator: {
        typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
        filePath: engineProgramFile.filePath.serialized,
      },
      context: {
        programmedTransformListProperty,
        programmedTransformListValueNode,
      },
    });
  }

  const programmedTransformIdentifierList = programmedTransformNodeList.map(
    (identifier) => identifier.name,
  );

  const engineProgrammedTransformLocatorList: EngineProgrammedTransformLocator2[] =
    [];

  programmedTransformIdentifierList.forEach((identifierName) => {
    const fileImport = fileImportsByImportedIdentifier.get(identifierName);

    if (fileImport === undefined) {
      engineProgrammedTransformLocatorList.push(
        new EngineProgrammedTransformTopLevelDeclarationLocatorInstance({
          typeName:
            EngineProgrammedTransformLocator2TypeName.TopLevelDeclaration,
          identifierName,
          filePath: engineProgramFile.filePath.serialized,
          isCoreProgrammedTransform: false,
        }),
      );
      return;
    }

    engineProgrammedTransformLocatorList.push(
      new EngineProgrammedTransformTopLevelDeclarationLocatorInstance({
        typeName: EngineProgrammedTransformLocator2TypeName.TopLevelDeclaration,
        identifierName,
        filePath: fileImport.sourcePath,
        isCoreProgrammedTransform: false,
      }),
    );
  });

  if (
    engineCallDeclaration?.comment?.typeName !==
      CategorizedCommentTypeName.Descriptive ||
    engineCallCommentText === null
  ) {
    parallelErrorList.push({
      name: `missing-program-description`,
      error: new Error('Program is missing a description'),
      reporterLocator,
      sourceLocator: {
        typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
        filePath: engineProgramFile.filePath.serialized,
      },
      context: {
        comment: engineCallDeclaration?.comment,
        engineCallCommentText,
      },
    });
  }

  if (
    engineCallDeclaration?.comment?.typeName ===
      CategorizedCommentTypeName.Descriptive &&
    !engineCallDeclaration.comment.tagIdSet.has(
      CommentTagId.ExplicitCanonicalComment,
    )
  ) {
    parallelErrorList.push({
      name: `missing-program-canonical-comment-tag`,
      error: new Error(
        `Program description is missing an @${CommentTagId.ExplicitCanonicalComment} tag`,
      ),
      reporterLocator,
      sourceLocator: {
        typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
        filePath: engineProgramFile.filePath.serialized,
      },
      context: {
        comment: engineCallDeclaration?.comment,
      },
    });
  }

  const partialProgramLocator = new PartialEngineProgramLocator2Instance({
    programName,
    filePath: engineProgramFile.filePath.serialized,
  });

  const programmedTransformRelationshipList =
    engineProgrammedTransformLocatorList.map((programmedTransformLocator) => {
      return new ProgramProgrammedTransformRelationshipInstance({
        programName,
        programmedTransformLocator,
        rootGraphLocator: partialProgramLocator.rootGraphLocator,
      });
    });

  const engineProgramLocator = new EngineProgramLocator3Instance({
    isCoreProgram: false,
    programName,
    description: engineCallCommentText ?? '',
    filePath: engineProgramFile.filePath.serialized,
    initializedStreamMetatypeLocatorList: engineStreamMetatypeLocatorList,
    programmedTransformRelationshipList,
    rootGraphLocator: partialProgramLocator.rootGraphLocator,
    engineProgramFile,
  });

  return {
    parallelErrorList,
    engineProgramLocator,
  };
};

/**
 * Gets metadata that helps later transforms find engine programs, their
 * collections, their transforms, and the edges between the collections and transforms
 *
 * @readableName getProgramLocator
 */
export const getEngineProgramLocator3 = buildProgrammedTransform({
  name: 'getEngineProgramLocator3',
})
  .fromItem2<EngineProgramFileStreamMetatype>({
    collectionId: ENGINE_PROGRAM_FILE_COLLECTION_ID,
  })
  .andFromItemTuple2<
    FileCommentedProgramBodyDeclarationGroupStreamMetatype,
    [IdentifiableItemId]
  >({
    collectionId: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
    getRightKeyTuple: (leftInput) => [leftInput.item.id],
    getRightKey: (rightInput) => rightInput.item.id,
  })
  .andFromItemTuple2<
    TypeScriptFileImportListStreamMetatype,
    [IdentifiableItemId]
  >({
    collectionId: TYPE_SCRIPT_FILE_IMPORT_LIST_COLLECTION_ID,
    getRightKeyTuple: (leftInput) => [leftInput.item.id],
    getRightKey: (rightInput) => rightInput.item.id,
  })
  .toItemTuple2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .toItemTuple2<EngineProgramLocator3StreamMetatype>({
    collectionId: ENGINE_PROGRAM_LOCATOR_3_COLLECTION_ID,
  })
  .toItemTuple2<ProgramProgrammedTransformRelationshipStreamMetatype>({
    collectionId: PROGRAM_PROGRAMMED_TRANSFORM_RELATIONSHIP_COLLECTION_ID,
  })
  .onTransform(
    (
      engineProgramFile,
      [{ list: commentedProgramBodyStatementList }],
      [{ list: importList }],
    ) => {
      const engineCallDeclaration = commentedProgramBodyStatementList.find(
        (commentedDeclaration): commentedDeclaration is EngineCallDeclaration =>
          isEngineCallExpressionStatement(
            commentedDeclaration.bodyStatement,
            engineProgramFile.engineFunctionConfiguration.exportedIdentifier,
          ),
      );

      if (engineCallDeclaration === undefined) {
        return {
          [PROGRAM_ERROR_COLLECTION_ID]: [
            {
              name: `missing-engine-call`,
              error: new Error('Unable to find engine call declaration'),
              reporterLocator,
              sourceLocator: {
                typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
                filePath: engineProgramFile.file.filePath.serialized,
              },
              context: null,
            } satisfies ReportedProgramError<ReportingLocator>,
          ],
          [ENGINE_PROGRAM_LOCATOR_3_COLLECTION_ID]: [],
          [PROGRAM_PROGRAMMED_TRANSFORM_RELATIONSHIP_COLLECTION_ID]: [],
        };
      }

      const engineCallExpressionPropertyList: IdentifiableProperty[] =
        engineCallDeclaration?.bodyStatement?.expression.arguments[0]
          .properties ?? [];

      const { engineFunctionConfiguration } = engineProgramFile;

      switch (engineFunctionConfiguration.typeName) {
        case EngineFunctionConfigurationTypeName.Core2: {
          const { parallelErrorList, engineProgramLocator } =
            getCore2EngineProgramLocator({
              engineProgramFile: engineProgramFile.file,
              engineFunctionConfiguration,
              importList,
              engineCallDeclaration,
              engineCallExpressionPropertyList,
            });

          return {
            [PROGRAM_ERROR_COLLECTION_ID]: parallelErrorList,
            [ENGINE_PROGRAM_LOCATOR_3_COLLECTION_ID]: [engineProgramLocator],
            [PROGRAM_PROGRAMMED_TRANSFORM_RELATIONSHIP_COLLECTION_ID]:
              engineProgramLocator.programmedTransformRelationshipList,
          };
        }
        case EngineFunctionConfigurationTypeName.Adapted: {
          const { parallelErrorList, engineProgramLocator } =
            getAdaptedEngineProgramLocator({
              engineProgramFile: engineProgramFile.file,
              engineFunctionConfiguration,
              importList,
              engineCallDeclaration,
              engineCallExpressionPropertyList,
            });

          return {
            [PROGRAM_ERROR_COLLECTION_ID]: parallelErrorList,
            [ENGINE_PROGRAM_LOCATOR_3_COLLECTION_ID]: [engineProgramLocator],
            [PROGRAM_PROGRAMMED_TRANSFORM_RELATIONSHIP_COLLECTION_ID]:
              engineProgramLocator.programmedTransformRelationshipList,
          };
        }
      }
    },
  )
  .assemble();
