import { TSESTree, AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import { isArrayExpressionOfIdentifiers } from '../../../utilities/type-script-ast/isArrayExpressionOfIdentifiers';
import {
  ObjectExpressionWithIdentifierProperties,
  isObjectExpressionWithIdentifierProperties,
  IdentifiableProperty,
} from '../../../utilities/type-script-ast/isObjectLiteralExpressionWithIdentifierProperties';
import { isSpecificExpressionStatement } from '../../../utilities/type-script-ast/isSpecificExpressionStatement';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ParsedTypeScriptFileVoictent,
  PARSED_TYPE_SCRIPT_FILE_GEPP,
} from '../type-script-file/parsedTypeScriptFile';
import {
  TypeScriptFileVoictent,
  TYPE_SCRIPT_FILE_GEPP,
} from '../type-script-file/typeScriptFile';
import {
  TypeScriptFileImportListVoictent,
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImport,
} from '../type-script-file/typeScriptFileImportList';
import { getEngineEstinantIdentifier } from './engineEstinant';
import {
  EngineFunctionConfigurationVoictent,
  ENGINE_FUNCTION_CONFIGURATION_GEPP,
} from './engineFunctionConfiguration';
import {
  ENGINE_ESTINANT_LOCATOR_GEPP,
  EngineEstinantLocatorOdeshin,
  EngineEstinantLocatorVoictent,
} from './engineEstinantLocator';
import {
  ENGINE_PROGRAM_LOCATOR_GEPP,
  EngineProgramLocatorOdeshin,
  EngineProgramLocatorVoictent,
} from './engineProgramLocator';

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
  fileImport: TypeScriptFileImport;
};

// TODO: consider filtering files by ones that have the engine and ones that do not, and then "getEngineProgramParts" only runs on a file identified as an engine program
export const getEngineProgramParts = buildEstinant({
  name: 'getEngineProgramParts',
})
  .fromHubblepup<ParsedTypeScriptFileVoictent>({
    gepp: PARSED_TYPE_SCRIPT_FILE_GEPP,
  })
  .andFromGritionTuple<TypeScriptFileVoictent, [string]>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
    framate: (leftInput) => [leftInput.zorn],
    croard: (rightInput) => rightInput.zorn,
  })
  .andFromGritionTuple<TypeScriptFileImportListVoictent, [string]>({
    gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
    framate: (leftInput) => [leftInput.zorn],
    croard: (rightInput) => rightInput.zorn,
  })
  .andFromVoictent<EngineFunctionConfigurationVoictent>({
    gepp: ENGINE_FUNCTION_CONFIGURATION_GEPP,
  })
  .toHubblepupTuple<EngineProgramLocatorVoictent>({
    gepp: ENGINE_PROGRAM_LOCATOR_GEPP,
  })
  .toHubblepupTuple<EngineEstinantLocatorVoictent>({
    gepp: ENGINE_ESTINANT_LOCATOR_GEPP,
  })
  .onPinbe(
    (
      leftInput,
      [typeScriptFile],
      [importList],
      [engineFunctionConfiguration],
    ) => {
      const parsedFile = leftInput.grition;

      const hasEngineFunctionImport = importList.some(
        (fileImport) =>
          fileImport.isInternal &&
          fileImport.sourcePath === engineFunctionConfiguration.filePath &&
          fileImport.specifierList.some(
            (specifier) =>
              specifier === engineFunctionConfiguration.exportedIdentifier,
          ),
      );

      if (!hasEngineFunctionImport) {
        return {
          [ENGINE_PROGRAM_LOCATOR_GEPP]: [],
          [ENGINE_ESTINANT_LOCATOR_GEPP]: [],
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
            importedEstinant.fileImport.isInternal,
        );

      const programName = typeScriptFile.inMemoryFileName.kebabCase;

      const outputEstinantList =
        importedEstinantList.map<EngineEstinantLocatorOdeshin>(
          (importedEstinant) => ({
            zorn: getEngineEstinantIdentifier(
              programName,
              importedEstinant.identifier,
            ),
            grition: {
              programName,
              estinantName: importedEstinant.identifier,
              estinantFilePath: importedEstinant.fileImport.sourcePath,
              exportedIdentifierName: importedEstinant.identifier,
            },
          }),
        );

      const outputProgram: EngineProgramLocatorOdeshin = {
        zorn: leftInput.zorn,
        grition: {
          programName,
          filePath: typeScriptFile.filePath,
          estinantIdentifierList: outputEstinantList.map(({ zorn }) => zorn),
        },
      };

      return {
        [ENGINE_PROGRAM_LOCATOR_GEPP]: [outputProgram],
        [ENGINE_ESTINANT_LOCATOR_GEPP]: outputEstinantList,
      };
    },
  )
  .assemble();
