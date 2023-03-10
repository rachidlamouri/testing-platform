import { TSESTree, AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import { buildCortmum } from '../../../type-script-adapter/estinant/cortmum';
import { Vicken } from '../../../type-script-adapter/vicken';
import { Vition } from '../../../type-script-adapter/vition';
import { isArrayExpressionOfIdentifiers } from '../../../utilities/type-script-ast/isArrayExpressionOfIdentifiers';
import {
  ObjectExpressionWithIdentifierProperties,
  isObjectExpressionWithIdentifierProperties,
  IdentifiableProperty,
} from '../../../utilities/type-script-ast/isObjectLiteralExpressionWithIdentifierProperties';
import { isSpecificExpressionStatement } from '../../../utilities/type-script-ast/isSpecificExpressionStatement';
import {
  ParsedTypeScriptFileVoictent,
  PARSED_TYPE_SCRIPT_FILE_GEPP,
} from '../type-script-file/parsedTypeScriptFile';
import {
  TypeScriptFileVoictent,
  TYPE_SCRIPT_FILE_GEPP,
} from '../type-script-file/typeScriptFile';
import {
  LocalTypeScriptFileImport,
  TypeScriptFileImportListVoictent,
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImportTypeName,
  TypeScriptFileImport,
} from '../type-script-file/typeScriptFileImportList';
import {
  EngineEstinantVoictent,
  ENGINE_ESTINANT_GEPP,
  EngineEstinantOdeshin,
  getEngineEstinantIdentifier,
} from './engineEstinant';
import {
  EngineFunctionConfigurationVoictent,
  ENGINE_FUNCTION_CONFIGURATION_GEPP,
} from './engineFunctionConfiguration';
import {
  EngineProgramOdeshin,
  EngineProgramVoictent,
  ENGINE_PROGRAM_GEPP,
} from './engineProgram';

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

type ImportedEstinant = {
  identifier: string;
  fileImport: LocalTypeScriptFileImport;
};

export const engineProgramPartsCortmum = buildCortmum<
  Vition<
    ParsedTypeScriptFileVoictent,
    [
      Vicken<TypeScriptFileVoictent, [TypeScriptFileVoictent], string>,
      Vicken<
        TypeScriptFileImportListVoictent,
        [TypeScriptFileImportListVoictent],
        string
      >,
      Vicken<
        EngineFunctionConfigurationVoictent,
        [EngineFunctionConfigurationVoictent],
        ''
      >,
    ]
  >,
  [EngineProgramVoictent, EngineEstinantVoictent]
>({
  leftGepp: PARSED_TYPE_SCRIPT_FILE_GEPP,
  rightAppreffingeTuple: [
    {
      gepp: TYPE_SCRIPT_FILE_GEPP,
      croard: (rightInput): string => rightInput.identifier,
      framate: (leftInput) => [leftInput.identifier] as const,
    },
    {
      gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
      croard: (rightInput): string => rightInput.identifier,
      framate: (leftInput) => [leftInput.identifier] as const,
    },
    {
      gepp: ENGINE_FUNCTION_CONFIGURATION_GEPP,
      croard: () => '' as const,
      framate: () => [''] as const,
    },
  ],
  outputGeppTuple: [ENGINE_PROGRAM_GEPP, ENGINE_ESTINANT_GEPP],
  pinbe: (
    leftInput,
    [{ grition: typeScriptFile }],
    [{ grition: importList }],
    [engineFunctionConfiguration],
  ) => {
    const parsedFile = leftInput.grition;

    const hasEngineFunctionImport = importList.some(
      (fileImport) =>
        fileImport.typeName === TypeScriptFileImportTypeName.Local &&
        fileImport.filePath === engineFunctionConfiguration.filePath &&
        fileImport.specifierList.some(
          (specifier) =>
            specifier === engineFunctionConfiguration.exportedIdentifier,
        ),
    );

    if (!hasEngineFunctionImport) {
      return {
        [ENGINE_PROGRAM_GEPP]: [],
        [ENGINE_ESTINANT_GEPP]: [],
      };
    }

    const engineCallExpressionStatement = parsedFile.program.body.find(
      (statement): statement is EngineCallExpressionStatement =>
        isEngineCallExpressionStatement(
          statement,
          engineFunctionConfiguration.exportedIdentifier,
        ),
    );

    const engineCallExpressionPropertyList: IdentifiableProperty[] =
      engineCallExpressionStatement?.expression.arguments[0].properties ?? [];

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

    const importedEstinantList = estinantIdentifierList
      .map((identifier) => {
        const fileImport = fileImportsByImportedIdentifier.get(identifier);
        return {
          identifier,
          fileImport,
        };
      })
      .filter(
        (importedEstinant): importedEstinant is ImportedEstinant =>
          importedEstinant.fileImport !== undefined &&
          importedEstinant.fileImport.typeName ===
            TypeScriptFileImportTypeName.Local,
      );

    const programName = typeScriptFile.inMemoryFileName.kebabCase;

    const outputEstinantList = importedEstinantList.map<EngineEstinantOdeshin>(
      (importedEstinant) => ({
        identifier: getEngineEstinantIdentifier(
          programName,
          importedEstinant.identifier,
        ),
        grition: {
          programName,
          estinantName: importedEstinant.identifier,
          estinantFilePath: importedEstinant.fileImport.filePath,
          exportedIdentifierName: importedEstinant.identifier,
        },
      }),
    );

    const outputProgram: EngineProgramOdeshin = {
      identifier: leftInput.identifier,
      grition: {
        programName,
        estinantIdentifierList: outputEstinantList.map(
          ({ identifier }) => identifier,
        ),
      },
    };

    return {
      [ENGINE_PROGRAM_GEPP]: [outputProgram],
      [ENGINE_ESTINANT_GEPP]: outputEstinantList,
    };
  },
});
