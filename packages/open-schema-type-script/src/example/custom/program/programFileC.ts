import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { File } from '../../../utilities/file/file';
import { FileExtensionSuffixIdentifier } from '../../../utilities/file/fileExtensionSuffixIdentifier';
import { Grition } from '../../../custom-adapter/grition';
import { Odeshin } from '../../../custom-adapter/odeshin';
import { Plifal } from '../../../custom-adapter/plifal';
import {
  QuirmOption,
  QuirmOptionTuple,
  QuirmOptionTupleTuple,
  QuirmOptionTupleTupleToQuirmTuple,
} from '../../../type-script-adapter/quirmOptionTuple';
import {
  ProgramFileA,
  ProgramFileAPlifal,
  PROGRAM_FILE_A_GEPP,
} from './programFileA';
import { Merge } from '../../../utilities/merge';
import {
  Ankeler,
  Ankeler2,
  buildOnamaHamletive,
  buildOnamaHamletive2,
} from '../../../type-script-adapter/hamletive/onama';
import { MergeTuple } from '../../../utilities/mergeTuple';
import {
  ProgramFileB,
  ProgramFileBOdeshin,
  ProgramFileBPlifal,
  PROGRAM_FILE_B_GEPP,
} from './programFileB';
import {
  buildMentursectionHamletive,
  Paraker,
} from '../../../type-script-adapter/hamletive/mentursection';
import {
  buildWortinatorHamletive,
  Haqueler,
} from '../../../type-script-adapter/hamletive/wortinator';
import {
  TypeScriptFileA,
  TypeScriptFileAPlifal,
  TYPE_SCRIPT_FILE_A_GEPP,
} from '../file/typeScriptFileA';
import { Quirm, Quirm2 } from '../../../core/quirm';
import {
  buildCortmumHamletive,
  Cortmum,
} from '../../../type-script-adapter/hamletive/cortmum';
import { Struss } from '../../../utilities/struss';
import { Tropoignant2 } from '../../../core/tropoignant';
import { kodatar } from '../../../type-script-adapter/kodataring';
import { Estinant2 } from '../../../core/estinant';
import {
  TypeScriptFileD2Plifal,
  TYPE_SCRIPT_FILE_D2_GEPP,
} from './typeScriptFileD2';
import { buildBuildErrorPlifal, ErrorPlifal } from '../error/errorPlifal';

// enum ProgramFileCMetadataTypeName {
//   Invalid = 'Invalid',
//   Valid = 'Valid',
// }

// type ProgramStartStatement = TSESTree.ExpressionStatement & {
//   expression: TSESTree.CallExpression & {
//     callee: TSESTree.Identifier & {
//       name: 'digikikify';
//     };
//   };
// };

// type BaseProgramFileMetadata<
//   TTypeName extends ProgramFileCMetadataTypeName,
//   TProgramStartStatement extends ProgramStartStatement | null,
//   TMetadata extends object,
// > = MergeTuple<
//   [
//     { typeName: TTypeName; programStartStatement: TProgramStartStatement },
//     ProgramFileA['additionalMetadata'],
//     TMetadata,
//   ]
// >;

// type ValidProgramFileCMetadata = BaseProgramFileMetadata<
//   ProgramFileCMetadataTypeName.Valid,
//   ProgramStartStatement
// >;
// type InvalidProgramFileCMetadata = BaseProgramFileMetadata<
//   ProgramFileCMetadataTypeName.Invalid,
//   ProgramStartStatement | null
// >;

enum ProgramNodeTypeName {
  Voictent = 'Voictent',
  Tropoignant = 'Tropoignant',
}

type ProgramNode = {
  typeName: ProgramNodeTypeName;
  name: string;
};

type ProgramNodeRelationship = {
  from: ProgramNode;
  to: ProgramNode;
};

export type ProgramFileC = File<
  FileExtensionSuffixIdentifier.TypeScript,
  {
    programName: string;
    relationships: ProgramNodeRelationship[];
  }
