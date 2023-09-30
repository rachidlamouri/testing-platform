import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
import { OdeshinZorn } from '../../../adapter/odeshin/odeshin2';
import {
  GenericProgramErrorVoque,
  GenericProgramErrorPelue,
  PROGRAM_ERROR_GEPP,
  ProgramErrorElementLocatorTypeName,
  ReportingEstinantLocator,
} from '../error/programError';
import {
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP,
  FileCommentedProgramBodyDeclarationGroupVoque,
} from '../type-script-file/fileCommentedProgramBodyDeclarationGroup';
import {
  ENGINE_VOQUE_2_GEPP,
  EngineVoque2Instance,
  EngineVoque2Voque,
} from './engineVoque2';
import {
  ENGINE_VOQUE_LOCATOR_2_GEPP,
  EngineVoqueLocator2Voque,
} from './engineVoqueLocator2';

const ESTINANT_NAME = 'getEngineVoque2' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingEstinantLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName: ProgramErrorElementLocatorTypeName.ReportingEstinantLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

/**
 * Associates a comment with a voque definition
 */
export const getEngineVoque2 = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<EngineVoqueLocator2Voque>({
    gepp: ENGINE_VOQUE_LOCATOR_2_GEPP,
  })
  .andFromHubblepupTuple2<
    FileCommentedProgramBodyDeclarationGroupVoque,
    [OdeshinZorn]
  >({
    gepp: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP,
    framate: (left) => [left.hubblepup.filePath],
    croard: (right) => right.hubblepup.filePath,
  })
  .toHubblepup2<EngineVoque2Voque>({
    gepp: ENGINE_VOQUE_2_GEPP,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((voqueLocator, [{ declarationByIdentifier }]) => {
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
    const parallelErrorList: GenericProgramErrorPelue[] =
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
      [ENGINE_VOQUE_2_GEPP]: new EngineVoque2Instance({
        filePath: voqueLocator.filePath,
        identifierName: voqueLocator.identifierName,
        commentText: commentText ?? '',
        locator: voqueLocator,
      }),
      [PROGRAM_ERROR_GEPP]: parallelErrorList,
    };
  })
  .assemble();
