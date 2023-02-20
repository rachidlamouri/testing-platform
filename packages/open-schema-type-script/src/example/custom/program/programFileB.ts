import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { File } from '../../../utilities/file/file';
import { FileExtensionSuffixIdentifier } from '../../../utilities/file/fileExtensionSuffixIdentifier';
import { Grition } from '../../../custom-adapter/grition';
import { Odeshin } from '../../../custom-adapter/odeshin';
import { Plifal } from '../../../custom-adapter/plifal';
import { QuirmOptionTuple } from '../../../type-script-adapter/quirmOptionTuple';
import {
  ProgramFileA,
  ProgramFileAPlifal,
  PROGRAM_FILE_A_GEPP,
} from './programFileA';
import { Merge } from '../../../utilities/merge';
import {
  Ankeler2,
  buildOnamaHamletive2,
} from '../../../type-script-adapter/hamletive/onama';
import { buildBuildErrorPlifal, ErrorPlifal } from '../error/errorPlifal';
import {
  CustomImportDeclaration,
  CustomImportDeclarationTypeName,
  LocalImportDeclaration,
} from './typeScriptFileD2';

export type ProgramStartStatement = TSESTree.ExpressionStatement & {
  expression: TSESTree.CallExpression & {
    callee: TSESTree.Identifier & {
      name: 'digikikify';
    };
  };
};

export type EstinantStuff = {
  identifier: string;
  filePath: string;
};

export type ProgramFileB = File<
  FileExtensionSuffixIdentifier.TypeScript,
  Merge<
    ProgramFileA['additionalMetadata'],
    {
      programName: string;
      programStartStatement: ProgramStartStatement;
      estinantStuffTuple: EstinantStuff[];
    }
  >
>;

export type ProgramFileBGrition = Grition<ProgramFileB>;

export type ProgramFileBIdentifier = `program-file-b:${string}`;

export type ProgramFileBOdeshin = Odeshin<ProgramFileBIdentifier, ProgramFileB>;

export const PROGRAM_FILE_B_GEPP = 'program-file-b';

export type ProgramFileBGepp = typeof PROGRAM_FILE_B_GEPP;

export type ProgramFileBPlifal = Plifal<
  [ProgramFileBGepp],
  ProgramFileBOdeshin
>;

type InputOptionTuple = QuirmOptionTuple<[ProgramFileAPlifal]>;

type OutputOptionTuple = QuirmOptionTuple<[ProgramFileBPlifal, ErrorPlifal]>;

const buildProgramFileB: Ankeler2<InputOptionTuple, OutputOptionTuple> = (
  input,
) => {
  const buildErrorPlifal = buildBuildErrorPlifal(input.hubblepup.identifier);

  const programStartStatement =
    input.hubblepup.grition.additionalMetadata.typeScriptProgram.body.find(
      (statement): statement is ProgramStartStatement => {
        return (
          statement.type === AST_NODE_TYPES.ExpressionStatement &&
          statement.expression.type === AST_NODE_TYPES.CallExpression &&
          statement.expression.callee.type === AST_NODE_TYPES.Identifier &&
          statement.expression.callee.name === 'digikikify'
        );
      },
    );

  if (programStartStatement === undefined) {
    return buildErrorPlifal('Invalid program start');
  }

  if (
    programStartStatement.expression.arguments[0].type !==
    AST_NODE_TYPES.ObjectExpression
  ) {
    return buildErrorPlifal('Invalid program argument');
  }

  const estinantTupleProperty =
    programStartStatement.expression.arguments[0].properties.find(
      (property): property is TSESTree.Property =>
        property.type === AST_NODE_TYPES.Property &&
        property.key.type === AST_NODE_TYPES.Identifier &&
        property.key.name === 'estinantTuple',
    );

  if (estinantTupleProperty === undefined) {
    return buildErrorPlifal('Cannot find estinantTuple argument');
  }

  if (estinantTupleProperty.value.type !== AST_NODE_TYPES.ArrayExpression) {
    return buildErrorPlifal('Invalid estinantTuple value type');
  }

  if (
    !estinantTupleProperty.value.elements.every(
      (element): element is TSESTree.Identifier => {
        return element !== null && element.type === AST_NODE_TYPES.Identifier;
      },
    )
  ) {
    return buildErrorPlifal(
      'An estinantTuple element is not an identifier',
      estinantTupleProperty.value.elements,
    );
  }

  const importDeclarationsBySpecifier: Record<string, CustomImportDeclaration> =
    {};
  input.hubblepup.grition.additionalMetadata.importDeclarationList.forEach(
    (importDeclaration) => {
      importDeclaration.specifierList.forEach((specifier) => {
        importDeclarationsBySpecifier[specifier] = importDeclaration;
      });
    },
  );

  const estinantIdentifierTuple = estinantTupleProperty.value.elements.map(
    (element) => element.name,
  );

  const stuff1 = estinantIdentifierTuple.map((identifier) => ({
    identifier,
    importDeclaration: importDeclarationsBySpecifier[identifier],
  }));

  const stuff2 = stuff1.filter(
    (
      x,
    ): x is { identifier: string; importDeclaration: LocalImportDeclaration } =>
      x.importDeclaration !== undefined &&
      x.importDeclaration.typeName === CustomImportDeclarationTypeName.Local,
  );

  if (stuff2.length !== stuff1.length) {
    return buildErrorPlifal(
      'An estinant identifier has an invalid import',
      stuff1,
    );
  }

  const stuff3 = stuff2.map<EstinantStuff>(
    ({ identifier, importDeclaration }) => {
      return {
        identifier,
        filePath: importDeclaration.filePath,
      };
    },
  );

  const output: ProgramFileBPlifal = {
    geppTuple: [PROGRAM_FILE_B_GEPP],
    hubblepup: {
      identifier: `program-file-b:${input.hubblepup.grition.filePath}`,
      grition: {
        ...input.hubblepup.grition,
        additionalMetadata: {
          // typeName: ProgramFileBMetadataTypeName.Valid,
          ...input.hubblepup.grition.additionalMetadata,
          programName: input.hubblepup.grition.onDiskFileName.camelCase,
          programStartStatement,
          estinantStuffTuple: stuff3,
        },
      },
    },
  };

  return output;
};

export const programFileBEstinant = buildOnamaHamletive2<
  InputOptionTuple,
  OutputOptionTuple
>({
  inputGepp: PROGRAM_FILE_A_GEPP,
  ankel: buildProgramFileB,
});
