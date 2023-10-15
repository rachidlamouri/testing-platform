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
  EngineVoque2Instance,
  EngineStreamMetatype2StreamMetatype,
} from './engineVoque2';
import {
  ENGINE_VOQUE_LOCATOR_2_GEPP,
  EngineVoqueLocator2Voque,
} from './engineVoqueLocator2';

const ESTINANT_NAME = 'getEngineVoque2' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingProgrammedTransformLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName:
    ProgramErrorElementLocatorTypeName.ReportingProgrammedTransformLocator,
  name: ESTINANT_NAME,
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
  name: ESTINANT_NAME,
})
  .fromItem2<EngineVoqueLocator2Voque>({
    collectionId: ENGINE_VOQUE_LOCATOR_2_GEPP,
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
  .onTransform((voqueLocator, [{ declarationByIdentifier }]) => {
    // TODO: move these naming conventions elsewhere
    const hubblepupIdentifierName = voqueLocator.identifierName
      .replace(/Voque$/, '')
      .replace(/^Generic/, '');

    const hubblepupPelieIdentifierName = `${hubblepupIdentifierName}Pelie`;

    const hubblepupDeclaration =
      declarationByIdentifier.get(hubblepupIdentifierName) ??
      declarationByIdentifier.get(hubblepupPelieIdentifierName);

    const commentText = hubblepupDeclaration?.commentText ?? null;

    // TODO: handle core voques
    const parallelErrorList: GenericProgramErrorEgg[] =
      voqueLocator.isCoreVoque || commentText !== null
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
                filePath: voqueLocator.filePath,
              },
              context: {
                hubblepupIdentifierName,
                voqueLocator,
              },
            },
          ];

    return {
      [ENGINE_STREAM_METATYPE_2_COLLECTION_ID]: new EngineVoque2Instance({
        filePath: voqueLocator.filePath,
        identifierName: voqueLocator.identifierName,
        commentText: commentText ?? '',
        locator: voqueLocator,
      }),
      [PROGRAM_ERROR_COLLECTION_ID]: parallelErrorList,
    };
  })
  .assemble();
