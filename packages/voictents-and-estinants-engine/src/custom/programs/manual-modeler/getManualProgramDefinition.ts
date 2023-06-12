import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { getTextDigest } from '../../../utilities/getTextDigest';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  EngineProgram2Voque,
  ENGINE_PROGRAM_2_GEPP,
  EngineProgram2,
} from '../../programmable-units/engine-program/engineProgram2';
import {
  CommentedProgramBodyDeclarationListVoque,
  COMMENTED_PROGRAM_BODY_DECLARATION_LIST_GEPP,
  CommentedProgramBodyDeclaration,
} from '../../programmable-units/type-script-file/commentedProgramBodyDeclarationList';
import {
  ParsedTypeScriptFileVoque,
  PARSED_TYPE_SCRIPT_FILE_GEPP,
} from '../../programmable-units/type-script-file/parsedTypeScriptFile';
import {
  TypeScriptFileVoque,
  TYPE_SCRIPT_FILE_GEPP,
} from '../../programmable-units/type-script-file/typeScriptFile';
import { INPUT_FILE_PATH_GEPP, InputFilePathVoque } from './inputFilePath';
import {
  IdentifiableTypeScriptTypeReference,
  isIdentifiableTypeScriptTypeReference,
} from '../../../utilities/type-script-ast/isIdentifiableTypeScriptTypeReference';
import {
  EngineEstinant2,
  EstinantInput2,
  EstinantOutput2,
} from '../../programmable-units/engine-program/engineEstinant2';
import { isTypeScriptTypeParameterInstantiationWithParameterTuple } from '../../../utilities/type-script-ast/isTypeScriptTypeParameterInstantiation';
import { EngineEstinantLocator2 } from '../../programmable-units/engine-program/engineEstinantLocator2';
import { VoictentLocator } from '../../programmable-units/engine-program/engineProgramLocator2';
import { isNotNull } from '../../../utilities/isNotNull';
import { EngineVoque } from '../../programmable-units/engine-program/engineVoque';

/**
 * Builds a program model by parsing the AST of TypeScript pseudo-code that
 * represents a program outline
 */
