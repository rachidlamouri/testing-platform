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
import { VoictentLocator } from './engineProgramLocator2';
import {
  EngineEstinantBuildAddMetadataForSerializationLocatorInstance,
  EngineEstinantLocator2,
  EngineEstinantLocator2TypeName,
  EngineEstinantTopLevelDeclarationLocatorInstance,
} from './engineEstinantLocator2';
import {
  COMMENTED_PROGRAM_BODY_DECLARATION_LIST_GEPP,
  CommentedProgramBodyDeclarationListVoque,
} from '../type-script-file/commentedProgramBodyDeclarationList';
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
import {
  PROGRAM_ERROR_GEPP,
  ProgramErrorElementLocatorTypeName,
  GenericProgramErrorVoque,
  ReportedProgramError,
  ReportingEstinantLocator,
} from '../error/programError';
import { PROGRAM_VOQUE_RELATIONSHIP_GEPP } from './programVoqueRelationship';
import {
  ENGINE_PROGRAM_LOCATOR_3_GEPP,
  EngineProgramLocator3,
  EngineProgramLocator3Instance,
  EngineProgramLocator3Voque,
} from './engineProgramLocator3';
import {
  PROGRAM_ESTINANT_RELATIONSHIP_GEPP,
  ProgramEstinantRelationshipInstance,
  ProgramEstinantRelationshipVoque,
} from './programEstinantRelationship';
import {
  EngineVoqueLocator2,
  EngineVoqueLocator2Instance,
} from './engineVoqueLocator2';
import { PartialEngineProgramLocator2Instance } from './partialEngineProgramLocator2';

const ESTINANT_NAME = 'getEngineProgramLocator' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingEstinantLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName: ProgramErrorElementLocatorTypeName.ReportingEstinantLocator,
  name: ESTINANT_NAME,
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
  parallelErrorList: ReportedProgramError<ReportingLocator>[];
  engineProgramLocator: EngineProgramLocator3;
};