>;

export type ProgramFileCGrition = Grition<ProgramFileC>;

export const PROGRAM_FILE_C_GEPP = 'program-file-c';

export type ProgramFileCGepp = typeof PROGRAM_FILE_C_GEPP;

export type ProgramFileCIdentifier = `${ProgramFileCGepp}:${string}`;

export type ProgramFileCOdeshin = Odeshin<
  ProgramFileCIdentifier,
  ProgramFileCGrition
>;

export type ProgramFileCPlifal = Plifal<
  [ProgramFileCGepp],
  ProgramFileCOdeshin
>;

// type InputOptionTuple = QuirmOptionTuple<[ProgramFileBPlifal]>;

// type OutputOptionTuple = QuirmOptionTuple<[ProgramFileCPlifal]>;

// const isProgramFileC: Paraker<
//   InputOptionTuple,
//   OutputOptionTuple,
//   ProgramFileCPlifal
// > = (input): input is ProgramFileCOdeshin => {
//   return input.grition.additionalMetadata.programStartStatement !== null;
// };

// export const programFileCEstinant = buildMentursectionHamletive<
//   InputOptionTuple,
//   OutputOptionTuple
// >({
//   inputGepp: PROGRAM_FILE_B_GEPP,
//   kerzTuple: [
//     {
//       outputGeppTuple: [PROGRAM_FILE_C_GEPP],
//       parak: isProgramFileC,
//     },
//   ],
// });

// const buildProgramFileC: Ankeler2<InputOptionTuple, OutputOptionTuple> = (
//   input,
// ) => {
//   const programStartStatement =
//     input.hubblepup.grition.additionalMetadata.typeScriptProgram.body.find(
//       (statement): statement is ProgramStartStatement => {
//         return (
//           statement.type === AST_NODE_TYPES.ExpressionStatement &&
//           statement.expression.type === AST_NODE_TYPES.CallExpression &&
//           statement.expression.callee.type === AST_NODE_TYPES.Identifier &&
//           statement.expression.callee.name === 'digikikify'
//         );
//       },
//     ) ?? null;

//   // let additionalMetadata: ProgramFileC['additionalMetadata'];

//   // if (programStartStatement !== null) {
//   //   additionalMetadata = {
//   //     typeName: ProgramFileCMetadataTypeName.Valid,
//   //     programStartStatement,
//   //     ...input.hubblepup.grition.additionalMetadata,
//   //     estinantIdentifierTuple: [],
//   //   };
//   // } else {
//   //   additionalMetadata = {
//   //     typeName: ProgramFileCMetadataTypeName.Valid,
//   //     programStartStatement,
//   //     ...input.hubblepup.grition.additionalMetadata,
//   //     estinantIdentifierTuple: [],
//   //   };
//   // }

//   const output: ProgramFileCPlifal = {
//     geppTuple: [PROGRAM_FILE_C_GEPP],
//     hubblepup: {
//       identifier: `program-file-c:${input.hubblepup.grition.filePath}`,
//       grition: {
//         ...input.hubblepup.grition,
//         additionalMetadata: {
//           // typeName: ProgramFileCMetadataTypeName.Valid,
//           ...input.hubblepup.grition.additionalMetadata,
//           programStartStatement,
//         },
//       },
//     },
//   };

//   return output;
// };

// export const ProgramFileCEstinant = buildOnamaHamletive2<
//   InputOptionTuple,
//   OutputOptionTuple
// >({
//   inputGepp: PROGRAM_FILE_A_GEPP,
//   ankel: buildProgramFileC,
// });

// const idk: KerzTuple<InputOptionTuple, OutputOptionTuple> = [
//   {
//     outputGeppTuple: [PROGRAM_FILE_C_GEPP],
//   }
// ]

// export const ProgramFileCEstinant = buildMentursectionHamletive<InputOptionTuple, OutputOptionTuple>({
//   inputGepp: TYPE_SCRIPT_FILE_D2_GEPP,
//   kerzTuple: [

