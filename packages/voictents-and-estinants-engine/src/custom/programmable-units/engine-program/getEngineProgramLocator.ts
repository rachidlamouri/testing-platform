import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_PROGRAM_FILE_GEPP,
  EngineProgramFileVoictent,
} from '../type-script-file-relationships/engineProgramFile';
import {
  PARSED_TYPE_SCRIPT_FILE_GEPP,
  ParsedTypeScriptFileVoictent,
} from '../type-script-file/parsedTypeScriptFile';
import {
  IdentifiableProperty,
  ObjectExpressionWithIdentifierProperties,
  isObjectExpressionWithIdentifierProperties,
} from '../../../utilities/type-script-ast/isObjectLiteralExpressionWithIdentifierProperties';
import {
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImport,
  TypeScriptFileImportListVoictent,
} from '../type-script-file/typeScriptFileImportList';
import { isArrayExpressionOfIdentifiers } from '../../../utilities/type-script-ast/isArrayExpressionOfIdentifiers';
import { isSpecificExpressionStatement } from '../../../utilities/type-script-ast/isSpecificExpressionStatement';
import {
  EngineFunctionConfigurationVoictent,
  ENGINE_FUNCTION_CONFIGURATION_GEPP,
} from './engineFunctionConfiguration';
import {
  ENGINE_PROGRAM_LOCATOR_2_GEPP,
  EngineProgramLocator2,
  EngineProgramLocator2Voictent,
} from './engineProgramLocator2';
import { EngineEstinantLocator2 } from './engineEstinantLocator2';

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
const geppToVoictentName = (geppIdentifier: string): string => {
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
  .andFromGritionTuple<ParsedTypeScriptFileVoictent, [string]>({
    gepp: PARSED_TYPE_SCRIPT_FILE_GEPP,
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
  .toGrition<EngineProgramLocator2Voictent>({
    gepp: ENGINE_PROGRAM_LOCATOR_2_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe(
    (
      engineProgramFile,
      [parsedFile],
      [importList],
      [engineFunctionConfiguration],
    ) => {
      const engineCallExpressionStatement = parsedFile.program.body.find(
        (statement): statement is EngineCallExpressionStatement =>
          isEngineCallExpressionStatement(
            statement,
            engineFunctionConfiguration.exportedIdentifier,
          ),
      );

      const engineCallExpressionPropertyList: IdentifiableProperty[] =
        engineCallExpressionStatement?.expression.arguments[0].properties ?? [];

      const initialVoictentByGeppProperty =
        engineCallExpressionPropertyList.find(
          (property) =>
            property.key.name ===
            engineFunctionConfiguration.initialVoictentByGeppKeyIdentifierName,
        );

      const initialVoictentByGeppValueNode =
        initialVoictentByGeppProperty?.value;

      const initialVoictentGeppIdentifierList =
        isObjectExpressionWithIdentifierProperties(
          initialVoictentByGeppValueNode,
        )
          ? initialVoictentByGeppValueNode.properties.map(
              (property: IdentifiableProperty) => property.key.name,
            )
          : [];

      const initialVoictentNameList =
        initialVoictentGeppIdentifierList.map(geppToVoictentName);

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

      const engineEstinantLocatorList = estinantIdentifierList
        .map((identifierName) => {
          const fileImport =
            fileImportsByImportedIdentifier.get(identifierName);

          if (fileImport === undefined) {
            return null;
          }

          return {
            identifierName,
            filePath: fileImport.sourcePath,
          };
        })
        .filter(
          (
            engineEstinantLocator,
          ): engineEstinantLocator is EngineEstinantLocator2 =>
            engineEstinantLocator !== null,
        );

      const programName = engineProgramFile.inMemoryFileName.kebabCase;

      const engineProgramLocator: EngineProgramLocator2 = {
        programName,
        filePath: engineProgramFile.filePath,
        initialVoictentNameList,
        engineEstinantLocatorList,
      };

      return engineProgramLocator;
    },
  )
  .assemble();
