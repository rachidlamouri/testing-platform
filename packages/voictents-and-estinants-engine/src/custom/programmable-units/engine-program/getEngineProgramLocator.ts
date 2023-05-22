import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_PROGRAM_FILE_GEPP,
  EngineProgramFile,
  EngineProgramFileVoque,
} from '../type-script-file-relationships/engineProgramFile';
import {
  IdentifiableProperty,
  ObjectExpressionWithIdentifierProperties,
  isObjectExpressionWithIdentifierProperties,
  isSepcificIdentifiableProperty,
} from '../../../utilities/type-script-ast/isObjectLiteralExpressionWithIdentifierProperties';
import {
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImport,
  TypeScriptFileImportList,
  TypeScriptFileImportListVoque,
} from '../type-script-file/typeScriptFileImportList';
import {
  ArrayExpressionOfIdentifiers,
  isArrayExpression,
  isArrayExpressionOfIdentifiers,
} from '../../../utilities/type-script-ast/isArrayExpressionOfIdentifiers';
import { isSpecificExpressionStatement } from '../../../utilities/type-script-ast/isSpecificExpressionStatement';
import {
  AdaptedEngineFunctionConfiguration,
  CoreEngineFunction2Configuration,
  EngineFunctionConfigurationTypeName,
} from './engineFunctionConfiguration';
import {
  ENGINE_PROGRAM_LOCATOR_2_GEPP,
  EngineProgramLocator2,
  EngineProgramLocator2Voque,
  VoictentLocator,
} from './engineProgramLocator2';
import {
  EngineEstinantBuildAddMetadataForSerializationLocator,
  EngineEstinantLocator2,
  EngineEstinantLocator2TypeName,
  EngineEstinantTopLevelDeclarationLocator,
} from './engineEstinantLocator2';
import {
  COMMENTED_PROGRAM_BODY_DECLARATION_LIST_GEPP,
  CommentedProgramBodyDeclarationListVoque,
} from '../type-script-file/commentedProgramBodyDeclarationList';
import {
  ErrorLocatorTypeName,
  PROGRAM_ERROR_GEPP,
  ProgramError,
  ProgramErrorVoque,
} from '../error/programError';
import { isIdentifier } from '../../../utilities/type-script-ast/isIdentifier';
import {
  isNewExpression,
  isNewExpressionWithObjectExpressionArgument,
  isNewExpressionWithSpecificTypeParameters,
} from '../../../utilities/type-script-ast/isNewExpression';
import { buildAddMetadataForSerialization } from '../../../example-programs/buildAddMetadataForSerialization';
import { isSpecificIdentifiableCallExpression } from '../../../utilities/type-script-ast/isCallExpression';
import { isTypeScriptTypeParameterInstantiationWithParameterTuple } from '../../../utilities/type-script-ast/isTypeScriptTypeParameterInstantiation';
import { isIdentifiableTypeScriptTypeReference } from '../../../utilities/type-script-ast/isIdentifiableTypeScriptTypeReference';
import { isSpecificConstantTypeScriptAsExpression } from '../../../utilities/type-script-ast/isConstantTypeScriptAsExpression';

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
  isObjectExpressionWithIdentifierProperties(node.expression.arguments[0]);

type EngineCallDeclaration = {
  commentText: string | null;
  bodyStatement: EngineCallExpressionStatement;
  identifiableNode: null;
};

type Core2EngineProgramLocatorAccessorInput = {
  engineProgramFile: EngineProgramFile['file'];
  engineFunctionConfiguration: CoreEngineFunction2Configuration;
  importList: TypeScriptFileImportList['list'];
  engineCallCommentText: string | null;
  engineCallExpressionPropertyList: IdentifiableProperty[];
};

type Core2EngineProgramLocatorAccessorResult = {
  parallelErrorList: ProgramError[];
  engineProgramLocator: EngineProgramLocator2;
};

