import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { File } from '../../../utilities/file/file';
import { FileExtensionSuffixIdentifier } from '../../../utilities/file/fileExtensionSuffixIdentifier';
import { Grition } from '../../../custom-adapter/grition';
import { Odeshin } from '../../../custom-adapter/odeshin';
import { Plifal } from '../../../custom-adapter/plifal';
import { Merge } from '../../../utilities/merge';
import { ProgramFileBPlifal, PROGRAM_FILE_B_GEPP } from './programFileB';
import { Struss } from '../../../utilities/struss';
import { Tropoignant2 } from '../../../core/tropoignant';
import { kodatar } from '../../../type-script-adapter/kodataring';
import { Estinant2 } from '../../../core/estinant';
import {
  TypeScriptFileD2Plifal,
  TYPE_SCRIPT_FILE_D2_GEPP,
} from './typeScriptFileD2';
import { buildBuildErrorPlifal, ErrorPlifal } from '../error/errorPlifal';
import { splitList } from '../../../utilities/splitList';

export enum ProgramNodeTypeName {
  Voictent = 'Voictent',
  Estinant = 'Estinant',
  End = 'End',
}

export type ProgramNode = {
  typeName: ProgramNodeTypeName;
  name: string;
};

export type ProgramNodeRelationship = {
  from: ProgramNode;
  to: ProgramNode;
};

export type ProgramFileC2 = File<
  FileExtensionSuffixIdentifier.TypeScript,
  {
    programName: string;
    programNodeSet: Set<ProgramNode>;
    relationships: ProgramNodeRelationship[];
  }
>;

export type ProgramFileC2Grition = Grition<ProgramFileC2>;

export const PROGRAM_FILE_C2_GEPP = 'program-file-c2';

export type ProgramFileC2Gepp = typeof PROGRAM_FILE_C2_GEPP;

export type ProgramFileC2Identifier = `${ProgramFileC2Gepp}:${string}`;

export type ProgramFileC2Odeshin = Odeshin<
  ProgramFileC2Identifier,
  ProgramFileC2Grition
>;

export type ProgramFileC2Plifal = Plifal<
  [ProgramFileC2Gepp],
  ProgramFileC2Odeshin
