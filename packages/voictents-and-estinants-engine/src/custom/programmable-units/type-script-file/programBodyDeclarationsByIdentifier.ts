import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  COMMENTED_PROGRAM_BODY_DECLARATION_LIST_GEPP,
  CommentedProgramBodyDeclaration,
  CommentedProgramBodyDeclarationListVoictent,
  IdentifiableCommentedProgramBodyDeclaration,
} from './commentedProgramBodyDeclarationList';

export type ProgramBodyDeclarationsByIdentifierEntry = [
  string,
  CommentedProgramBodyDeclaration,
];

export type ProgramBodyDeclarationsByIdentifier = Map<
  string,
  CommentedProgramBodyDeclaration
>;

export type ProgramBodyDeclarationsByIdentifierGrition =
  Grition<ProgramBodyDeclarationsByIdentifier>;

export type ProgramBodyDeclarationsByIdentifierOdeshin =
  OdeshinFromGrition<ProgramBodyDeclarationsByIdentifierGrition>;

export const PROGRAM_BODY_STATEMENTS_BY_IDENTIFIER_GEPP =
  'program-body-statements-by-identifier';

export type ProgramBodyDeclarationsByIdentifierGepp =
  typeof PROGRAM_BODY_STATEMENTS_BY_IDENTIFIER_GEPP;

export type ProgramBodyDeclarationsByIdentifierVoictent = Voictent<
  ProgramBodyDeclarationsByIdentifierGepp,
  ProgramBodyDeclarationsByIdentifierOdeshin
>;

export const getProgramBodyDeclarationsByIdentifier = buildEstinant({
  name: 'getProgramBodyDeclarationsByIdentifier',
})
  .fromGrition<CommentedProgramBodyDeclarationListVoictent>({
    gepp: COMMENTED_PROGRAM_BODY_DECLARATION_LIST_GEPP,
  })
  .toGrition<ProgramBodyDeclarationsByIdentifierVoictent>({
    gepp: PROGRAM_BODY_STATEMENTS_BY_IDENTIFIER_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((commentedProgramBodyDeclarationList) => {
    const outputEntryList = commentedProgramBodyDeclarationList
      .filter(
        (
          commentedDeclaration,
        ): commentedDeclaration is IdentifiableCommentedProgramBodyDeclaration => {
          return commentedDeclaration.identifiableNode !== null;
        },
      )
      .map<ProgramBodyDeclarationsByIdentifierEntry>(
        (identifiableCommentedDeclaration) => {
          return [
            identifiableCommentedDeclaration.identifiableNode.id.name,
            identifiableCommentedDeclaration,
          ];
        },
      );

    const output: ProgramBodyDeclarationsByIdentifier = new Map(
      outputEntryList,
    );

    return output;
  })
  .assemble();