const getCore2EngineProgramLocator = ({
  engineProgramFile,
  engineFunctionConfiguration,
  importList,
  engineCallCommentText,
  engineCallExpressionPropertyList,
}: Core2EngineProgramLocatorAccessorInput): Core2EngineProgramLocatorAccessorResult => {
  const programName = engineProgramFile.inMemoryFileName.kebabCase;

  const voictentListGeppProperty = engineCallExpressionPropertyList.find(
    (property) =>
      property.key.name ===
      engineFunctionConfiguration.voictentListKeyIdentifierName,
  );

  const initialVoictentListValueNode = voictentListGeppProperty?.value;

  const initialVoictentGeppIdentifierList =
    initialVoictentListValueNode?.type === AST_NODE_TYPES.ArrayExpression
      ? initialVoictentListValueNode?.elements
      : [];

  const voictentLocatorList: VoictentLocator[] = [];
  const parallelErrorList: ProgramError[] = [];

  initialVoictentGeppIdentifierList.forEach((element) => {
    const voqueName =
      isNewExpression(element) &&
      isTypeScriptTypeParameterInstantiationWithParameterTuple(
        element.typeParameters,
        [AST_NODE_TYPES.TSTypeReference],
      ) &&
      isIdentifiableTypeScriptTypeReference(element.typeParameters.params[0])
        ? element.typeParameters.params[0].typeName.name
        : null;

    let initialHubblepupTupleProperty: IdentifiableProperty | undefined;
    if (isNewExpressionWithObjectExpressionArgument(element)) {
      initialHubblepupTupleProperty = element.arguments[0].properties.find(
        (node): node is IdentifiableProperty => {
          return isSepcificIdentifiableProperty(
            node,
            engineFunctionConfiguration.initialHubblepupTupleKeyIdentifierName,
          );
        },
      );
    } else {
      initialHubblepupTupleProperty = undefined;
    }

    let hasInitialInput: boolean;
    if (initialHubblepupTupleProperty === undefined) {
      hasInitialInput = false;
    } else if (isArrayExpression(initialHubblepupTupleProperty.value)) {
      hasInitialInput = initialHubblepupTupleProperty.value.elements.length > 0;
    } else {
      // We are defaulting to true since this implies that some potentially non-empty array was passed in
      hasInitialInput = true;
    }

    if (voqueName === null) {
      parallelErrorList.push({
        errorId: `getEngineProgramLocator/missing-voictent-type-parameter`,
        message:
          'New expressions for voictent instances must have a type parameter for the corresponding voque',
        locator: {
          typeName: ErrorLocatorTypeName.FileErrorLocator,
          filePath: engineProgramFile.filePath,
        },
        metadata: null,
      });
    }

    if (voqueName !== null && initialHubblepupTupleProperty !== undefined) {
      const voictentName = voqueName.replace(/Voque$/, '');

      voictentLocatorList.push({
        name: voictentName,
        hasInitialInput,
      });
    }
  });

  const estinantListProperty = engineCallExpressionPropertyList.find(
    (property) =>
      property.key.name ===
      engineFunctionConfiguration.estinantListKeyIdentifierName,
  );

  const estinantListValueNode = estinantListProperty?.value;
  const estinantReferenceElementList =
    estinantListValueNode?.type === AST_NODE_TYPES.ArrayExpression
      ? estinantListValueNode?.elements
      : [];

  const partialEstinantLocatorList: (
    | Pick<
        EngineEstinantTopLevelDeclarationLocator,
        'typeName' | 'identifierName'
      >
    | Pick<
        EngineEstinantBuildAddMetadataForSerializationLocator,
        'typeName' | 'callExpression' | 'index'
      >
  )[] = [];

  estinantReferenceElementList.forEach((element, index) => {
    if (isIdentifier(element)) {
      partialEstinantLocatorList.push({
        typeName: EngineEstinantLocator2TypeName.TopLevelDeclaration,
        identifierName: element.name,
      });
    } else if (
      isSpecificIdentifiableCallExpression(
        element,
        buildAddMetadataForSerialization.name,
      )
    ) {
      partialEstinantLocatorList.push({
        typeName:
          EngineEstinantLocator2TypeName.BuildAddMetadataForSerialization,
        callExpression: element,
        index,
      });
    } else {
      parallelErrorList.push({
        errorId: `getEngineProgramLocator/unparseable-estinant`,
        message: `Engine program has an unparseable estinant. Expected an identifier or a call expression to "${buildAddMetadataForSerialization.name}".`,
        locator: {
          typeName: ErrorLocatorTypeName.FileErrorLocator,
          filePath: engineProgramFile.filePath,
        },
        metadata: null,
      });
    }
  });

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

  const engineEstinantLocatorList: EngineEstinantLocator2[] = [];

  partialEstinantLocatorList.forEach((partialLocator) => {
    if (
      partialLocator.typeName ===
      EngineEstinantLocator2TypeName.BuildAddMetadataForSerialization
    ) {
      engineEstinantLocatorList.push({
        zorn: `${engineProgramFile.filePath}:${partialLocator.index}`,
        ...partialLocator,
        isCoreEstinant: true,
        filePath: engineProgramFile.filePath,
      });
      return;
    }

    const fileImport = fileImportsByImportedIdentifier.get(
      partialLocator.identifierName,
    );

    if (fileImport === undefined) {
      engineEstinantLocatorList.push({
        zorn: `${partialLocator.identifierName}:${engineProgramFile.filePath}`,
        ...partialLocator,
        filePath: engineProgramFile.filePath,
        isCoreEstinant: true,
      });
      return;
    }

    engineEstinantLocatorList.push({
      zorn: `${partialLocator.identifierName}:${fileImport.sourcePath}`,
      ...partialLocator,
      filePath: fileImport.sourcePath,
      isCoreEstinant: true,
    });
  });

  if (engineCallCommentText === null) {
    parallelErrorList.push({
      errorId: `getEngineProgramLocator/missing-program-description`,
      message: 'Program is missing a description',
      locator: {
        typeName: ErrorLocatorTypeName.FileErrorLocator,
        filePath: engineProgramFile.filePath,
      },
      metadata: null,
    });
  }

  const engineProgramLocator: EngineProgramLocator2 = {
    zorn: engineProgramFile.filePath,
    programName,
    description: engineCallCommentText ?? '',
    filePath: engineProgramFile.filePath,
    voictentLocatorList,
    engineEstinantLocatorList,
  };

  return {
    parallelErrorList,
    engineProgramLocator,
  };
};