//   ]
// });

// Estinant<
//   ProgramFileCConfigurationOdeshin,
//   ProgramFileCPlifalTuple
// > = {
//   inputGepp: PROGRAM_FILE_C_CONFIGURATION_GEPP,
//   tropoignant: {
//     typeName: TropoignantTypeName.Onama,
//     process: function buildProgramFileC(inputOdeshin) {
//       const filePaths = getNestedFilePaths(inputOdeshin.grition);

//       const ProgramFileCQuirmTuple: ProgramFileCPlifalTuple = filePaths.map(
//         (filePath) => {
//           const {
//             onDiskFileNameParts,
//             inMemoryFileNameParts,
//             extensionSuffix,
//             extensionParts,
//           } = getFileMetadata(filePath);

//           const grition: ProgramFileC = {
//             filePath,
//             onDiskFileName: {
//               camelCase: partsToCamel(onDiskFileNameParts),
//               pascalCase: partsToPascal(onDiskFileNameParts),
//             },
//             inMemoryFileName: {
//               camelCase: partsToCamel(inMemoryFileNameParts),
//               pascalCase: partsToPascal(inMemoryFileNameParts),
//             },
//             extension: {
//               parts: extensionParts,
//               suffix: extensionSuffix,
//               suffixIdentifier:
//                 getFileExtensionSuffixIdentifier(extensionSuffix),
//             },
//             additionalMetadata: null,
//           };

//           const identifier: ProgramFileCIdentifier = `program-file-c:${filePath}`;

//           return {
//             geppTuple: [PROGRAM_FILE_C_GEPP],
//             hubblepup: {
//               identifier,
//               grition,
//             },
//           } satisfies ProgramFileCPlifal;
//         },
//       );

//       return ProgramFileCQuirmTuple;
//     },
//   },
// };

const typeScriptFileCache = new Map<string, TypeScriptFileD2Plifal>();

class FileCache {
  isDone = false;

  constructor(public programFileBPlifal: ProgramFileBPlifal) {}

  isReady(): boolean {
    return this.programFileBPlifal.hubblepup.grition.additionalMetadata.estinantStuffTuple.every(
      (x) => {
        return typeScriptFileCache.has(x.filePath);
      },
    );
  }