>;

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

  getPlifalTuple(): (ProgramFileC2Plifal | ErrorPlifal)[] {
    this.isDone = true;

    const buildErrorPlifal = buildBuildErrorPlifal(
      this.programFileBPlifal.hubblepup.identifier,
    );

    type Data1 = {
      estinantIdentifier: string;
      estinantFile: TypeScriptFileD2Plifal;
    };

    const data1List =
      this.programFileBPlifal.hubblepup.grition.additionalMetadata.estinantStuffTuple.map<Data1>(
        (estinantStuff) => {
          return {
            estinantIdentifier: estinantStuff.identifier,
            estinantFile: typeScriptFileCache.get(
              estinantStuff.filePath,
            ) as TypeScriptFileD2Plifal,
          };
        },
      );

    type EstinantTypeParameterInstantiation =
      TSESTree.TSTypeParameterInstantiation & {
        params: TSESTree.TypeNode[];
      };

    type EstinantLiteralDeclarator = TSESTree.VariableDeclarator & {
      id: TSESTree.Identifier & {
        typeAnnotation: TSESTree.TSTypeAnnotation & {
          typeAnnotation: TSESTree.TSTypeReference & {
            typeName: TSESTree.Identifier;
            typeParameters: EstinantTypeParameterInstantiation;
          };
        };
      };
    };

    const isEstinantLiteralDeclarator = (
      node: TSESTree.VariableDeclarator,
    ): node is EstinantLiteralDeclarator => {
      return (
        node.id.type === AST_NODE_TYPES.Identifier &&
        node.id.typeAnnotation !== undefined &&
        node.id.typeAnnotation.type === AST_NODE_TYPES.TSTypeAnnotation &&
        node.id.typeAnnotation.typeAnnotation.type ===
          AST_NODE_TYPES.TSTypeReference &&
        node.id.typeAnnotation.typeAnnotation.typeName.type ===
          AST_NODE_TYPES.Identifier &&
        ['Estinant2', 'ValidationEstinant2'].includes(
          node.id.typeAnnotation.typeAnnotation.typeName.name,
        ) &&
        node.id.typeAnnotation.typeAnnotation.typeParameters !== undefined
      );
    };

    type EstinantBuilderDeclarator = TSESTree.VariableDeclarator & {
      id: TSESTree.Identifier;
      init: TSESTree.CallExpression & {
        callee: TSESTree.Identifier;
        typeParameters: EstinantTypeParameterInstantiation;
      };
    };

    const isEstinantBuilderDeclarator = (
      node: TSESTree.VariableDeclarator,
    ): node is EstinantBuilderDeclarator => {
      return (
        node.id.type === AST_NODE_TYPES.Identifier &&
        node.init !== null &&
        node.init.type === AST_NODE_TYPES.CallExpression &&
        node.init.callee.type === AST_NODE_TYPES.Identifier &&
        [
          'buildWortinatorHamletive',
          'buildOnamaHamletive',
          'buildOnamaHamletive2',
          'buildMentursectionHamletive',
          'buildCortmumHamletive',
        ].includes(node.init.callee.name) &&
        node.init.typeParameters !== undefined
      );
    };

    type EstinantExportDeclaration = TSESTree.ExportNamedDeclaration & {
      declaration: TSESTree.VariableDeclaration & {
        declarations: [TSESTree.VariableDeclarator];
      };
    };

    type Data2 = Merge<Data1, { declarator: TSESTree.VariableDeclarator }>;

    const data2AndErrorList = data1List.map<Data2 | ErrorPlifal>((data) => {
      const exportStatement =
        data.estinantFile.hubblepup.grition.additionalMetadata.typeScriptProgram.body.find(
          (statement): statement is EstinantExportDeclaration =>
            statement.type === AST_NODE_TYPES.ExportNamedDeclaration &&
            statement.declaration !== null &&
            statement.declaration.type === AST_NODE_TYPES.VariableDeclaration &&
            statement.declaration.declarations[0] !== undefined &&
            statement.declaration.declarations[0].id.type ===
              AST_NODE_TYPES.Identifier &&
            statement.declaration.declarations[0].id.name ===
              data.estinantIdentifier,
        );

      if (exportStatement === undefined) {
        return buildErrorPlifal(
          'Unable to find export',
          data.estinantFile.hubblepup.grition.additionalMetadata
            .typeScriptProgram.body,
        );
      }

      return {
        ...data,
        declarator: exportStatement.declaration.declarations[0],
      };
    });

    const errorPlifalList: ErrorPlifal[] = [];
    const data2List: Data2[] = [];
    splitList<ErrorPlifal, Data2>({
      list: data2AndErrorList,
      isElementA: (x): x is ErrorPlifal => 'hubblepup' in x,
      accumulatorA: errorPlifalList,
      accumulatorB: data2List,
    });

    type Data3 = Merge<
      Data2,
      {
        inputType: TSESTree.TypeNode | undefined;
        outputType: TSESTree.TypeNode | undefined;
      }
    >;

    const data3AndErrorList = data2List.map<Data3 | ErrorPlifal>((data) => {
      if (isEstinantLiteralDeclarator(data.declarator)) {
        return {
          ...data,
          inputType:
            data.declarator.id.typeAnnotation.typeAnnotation.typeParameters
              .params[0],
          outputType:
            data.declarator.id.typeAnnotation.typeAnnotation.typeParameters
              .params[1],
        };
      }

      if (isEstinantBuilderDeclarator(data.declarator)) {
        return {
          ...data,
          inputType: data.declarator.init.typeParameters.params[0],
          outputType: data.declarator.init.typeParameters.params[1],
        };
      }

      return buildErrorPlifal('Unhandled declarator', data.declarator);
    });

    const data3List: Data3[] = [];
    splitList<ErrorPlifal, Data3>({
      list: data3AndErrorList,
      isElementA: (x): x is ErrorPlifal => 'hubblepup' in x,
      accumulatorA: errorPlifalList,
      accumulatorB: data3List,
    });

    const getTypeNodeTuple = (
      node: TSESTree.TypeNode | undefined,
    ): (ErrorPlifal | TSESTree.TypeNode)[] => {
      if (node === undefined) {
        return [];
      }

      switch (node.type) {
        case AST_NODE_TYPES.TSTypeReference: {
          if (node.typeName.type !== AST_NODE_TYPES.Identifier) {
            return [
              buildErrorPlifal(
                `Unknown type reference TypeNode ${node.type}`,
                node,
              ),
            ];
          }

          return [node];
        }
        case AST_NODE_TYPES.TSTupleType: {
          return node.elementTypes.flatMap(getTypeNodeTuple);
        }
        case AST_NODE_TYPES.TSNullKeyword: {
          return [node];
        }
        default:
          return [buildErrorPlifal(`Unknown TypeNode ${node.type}`, node)];
      }
    };

    const getIdk3 = (
      program: TSESTree.Program,
      identifierName: string,
    ): { names: string[] } | ErrorPlifal => {
      let node: TSESTree.Node | undefined;
      program.body.forEach((statement) => {
        if (node !== undefined) {
          return;
        }

        if (
          statement.type === AST_NODE_TYPES.TSTypeAliasDeclaration &&
          statement.id.name === identifierName
        ) {
          node = statement.typeAnnotation;
          return;
        }

        if (
          statement.type === AST_NODE_TYPES.ExportNamedDeclaration &&
          statement.declaration !== null &&
          statement.declaration.type ===
            AST_NODE_TYPES.TSTypeAliasDeclaration &&
          statement.declaration.typeAnnotation.type ===
            AST_NODE_TYPES.TSTypeReference
        ) {
          node = statement.declaration;
          return;
        }
        if (
          statement.type === AST_NODE_TYPES.ImportDeclaration &&
          statement.specifiers.find(
            (specifier) =>
              specifier.local.type === AST_NODE_TYPES.Identifier &&
              specifier.local.name === identifierName,
          )
        ) {
          return { names: [identifierName] };
        }
      });

      if (node === undefined) {
        return buildErrorPlifal('Unable to find identifier', {
          identifierName,
          program,
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return getIdk1(program, node);
    };

    const getIdk2 = (
      program: TSESTree.Program,
      identifierName: string,
    ): ErrorPlifal | { names: string[] } => {
      switch (identifierName) {
        case 'Output':
        case 'InputQuirm':
        case 'InputPlifal':
        case 'InputTuple':
        case 'OutputTuple':
        case 'InputQuirmTuple':
        case 'InputPlifalTuple':
        case 'OutputPlifalTuple':
        case 'OutputPlifalOptionTuple':
          return getIdk3(program, identifierName);

        default:
      }

      if (identifierName.endsWith('Plifal')) {
        return { names: [identifierName.replace('Plifal', '')] };
      }

      return { names: [identifierName] };
    };

    const getIdk1 = (
      program: TSESTree.Program,
      node: TSESTree.Node,
    ): ErrorPlifal | { names: string[] } => {
      if (node.type === AST_NODE_TYPES.TSTypeAliasDeclaration) {
        return getIdk2(program, node.id.name);
      }

      if (
        node.type === AST_NODE_TYPES.TSTypeReference &&
        node.typeName.type === AST_NODE_TYPES.Identifier
      ) {
        return getIdk2(program, node.typeName.name);
      }

      if (node.type === AST_NODE_TYPES.TSUnionType) {
        const nameList = node.types.map((element) => getIdk1(program, element));
        const names = nameList
          .filter((x): x is { names: string[] } => 'names' in x)
          .flatMap((x) => x.names);
        return { names };
      }

      if (node.type === AST_NODE_TYPES.TSTupleType) {
        const nameList = node.elementTypes.map((element) =>
          getIdk1(program, element),
        );
        const names = nameList
          .filter((x): x is { names: string[] } => 'names' in x)
          .flatMap((x) => x.names);
        return { names };
      }

      return buildErrorPlifal('Unhandled node type', node);
    };

    type Data4 = {
      estinantName: string;
      inputNames: string[];
      outputNames: string[];
    };

    // TODO: MAP INPUTS AND OUTPUTS TO TUPLES OF INPUTS AND OUTPUTS
    const data4List = data3List.map<Data4>((data) => {
      const inputIdentifierNameAndErrorList = getTypeNodeTuple(data.inputType);
      const outputIdentifierNameAndErrorList = getTypeNodeTuple(
        data.outputType,
      );

      const inputIdentifierNameList: TSESTree.TypeNode[] = [];
      splitList({
        list: inputIdentifierNameAndErrorList,
        isElementA: (x): x is ErrorPlifal => 'hubblepup' in x,
        accumulatorA: errorPlifalList,
        accumulatorB: inputIdentifierNameList,
      });

      const outputIdentifierNameList: TSESTree.TypeNode[] = [];
      splitList({
        list: outputIdentifierNameAndErrorList,
        isElementA: (x): x is ErrorPlifal => 'hubblepup' in x,
        accumulatorA: errorPlifalList,
        accumulatorB: outputIdentifierNameList,
      });

      const inputNamesAndErrorList = inputIdentifierNameList.map((x) => {
        return getIdk1(
          data.estinantFile.hubblepup.grition.additionalMetadata
            .typeScriptProgram,
          x,
        );
      });

      const outputNamesAndErrorList = outputIdentifierNameList.map((x) => {
        return getIdk1(
          data.estinantFile.hubblepup.grition.additionalMetadata
            .typeScriptProgram,
          x,
        );
      });

      const inputNamesList: { names: string[] }[] = [];
      splitList({
        list: inputNamesAndErrorList,
        isElementA: (x): x is ErrorPlifal => 'hubblepup' in x,
        accumulatorA: errorPlifalList,
        accumulatorB: inputNamesList,
      });

      const outputNamesList: { names: string[] }[] = [];
      splitList({
        list: outputNamesAndErrorList,
        isElementA: (x): x is ErrorPlifal => 'hubblepup' in x,
        accumulatorA: errorPlifalList,
        accumulatorB: outputNamesList,
      });

      return {
        estinantName: data.estinantIdentifier,
        inputNames:
          inputNamesList[0] !== undefined ? inputNamesList[0].names : [],
        outputNames:
          outputNamesList[0] !== undefined ? outputNamesList[0].names : [],
      };
    });

    const estinantCache = new Map<string, ProgramNode>();
    const voictentCache = new Map<string, ProgramNode>();

    const data5List = data4List.map((x) => {
      const estinantProgramNode = estinantCache.get(x.estinantName) ?? {
        typeName: ProgramNodeTypeName.Estinant,
        name: x.estinantName,
      };
      estinantCache.set(x.estinantName, estinantProgramNode);

      const inputVoictentNodeTuple = x.inputNames.map((y) => {
        const voictentNode = voictentCache.get(y) ?? {
          typeName: ProgramNodeTypeName.Voictent,
          name: y,
        };
        voictentCache.set(y, voictentNode);

        return voictentNode;
      });

      const outputVoictentNodeTuple = x.outputNames.map((y) => {
        const voictentNode = voictentCache.get(y) ?? {
          typeName: ProgramNodeTypeName.Voictent,
          name: y,
        };
        voictentCache.set(y, voictentNode);

        return voictentNode;
      });

      return {
        estinantProgramNode,
        inputVoictentNodeTuple,
        outputVoictentNodeTuple,
      };
    });

    const endNode: ProgramNode = {
      typeName: ProgramNodeTypeName.End,
      name: 'END',
    };

    const programNodeSet = new Set([
      ...estinantCache.values(),
      ...voictentCache.values(),
      endNode,
    ]);

    const relationships = data5List.flatMap<ProgramNodeRelationship>(
      ({
        estinantProgramNode,
        inputVoictentNodeTuple,
        outputVoictentNodeTuple,
      }) => {
        return [
          ...inputVoictentNodeTuple.map<ProgramNodeRelationship>((node) => ({
            from: node,
            to: estinantProgramNode,
          })),
          ...(outputVoictentNodeTuple.length > 0
            ? outputVoictentNodeTuple.map<ProgramNodeRelationship>((node) => ({
                from: estinantProgramNode,
                to: node,
              }))
            : [
                {
                  from: estinantProgramNode,
                  to: endNode,
                },
              ]),
        ];
      },
    );

    const output: ProgramFileC2Plifal = {
      geppTuple: [PROGRAM_FILE_C2_GEPP],
      hubblepup: {
        identifier: `program-file-c2:${this.programFileBPlifal.hubblepup.identifier}`,
        grition: {
          ...this.programFileBPlifal.hubblepup.grition,
          additionalMetadata: {
            programName:
              this.programFileBPlifal.hubblepup.grition.inMemoryFileName
                .camelCase,
            programNodeSet,
            relationships,
          },
        },
      },
    };

    return [output, ...errorPlifalList];
  }
}

const fileCacheByProgramName = new Map<string, FileCache>();

const isB = (
  input: TypeScriptFileD2Plifal | ProgramFileBPlifal,
): input is ProgramFileBPlifal =>
  'programName' in input.hubblepup.grition.additionalMetadata;

type InputTuple = [TypeScriptFileD2Plifal | ProgramFileBPlifal];

type OutputTuple = [] | readonly (ProgramFileC2Plifal | ErrorPlifal)[];

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
    .flatMap((x) => x.getPlifalTuple());

  return outputPlifals;
};

export const programFileC2Estinant1: Estinant2<
  InputTuple,
  OutputTuple,
  Struss
> = {
  inputGeppTuple: [PROGRAM_FILE_B_GEPP],
  croard: kodatar,
  tropoig: cacheFiles,
};

export const programFileC2Estinant2: Estinant2<
  InputTuple,
  OutputTuple,
  Struss
> = {
  inputGeppTuple: [TYPE_SCRIPT_FILE_D2_GEPP],
  croard: kodatar,
  tropoig: cacheFiles,
};