type AdaptedEngineProgramLocatorAccessorInput = {
  engineProgramFile: EngineProgramFile['file'];
  engineFunctionConfiguration: AdaptedEngineFunctionConfiguration;
  importList: TypeScriptFileImportList['list'];
  engineCallCommentText: string | null;
  engineCallExpressionPropertyList: IdentifiableProperty[];
};

type AdaptedEngineProgramLocatorAccessorResult = {
  parallelErrorList: ProgramError[];
  engineProgramLocator: EngineProgramLocator2;
};

const getAdaptedEngineProgramLocator = ({
  engineProgramFile,
  engineFunctionConfiguration,
  importList,
  engineCallCommentText,
  engineCallExpressionPropertyList,
}: AdaptedEngineProgramLocatorAccessorInput): AdaptedEngineProgramLocatorAccessorResult => {
  const populatedVoictentTupleProperty = engineCallExpressionPropertyList.find(
    (property) =>
      property.key.name ===
      engineFunctionConfiguration.populatedVoictentTupleKeyIdentifierName,
  );

  const populatedVoictentTupleValueNode = populatedVoictentTupleProperty?.value;

  const populatedVoictentInstanceList =
    isSpecificConstantTypeScriptAsExpression(
      populatedVoictentTupleValueNode,
      isArrayExpression,
    )
      ? populatedVoictentTupleValueNode.expression.elements
      : [];

  const parallelErrorList: ProgramError[] = [];
  const voictentLocatorList: VoictentLocator[] = [];

  if (populatedVoictentInstanceList.length === 0) {
    parallelErrorList.push({
      errorId: 'getEngineProgramLocator/unparseable-populated-voictent-list',
      message:
        'Unable able to parse populated input voictent list. Expected an array expression with "as const"',
      locator: {
        typeName: ErrorLocatorTypeName.FileErrorLocator,
        filePath: engineProgramFile.filePath,
      },
      metadata: {
        reason: 'A program without inputs will not do anything',
        populatedVoictentTupleProperty,
        populatedVoictentTupleValueNode,
      },
    });
  }

  populatedVoictentInstanceList.forEach((voictentInstance, originalIndex) => {
    const voqueTypeReferenceNode = isNewExpressionWithSpecificTypeParameters<
      [AST_NODE_TYPES.TSTypeReference]
    >(voictentInstance, [AST_NODE_TYPES.TSTypeReference])
      ? voictentInstance.typeParameters.params[0]
      : null;

    const voqueName = isIdentifiableTypeScriptTypeReference(
      voqueTypeReferenceNode,
    )
      ? voqueTypeReferenceNode.typeName.name
      : null;

    if (voqueName === null) {
      parallelErrorList.push({
        errorId: 'getEngineProgramLocator/unparseable-populated-voictent',
        message:
          'Unable able to parse populated input voictent. Expected a new expression with at least one type parameter',
        locator: {
          typeName: ErrorLocatorTypeName.FileErrorLocator,
          filePath: engineProgramFile.filePath,
        },
        metadata: {
          originalIndex,
          voqueTypeReferenceNode,
          voictentInstance,
        },
      });
      return;
    }

    const voictentName = voqueName.replace(/Voque$/, '');

    voictentLocatorList.push({
      name: voictentName,
      hasInitialInput: true,
    });
  });

  const estinantListProperty = engineCallExpressionPropertyList.find(
    (property) =>
      property.key.name ===
      engineFunctionConfiguration.estinantListKeyIdentifierName,
  );

  const estinantListValueNode = estinantListProperty?.value;

  const estinantNodeList: TSESTree.Identifier[] =
    isSpecificConstantTypeScriptAsExpression<ArrayExpressionOfIdentifiers>(
      estinantListValueNode,
      isArrayExpressionOfIdentifiers,
    )
      ? estinantListValueNode.expression.elements
      : [];

  if (estinantNodeList.length === 0) {
    parallelErrorList.push({
      errorId: 'getEngineProgramLocator/unparseable-estinant-tuple',
      message:
        'Unable able to parse input estinant tuple. Expected an array literal of identifiers with "as const"',
      locator: {
        typeName: ErrorLocatorTypeName.FileErrorLocator,
        filePath: engineProgramFile.filePath,
      },
      metadata: {
        estinantListProperty,
        estinantListValueNode,
      },
    });
  }

  const estinantIdentifierList = estinantNodeList.map(
    (identifier) => identifier.name,
  );

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

  const engineEstinantLocatorList: EngineEstinantLocator2[] = [];

  estinantIdentifierList.forEach((identifierName) => {
    const fileImport = fileImportsByImportedIdentifier.get(identifierName);

    if (fileImport === undefined) {
      engineEstinantLocatorList.push({
        zorn: `${identifierName}:${engineProgramFile.filePath}`,
        typeName: EngineEstinantLocator2TypeName.TopLevelDeclaration,
        identifierName,
        filePath: engineProgramFile.filePath,
        isCoreEstinant: false,
      });
      return;
    }

    engineEstinantLocatorList.push({
      zorn: `${identifierName}:${fileImport.sourcePath}`,
      typeName: EngineEstinantLocator2TypeName.TopLevelDeclaration,
      identifierName,
      filePath: fileImport.sourcePath,
      isCoreEstinant: false,
    });
  });

  const programName = engineProgramFile.inMemoryFileName.kebabCase;

  if (engineCallCommentText === null) {
    parallelErrorList.push({
      errorId: `getEngineProgramLocator/missing-program-description`,
      message: 'Program is missing a description',
      locator: {
        typeName: ErrorLocatorTypeName.FileErrorLocator,
        filePath: engineProgramFile.filePath,
      },
      metadata: null,
    });
  }

  const engineProgramLocator: EngineProgramLocator2 = {
    zorn: engineProgramFile.filePath,
    programName,
    description: engineCallCommentText ?? '',
    filePath: engineProgramFile.filePath,
    voictentLocatorList,
    engineEstinantLocatorList,
  };

  return {
    parallelErrorList,
    engineProgramLocator,
  };
};

