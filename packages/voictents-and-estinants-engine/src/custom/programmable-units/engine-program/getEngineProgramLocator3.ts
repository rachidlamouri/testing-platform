import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import Case from 'case';
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
  isArrayExpressionOfIdentifiers,
} from '../../../utilities/type-script-ast/isArrayExpressionOfIdentifiers';
import { isSpecificExpressionStatement } from '../../../utilities/type-script-ast/isSpecificExpressionStatement';
import {
  AdaptedEngineFunctionConfiguration,
  CoreEngineFunction2Configuration,
  EngineFunctionConfigurationTypeName,
} from './engineFunctionConfiguration';
import {
  EngineEstinantBuildAddMetadataForSerializationLocatorInstance,
  EngineEstinantLocator2,
  EngineEstinantLocator2TypeName,
  EngineEstinantTopLevelDeclarationLocatorInstance,
} from './engineEstinantLocator2';
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
import { OdeshinZorn } from '../../adapter/odeshin2';
import { buildVoictentByGepp } from '../../adapter/digikikify';
import { isArrayExpression } from '../../../utilities/type-script-ast/isArrayExpression';
import {
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP,
  FileCommentedProgramBodyDeclarationGroupVoque,
} from '../type-script-file/fileCommentedProgramBodyDeclarationGroup';
import { CommentedProgramBodyDeclaration } from '../type-script-file/commentedProgramBodyDeclaration';

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

type EngineCallDeclaration = CommentedProgramBodyDeclaration<
  EngineCallExpressionStatement,
  null
