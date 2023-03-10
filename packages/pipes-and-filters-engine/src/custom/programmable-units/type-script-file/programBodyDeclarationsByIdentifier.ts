import { isExportNamedTypeDeclaration } from '../../../utilities/type-script-ast/isExportNamedTypeDeclaration';
import { isExportNamedVariableDeclaration } from '../../../utilities/type-script-ast/isExportNamedVariableDeclaration';
import {
  IdentifiableVariableDeclarator,
  isIdentifiableVariableDeclaration,
} from '../../../utilities/type-script-ast/isIdentifiableVariableDeclaration';
import {
  isIdentifiableTypeDeclaration,
  IdentifiableTypeDeclaration,
} from '../../../utilities/type-script-ast/isIdentifiableTypeDeclaration';
import { buildOnama } from '../../adapter/estinant/onama';
import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import {
  ParsedTypeScriptFileVoictent,
  PARSED_TYPE_SCRIPT_FILE_GEPP,
} from './parsedTypeScriptFile';

export type ProgramBodyDeclarationsByIdentifier = Map<
  string,
  IdentifiableVariableDeclarator | IdentifiableTypeDeclaration
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

export const programBodyDeclarationsByIdentifierOnama = buildOnama<
  ParsedTypeScriptFileVoictent,
  ProgramBodyDeclarationsByIdentifierVoictent
>({
  inputGepp: PARSED_TYPE_SCRIPT_FILE_GEPP,
  outputGepp: PROGRAM_BODY_STATEMENTS_BY_IDENTIFIER_GEPP,
  pinbe: (input) => {
    const output: ProgramBodyDeclarationsByIdentifier = new Map();

    input.program.body.forEach((statement) => {
      if (isExportNamedVariableDeclaration(statement)) {
        output.set(
          statement.declaration.declarations[0].id.name,
          statement.declaration.declarations[0],
        );
      } else if (isIdentifiableVariableDeclaration(statement)) {
        output.set(
          statement.declarations[0].id.name,
          statement.declarations[0],
        );
      } else if (isExportNamedTypeDeclaration(statement)) {
        output.set(statement.declaration.id.name, statement.declaration);
      } else if (isIdentifiableTypeDeclaration(statement)) {
        output.set(statement.id.name, statement);
      }
    });

    return output;
  },
});
