import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { IdentifiableItemId } from '../../../../adapter/identifiable-item/identifiableItem';
import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { flattenCallExpressionChain } from '../../../../package-agnostic-utilities/type-script-ast/flattenCallExpressionChain';
import { IdentifiableCallExpression } from '../../../../package-agnostic-utilities/type-script-ast/isIdentifiableCallExpression';
import {
  IdentifiableTypeScriptTypeReference,
  isIdentifiableTypeScriptTypeReference,
} from '../../../../package-agnostic-utilities/type-script-ast/isIdentifiableTypeScriptTypeReference';
import { IdentifiableMemberExpressionCallExpression } from '../../../../package-agnostic-utilities/type-script-ast/isMemberExpressionCallExpression';
import {
  isObjectExpressionWithIdentifiableProperties,
  IdentifiableProperty,
} from '../../../../package-agnostic-utilities/type-script-ast/isObjectExpressionWithIdentifiableProperties';
import { isSpecificConstantTypeScriptAsExpression } from '../../../../package-agnostic-utilities/type-script-ast/isSpecificConstantTypeScriptAsExpression';
import {
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
} from '../../error/programError';
import { CommentedProgramBodyDeclaration } from '../../type-script-file/commentedProgramBodyDeclaration';
import {
  FileCommentedProgramBodyDeclarationGroupStreamMetatype,
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
} from '../../type-script-file/fileCommentedProgramBodyDeclarationGroup';
import {
  TypeScriptFileImportListStreamMetatype,
  TYPE_SCRIPT_FILE_IMPORT_LIST_COLLECTION_ID,
} from '../../type-script-file/typeScriptFileImportList';
import {
  PROGRAMMED_TRANSFORM_INPUT_SKELETON_COLLECTION_ID,
  ProgrammedTransformInputSkeleton,
  ProgrammedTransformInputSkeletonStreamMetatype,
} from '../programmed-transform/input/programmedTransformInputSkeleton';
import {
  PROGRAMMED_TRANSFORM_OUTPUT_SKELETON_COLLECTION_ID,
  ProgrammedTransformOutputSkeleton,
  ProgrammedTransformOutputSkeletonStreamMetatype,
} from '../programmed-transform/output/programmedTransformOutputSkeleton';
import {
  PROGRAMMED_TRANSFORM_LOCATOR_COLLECTION_ID,
  ProgrammedTransformLocatorStreamMetatype,
} from '../programmed-transform/programmedTransformLocator';
import {
  PROGRAMMED_TRANSFORM_SKELETON_COLLECTION_ID,
  ProgrammedTransformSkeleton,
  ProgrammedTransformSkeletonStreamMetatype,
} from '../programmed-transform/programmedTransformSkeleton';
import { LocatableError } from '../../error/locatableError';
import { FileSourceInstance } from '../../linting/source/fileSource';
import { isCallExpression } from '../../../../package-agnostic-utilities/type-script-ast/isCallExpression';
import {
  ITEM_DEFINITION_LOCATOR_COLLECTION_ID,
  ItemDefinitionLocator,
  ItemDefinitionLocatorStreamMetatype,
} from '../item-definition/itemDefinitionLocator';
import { StreamMetatypeLocator } from '../stream-metatype/streamMetatypeLocator';
import { isStringLiteral } from '../../../../package-agnostic-utilities/type-script-ast/isStringLiteral';
import { isIdentifier } from '../../../../package-agnostic-utilities/type-script-ast/isIdentifier';
import { splitList2 } from '../../../../package-agnostic-utilities/array/splitList2';
import { CategorizedCommentTypeName } from '../../type-script-file/comment/categorized/categorizedCommentTypeName';

const reporterSource = new FileSourceInstance({
  absoluteFilePath: __filename,
});

/**
 * Parses a programmed transform declaration by analyzing its name, description
 * and input and output stream metatypes.
 */
