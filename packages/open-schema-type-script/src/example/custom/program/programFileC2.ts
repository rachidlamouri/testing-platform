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
import {
  TypeScriptFileD2Plifal,
  TYPE_SCRIPT_FILE_D2_GEPP,
} from './typeScriptFileD2';
import { buildBuildErrorPlifal, ErrorPlifal } from '../error/errorPlifal';
import { splitList } from '../../../utilities/splitList';
import { buildCortmumHamletive } from '../../../type-script-adapter/hamletive/cortmum';

export enum ProgramNodeTypeName {
  Voictent = 'Voictent',
  Estinant = 'Estinant',
  Input = 'Input',
  End = 'End',
}

export type ProgramNode = {
  typeName: ProgramNodeTypeName;
  name: string;
  id: string;
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

    type EstinantTypeParameterInstantiation<
      TParams extends TSESTree.TypeNode[],
    > = TSESTree.TSTypeParameterInstantiation & {
      params: TParams;
    };

    type BaseEstinantLiteralDeclarator<
      TTypeName extends string,
      TParams extends TSESTree.TypeNode[],
    > = TSESTree.VariableDeclarator & {
      id: TSESTree.Identifier & {
        typeAnnotation: TSESTree.TSTypeAnnotation & {
          typeAnnotation: TSESTree.TSTypeReference & {
            typeName: TSESTree.Identifier & {
              name: TTypeName;
            };
            typeParameters: EstinantTypeParameterInstantiation<TParams>;
          };
        };
      };
    };

    enum CustomIdentifier {
      Estinant2 = 'Estinant2',
      ValidationEstinant2 = 'ValidationEstinant2',
      WortinatorHamletiveBuilder = 'buildWortinatorHamletive',
      OnamaHamletiveBuilder = 'buildOnamaHamletive',
      MentursectionHamletiveBuilder = 'buildMentursectionHamletive',
      CortmumHamletiveBuilder = 'buildCortmumHamletive',
    }

    type Estinant2LiteralDeclarator = BaseEstinantLiteralDeclarator<
      CustomIdentifier.Estinant2,
      [TSESTree.TypeNode, TSESTree.TypeNode]
    >;

    type ValidationEstinant2LiteralDeclarator = BaseEstinantLiteralDeclarator<
      CustomIdentifier.ValidationEstinant2,
      [TSESTree.TypeNode]
    >;

    type EstinantLiteralDeclarator =
      | Estinant2LiteralDeclarator
      | ValidationEstinant2LiteralDeclarator;

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
        node.id.typeAnnotation.typeAnnotation.typeParameters !== undefined &&
        ((node.id.typeAnnotation.typeAnnotation.typeName.name ===
          CustomIdentifier.Estinant2 &&
          node.id.typeAnnotation.typeAnnotation.typeParameters.params.length >=
            2) ||
          (node.id.typeAnnotation.typeAnnotation.typeName.name ===
            CustomIdentifier.ValidationEstinant2 &&
            node.id.typeAnnotation.typeAnnotation.typeParameters.params
              .length >= 1))
      );
    };

    type BaseEstinantBuilderDeclarator<
      TBuilderName extends string,
      TParams extends TSESTree.TypeNode[],
    > = TSESTree.VariableDeclarator & {
      id: TSESTree.Identifier;
      init: TSESTree.CallExpression & {
        callee: TSESTree.Identifier & {
          name: TBuilderName;
        };
        typeParameters: EstinantTypeParameterInstantiation<TParams>;
      };
    };

    type EstinantBuilderDeclaratorA = BaseEstinantBuilderDeclarator<
      CustomIdentifier.WortinatorHamletiveBuilder,
      [TSESTree.TypeNode]
    >;

    type EstinantBuilderDeclaratorB = BaseEstinantBuilderDeclarator<
      CustomIdentifier.OnamaHamletiveBuilder,
      [TSESTree.TypeNode, TSESTree.TypeNode]
    >;

    type EstinantBuilderDeclaratorC = BaseEstinantBuilderDeclarator<
      CustomIdentifier.MentursectionHamletiveBuilder,
      [TSESTree.TypeNode, TSESTree.TypeNode]
    >;

    type EstinantBuilderDeclaratorD = BaseEstinantBuilderDeclarator<
      CustomIdentifier.CortmumHamletiveBuilder,
      [TSESTree.TypeNode, TSESTree.TypeNode]
    >;

    type EstinantBuilderDeclarator =
      | EstinantBuilderDeclaratorA
      | EstinantBuilderDeclaratorB
      | EstinantBuilderDeclaratorC
      | EstinantBuilderDeclaratorD;

    const isEstinantBuilderDeclarator = (
      node: TSESTree.VariableDeclarator,
    ): node is EstinantBuilderDeclarator => {
      return (
        node.id.type === AST_NODE_TYPES.Identifier &&
        node.init !== null &&
        node.init.type === AST_NODE_TYPES.CallExpression &&
        node.init.callee.type === AST_NODE_TYPES.Identifier &&
        node.init.typeParameters !== undefined &&
        ((node.init.callee.name ===
          CustomIdentifier.WortinatorHamletiveBuilder &&
          node.init.typeParameters.params.length >= 1) ||
          (node.init.callee.name === CustomIdentifier.OnamaHamletiveBuilder &&
            node.init.typeParameters.params.length >= 2) ||
          (node.init.callee.name ===
            CustomIdentifier.MentursectionHamletiveBuilder &&
            node.init.typeParameters.params.length >= 2) ||
          (node.init.callee.name === CustomIdentifier.CortmumHamletiveBuilder &&
            node.init.typeParameters.params.length >= 2))
      );
    };

    type BaseIO<
      TIdentifier extends CustomIdentifier,
      TIsInput extends boolean,
      TTypeNode extends TSESTree.TypeNode | string | null,
    > = {
      customIdentifier: TIdentifier;
      isInput: TIsInput;
      typeNode: TTypeNode;
    };

    type Estinant2IO = BaseIO<
      CustomIdentifier.Estinant2,
      boolean,
      TSESTree.TypeNode
    >;

    type ValidationEstinant2IO =
      | BaseIO<CustomIdentifier.ValidationEstinant2, true, TSESTree.TypeNode>
      | BaseIO<
          CustomIdentifier.ValidationEstinant2,
          false,
          'ValidationResultQuirm'
        >;

    type WortinatorHamletiveBuilderIO =
      | BaseIO<
          CustomIdentifier.WortinatorHamletiveBuilder,
          true,
          TSESTree.TypeNode
        >
      | BaseIO<CustomIdentifier.WortinatorHamletiveBuilder, false, null>;

    type OnamaHamletiveBuilderIO = BaseIO<
      CustomIdentifier.OnamaHamletiveBuilder,
      boolean,
      TSESTree.TypeNode
    >;

    type MentursectionHamletiveBuilderIO = BaseIO<
      CustomIdentifier.MentursectionHamletiveBuilder,
      boolean,
      TSESTree.TypeNode
    >;

    type CortmumHamletiveBuilderIO = BaseIO<
      CustomIdentifier.CortmumHamletiveBuilder,
      boolean,
      TSESTree.TypeNode
    >;

    type Data3IO =
      | Estinant2IO
      | ValidationEstinant2IO
      | WortinatorHamletiveBuilderIO
      | OnamaHamletiveBuilderIO
      | MentursectionHamletiveBuilderIO
      | CortmumHamletiveBuilderIO;

    type Data3 = Merge<
      Data2,
      {
        io: Data3IO;
      }
    >;

    const data3AndErrorList = data2List.flatMap<Data3 | ErrorPlifal>((data) => {
      if (isEstinantLiteralDeclarator(data.declarator)) {
        switch (
          data.declarator.id.typeAnnotation.typeAnnotation.typeName.name
        ) {
          case CustomIdentifier.Estinant2:
            return [
              {
                ...data,
                io: {
                  isInput: true,
                  customIdentifier: CustomIdentifier.Estinant2,
                  typeNode:
                    data.declarator.id.typeAnnotation.typeAnnotation
                      .typeParameters.params[0],
                } satisfies Estinant2IO,
              },
              {
                ...data,
                io: {
                  isInput: false,
                  customIdentifier: CustomIdentifier.Estinant2,
                  typeNode:
                    data.declarator.id.typeAnnotation.typeAnnotation
                      .typeParameters.params[1],
                } satisfies Estinant2IO,
              },
            ];

          case CustomIdentifier.ValidationEstinant2:
            return [
              {
                ...data,
                io: {
                  isInput: true,
                  customIdentifier: CustomIdentifier.ValidationEstinant2,
                  typeNode:
                    data.declarator.id.typeAnnotation.typeAnnotation
                      .typeParameters.params[0],
                } satisfies ValidationEstinant2IO,
              },
              {
                ...data,
                io: {
                  isInput: false,
                  customIdentifier: CustomIdentifier.ValidationEstinant2,
                  typeNode: 'ValidationResultQuirm',
                } satisfies ValidationEstinant2IO,
              },
            ];
        }
      }

      if (isEstinantBuilderDeclarator(data.declarator)) {
        switch (data.declarator.init.callee.name) {
          case CustomIdentifier.WortinatorHamletiveBuilder:
            return [
              {
                ...data,
                io: {
                  isInput: true,
                  customIdentifier: CustomIdentifier.WortinatorHamletiveBuilder,
                  typeNode: data.declarator.init.typeParameters.params[0],
                } satisfies WortinatorHamletiveBuilderIO,
              },
              {
                ...data,
                io: {
                  isInput: false,
                  customIdentifier: CustomIdentifier.WortinatorHamletiveBuilder,
                  typeNode: null,
                } satisfies WortinatorHamletiveBuilderIO,
              },
            ];
          case CustomIdentifier.OnamaHamletiveBuilder:
            return [
              {
                ...data,
                io: {
                  isInput: true,
                  customIdentifier: CustomIdentifier.OnamaHamletiveBuilder,
                  typeNode: data.declarator.init.typeParameters.params[0],
                } satisfies OnamaHamletiveBuilderIO,
              },
              {
                ...data,
                io: {
                  isInput: false,
                  customIdentifier: CustomIdentifier.OnamaHamletiveBuilder,
                  typeNode: data.declarator.init.typeParameters.params[1],
                } satisfies OnamaHamletiveBuilderIO,
              },
            ];
          case CustomIdentifier.MentursectionHamletiveBuilder:
            return [
              {
                ...data,
                io: {
                  isInput: true,
                  customIdentifier:
                    CustomIdentifier.MentursectionHamletiveBuilder,
                  typeNode: data.declarator.init.typeParameters.params[0],
                } satisfies MentursectionHamletiveBuilderIO,
              },
              {
                ...data,
                io: {
                  isInput: false,
                  customIdentifier:
                    CustomIdentifier.MentursectionHamletiveBuilder,
                  typeNode: data.declarator.init.typeParameters.params[1],
                } satisfies MentursectionHamletiveBuilderIO,
              },
            ];
          case CustomIdentifier.CortmumHamletiveBuilder:
            return [
              {
                ...data,
                io: {
                  isInput: true,
                  customIdentifier: CustomIdentifier.CortmumHamletiveBuilder,
                  typeNode: data.declarator.init.typeParameters.params[0],
                } satisfies CortmumHamletiveBuilderIO,
              },
              {
                ...data,
                io: {
                  isInput: false,
                  customIdentifier: CustomIdentifier.CortmumHamletiveBuilder,
                  typeNode: data.declarator.init.typeParameters.params[1],
                } satisfies CortmumHamletiveBuilderIO,
              },
            ];
        }
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

    type ProgramCache = Map<string, TSESTree.TypeNode>;

    const findListType = (
      cache: ProgramCache,
      typeNode: TSESTree.TypeNode,
    ):
      | TSESTree.TSTupleType
      | TSESTree.TSArrayType
      | TSESTree.TSUnionType
      | ErrorPlifal => {
      if (typeNode.type === AST_NODE_TYPES.TSTupleType) {
        return typeNode;
      }

      if (typeNode.type === AST_NODE_TYPES.TSArrayType) {
        return typeNode;
      }

      if (typeNode.type === AST_NODE_TYPES.TSUnionType) {
        return typeNode;
      }

      if (
        typeNode.type === AST_NODE_TYPES.TSTypeOperator &&
        typeNode.operator === 'readonly' &&
        typeNode.typeAnnotation !== undefined
      ) {
        return findListType(cache, typeNode.typeAnnotation);
      }

      if (
        typeNode.type === AST_NODE_TYPES.TSTypeReference &&
        typeNode.typeName.type === AST_NODE_TYPES.Identifier &&
        typeNode.typeName.name === 'QuirmOptionTuple' &&
        typeNode.typeParameters !== undefined &&
        typeNode.typeParameters.params[0] !== undefined
      ) {
        return findListType(cache, typeNode.typeParameters.params[0]);
      }

      if (
        typeNode.type === AST_NODE_TYPES.TSTypeReference &&
        typeNode.typeName.type === AST_NODE_TYPES.Identifier &&
        cache.get(typeNode.typeName.name) !== undefined
      ) {
        return findListType(
          cache,
          cache.get(typeNode.typeName.name) as TSESTree.TypeNode,
        );
      }

      return buildErrorPlifal('Unhandled typeNode', typeNode);
    };

    const findTypeName = (
      cache: ProgramCache,
      typeNode: TSESTree.TypeNode,
    ): string[] => {
      if (
        typeNode.type === AST_NODE_TYPES.TSTypeReference &&
        typeNode.typeName.type === AST_NODE_TYPES.Identifier
      ) {
        if (
          ['InputQuirm', 'InputPlifal', 'OutputPlifal'].includes(
            typeNode.typeName.name,
          ) &&
          cache.get(typeNode.typeName.name) !== undefined
        ) {
          return findTypeName(
            cache,
            cache.get(typeNode.typeName.name) as TSESTree.TypeNode,
          );
        }

        return [typeNode.typeName.name];
      }

      if (typeNode.type === AST_NODE_TYPES.TSUnionType) {
        return typeNode.types.flatMap((node) => findTypeName(cache, node));
      }

      process.exit(1);
    };

    const getTypeNameOptionListList = (
      programCache: ProgramCache,
      listType: TSESTree.TypeNode | TSESTree.TSUnionType | TSESTree.TSArrayType,
    ): (string | null)[][] | ErrorPlifal => {
      if (listType.type === AST_NODE_TYPES.TSTupleType) {
        if (listType.elementTypes.length === 0) {
          return [[null]];
        }

        return listType.elementTypes.map((node) =>
          findTypeName(programCache, node),
        );
      }

      if (
        listType.type === AST_NODE_TYPES.TSTypeOperator &&
        listType.operator === 'readonly' &&
        listType.typeAnnotation !== undefined
      ) {
        return getTypeNameOptionListList(programCache, listType.typeAnnotation);
      }

      if (listType.type === AST_NODE_TYPES.TSUnionType) {
        let maxLength = 0;
        const typeNameOptionListListList = listType.types.map((subNode) => {
          const typeNameOptionListList = getTypeNameOptionListList(
            programCache,
            subNode,
          );

          if ('hubblepup' in typeNameOptionListList) {
            errorPlifalList.push(typeNameOptionListList);
            return [];
          }

          maxLength = Math.max(maxLength, typeNameOptionListList.length);

          return typeNameOptionListList;
        });

        const typeNameOptionListList = Array.from({
          length: maxLength,
        }).flatMap((unused, index) => {
          return typeNameOptionListListList
            .filter((x) => {
              return x.length > index;
            })
            .map((thing) => {
              return thing[index];
            })
            .filter((thing) => thing !== undefined);
        });

        return typeNameOptionListList;
      }

      if (
        listType.type === AST_NODE_TYPES.TSArrayType &&
        listType.elementType.type === AST_NODE_TYPES.TSTypeReference &&
        listType.elementType.typeName.type === AST_NODE_TYPES.Identifier
      ) {
        return [[listType.elementType.typeName.name]];
      }

      if (
        listType.type === AST_NODE_TYPES.TSArrayType &&
        listType.elementType.type === AST_NODE_TYPES.TSUnionType
      ) {
        return listType.elementType.types.map((subNode) =>
          findTypeName(programCache, subNode),
        );
      }

      return buildErrorPlifal('Unhandled list type', listType);
    };

    type Data4 = Merge<
      Data3,
      {
        io2: {
          isInput: boolean;
          typeNameOptionListList: (string | null)[][];
        };
      }
    >;

    const dataAndErrorList = data3List
      .map<ErrorPlifal | Data4>((data) => {
        const programCache: ProgramCache = new Map();

        data.estinantFile.hubblepup.grition.additionalMetadata.typeScriptProgram.body.forEach(
          (statement) => {
            if (
              statement.type === AST_NODE_TYPES.ExportNamedDeclaration &&
              statement.declaration !== null &&
              statement.declaration.type ===
                AST_NODE_TYPES.TSTypeAliasDeclaration
            ) {
              programCache.set(
                statement.declaration.id.name,
                statement.declaration.typeAnnotation,
              );
            } else if (
              statement.type === AST_NODE_TYPES.TSTypeAliasDeclaration
            ) {
              programCache.set(statement.id.name, statement.typeAnnotation);
            }
          },
        );

        if (data.io.isInput) {
          if (
            data.io.customIdentifier === CustomIdentifier.Estinant2 ||
            data.io.customIdentifier ===
              CustomIdentifier.CortmumHamletiveBuilder
          ) {
            const tupleType = findListType(programCache, data.io.typeNode);

            if ('hubblepup' in tupleType) {
              return tupleType;
            }

            const typeNameOptionListList = getTypeNameOptionListList(
              programCache,
              tupleType,
            );
            if ('hubblepup' in typeNameOptionListList) {
              return typeNameOptionListList;
            }

            return {
              ...data,
              io2: {
                isInput: true,
                typeNameOptionListList,
              },
            } satisfies Data4;
          }

          if (
            data.io.customIdentifier === CustomIdentifier.ValidationEstinant2 ||
            data.io.customIdentifier ===
              CustomIdentifier.WortinatorHamletiveBuilder ||
            data.io.customIdentifier ===
              CustomIdentifier.OnamaHamletiveBuilder ||
            data.io.customIdentifier ===
              CustomIdentifier.MentursectionHamletiveBuilder
          ) {
            const typeNameOptionList = findTypeName(
              programCache,
              data.io.typeNode,
            );

            return {
              ...data,
              io2: {
                isInput: true,
                typeNameOptionListList: [typeNameOptionList],
              },
            } satisfies Data4;
          }
        }

        if (
          data.io.customIdentifier ===
          CustomIdentifier.WortinatorHamletiveBuilder
        ) {
          return {
            ...data,
            io2: {
              isInput: false,
              typeNameOptionListList: [[null]],
            },
          } satisfies Data4;
        }

        if (data.io.customIdentifier === CustomIdentifier.ValidationEstinant2) {
          return {
            ...data,
            io2: {
              isInput: false,
              typeNameOptionListList: [[data.io.typeNode]],
            },
          } satisfies Data4;
        }

        if (
          data.io.customIdentifier ===
          CustomIdentifier.MentursectionHamletiveBuilder
        ) {
          const tupleType = findListType(programCache, data.io.typeNode);

          if ('hubblepup' in tupleType) {
            return tupleType;
          }

          const typeNames = getTypeNameOptionListList(programCache, tupleType);
          if ('hubblepup' in typeNames) {
            return typeNames;
          }

          const typeNameOptionList = typeNames.flat();

          return {
            ...data,
            io2: {
              isInput: false,
              typeNameOptionListList: [typeNameOptionList],
            },
          } satisfies Data4;
        }

        if (
          data.io.customIdentifier === CustomIdentifier.Estinant2 ||
          data.io.customIdentifier === CustomIdentifier.CortmumHamletiveBuilder
        ) {
          const tupleType = findListType(programCache, data.io.typeNode);

          if ('hubblepup' in tupleType) {
            return tupleType;
          }

          const typeNameOptionListList = getTypeNameOptionListList(
            programCache,
            tupleType,
          );
          if ('hubblepup' in typeNameOptionListList) {
            return typeNameOptionListList;
          }

          return {
            ...data,
            io2: {
              isInput: false,
              typeNameOptionListList,
            },
          } satisfies Data4;
        }

        if (
          data.io.customIdentifier === CustomIdentifier.OnamaHamletiveBuilder
        ) {
          const typeNameOptionList = findTypeName(
            programCache,
            data.io.typeNode,
          );

          return {
            ...data,
            io2: {
              isInput: false,
              typeNameOptionListList: [typeNameOptionList],
            },
          } satisfies Data4;
        }

        return buildErrorPlifal('Unhandled edge case', data.io);
      })
      .filter((x) => x !== undefined);

    const data4List: Data4[] = [];
    splitList<ErrorPlifal, Data4>({
      list: dataAndErrorList,
      isElementA: (x): x is ErrorPlifal => 'hubblepup' in x,
      accumulatorA: errorPlifalList,
      accumulatorB: data4List,
    });

    type Data5 =
      | {
          estinantName: string;
          voictentName: string;
          isInput: true;
          index: number;
        }
      | {
          estinantName: string;
          voictentName: string | null;
          isInput: false;
          index: null;
        };

    const data5List = data4List.flatMap<Data5>((data) => {
      return data.io2.typeNameOptionListList.flatMap(
        (typeNameOptionList, index) => {
          return typeNameOptionList.map((voictentName) => {
            if (data.io2.isInput) {
              if (voictentName === null) {
                throw Error('Unhandled scenario');
              }

              return {
                estinantName: data.estinantIdentifier,
                voictentName,
                isInput: true,
                index,
              };
            }

            return {
              estinantName: data.estinantIdentifier,
              voictentName,
              isInput: false,
              index: null,
            };
          });
        },
      );
    });

    const estinantCache = new Map<string, ProgramNode>();
    const inputCache = new Map<string, Map<number, ProgramNode>>();
    const voictentCache = new Map<string, ProgramNode>();
    const endNode: ProgramNode = {
      typeName: ProgramNodeTypeName.End,
      name: 'END',
      id: 'END',
    };

    data5List.forEach((data) => {
      const estinantNode = estinantCache.get(data.estinantName) ?? {
        typeName: ProgramNodeTypeName.Estinant,
        name: data.estinantName,
        id: `E${estinantCache.size}`,
      };
      estinantCache.set(data.estinantName, estinantNode);

      if (data.voictentName !== null) {
        const voictentNode = voictentCache.get(data.voictentName) ?? {
          typeName: ProgramNodeTypeName.Voictent,
          name: data.voictentName,
          id: `V${voictentCache.size}`,
        };
        voictentCache.set(data.voictentName, voictentNode);
      }

      if (data.isInput) {
        const nodeByInputIndex =
          inputCache.get(data.estinantName) ?? new Map<number, ProgramNode>();
        const inputNode = nodeByInputIndex.get(data.index) ?? {
          typeName: ProgramNodeTypeName.Input,
          name: `${data.index}`,
          id: `${estinantNode.id}_I${data.index}`,
        };
        nodeByInputIndex.set(data.index, inputNode);
        inputCache.set(data.estinantName, nodeByInputIndex);
      }
    });

    const programNodeSet = new Set<ProgramNode>([
      ...estinantCache.values(),
      ...voictentCache.values(),
      ...[...inputCache.values()].flatMap((x) => [...x.values()]),
      endNode,
    ]);

    const relationships = data5List.flatMap<ProgramNodeRelationship>((data) => {
      const nextRelationships: ProgramNodeRelationship[] = [];

      const estinantNode = estinantCache.get(data.estinantName) as ProgramNode;

      const otherNode =
        data.voictentName !== null
          ? (voictentCache.get(data.voictentName) as ProgramNode)
          : endNode;

      if (data.isInput) {
        const nodeByInputIndex = inputCache.get(data.estinantName) as Map<
          number,
          ProgramNode
        >;
        const inputNode = nodeByInputIndex.get(data.index) as ProgramNode;

        nextRelationships.push(
          {
            from: otherNode,
            to: inputNode,
          },
          {
            from: inputNode,
            to: estinantNode,
          },
        );
      } else {
        nextRelationships.push({
          from: estinantNode,
          to: otherNode,
        });
      }

      return nextRelationships;
    });

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

export const programFileC2Estinant1 = buildCortmumHamletive<
  InputTuple,
  OutputTuple,
  Struss
>({
  inputGeppTuple: [PROGRAM_FILE_B_GEPP],
  croard: kodatar,
  tropoig: cacheFiles,
});

export const programFileC2Estinant2 = buildCortmumHamletive<
  InputTuple,
  OutputTuple,
  Struss
>({
  inputGeppTuple: [TYPE_SCRIPT_FILE_D2_GEPP],
  croard: kodatar,
  tropoig: cacheFiles,
});