>;

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

  const programName = Case.kebab(engineProgramFile.nodePath.name.extensionless);

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
          filePath: engineProgramFile.filePath.serialized,
        },
        context: null,
      });

      return;
    }

    let initialHubblepupPelueTupleProperty: IdentifiableProperty | undefined;
    if (isNewExpressionWithObjectExpressionArgument(element)) {
      initialHubblepupPelueTupleProperty = element.arguments[0].properties.find(
        (node): node is IdentifiableProperty => {
          return isSepcificIdentifiableProperty(
            node,
            engineFunctionConfiguration.initialHubblepupPelueTupleKeyIdentifierName,
          );
        },
      );
    } else {
      initialHubblepupPelueTupleProperty = undefined;
    }

    let hasInitialInput: boolean;
    if (initialHubblepupPelueTupleProperty === undefined) {
      hasInitialInput = false;
    } else if (isArrayExpression(initialHubblepupPelueTupleProperty.value)) {
      hasInitialInput =
        initialHubblepupPelueTupleProperty.value.elements.length > 0;
    } else {
      // We are defaulting to true since this implies that some potentially non-empty array was passed in
      hasInitialInput = true;
    }

    if (hasInitialInput) {
      initialVoqueLocatorList.push(
        new EngineVoqueLocator2Instance({
          identifierName: voqueName,
          filePath: engineProgramFile.filePath.serialized,
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
        engineProgramFile.filePath.serialized;

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
          filePath: engineProgramFile.filePath.serialized,
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

  const partialProgramLocator = new PartialEngineProgramLocator2Instance({
    programName,
    filePath: engineProgramFile.filePath.serialized,
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
    isCoreProgram: true,
    programName,
    description: engineCallCommentText ?? '',
    filePath: engineProgramFile.filePath.serialized,
    initializedVoqueLocatorList: initialVoqueLocatorList,
    estinantRelationshipList,
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
  const programName = Case.kebab(engineProgramFile.nodePath.name.extensionless);

  const explicitVoictentTupleProperty = engineCallExpressionPropertyList.find(
    (property) =>
      property.key.name ===
      engineFunctionConfiguration.explicitVoictentTupleKeyIdentifierName,
  );

  const explicitVoictentTupleValueNode = explicitVoictentTupleProperty?.value;

  const explicitVoictentInstanceList = isSpecificConstantTypeScriptAsExpression(
    explicitVoictentTupleValueNode,
    isArrayExpression,
  )
    ? explicitVoictentTupleValueNode.expression.elements
    : [];

  const parallelErrorList: ReportedProgramError<ReportingLocator>[] = [];
  const engineVoqueLocatorList: EngineVoqueLocator2[] = [];

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

  if (explicitVoictentInstanceList.length === 0) {
    parallelErrorList.push({
      name: 'unparseable-explicit-voictent-list',
      error: new Error(
        'Unable able to parse explicit input voictent list. Expected an array expression with "as const"',
      ),
      reporterLocator,
      sourceLocator: {
        typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
        filePath: engineProgramFile.filePath.serialized,
      },
      context: {
        reason: 'A program without inputs will not do anything',
        explicitVoictentTupleProperty,
        explicitVoictentTupleValueNode,
      },
    });
  } else {
    explicitVoictentInstanceList.forEach((voictentInstance, originalIndex) => {
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
          name: 'unparseable-explicit-voictent',
          error: new Error(
            'Unable to parse explicit input voictent. Expected a new expression with at least one type parameter',
          ),
          reporterLocator,
          sourceLocator: {
            typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
            filePath: engineProgramFile.filePath.serialized,
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
        engineProgramFile.filePath.serialized;

      engineVoqueLocatorList.push(
        new EngineVoqueLocator2Instance({
          identifierName: voqueIdentifierName,
          filePath: voqueFilePath,
          isCoreVoque: false,
        }),
      );
    });
  }

  // TODO: rename these variables or move this code to its own function (I prefer the latter), because these are way too vague
  const keyName =
    engineFunctionConfiguration.uninferableVoictentByGeppKeyIdentifierName;
  const functionName = buildVoictentByGepp.name;

  const uninferableVoictentByGeppProperty =
    engineCallExpressionPropertyList.find((property) => {
      return property.key.name === keyName;
    });

  const uninferableVoictentByGeppValueNode =
    uninferableVoictentByGeppProperty?.value;

  const buildVoictentByGeppCallExpression =
    isSpecificIdentifiableCallExpression(
      uninferableVoictentByGeppValueNode,
      functionName,
    )
      ? uninferableVoictentByGeppValueNode
      : null;

  const hasConstantListOfArguments =
    buildVoictentByGeppCallExpression !== null &&
    isSpecificConstantTypeScriptAsExpression<TSESTree.ArrayExpression>(
      buildVoictentByGeppCallExpression.arguments[0],
      isArrayExpression,
    );

  if (!hasConstantListOfArguments) {
    parallelErrorList.push({
      name: 'unparseable-uninferable-voictent-by-gepp',
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
        buildVoictentByGeppCallExpression,
        uninferableVoictentByGeppValueNode,
        uninferableVoictentByGeppProperty,
      },
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
        filePath: engineProgramFile.filePath.serialized,
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
          filePath: engineProgramFile.filePath.serialized,
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
        filePath: engineProgramFile.filePath.serialized,
      },
      context: null,
    });
  }

  const partialProgramLocator = new PartialEngineProgramLocator2Instance({
    programName,
    filePath: engineProgramFile.filePath.serialized,
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
    isCoreProgram: false,
    programName,
    description: engineCallCommentText ?? '',
    filePath: engineProgramFile.filePath.serialized,
    initializedVoqueLocatorList: engineVoqueLocatorList,
    estinantRelationshipList,
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
 */
export const getEngineProgramLocator3 = buildEstinant({
  name: 'getEngineProgramLocator3',
})
  .fromHubblepup2<EngineProgramFileVoque>({
    gepp: ENGINE_PROGRAM_FILE_GEPP,
  })
  .andFromHubblepupTuple2<
    FileCommentedProgramBodyDeclarationGroupVoque,
    [OdeshinZorn]
  >({
    gepp: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP,
    framate: (leftInput) => [leftInput.indexByName.zorn],
    croard: (rightInput) => rightInput.indexByName.zorn,
  })
  .andFromHubblepupTuple2<TypeScriptFileImportListVoque, [OdeshinZorn]>({
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
                filePath: engineProgramFile.file.filePath.serialized,
              },
              context: null,
            } satisfies ReportedProgramError<ReportingLocator>,
          ],
          [ENGINE_PROGRAM_LOCATOR_3_GEPP]: [],
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
                  filePath: engineProgramFile.file.filePath.serialized,
                },
                context: null,
              } satisfies ReportedProgramError<ReportingLocator>,
            ],
            [ENGINE_PROGRAM_LOCATOR_3_GEPP]: [],
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
            [PROGRAM_ESTINANT_RELATIONSHIP_GEPP]:
              engineProgramLocator.estinantRelationshipList,
          };
        }
      }
    },
  )
  .assemble();