  getPlifal(): ProgramFileCPlifal | ErrorPlifal {
    this.isDone = true;

    const buildErrorPlifal = buildBuildErrorPlifal(
      this.programFileBPlifal.hubblepup.identifier,
    );

    const data1 =
      this.programFileBPlifal.hubblepup.grition.additionalMetadata.estinantStuffTuple.map(
        (estinantStuff) => {
          return {
            estinantIdentifier: estinantStuff.identifier,
            estinantFile: typeScriptFileCache.get(
              estinantStuff.filePath,
            ) as TypeScriptFileD2Plifal,
          };
        },
      );

    type EstinantExportDeclaration = TSESTree.ExportNamedDeclaration & {
      declaration: TSESTree.VariableDeclaration & {
        declarations: [
          TSESTree.VariableDeclarator & {
            id: TSESTree.Identifier & {
              typeAnnotation: TSESTree.TSTypeAnnotation & {
                typeAnnotation: TSESTree.TypeNode;
              };
            };
            init: TSESTree.Expression;
          },
        ];
      };
    };

    const data2 = data1.map((data) => {
      const exportDeclaration =
        data.estinantFile.hubblepup.grition.additionalMetadata.typeScriptProgram.body.find(
          (statement): statement is EstinantExportDeclaration => {
            return (
              statement.type === AST_NODE_TYPES.ExportNamedDeclaration &&
              statement.declaration !== null &&
              statement.declaration.type ===
                AST_NODE_TYPES.VariableDeclaration &&
              statement.declaration.declarations[0] !== undefined &&
              statement.declaration.declarations[0].type ===
                AST_NODE_TYPES.VariableDeclarator &&
              statement.declaration.declarations[0].id.type ===
                AST_NODE_TYPES.Identifier &&
              statement.declaration.declarations[0].id.name ===
                data.estinantIdentifier &&
              statement.declaration.declarations[0].init !== null
            );
          },
        );

      return {
        ...data,
        exportDeclaration,
      };
    });

    const data3 = data2.filter(
      (x): x is typeof x & { exportDeclaration: EstinantExportDeclaration } =>
        x.exportDeclaration !== undefined,
    );
    if (data3.length !== data2.length) {
      return buildErrorPlifal(
        'Unable to find export',
        data2.find((x) => x.exportDeclaration === undefined),
      );
    }

    // TODO: !!!! MAKE SURE ALL EXPORTS HAVE AN ESTINANT2 TYPE ANNOTATION

    const data4 = data3.map((data) => {
      // const expression =
      //        data.exportDeclaration.declaration.declarations[0].init;

      switch (
        data.exportDeclaration.declaration.declarations[0].id.typeAnnotation
          .type
      ) {
        // case AST_NODE_TYPES.ObjectExpression: {
        //   expression.
        //   // expression.properties.find(
        //   //   (x): x is Property =>
        //   //     x.type === AST_NODE_TYPES.Property &&
        //   //     x.key.type === AST_NODE_TYPES.Identifier &&
        //   //     x.key.name === 'inputGeppTuple',
        //   // );
        //   break;
        // }
        default:
          return buildErrorPlifal(
            `Unknown type annotation type ${data.exportDeclaration.declaration.declarations[0].id.typeAnnotation.type}`,
            data.exportDeclaration,
          );
      }

      return data;
    });

    const data5 = data4.filter(
      (x): x is Exclude<typeof x, ErrorPlifal> => !('hubblepup' in x),
    );

    if (data5.length !== data4.length) {
      return data4.find(
        (x): x is ErrorPlifal => 'hubblepup' in x,
      ) as ErrorPlifal;
    }

    const output: ProgramFileCPlifal = {
      geppTuple: [PROGRAM_FILE_C_GEPP],
      hubblepup: {
        identifier: `program-file-c:${this.programFileBPlifal.hubblepup.identifier}`,
        grition: {
          ...this.programFileBPlifal.hubblepup.grition,
          additionalMetadata: {
            programName:
              this.programFileBPlifal.hubblepup.grition.inMemoryFileName
                .camelCase,
            relationships: [],
          },
        },
      },
    };

    return output;
  }
}

const fileCacheByProgramName = new Map<string, FileCache>();

const isB = (
  input: TypeScriptFileD2Plifal | ProgramFileBPlifal,
): input is ProgramFileBPlifal =>
  'programName' in input.hubblepup.grition.additionalMetadata;

type InputTuple = [TypeScriptFileD2Plifal | ProgramFileBPlifal];

type OutputTuple = [] | readonly (ProgramFileCPlifal | ErrorPlifal)[];

const cacheFiles: Tropoignant2<InputTuple, OutputTuple> = (input) => {
  if (isB(input)) {
    const fileCache = new FileCache(input);

    fileCacheByProgramName.set(
      input.hubblepup.grition.additionalMetadata.programName,
      fileCache,
    );
  } else {
    typeScriptFileCache.set(input.hubblepup.grition.filePath, input);
  }

  const outputPlifals = [...fileCacheByProgramName.values()]
    .filter((x) => !x.isDone)
    .filter((x) => x.isReady())
    .map((x) => x.getPlifal());

  return outputPlifals;
};

export const programFileCEstinant1: Estinant2<InputTuple, Struss> = {
  inputGeppTuple: [PROGRAM_FILE_B_GEPP],
  croard: kodatar,
  tropoig: cacheFiles,
};

export const programFileCEstinant2: Estinant2<InputTuple, Struss> = {
  inputGeppTuple: [TYPE_SCRIPT_FILE_D2_GEPP],
  croard: kodatar,
  tropoig: cacheFiles,
};
