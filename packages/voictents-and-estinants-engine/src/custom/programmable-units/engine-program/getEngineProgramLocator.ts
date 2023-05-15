import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_PROGRAM_FILE_GEPP,
  EngineProgramFile,
  EngineProgramFileVoictent,
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
  TypeScriptFileImportListVoictent,
} from '../type-script-file/typeScriptFileImportList';
import {
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
  EngineProgramLocator2Odeshin,
  EngineProgramLocator2Voictent,
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
  CommentedProgramBodyDeclarationListVoictent,
} from '../type-script-file/commentedProgramBodyDeclarationList';
import {
  ErrorLocatorTypeName,
  PROGRAM_ERROR_GEPP,
  ProgramErrorOdeshin,
  ProgramErrorVoictent,
} from '../error/programError';
import { isIdentifier } from '../../../utilities/type-script-ast/isIdentifier';
import {
  isNewExpression,
  isNewExpressionWithObjectExpressionArgument,
} from '../../../utilities/type-script-ast/isNewExpression';
import { buildAddMetadataForSerialization } from '../../../example-programs/buildAddMetadataForSerialization';
import { isSpecificIdentifiableCallExpression } from '../../../utilities/type-script-ast/isCallExpression';
import { isTypeScriptTypeParameterInstantiationWithParameterTuple } from '../../../utilities/type-script-ast/isTypeScriptTypeParameterInstantiation';
import { isIdentifiableTypeScriptTypeReference } from '../../../utilities/type-script-ast/isIdentifiableTypeScriptTypeReference';

type EngineCallExpression = TSESTree.CallExpression & {
  arguments: [ObjectExpressionWithIdentifierProperties];
};

type EngineCallExpressionStatement = TSESTree.ExpressionStatement & {
  expression: EngineCallExpression;
};

/**
 * @todo tie this to the logic that a gepp identifier is in screaming snake case
 * @todo tie this to the logic that enforces that a gepp identifier should end in 'GEPP'
 */
const screamingSnakeCaseGeppToVoictentName = (
  geppIdentifier: string,
): string => {
  const namePartList = geppIdentifier.split('_');

  namePartList.pop();

  const voictentName = namePartList
    .map((word) => `${word.charAt(0)}${word.slice(1).toLowerCase()}`)
    .join('');

  return voictentName;
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
  importList: TypeScriptFileImportList;
  engineCallCommentText: string | null;
  engineCallExpressionPropertyList: IdentifiableProperty[];
};

type Core2EngineProgramLocatorAccessorResult = {
  parallelErrorList: ProgramErrorOdeshin[];
  engineProgramLocator: EngineProgramLocator2Odeshin;
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
  const parallelErrorList: ProgramErrorOdeshin[] = [];

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
        zorn: `getEngineProgramLocator/${engineProgramFile.filePath}`,
        grition: {
          errorId: `getEngineProgramLocator/missing-voictent-type-parameter`,
          message:
            'New expressions for voictent instances must have a type parameter for the corresponding voque',
          locator: {
            typeName: ErrorLocatorTypeName.FileErrorLocator,
            filePath: engineProgramFile.filePath,
          },
          metadata: null,
        },
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
        zorn: `getEngineProgramLocator/${engineProgramFile.filePath}`,
        grition: {
          errorId: `getEngineProgramLocator/unparseable-estinant`,
          message: `Engine program has an unparseable estinant. Expected an identifier or a call expression to "${buildAddMetadataForSerialization.name}".`,
          locator: {
            typeName: ErrorLocatorTypeName.FileErrorLocator,
            filePath: engineProgramFile.filePath,
          },
          metadata: null,
        },
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
        ...partialLocator,
        filePath: engineProgramFile.filePath,
        isCoreEstinant: true,
      });
      return;
    }

    engineEstinantLocatorList.push({
      ...partialLocator,
      filePath: fileImport.sourcePath,
      isCoreEstinant: true,
    });
  });

  if (engineCallCommentText === null) {
    parallelErrorList.push({
      zorn: `getEngineProgramLocator/${engineProgramFile.filePath}`,
      grition: {
        errorId: `getEngineProgramLocator/missing-program-description`,
        message: 'Program is missing a description',
        locator: {
          typeName: ErrorLocatorTypeName.FileErrorLocator,
          filePath: engineProgramFile.filePath,
        },
        metadata: null,
      },
    });
  }

  const engineProgramLocatorOdeshin: EngineProgramLocator2Odeshin = {
    zorn: engineProgramFile.filePath,
    grition: {
      programName,
      description: engineCallCommentText ?? '',
      filePath: engineProgramFile.filePath,
      voictentLocatorList,
      engineEstinantLocatorList,
    },
  };

  return {
    parallelErrorList,
    engineProgramLocator: engineProgramLocatorOdeshin,
  };
};

type AdaptedEngineProgramLocatorAccessorInput = {
  engineProgramFile: EngineProgramFile['file'];
  engineFunctionConfiguration: AdaptedEngineFunctionConfiguration;
  importList: TypeScriptFileImportList;
  engineCallCommentText: string | null;
  engineCallExpressionPropertyList: IdentifiableProperty[];
};

type AdaptedEngineProgramLocatorAccessorResult = {
  parallelErrorList: ProgramErrorOdeshin[];
  engineProgramLocator: EngineProgramLocator2Odeshin;
};

