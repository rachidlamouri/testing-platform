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
import {
  ENGINE_VOQUE_GEPP,
  EngineVoqueInstance,
  EngineVoqueVoque,
} from './engineVoque';
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
    // TODO: move these naming conventions elsewhere
    const hubblepupIdentifierName = voqueLocator.identifierName
      .replace(/Voque$/, '')
      .replace(/^Generic/, '');

    const emittedHubblepupIdentifierName = `Emitted${hubblepupIdentifierName}`;

    const disambiguatedHubblepupIdentifierName = `T${hubblepupIdentifierName}`;

    const hubblepupDeclaration =
      declarationByIdentifier.get(hubblepupIdentifierName) ??
      declarationByIdentifier.get(emittedHubblepupIdentifierName) ??
      declarationByIdentifier.get(disambiguatedHubblepupIdentifierName);

    const commentText = hubblepupDeclaration?.commentText ?? null;

    const parallelErrorList: GenericReceivedProgramError[] =
      commentText !== null
        ? []
        : [
            {
              name: 'missing-hubblepup-comment',
              error: new Error(
                'Voque definitions must have a corresponding hubblepup definition with a comment. The hubblepup type may have an "Emitted" prefix',
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
      [ENGINE_VOQUE_GEPP]: new EngineVoqueInstance({
        filePath: voqueLocator.filePath,
        identifierName: voqueLocator.identifierName,
        commentText: commentText ?? '',
        locator: voqueLocator,
      }),
      [PROGRAM_ERROR_GEPP]: parallelErrorList,
    };
  })
  .assemble();
