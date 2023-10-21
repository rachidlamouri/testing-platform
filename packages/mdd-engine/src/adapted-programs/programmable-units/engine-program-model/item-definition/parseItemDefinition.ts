import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { LocatableError } from '../../error/locatableError';
import {
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
} from '../../error/programError';
import { FileSourceInstance } from '../../linting/source/fileSource';
import { CategorizedCommentTypeName } from '../../type-script-file/comment/categorized/categorizedCommentTypeName';
import {
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
  FileCommentedProgramBodyDeclarationGroupStreamMetatype,
} from '../../type-script-file/fileCommentedProgramBodyDeclarationGroup';
import {
  ITEM_DEFINITION_LOCATOR_COLLECTION_ID,
  ItemDefinitionLocatorStreamMetatype,
} from './itemDefinitionLocator';
import {
  ITEM_DEFINITION_MODEL_COLLECTION_ID,
  ItemDefinitionModel,
  ItemDefinitionModelStreamMetatype,
} from './itemDefinitionModel';

/**
 * Parses the type or class definition of a streamable item
 */
export const parseItemDefinition = buildProgrammedTransform({
  name: 'parseItemDefinition',
})
  .fromItem2<ItemDefinitionLocatorStreamMetatype>({
    collectionId: ITEM_DEFINITION_LOCATOR_COLLECTION_ID,
  })
  .andFromItemTuple2<
    FileCommentedProgramBodyDeclarationGroupStreamMetatype,
    [string]
  >({
    collectionId: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
    getRightKeyTuple: (locator) => {
      return [locator.item.filePath];
    },
    getRightKey: (file) => {
      return file.item.filePathObject.serialized;
    },
  })
  .toItem2<ItemDefinitionModelStreamMetatype>({
    collectionId: ITEM_DEFINITION_MODEL_COLLECTION_ID,
  })
  .toItemTuple2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .onTransform((itemDefinitionLocator, [declarationGroup]) => {
    const itemDeclaration = declarationGroup.declarationByIdentifier.get(
      itemDefinitionLocator.identifierName,
    );

    const missingDeclarationError =
      itemDeclaration === undefined
        ? [
            new LocatableError({
              message: `Unable to locate item "${itemDefinitionLocator.identifierName}"`,
              reporterSource: new FileSourceInstance({
                absoluteFilePath: __filename,
              }),
              errorSource: new FileSourceInstance({
                filePath: itemDefinitionLocator.filePath,
              }),
              context: {
                itemDefinitionLocator,
                declarationGroup,
              },
            }),
          ]
        : [];

    const description =
      itemDeclaration?.comment?.typeName ===
      CategorizedCommentTypeName.Descriptive
        ? itemDeclaration.comment.description
        : null;

    const missingDescriptionError =
      description === null
        ? [
            new LocatableError({
              message: `Item "${itemDefinitionLocator.identifierName}" is missing a description`,
              reporterSource: new FileSourceInstance({
                absoluteFilePath: __filename,
              }),
              errorSource: new FileSourceInstance({
                filePath: itemDefinitionLocator.filePath,
              }),
              context: {
                itemDefinitionLocator,
                declarationGroup,
              },
            }),
          ]
        : [];

    return {
      [ITEM_DEFINITION_MODEL_COLLECTION_ID]: new ItemDefinitionModel({
        locator: itemDefinitionLocator,
        name:
          itemDeclaration?.identifiableNode.id.name ??
          itemDefinitionLocator.identifierName,
        description: description ?? '',
      }),
      [PROGRAM_ERROR_COLLECTION_ID]: [
        ...missingDeclarationError,
        ...missingDescriptionError,
      ],
    };
  })
  .assemble();