export const getManualProgramDefinition = buildEstinant({
  name: 'getManualProgramDefinition',
})
  .fromHubblepup2<InputFilePathVoque>({
    gepp: INPUT_FILE_PATH_GEPP,
  })
  .andFromHubblepupTuple2<TypeScriptFileVoque, [string]>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
    framate: (inputFilePath) => {
      return [inputFilePath.hubblepup];
    },
    croard: (parsedFile) => {
      return parsedFile.hubblepup.filePath;
    },
  })
  .andFromHubblepupTuple2<ParsedTypeScriptFileVoque, [string]>({
    gepp: PARSED_TYPE_SCRIPT_FILE_GEPP,
    framate: (inputFilePath) => {
      return [inputFilePath.hubblepup];
    },
    croard: (parsedFile) => {
      return parsedFile.hubblepup.filePath;
    },
  })
  .andFromHubblepupTuple2<CommentedProgramBodyDeclarationListVoque, [string]>({
    gepp: COMMENTED_PROGRAM_BODY_DECLARATION_LIST_GEPP,
    framate: (inputFilePath) => {
      return [inputFilePath.hubblepup];
    },
    croard: (list) => {
      return list.hubblepup.zorn;
    },
  })
  .toHubblepup2<EngineProgram2Voque>({
    gepp: ENGINE_PROGRAM_2_GEPP,
  })
  .onPinbe(
    (
      inputFilePath,
      [typeScriptFile],
      [parsedTypeScriptFile],
      [{ list: commentedProgramBodyDeclarationList }],
    ) => {
      const declarationById = new Map(
        commentedProgramBodyDeclarationList
          .map((declaration) => {
            if (declaration.identifiableNode === null) {
              return null;
            }

            return [declaration.identifiableNode.id.name, declaration] as const;
          })
          .filter(isNotNull),
      );

      const programName = typeScriptFile.inMemoryFileName.kebabCase;
      const firstCommentNode = (parsedTypeScriptFile.program.comments ?? [])[0];
      const programDescription = firstCommentNode?.value ?? '';

      type TransformDeclaration = CommentedProgramBodyDeclaration & {
        identifiableNode: TSESTree.TSTypeAliasDeclaration & {
          typeAnnotation: TSESTree.TSTypeReference;
        };
      };

      const engineEstinantList = commentedProgramBodyDeclarationList
        .filter((declaration): declaration is TransformDeclaration => {
          return (
            declaration.identifiableNode?.type ===
              AST_NODE_TYPES.TSTypeAliasDeclaration &&
            isIdentifiableTypeScriptTypeReference(
              declaration.identifiableNode.typeAnnotation,
            ) &&
            declaration.identifiableNode.typeAnnotation.typeName.name ===
              'Transform'
          );
        })
        .map((declaration) => {
          const estinantName = declaration.identifiableNode.id.name;

          const { inputParameterNode, outputParameterNode } =
            isTypeScriptTypeParameterInstantiationWithParameterTuple(
              declaration.identifiableNode.typeAnnotation.typeParameters,
              [AST_NODE_TYPES.TSTupleType, AST_NODE_TYPES.TSTupleType],
            )
              ? {
                  inputParameterNode:
                    declaration.identifiableNode.typeAnnotation.typeParameters
                      .params[0],
                  outputParameterNode:
                    declaration.identifiableNode.typeAnnotation.typeParameters
                      .params[1],
                }
              : {
                  inputParameterNode: null,
                  outputParameterNode: null,
                };

          type TransformInputOutputCouple = TSESTree.TSTupleType & {
            elementTypes: [
              TSESTree.TypeNode,
              IdentifiableTypeScriptTypeReference,
            ];
          };

          const getTransformConnectionIdentifierList = (
            list: TSESTree.TypeNode[] | undefined,
          ): string[] => {
            return (list ?? [])
              .filter(
                (
                  inputOrOutputParameter: TSESTree.TypeNode,
                ): inputOrOutputParameter is TransformInputOutputCouple => {
                  return (
                    inputOrOutputParameter.type ===
                      AST_NODE_TYPES.TSTupleType &&
                    isIdentifiableTypeScriptTypeReference(
                      inputOrOutputParameter.elementTypes[1],
                    )
                  );
                },
              )
              .map((inputParameterCouple) => {
                return inputParameterCouple.elementTypes[1].typeName.name;
              });
          };

          const inputIdentifierNameList = getTransformConnectionIdentifierList(
            inputParameterNode?.elementTypes,
          );

          const outputIdentifierNameList = getTransformConnectionIdentifierList(
            outputParameterNode?.elementTypes,
          );

          const inputList = inputIdentifierNameList.map(
            (voictentName, index) => {
              const input: EstinantInput2 = {
                id: getTextDigest(`${estinantName}:input:${index}`),
                voictentName,
                isInput: true,
                index,
              };

              return input;
            },
          );

          const outputList = outputIdentifierNameList.map(
            (voictentName, index) => {
              const output: EstinantOutput2 = {
                id: getTextDigest(`${estinantName}:output:${index}`),
                voictentName,
                isInput: false,
                index: null,
              };

              return output;
            },
          );

          const engineEstinant: EngineEstinant2 = {
            zorn: '',
            id: getTextDigest(estinantName),
            estinantName,
            filePath: '',
            identifierName: estinantName,
            commentText: declaration.commentText ?? '',
            inputList,
            outputList,
            // TODO: this implies we need to separate some concerns somewhere
            locator: null as unknown as EngineEstinantLocator2,
          };

          return engineEstinant;
        });

      const voictentNameSet: Set<string> = new Set(
        engineEstinantList.flatMap((engineEstinant) => {
          return [
            ...engineEstinant.inputList.map((input) => input.voictentName),
            ...engineEstinant.outputList.map((output) => output.voictentName),
          ];
        }),
      );

      const voictentLocatorList = [...voictentNameSet].map((voictentName) => {
        const declaration = declarationById.get(voictentName);

        const locator: VoictentLocator = {
          name: voictentName,
          hasInitialInput:
            declaration?.commentText?.includes('--initial') ?? false,
        };

        return locator;
      });

      const voqueList = [...voictentNameSet].map((voictentName) => {
        const declaration = declarationById.get(voictentName);

        const engineVoque: EngineVoque = {
          zorn: '',
          id: getTextDigest(voictentName),
          displayName: voictentName,
          filePath: '',
          identifierName: voictentName,
          commentText: declaration?.commentText ?? '',
        };

        return engineVoque;
      });

      const engineProgram: EngineProgram2 = {
        zorn: typeScriptFile.filePath,
        id: getTextDigest(programName),
        filePath: typeScriptFile.filePath,
        programName,
        description: programDescription,
        estinantList: engineEstinantList,
        voictentLocatorList,
        voqueList,
      };

      return engineProgram;
    },
  )
  .assemble();
