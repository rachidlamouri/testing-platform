import { Voictent } from '../../adapter/voictent';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  COMMENTED_PROGRAM_BODY_DECLARATION_LIST_GEPP,
  CommentedProgramBodyDeclaration,
  CommentedProgramBodyDeclarationListVoque,
  IdentifiableCommentedProgramBodyDeclaration,
} from './commentedProgramBodyDeclarationList';
import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';

export type ProgramBodyDeclarationsByIdentifierEntry = [
  string,
  CommentedProgramBodyDeclaration,
];

// TODO: fix this weird nested map type
export type ProgramBodyDeclarationsByIdentifier = {
  zorn: string;
  declarationByIdentifier: Map<string, CommentedProgramBodyDeclaration>;
};

export const PROGRAM_BODY_STATEMENTS_BY_IDENTIFIER_GEPP =
  'program-body-statements-by-identifier';

export type ProgramBodyDeclarationsByIdentifierGepp =
  typeof PROGRAM_BODY_STATEMENTS_BY_IDENTIFIER_GEPP;

export type ProgramBodyDeclarationsByIdentifierVoictent = Voictent<
  ProgramBodyDeclarationsByIdentifierGepp,
  ProgramBodyDeclarationsByIdentifier
>;

export type ProgramBodyDeclarationsByIdentifierVoque = InMemoryOdeshin2Voque<
  ProgramBodyDeclarationsByIdentifierGepp,
  ProgramBodyDeclarationsByIdentifier
>;

/**
 * Uses the convention of an "identifiable top level node", to cache all top
 * level program statements by their identifiable node. A useful example is
 * looking up an export statement AST node in one file, based on the import
 * identifier in a dependent file.
 */
export const getProgramBodyDeclarationsByIdentifier = buildEstinant({
  name: 'getProgramBodyDeclarationsByIdentifier',
})
  .fromHubblepup2<CommentedProgramBodyDeclarationListVoque>({
    gepp: COMMENTED_PROGRAM_BODY_DECLARATION_LIST_GEPP,
  })
  .toHubblepup2<ProgramBodyDeclarationsByIdentifierVoque>({
    gepp: PROGRAM_BODY_STATEMENTS_BY_IDENTIFIER_GEPP,
  })
  .onPinbe((commentedProgramBodyDeclarationList) => {
    const outputEntryList = commentedProgramBodyDeclarationList.list
      .filter(
        (
          commentedDeclaration,
        ): commentedDeclaration is IdentifiableCommentedProgramBodyDeclaration => {
          return commentedDeclaration.identifiableNode !== null;
        },
      )
      .map<[string, IdentifiableCommentedProgramBodyDeclaration]>(
        (identifiableCommentedDeclaration) => {
          return [
            identifiableCommentedDeclaration.identifiableNode.id.name,
            identifiableCommentedDeclaration,
          ];
        },
      );

    return {
      zorn: commentedProgramBodyDeclarationList.zorn,
      declarationByIdentifier: new Map(outputEntryList),
    };
  })
  .assemble();