const getAdaptedEngineProgramLocator = ({
  engineProgramFile,
  engineFunctionConfiguration,
  importList,
  engineCallCommentText,
  engineCallExpressionPropertyList,
}: AdaptedEngineProgramLocatorAccessorInput): AdaptedEngineProgramLocatorAccessorResult => {
  const initialVoictentByGeppProperty = engineCallExpressionPropertyList.find(
    (property) =>
      property.key.name ===
      engineFunctionConfiguration.initialVoictentByGeppKeyIdentifierName,
  );

  const initialVoictentByGeppValueNode = initialVoictentByGeppProperty?.value;

  const initialVoictentGeppIdentifierList =
    isObjectExpressionWithIdentifierProperties(initialVoictentByGeppValueNode)
      ? initialVoictentByGeppValueNode.properties.map(
          (property: IdentifiableProperty) => property.key.name,
        )
      : [];

  const voictentLocatorList =
    initialVoictentGeppIdentifierList.map<VoictentLocator>(
      (screamingSnakeCaseName: string) => {
        return {
          name: screamingSnakeCaseGeppToVoictentName(screamingSnakeCaseName),
          hasInitialInput: true,
        };
      },
    );

  const estinantListProperty = engineCallExpressionPropertyList.find(
    (property) =>
      property.key.name ===
      engineFunctionConfiguration.estinantListKeyIdentifierName,
  );

  const estinantListValueNode = estinantListProperty?.value;

  const estinantNodeList: TSESTree.Identifier[] =
    isArrayExpressionOfIdentifiers(estinantListValueNode)
      ? estinantListValueNode.elements
      : [];

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

  const parallelErrorList: ProgramErrorOdeshin[] = [];
  const engineEstinantLocatorList: EngineEstinantLocator2[] = [];

  estinantIdentifierList.forEach((identifierName) => {
    const fileImport = fileImportsByImportedIdentifier.get(identifierName);

    if (fileImport === undefined) {
      engineEstinantLocatorList.push({
        typeName: EngineEstinantLocator2TypeName.TopLevelDeclaration,
        identifierName,
        filePath: engineProgramFile.filePath,
        isCoreEstinant: false,
      });
      return;
    }

    engineEstinantLocatorList.push({
      typeName: EngineEstinantLocator2TypeName.TopLevelDeclaration,
      identifierName,
      filePath: fileImport.sourcePath,
      isCoreEstinant: false,
    });
  });

  const programName = engineProgramFile.inMemoryFileName.kebabCase;

  if (engineCallCommentText === null) {
    parallelErrorList.push({
      zorn: `getEngineProgramLocator/${engineProgramFile.filePath}`,
      grition: {
        errorId: `getEngineProgramLocator/missing-program-description`,
        message: 'Program is missing a description',
        locator: {
          typeName: ErrorLocatorTypeName.FileErrorLocator,
          filePath: engineProgramFile.filePath,
        },
        metadata: null,
      },
    });
  }

  const engineProgramLocatorOdeshin: EngineProgramLocator2Odeshin = {
    zorn: engineProgramFile.filePath,
    grition: {
      programName,
      description: engineCallCommentText ?? '',
      filePath: engineProgramFile.filePath,
      voictentLocatorList,
      engineEstinantLocatorList,
    },
  };

  return {
    parallelErrorList,
    engineProgramLocator: engineProgramLocatorOdeshin,
  };
};

/**
 * Gets metadata that helps later transforms find engine programs, their
 * collections, their transforms, and the edges between the collections and transforms
 */
export const getEngineProgramLocator = buildEstinant({
  name: 'getEngineProgramLocator',
})
  .fromGrition<EngineProgramFileVoictent>({
    gepp: ENGINE_PROGRAM_FILE_GEPP,
  })
  .andFromGritionTuple<CommentedProgramBodyDeclarationListVoictent, [string]>({
    gepp: COMMENTED_PROGRAM_BODY_DECLARATION_LIST_GEPP,
    framate: (leftInput) => [leftInput.zorn],
    croard: (rightInput) => rightInput.zorn,
  })
  .andFromGritionTuple<TypeScriptFileImportListVoictent, [string]>({
    gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
    framate: (leftInput) => [leftInput.zorn],
    croard: (rightInput) => rightInput.zorn,
  })
  .toHubblepupTuple<ProgramErrorVoictent>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .toHubblepupTuple<EngineProgramLocator2Voictent>({
    gepp: ENGINE_PROGRAM_LOCATOR_2_GEPP,
  })
  .onPinbe(
    (engineProgramFile, [commentedProgramBodyStatementList], [importList]) => {
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
              zorn: `getEngineProgramLocator/${engineProgramFile.file.filePath}`,
              grition: {
                errorId: `getEngineProgramLocator/missing-engine-call`,
                message: 'Unable to find engine call declaration',
                locator: {
                  typeName: ErrorLocatorTypeName.FileErrorLocator,
                  filePath: engineProgramFile.file.filePath,
                },
                metadata: null,
              },
            },
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
                zorn: `getEngineProgramLocator/${engineProgramFile.file.filePath}`,
                grition: {
                  errorId: `getEngineProgramLocator/unhandled-engine-call`,
                  message: `Engine function configuration "${engineProgramFile.engineFunctionConfiguration.typeName}" is not currently supported by the program modeler`,
                  locator: {
                    typeName: ErrorLocatorTypeName.FileErrorLocator,
                    filePath: engineProgramFile.file.filePath,
                  },
                  metadata: null,
                },
              },
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