/**
 * Gets metadata that helps later transforms find engine programs, their
 * collections, their transforms, and the edges between the collections and transforms
 */
export const getEngineProgramLocator = buildEstinant({
  name: 'getEngineProgramLocator',
})
  .fromHubblepup2<EngineProgramFileVoque>({
    gepp: ENGINE_PROGRAM_FILE_GEPP,
  })
  .andFromHubblepupTuple2<CommentedProgramBodyDeclarationListVoque, [string]>({
    gepp: COMMENTED_PROGRAM_BODY_DECLARATION_LIST_GEPP,
    framate: (leftInput) => [leftInput.indexByName.zorn],
    croard: (rightInput) => rightInput.indexByName.zorn,
  })
  .andFromHubblepupTuple2<TypeScriptFileImportListVoque, [string]>({
    gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
    framate: (leftInput) => [leftInput.indexByName.zorn],
    croard: (rightInput) => rightInput.indexByName.zorn,
  })
  .toHubblepupTuple2<ProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .toHubblepupTuple2<EngineProgramLocator2Voque>({
    gepp: ENGINE_PROGRAM_LOCATOR_2_GEPP,
  })
  .onPinbe(
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
          [PROGRAM_ERROR_GEPP]: [
            {
              errorId: `getEngineProgramLocator/missing-engine-call`,
              message: 'Unable to find engine call declaration',
              locator: {
                typeName: ErrorLocatorTypeName.FileErrorLocator,
                filePath: engineProgramFile.file.filePath,
              },
              metadata: null,
            } satisfies ProgramError,
          ],
          [ENGINE_PROGRAM_LOCATOR_2_GEPP]: [],
        };
      }

      const engineCallExpressionPropertyList: IdentifiableProperty[] =
        engineCallDeclaration?.bodyStatement?.expression.arguments[0]
          .properties ?? [];

      const { engineFunctionConfiguration } = engineProgramFile;

      switch (engineFunctionConfiguration.typeName) {
        case EngineFunctionConfigurationTypeName.Core:
          return {
            [PROGRAM_ERROR_GEPP]: [
              {
                errorId: `getEngineProgramLocator/unhandled-engine-call`,
                message: `Engine function configuration "${engineProgramFile.engineFunctionConfiguration.typeName}" is not currently supported by the program modeler`,
                locator: {
                  typeName: ErrorLocatorTypeName.FileErrorLocator,
                  filePath: engineProgramFile.file.filePath,
                },
                metadata: null,
              } satisfies ProgramError,
            ],
            [ENGINE_PROGRAM_LOCATOR_2_GEPP]: [],
          };
        case EngineFunctionConfigurationTypeName.Core2: {
          const { parallelErrorList, engineProgramLocator } =
            getCore2EngineProgramLocator({
              engineProgramFile: engineProgramFile.file,
              engineFunctionConfiguration,
              importList,
              engineCallCommentText: engineCallDeclaration.commentText,
              engineCallExpressionPropertyList,
            });

          return {
            [PROGRAM_ERROR_GEPP]: parallelErrorList,
            [ENGINE_PROGRAM_LOCATOR_2_GEPP]: [engineProgramLocator],
          };
        }
        case EngineFunctionConfigurationTypeName.Adapted: {
          const { parallelErrorList, engineProgramLocator } =
            getAdaptedEngineProgramLocator({
              engineProgramFile: engineProgramFile.file,
              engineFunctionConfiguration,
              importList,
              engineCallCommentText: engineCallDeclaration.commentText,
              engineCallExpressionPropertyList,
            });

          return {
            [PROGRAM_ERROR_GEPP]: parallelErrorList,
            [ENGINE_PROGRAM_LOCATOR_2_GEPP]: [engineProgramLocator],
          };
        }
      }
    },
  )
  .assemble();
