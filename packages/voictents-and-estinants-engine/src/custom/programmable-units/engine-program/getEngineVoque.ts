import { getTextDigest } from '../../../utilities/getTextDigest';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  GenericProgramErrorVoque,
  GenericReceivedProgramError,
  PROGRAM_ERROR_GEPP,
  ProgramErrorElementLocatorTypeName,
  ReportingEstinantLocator,
} from '../error/programError';
import {
  PROGRAM_BODY_STATEMENTS_BY_IDENTIFIER_GEPP,
  ProgramBodyDeclarationsByIdentifierVoque,
} from '../type-script-file/programBodyDeclarationsByIdentifier';
import { ENGINE_VOQUE_GEPP, EngineVoqueVoque } from './engineVoque';
import {
  ENGINE_VOQUE_LOCATOR_GEPP,
  EngineVoqueLocatorVoque,
} from './engineVoqueLocator';

const ESTINANT_NAME = 'getEngineVoque' as const;
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
export const getEngineVoque = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<EngineVoqueLocatorVoque>({
    gepp: ENGINE_VOQUE_LOCATOR_GEPP,
  })
  .andFromHubblepupTuple2<ProgramBodyDeclarationsByIdentifierVoque, [string]>({
    gepp: PROGRAM_BODY_STATEMENTS_BY_IDENTIFIER_GEPP,
    framate: (left) => [left.hubblepup.filePath],
    // TODO: "zorn" is pretty useless in this context. This should be "filePath"
    croard: (right) => right.hubblepup.zorn,
  })
  .toHubblepup2<EngineVoqueVoque>({
    gepp: ENGINE_VOQUE_GEPP,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((voqueLocator, [{ declarationByIdentifier }]) => {
    const hubblepupIdentifierName = voqueLocator.identifierName.replace(
      /Voque$/,
      '',
    );

    const hubblepupDeclaration = declarationByIdentifier.get(
      hubblepupIdentifierName,
    );

    const commentText = hubblepupDeclaration?.commentText ?? null;

    const parallelErrorList: GenericReceivedProgramError[] =
      commentText !== null
        ? []
        : [
            {
              name: 'missing-hubblepup-comment',
              error: new Error(
                'Voque definitions must have a corresponding hubblepup definition of a similar name with a comment',
              ),
              reporterLocator,
              sourceLocator: {
                typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
                filePath: voqueLocator.filePath,
              },
              context: null,
            },
          ];

    return {
      [ENGINE_VOQUE_GEPP]: {
        zorn: voqueLocator.zorn,
        id: getTextDigest(voqueLocator.zorn),
        displayName: voqueLocator.identifierName.replace(/Voque$/, ''),
        filePath: voqueLocator.filePath,
        identifierName: voqueLocator.identifierName,
        commentText: commentText ?? '',
      },
      [PROGRAM_ERROR_GEPP]: parallelErrorList,
    };
  })
  .assemble();