export const parseProgrammedTransform = buildProgrammedTransform({
  name: 'parseProgrammedTransform',
})
  .fromItem2<ProgrammedTransformLocatorStreamMetatype>({
    collectionId: PROGRAMMED_TRANSFORM_LOCATOR_COLLECTION_ID,
  })
  .andFromItemTuple2<
    FileCommentedProgramBodyDeclarationGroupStreamMetatype,
    [IdentifiableItemId]
  >({
    collectionId: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
    getRightKeyTuple: (leftInput) => {
      return [leftInput.item.filePath];
    },
    getRightKey: (rightInput) => rightInput.item.filePathObject.serialized,
  })
  .andFromItemTuple2<
    TypeScriptFileImportListStreamMetatype,
    [IdentifiableItemId]
  >({
    collectionId: TYPE_SCRIPT_FILE_IMPORT_LIST_COLLECTION_ID,
    getRightKeyTuple: (leftInput) => {
      return [leftInput.item.filePath];
    },
    getRightKey: (rightInput) => rightInput.item.filePath,
  })
  .toItemTuple2<ProgrammedTransformSkeletonStreamMetatype>({
    collectionId: PROGRAMMED_TRANSFORM_SKELETON_COLLECTION_ID,
  })
  .toItemTuple2<ProgrammedTransformInputSkeletonStreamMetatype>({
    collectionId: PROGRAMMED_TRANSFORM_INPUT_SKELETON_COLLECTION_ID,
  })
  .toItemTuple2<ProgrammedTransformOutputSkeletonStreamMetatype>({
    collectionId: PROGRAMMED_TRANSFORM_OUTPUT_SKELETON_COLLECTION_ID,
  })
  .toItemTuple2<ItemDefinitionLocatorStreamMetatype>({
    collectionId: ITEM_DEFINITION_LOCATOR_COLLECTION_ID,
  })
  .toItemTuple2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .onTransform(
    (programmedTransformLocator, [bodyStatementGroup], [importGroup]) => {
      const programmedTransformSource = new FileSourceInstance({
        filePath: programmedTransformLocator.filePath,
      });

      const programmedTransformDeclaration =
        bodyStatementGroup.declarationByIdentifier.get(
          programmedTransformLocator.identifierName,
        );

      const missingDeclarationError =
        programmedTransformDeclaration === undefined
          ? [
              new LocatableError({
                message: 'Unable to locator ProgrammedTransform',
                reporterSource,
                errorSource: programmedTransformSource,
                context: {
                  programmedTransformLocator,
                  bodyStatementGroup,
                },
              }),
            ]
          : [];

      const initExpression =
        programmedTransformDeclaration?.identifiableNode?.type ===
        AST_NODE_TYPES.VariableDeclarator
          ? programmedTransformDeclaration.identifiableNode.init
          : null;

      const callExpression = isCallExpression(initExpression)
        ? initExpression
        : null;

      const missingCallExpressionError =
        !missingDeclarationError && callExpression === null
          ? [
              new LocatableError({
                message:
                  'Unable to find ProgrammedTransform builder callExpression',
                reporterSource,
                errorSource: new FileSourceInstance({
                  filePath: programmedTransformLocator.filePath,
                }),
                context: {
                  programmedTransformLocator,
                  bodyStatementGroup,
                },
              }),
            ]
          : [];

      const flattenedCallExpressionAndErrorList =
        callExpression !== null
          ? flattenCallExpressionChain(callExpression)
          : [];

      const [flattenedErrorList, flattenedCallExpressionList] = splitList2({
        list: flattenedCallExpressionAndErrorList,
        isElementA: (element): element is Error => element instanceof Error,
      });

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
        flattenedCallExpressionList.map<ParsedExpression1>(
          (expression, index) => {
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
          },
        );
      const invalidChainStartError =
        parsedFlattenedCallExpressionList[0].functionName !==
        buildProgrammedTransform.name
          ? [
              new LocatableError({
                message: `Call expression chain does not start with "${buildProgrammedTransform.name}"`,
                reporterSource,
                errorSource: programmedTransformSource,
                context: null,
              }),
            ]
          : [];

      const invalidChainEndError =
        parsedFlattenedCallExpressionList[
          parsedFlattenedCallExpressionList.length - 1
        ]?.functionName !== 'assemble'
          ? [
              new LocatableError({
                message:
                  'Programmed transform builder call expression chain does not end in "assemble"',
                reporterSource,
                errorSource: programmedTransformSource,
                context: null,
              }),
            ]
          : [];

      const inputOutputExpressionList =
        parsedFlattenedCallExpressionList.filter(
          (parsedExpression) =>
            // TODO: tie these function names back to the programmed transform builder function names
            !['buildProgrammedTransform', 'onTransform', 'assemble'].includes(
              parsedExpression.functionName,
            ),
        );

      const [parsedExpressionList, unparseableExpressionList] = splitList2({
        list: inputOutputExpressionList,
        isElementA: (element): element is ParsedExpression2 =>
          element.isInput !== null &&
          isIdentifiableTypeScriptTypeReference(element.typeNode),
      });

      const unparseableExpressionErrorList = unparseableExpressionList.map(
        (unparseableExpression) => {
          return new LocatableError({
            message: `Programmed transform builder chain expression "${unparseableExpression.functionName}" is missing a type parameter`,
            reporterSource,
            errorSource: programmedTransformSource,
            context: {
              unparseableExpression,
            },
          });
        },
      );

      const inputExpressionList = parsedExpressionList.filter(
        (parsedExpression) => parsedExpression.isInput,
      );
      const outputExpressionList = parsedExpressionList.filter(
        (parsedExpression) => !parsedExpression.isInput,
      );

      const [inputSkeletonErrorList, inputSkeletonList] = splitList2({
        list: inputExpressionList.map((input, index) => {
          const streamMetatypeName = input.typeNode.typeName.name;

          const streamMetatypeImport =
            importGroup.fileImportByIdentifier.get(streamMetatypeName);
          if (streamMetatypeImport === undefined) {
            return new LocatableError({
              message: `Unable to find source of stream metatype: ${streamMetatypeName}`,
              reporterSource,
              errorSource: programmedTransformSource,
              context: {
                inputIndex: index,
              },
            });
          }

          const streamMetatypeLocator = new StreamMetatypeLocator({
            filePath: streamMetatypeImport.sourcePath,
            identifierName: streamMetatypeName,
          });

          return new ProgrammedTransformInputSkeleton({
            programmedTransformLocator,
            index,
            itemDefinitionLocator:
              ItemDefinitionLocator.fromStreamMetatypeLocator(
                streamMetatypeLocator,
              ),
          });
        }),
        isElementA: (element): element is LocatableError =>
          element instanceof LocatableError,
      });

      const [outputSkeletonErrorList, outputSkeletonList] = splitList2({
        list: outputExpressionList.map((input, index) => {
          const streamMetatypeName = input.typeNode.typeName.name;

          const streamMetatypeImport =
            importGroup.fileImportByIdentifier.get(streamMetatypeName);
          if (streamMetatypeImport === undefined) {
            return new LocatableError({
              message: `Unable to find source of stream metatype: ${streamMetatypeName}`,
              reporterSource,
              errorSource: programmedTransformSource,
              context: {
                outputIndex: index,
              },
            });
          }

          const streamMetatypeLocator = new StreamMetatypeLocator({
            filePath: streamMetatypeImport.sourcePath,
            identifierName: streamMetatypeName,
          });

          return new ProgrammedTransformOutputSkeleton({
            programmedTransformLocator,
            index,
            itemDefinitionLocator:
              ItemDefinitionLocator.fromStreamMetatypeLocator(
                streamMetatypeLocator,
              ),
          });
        }),
        isElementA: (element): element is LocatableError =>
          element instanceof LocatableError,
      });

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
        (declaration = bodyStatementGroup.declarationByIdentifier.get(
          programmedTransformNameProperty.value.name,
        )) !== undefined &&
        declaration.identifiableNode?.type ===
          AST_NODE_TYPES.VariableDeclarator &&
        isSpecificConstantTypeScriptAsExpression(
          declaration.identifiableNode.init,
          isStringLiteral,
        )
      ) {
        instantiatedName = declaration.identifiableNode.init.expression.value;
      } else {
        instantiatedName = null;
      }

      const description =
        programmedTransformDeclaration?.comment?.typeName ===
        CategorizedCommentTypeName.Descriptive
          ? programmedTransformDeclaration.comment.description
          : null;

      const unparseableNameError =
        instantiatedName === null
          ? [
              new LocatableError({
                message: 'Unable to parse programmed transform name',
                reporterSource,
                errorSource: programmedTransformSource,
                context: {
                  programmedTransformNameProperty,
                  declaration,
                },
              }),
            ]
          : [];

      const unparseableDescriptionError =
        description === null
          ? [
              new LocatableError({
                message: 'Unable to find programmed transform description',
                reporterSource,
                errorSource: programmedTransformSource,
                context: {
                  declaration,
                },
              }),
            ]
          : [];

      const subskeletonList = [...inputSkeletonList, ...outputSkeletonList];
      const itemDefinitionLocatorList = subskeletonList.map(
        (skeleton) => skeleton.itemDefinitionLocator,
      );

      return {
        [PROGRAMMED_TRANSFORM_SKELETON_COLLECTION_ID]: [
          new ProgrammedTransformSkeleton({
            locator: programmedTransformLocator,
            instantiatedName,
            description,
            inputSkeletonList,
            outputSkeletonList,
          }),
        ],
        [PROGRAMMED_TRANSFORM_INPUT_SKELETON_COLLECTION_ID]: inputSkeletonList,
        [PROGRAMMED_TRANSFORM_OUTPUT_SKELETON_COLLECTION_ID]:
          outputSkeletonList,
        [ITEM_DEFINITION_LOCATOR_COLLECTION_ID]: itemDefinitionLocatorList,
        [PROGRAM_ERROR_COLLECTION_ID]: [
          ...missingCallExpressionError,
          ...flattenedErrorList,
          ...invalidChainStartError,
          ...invalidChainEndError,
          ...unparseableExpressionErrorList,
          ...inputSkeletonErrorList,
          ...outputSkeletonErrorList,
          ...unparseableNameError,
          ...unparseableDescriptionError,
        ],
      };
    },
  )
  .assemble();
