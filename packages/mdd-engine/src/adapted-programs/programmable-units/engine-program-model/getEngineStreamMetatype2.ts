import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { IdentifiableItemId } from '../../../adapter/identifiable-item/identifiableItem';
import {
  GenericProgramErrorStreamMetatype,
  GenericProgramErrorEgg,
  PROGRAM_ERROR_COLLECTION_ID,
  ProgramErrorElementLocatorTypeName,
  ReportingProgrammedTransformLocator,
} from '../error/programError';
import {
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
  FileCommentedProgramBodyDeclarationGroupStreamMetatype,
} from '../type-script-file/fileCommentedProgramBodyDeclarationGroup';
import {
  ENGINE_STREAM_METATYPE_2_COLLECTION_ID,
  EngineStreamMetatype2Instance,
  EngineStreamMetatype2StreamMetatype,
} from './engineStreamMetatype2';
import {
  ENGINE_STREAM_METATYPE_LOCATOR_2_COLLECTION_ID,
  EngineStreamMetatypeLocator2StreamMetatype,
} from './engineStreamMetatypeLocator2';

const PROGRAMMED_TRANSFORM_NAME = 'getEngineStreamMetatype2' as const;
type ProgrammedTransformName = typeof PROGRAMMED_TRANSFORM_NAME;
type ReportingLocator =
  ReportingProgrammedTransformLocator<ProgrammedTransformName>;
const reporterLocator: ReportingLocator = {
  typeName:
    ProgramErrorElementLocatorTypeName.ReportingProgrammedTransformLocator,
  name: PROGRAMMED_TRANSFORM_NAME,
  filePath: __filename,
};

/**
 * Associates a comment with a voque definition
 *
 * @readableName getStreamMetatypeModel
 *
 * @canonicalDeclaration
 */
export const getEngineStreamMetatype2 = buildProgrammedTransform({
  name: PROGRAMMED_TRANSFORM_NAME,
})
  .fromItem2<EngineStreamMetatypeLocator2StreamMetatype>({
    collectionId: ENGINE_STREAM_METATYPE_LOCATOR_2_COLLECTION_ID,
  })
  .andFromItemTuple2<
    FileCommentedProgramBodyDeclarationGroupStreamMetatype,
    [IdentifiableItemId]
  >({
    collectionId: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
    getRightKeyTuple: (left) => [left.item.filePath],
    getRightKey: (right) => right.item.filePath,
  })
  .toItem2<EngineStreamMetatype2StreamMetatype>({
    collectionId: ENGINE_STREAM_METATYPE_2_COLLECTION_ID,
  })
  .toItemTuple2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .onTransform((streamMetatypeLocator, [{ declarationByIdentifier }]) => {
    // TODO: move these naming conventions elsewhere
    const itemIdentifierName = streamMetatypeLocator.identifierName
      .replace(/StreamMetatype$/, '')
      .replace(/^Generic/, '');

    const itemIdentifierStreamableName = `${itemIdentifierName}Pelie`;

    const itemDeclaration =
      declarationByIdentifier.get(itemIdentifierName) ??
      declarationByIdentifier.get(itemIdentifierStreamableName);

    const commentText = itemDeclaration?.commentText ?? null;

    // TODO: handle core voques
    const parallelErrorList: GenericProgramErrorEgg[] =
      streamMetatypeLocator.isCoreStreamMetatype || commentText !== null
        ? []
        : [
            {
              name: 'missing-hubblepup-comment',
              error: new Error(
                'Voque definitions must have a corresponding hubblepup definition with a comment. The hubblepup type may have a "Pelie" suffix',
              ),
              reporterLocator,
              sourceLocator: {
                typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
                filePath: streamMetatypeLocator.filePath,
              },
              context: {
                itemIdentifierName,
                streamMetatypeLocator,
              },
            },
          ];

    return {
      [ENGINE_STREAM_METATYPE_2_COLLECTION_ID]:
        new EngineStreamMetatype2Instance({
          filePath: streamMetatypeLocator.filePath,
          identifierName: streamMetatypeLocator.identifierName,
          commentText: commentText ?? '',
          locator: streamMetatypeLocator,
        }),
      [PROGRAM_ERROR_COLLECTION_ID]: parallelErrorList,
    };
  })
  .assemble();