const getCore2EngineProgramLocator = ({
  engineProgramFile,
  engineFunctionConfiguration,
  importList,
  engineCallCommentText,
  engineCallExpressionPropertyList,
}: Core2EngineProgramLocatorAccessorInput): Core2EngineProgramLocatorAccessorResult => {
  // TODO: move this to its own hubblepup
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

  const initialVoqueLocatorList: EngineVoqueLocator2[] = [];
  const parallelErrorList: ReportedProgramError<ReportingLocator>[] = [];

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

    if (voqueName === null) {
      parallelErrorList.push({
        name: `missing-voictent-type-parameter`,
        error: new Error(
          'New expressions for voictent instances must have a type parameter for the corresponding voque',
        ),
        reporterLocator,
        sourceLocator: {
          typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
          filePath: engineProgramFile.filePath,
        },
        context: null,
      });

      return;
    }

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

    if (hasInitialInput) {
      initialVoqueLocatorList.push(
        new EngineVoqueLocator2Instance({
          identifierName: voqueName,
          filePath: engineProgramFile.filePath,
          isCoreVoque: true,
        }),
      );
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
  const engineEstinantLocatorList: EngineEstinantLocator2[] = [];

  estinantReferenceElementList.forEach((element, index) => {
    if (isIdentifier(element)) {
      const identifierName = element.name;

      const filePath =
        getImportPathFromIdentifier(identifierName) ??
        engineProgramFile.filePath;

      engineEstinantLocatorList.push(
        new EngineEstinantTopLevelDeclarationLocatorInstance({
          typeName: EngineEstinantLocator2TypeName.TopLevelDeclaration,
          identifierName,
          filePath,
          isCoreEstinant: true,
        }),
      );
    } else if (
      isSpecificIdentifiableCallExpression(
        element,
        buildAddMetadataForSerialization.name,
      )
    ) {
      engineEstinantLocatorList.push(
        new EngineEstinantBuildAddMetadataForSerializationLocatorInstance({
          typeName:
            EngineEstinantLocator2TypeName.BuildAddMetadataForSerialization,
          callExpression: element,
          index,
          isCoreEstinant: true,
          filePath: engineProgramFile.filePath,
        }),
      );
    } else {
      parallelErrorList.push({
        name: `unparseable-estinant`,
        error: new Error(
          `Engine program has an unparseable estinant. Expected an identifier or a call expression to "${buildAddMetadataForSerialization.name}".`,
        ),
        reporterLocator,
        sourceLocator: {
          typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
          filePath: engineProgramFile.filePath,
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
        filePath: engineProgramFile.filePath,
      },
      context: null,
    });
  }

  const partialProgramLocator = new PartialEngineProgramLocator2Instance({
    programName,
    filePath: engineProgramFile.filePath,
  });

  const estinantRelationshipList = engineEstinantLocatorList.map(
    (estinantLocator) => {
      return new ProgramEstinantRelationshipInstance({
        programName,
        estinantLocator,
        rootGraphLocator: partialProgramLocator.rootGraphLocator,
      });
    },
  );

  const engineProgramLocator = new EngineProgramLocator3Instance({
    programName,
    description: engineCallCommentText ?? '',
    filePath: engineProgramFile.filePath,
    initializedVoqueLocatorList: initialVoqueLocatorList,
    estinantRelationshipList,
    rootGraphLocator: partialProgramLocator.rootGraphLocator,
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
  engineCallCommentText: string | null;
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
  engineCallCommentText,
  engineCallExpressionPropertyList,
}: AdaptedEngineProgramLocatorAccessorInput): AdaptedEngineProgramLocatorAccessorResult => {
  const programName = engineProgramFile.inMemoryFileName.kebabCase;

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

  const parallelErrorList: ReportedProgramError<ReportingLocator>[] = [];
  const engineVoqueLocatorList: EngineVoqueLocator2[] = [];
  const voictentLocatorList: VoictentLocator[] = [];

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

  if (populatedVoictentInstanceList.length === 0) {
    parallelErrorList.push({
      name: 'unparseable-populated-voictent-list',
      error: new Error(
        'Unable able to parse populated input voictent list. Expected an array expression with "as const"',
      ),
      reporterLocator,
      sourceLocator: {
        typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
        filePath: engineProgramFile.filePath,
      },
      context: {
        reason: 'A program without inputs will not do anything',
        populatedVoictentTupleProperty,
        populatedVoictentTupleValueNode,
      },
    });
  } else {
    populatedVoictentInstanceList.forEach((voictentInstance, originalIndex) => {
      const voqueTypeReferenceNode = isNewExpressionWithSpecificTypeParameters<
        [AST_NODE_TYPES.TSTypeReference]
      >(voictentInstance, [AST_NODE_TYPES.TSTypeReference])
        ? voictentInstance.typeParameters.params[0]
        : null;

      const voqueIdentifierName = isIdentifiableTypeScriptTypeReference(
        voqueTypeReferenceNode,
      )
        ? voqueTypeReferenceNode.typeName.name
        : null;

      if (voqueIdentifierName === null) {
        parallelErrorList.push({
          name: 'unparseable-populated-voictent',
          error: new Error(
            'Unable to parse populated input voictent. Expected a new expression with at least one type parameter',
          ),
          reporterLocator,
          sourceLocator: {
            typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
            filePath: engineProgramFile.filePath,
          },
          context: {
            originalIndex,
            voqueTypeReferenceNode,
            voictentInstance,
          },
        });
        return;
      }

      const voqueFilePath =
        fileImportsByImportedIdentifier.get(voqueIdentifierName)?.sourcePath ??
        engineProgramFile.filePath;

      const voictentName = voqueIdentifierName.replace(/Voque$/, '');

      engineVoqueLocatorList.push(
        new EngineVoqueLocator2Instance({
          identifierName: voqueIdentifierName,
          filePath: voqueFilePath,
          isCoreVoque: false,
        }),
      );

      voictentLocatorList.push({
        name: voictentName,
        hasInitialInput: true,
      });
    });
  }

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
      name: 'unparseable-estinant-tuple',
      error: new Error(
        'Unable able to parse input estinant tuple. Expected an array literal of identifiers with "as const"',
      ),
      reporterLocator,
      sourceLocator: {
        typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
        filePath: engineProgramFile.filePath,
      },
      context: {
        estinantListProperty,
        estinantListValueNode,
      },
    });
  }

  const estinantIdentifierList = estinantNodeList.map(
    (identifier) => identifier.name,
  );

  const engineEstinantLocatorList: EngineEstinantLocator2[] = [];

  estinantIdentifierList.forEach((identifierName) => {
    const fileImport = fileImportsByImportedIdentifier.get(identifierName);

    if (fileImport === undefined) {
      engineEstinantLocatorList.push(
        new EngineEstinantTopLevelDeclarationLocatorInstance({
          typeName: EngineEstinantLocator2TypeName.TopLevelDeclaration,
          identifierName,
          filePath: engineProgramFile.filePath,
          isCoreEstinant: false,
        }),
      );
      return;
    }

    engineEstinantLocatorList.push(
      new EngineEstinantTopLevelDeclarationLocatorInstance({
        typeName: EngineEstinantLocator2TypeName.TopLevelDeclaration,
        identifierName,
        filePath: fileImport.sourcePath,
        isCoreEstinant: false,
      }),
    );
  });

  if (engineCallCommentText === null) {
    parallelErrorList.push({
      name: `missing-program-description`,
      error: new Error('Program is missing a description'),
      reporterLocator,
      sourceLocator: {
        typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
        filePath: engineProgramFile.filePath,
      },
      context: null,
    });
  }

  const partialProgramLocator = new PartialEngineProgramLocator2Instance({
    programName,
    filePath: engineProgramFile.filePath,
  });

  const estinantRelationshipList = engineEstinantLocatorList.map(
    (estinantLocator) => {
      return new ProgramEstinantRelationshipInstance({
        programName,
        estinantLocator,
        rootGraphLocator: partialProgramLocator.rootGraphLocator,
      });
    },
  );

  const engineProgramLocator = new EngineProgramLocator3Instance({
    programName,
    description: engineCallCommentText ?? '',
    filePath: engineProgramFile.filePath,
    initializedVoqueLocatorList: engineVoqueLocatorList,
    estinantRelationshipList,
    rootGraphLocator: partialProgramLocator.rootGraphLocator,
  });

  return {
    parallelErrorList,
    engineProgramLocator,
  };
};

/**
 * Gets metadata that helps later transforms find engine programs, their
 * collections, their transforms, and the edges between the collections and transforms
 */
export const getEngineProgramLocator3 = buildEstinant({
  name: 'getEngineProgramLocator3',
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
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .toHubblepupTuple2<EngineProgramLocator3Voque>({
    gepp: ENGINE_PROGRAM_LOCATOR_3_GEPP,
  })
  // .toHubblepupTuple2<ProgramVoqueRelationshipVoque>({
  //   gepp: PROGRAM_VOQUE_RELATIONSHIP_GEPP,
  // })
  .toHubblepupTuple2<ProgramEstinantRelationshipVoque>({
    gepp: PROGRAM_ESTINANT_RELATIONSHIP_GEPP,
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
              name: `missing-engine-call`,
              error: new Error('Unable to find engine call declaration'),
              reporterLocator,
              sourceLocator: {
                typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
                filePath: engineProgramFile.file.filePath,
              },
              context: null,
            } satisfies ReportedProgramError<ReportingLocator>,
          ],
          [ENGINE_PROGRAM_LOCATOR_3_GEPP]: [],
          // [PROGRAM_VOQUE_RELATIONSHIP_GEPP]: [],
          [PROGRAM_ESTINANT_RELATIONSHIP_GEPP]: [],
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
                name: `unhandled-engine-call`,
                error: new Error(
                  `Engine function configuration "${engineProgramFile.engineFunctionConfiguration.typeName}" is not currently supported by the program modeler`,
                ),
                reporterLocator,
                sourceLocator: {
                  typeName:
                    ProgramErrorElementLocatorTypeName.SourceFileLocator,
                  filePath: engineProgramFile.file.filePath,
                },
                context: null,
              } satisfies ReportedProgramError<ReportingLocator>,
            ],
            [ENGINE_PROGRAM_LOCATOR_3_GEPP]: [],
            [PROGRAM_VOQUE_RELATIONSHIP_GEPP]: [],
            [PROGRAM_ESTINANT_RELATIONSHIP_GEPP]: [],
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
            [ENGINE_PROGRAM_LOCATOR_3_GEPP]: [engineProgramLocator],
            // [PROGRAM_VOQUE_RELATIONSHIP_GEPP]: [],
            [PROGRAM_ESTINANT_RELATIONSHIP_GEPP]:
              engineProgramLocator.estinantRelationshipList,
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
            [ENGINE_PROGRAM_LOCATOR_3_GEPP]: [engineProgramLocator],
            // [PROGRAM_VOQUE_RELATIONSHIP_GEPP]:
            //   engineProgramLocator.voqueRelationshipList,
            [PROGRAM_ESTINANT_RELATIONSHIP_GEPP]:
              engineProgramLocator.estinantRelationshipList,
          };
        }
      }
    },
  )
  .assemble();
