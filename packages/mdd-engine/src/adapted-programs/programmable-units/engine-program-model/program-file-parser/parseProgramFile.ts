import { IdentifiableItemId } from '../../../../adapter/identifiable-item/identifiableItem';
import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { LocatableError } from '../../error/locatableError';
import {
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
} from '../../error/programError';
import { FileSourceInstance } from '../../linting/source/fileSource';
import {
  FileCommentedProgramBodyDeclarationGroupStreamMetatype,
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
} from '../../type-script-file/fileCommentedProgramBodyDeclarationGroup';
import {
  TypeScriptFileImportListStreamMetatype,
  TYPE_SCRIPT_FILE_IMPORT_LIST_COLLECTION_ID,
} from '../../type-script-file/typeScriptFileImportList';
import {
  COLLECTION_DEFINITION_LOCATOR_COLLECTION_ID,
  CollectionDefinitionLocatorStreamMetatype,
} from '../collection-definition/collectionDefinitionLocator';
import {
  COLLECTION_INSTANCE_SKELETON_COLLECTION_ID,
  CollectionInstanceSkeletonStreamMetatype,
} from '../collection-instance/collectionInstanceSkeleton';
import { findEngineCallExpression } from '../engine-call-expression/findEngineCallExpression';
import { EngineFunctionConfigurationTypeName } from '../engineFunctionConfiguration';
import {
  ITEM_DEFINITION_LOCATOR_COLLECTION_ID,
  ItemDefinitionLocatorStreamMetatype,
} from '../item-definition/itemDefinitionLocator';
import {
  PROGRAM_LOCATOR_COLLECTION_ID,
  ProgramLocatorStreamMetatype,
} from '../program/programLocator';
import {
  PROGRAM_SKELETON_COLLECTION_ID,
  ProgramSkeletonStreamMetatype,
} from '../program/programSkeleton';
import {
  PROGRAMMED_TRANSFORM_LOCATOR_COLLECTION_ID,
  ProgrammedTransformLocatorStreamMetatype,
} from '../programmed-transform/programmedTransformLocator';
import { parseAdaptedProgramFile } from './adapted-program-parser/parseAdaptedProgramFile';

/**
 * The ProgrammedTransform that can get skeletons and locators from a program
 * file. It delegates to an adapted parser, and a core parseer
 */
export const parseProgramFile = buildProgrammedTransform({
  name: 'parseProgramFile',
})
  .fromItem2<ProgramLocatorStreamMetatype>({
    collectionId: PROGRAM_LOCATOR_COLLECTION_ID,
  })
  .andFromItemTuple2<
    FileCommentedProgramBodyDeclarationGroupStreamMetatype,
    [IdentifiableItemId]
  >({
    collectionId: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
    getRightKeyTuple: (leftInput) => [
      leftInput.item.programFile.filePath.serialized,
    ],
    getRightKey: (rightInput) => rightInput.item.id,
  })
  .andFromItemTuple2<
    TypeScriptFileImportListStreamMetatype,
    [IdentifiableItemId]
  >({
    collectionId: TYPE_SCRIPT_FILE_IMPORT_LIST_COLLECTION_ID,
    getRightKeyTuple: (leftInput) => [
      leftInput.item.programFile.filePath.serialized,
    ],
    getRightKey: (rightInput) => rightInput.item.id,
  })
  .toItemTuple2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .toItemTuple2<CollectionDefinitionLocatorStreamMetatype>({
    collectionId: COLLECTION_DEFINITION_LOCATOR_COLLECTION_ID,
  })
  .toItemTuple2<ItemDefinitionLocatorStreamMetatype>({
    collectionId: ITEM_DEFINITION_LOCATOR_COLLECTION_ID,
  })
  .toItemTuple2<CollectionInstanceSkeletonStreamMetatype>({
    collectionId: COLLECTION_INSTANCE_SKELETON_COLLECTION_ID,
  })
  .toItemTuple2<ProgrammedTransformLocatorStreamMetatype>({
    collectionId: PROGRAMMED_TRANSFORM_LOCATOR_COLLECTION_ID,
  })
  .toItemTuple2<ProgramSkeletonStreamMetatype>({
    collectionId: PROGRAM_SKELETON_COLLECTION_ID,
  })
  .onTransform(
    (
      // keep multiline
      programLocator,
      [bodyStatementGroup],
      [fileImportGroup],
    ) => {
      const result = findEngineCallExpression({
        programLocator,
        commentedProgramBodyStatementList: bodyStatementGroup.list,
      });

      if (result === null) {
        return {
          [COLLECTION_DEFINITION_LOCATOR_COLLECTION_ID]: [],
          [ITEM_DEFINITION_LOCATOR_COLLECTION_ID]: [],
          [COLLECTION_INSTANCE_SKELETON_COLLECTION_ID]: [],
          [PROGRAMMED_TRANSFORM_LOCATOR_COLLECTION_ID]: [],
          [PROGRAM_ERROR_COLLECTION_ID]: [
            new LocatableError({
              message: 'Unable to find engine call expression',
              reporterSource: new FileSourceInstance({
                absoluteFilePath: __filename,
              }),
              errorSource: programLocator.programFile.source,
              context: null,
            }),
          ],
          [PROGRAM_SKELETON_COLLECTION_ID]: [],
        };
      }

      const { engineCallExpression, engineCallParameterList } = result;

      switch (programLocator.configurationTypeName) {
        case EngineFunctionConfigurationTypeName.Core2: {
          // parseCoreProgramFile({
          //   programLocator,
          //   engineCallExpression,
          //   engineCallParameterList,
          // });
          return {
            [COLLECTION_DEFINITION_LOCATOR_COLLECTION_ID]: [],
            [ITEM_DEFINITION_LOCATOR_COLLECTION_ID]: [],
            [COLLECTION_INSTANCE_SKELETON_COLLECTION_ID]: [],
            [PROGRAMMED_TRANSFORM_LOCATOR_COLLECTION_ID]: [],
            [PROGRAM_ERROR_COLLECTION_ID]: [],
            [PROGRAM_SKELETON_COLLECTION_ID]: [],
          };
        }
        case EngineFunctionConfigurationTypeName.Adapted: {
          const {
            collectionDefinitionLocatorList,
            itemDefinitionLocatorList,
            collectionInstanceSkeletonList,
            errorList,
            programmedTransformLocatorList,
            programSkeleton,
          } = parseAdaptedProgramFile({
            programLocator,
            fileImportGroup,
            engineCallExpression,
            engineCallParameterList,
            bodyStatementGroup,
          });
          return {
            [COLLECTION_DEFINITION_LOCATOR_COLLECTION_ID]:
              collectionDefinitionLocatorList,
            [ITEM_DEFINITION_LOCATOR_COLLECTION_ID]: itemDefinitionLocatorList,
            [COLLECTION_INSTANCE_SKELETON_COLLECTION_ID]:
              collectionInstanceSkeletonList,
            [PROGRAM_ERROR_COLLECTION_ID]: errorList,
            [PROGRAMMED_TRANSFORM_LOCATOR_COLLECTION_ID]:
              programmedTransformLocatorList,
            [PROGRAM_SKELETON_COLLECTION_ID]: [programSkeleton],
          };
        }
      }
    },
  )
  .assemble();
