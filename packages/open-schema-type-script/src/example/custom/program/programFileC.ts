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
}

export type ProgramNode = {
  typeName: ProgramNodeTypeName;
  name: string;
};

export type ProgramNodeRelationship = {
  from: ProgramNode;
  to: ProgramNode;
};

export type ProgramFileC = File<
  FileExtensionSuffixIdentifier.TypeScript,
  {
    programName: string;
    programNodeSet: Set<ProgramNode>;
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

  getPlifalTuple(): (ProgramFileCPlifal | ErrorPlifal)[] {
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
        declarations: [
          TSESTree.VariableDeclarator & {
            id: TSESTree.Identifier;
            init: TSESTree.Expression;
          },
        ];
      };
    };

    type Data2 = Merge<Data1, { exportDeclaration: EstinantExportDeclaration }>;

    const data2AndErrorList = data1List.map<Data2 | ErrorPlifal>((data) => {
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

      if (exportDeclaration === undefined) {
        return buildErrorPlifal(
          'Unable to find export',
          data.estinantFile.hubblepup.grition.additionalMetadata
            .typeScriptProgram.body,
        );
      }

      return {
        ...data,
        exportDeclaration,
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
      { initExpression: TSESTree.CallExpression | TSESTree.ObjectExpression }
    >;

    const data3AndErrorList = data2List.map<Data3 | ErrorPlifal>((data) => {
      const initExpression =
        data.exportDeclaration.declaration.declarations[0].init;

      switch (initExpression.type) {
        case AST_NODE_TYPES.CallExpression:
        case AST_NODE_TYPES.ObjectExpression:
          return {
            ...data,
            initExpression,
          };
        default:
          return buildErrorPlifal(
            `Unknown expression type ${initExpression.type}`,
            data.exportDeclaration,
          );
      }
    });

    const data3List: Data3[] = [];
    splitList<ErrorPlifal, Data3>({
      list: data3AndErrorList,
      isElementA: (x): x is ErrorPlifal => 'hubblepup' in x,
      accumulatorA: errorPlifalList,
      accumulatorB: data3List,
    });

    type Data4 = Merge<
      Data3,
      { estinantInitObjectExpression: TSESTree.ObjectExpression }
    >;

    const data4AndErrorList = data3List.map<Data4 | ErrorPlifal>((data) => {
      if (data.initExpression.type === AST_NODE_TYPES.ObjectExpression) {
        return {
          ...data,
          estinantInitObjectExpression: data.initExpression,
        };
      }

      if (
        data.initExpression.arguments[0] !== undefined &&
        data.initExpression.arguments[0].type ===
          AST_NODE_TYPES.ObjectExpression
      ) {
        return {
          ...data,
          estinantInitObjectExpression: data.initExpression.arguments[0],
        };
      }

      return buildErrorPlifal('Unhandled init expression', data.initExpression);
    });

    const data4List: Data4[] = [];
    splitList<ErrorPlifal, Data4>({
      list: data4AndErrorList,
      isElementA: (x): x is ErrorPlifal => 'hubblepup' in x,
      accumulatorA: errorPlifalList,
      accumulatorB: data4List,
    });

    type IdentifiableMemberExpression = TSESTree.MemberExpression & {
      object: TSESTree.Identifier;
      property: TSESTree.Identifier;
    };

    type InputGeppPropertyValue =
      | TSESTree.Identifier
      | IdentifiableMemberExpression
      | TSESTree.StringLiteral;

    type InputGeppProperty = TSESTree.Property & {
      key: TSESTree.Identifier & {
        name: 'inputGepp';
      };
      value: InputGeppPropertyValue;
    };

    type InputGeppTupleProperty = TSESTree.Property & {
      key: TSESTree.Identifier & {
        name: 'inputGeppTuple';
      };
      value: TSESTree.ArrayExpression & {
        elements: InputGeppPropertyValue[];
      };
    };

    type Data5 = Merge<
      Data4,
      { geppPropertyValueTuple: InputGeppPropertyValue[] }
    >;

    const data5AndErrorList = data4List.map<Data5 | ErrorPlifal>((data) => {
      const isIdentifier = (node: TSESTree.Node): node is TSESTree.Identifier =>
        node.type === AST_NODE_TYPES.Identifier;
      const isIdentifiableMemberExpression = (
        node: TSESTree.Node,
      ): node is IdentifiableMemberExpression =>
        node.type === AST_NODE_TYPES.MemberExpression &&
        node.object.type === AST_NODE_TYPES.Identifier &&
        node.property.type === AST_NODE_TYPES.Identifier;
      const isStringLiteral = (
        node: TSESTree.Node,
      ): node is TSESTree.StringLiteral =>
        node.type === AST_NODE_TYPES.Literal && typeof node.value === 'string';

      const isInputGeppPropertyValue = (
        node: TSESTree.Node,
      ): node is InputGeppPropertyValue =>
        isIdentifier(node) ||
        isIdentifiableMemberExpression(node) ||
        isStringLiteral(node);

      const isInputGeppProperty = (
        property: TSESTree.ObjectLiteralElement,
      ): property is InputGeppProperty => {
        return (
          property.type === AST_NODE_TYPES.Property &&
          property.key.type === AST_NODE_TYPES.Identifier &&
          property.key.name === 'inputGepp' &&
          isInputGeppPropertyValue(property.value)
        );
      };

      const isInputGeppTupleProperty = (
        property: TSESTree.ObjectLiteralElement,
      ): property is InputGeppTupleProperty => {
        return (
          property.type === AST_NODE_TYPES.Property &&
          property.key.type === AST_NODE_TYPES.Identifier &&
          property.key.name === 'inputGeppTuple' &&
          property.value.type === AST_NODE_TYPES.ArrayExpression &&
          property.value.elements.every(
            (element): element is InputGeppPropertyValue =>
              element !== null && isInputGeppPropertyValue(element),
          )
        );
      };

      const property1 =
        data.estinantInitObjectExpression.properties.find(isInputGeppProperty);

      if (property1 !== undefined) {
        return {
          ...data,
          geppPropertyValueTuple: [property1.value],
        } satisfies Data5;
      }

      const property2 = data.estinantInitObjectExpression.properties.find(
        isInputGeppTupleProperty,
      );

      if (property2 !== undefined) {
        return {
          ...data,
          geppPropertyValueTuple: property2.value.elements,
        } satisfies Data5;
      }

      return buildErrorPlifal(
        'Unhandled object expression',
        data.estinantInitObjectExpression.properties,
      );
    });

    const data5List: Data5[] = [];
    splitList<ErrorPlifal, Data5>({
      list: data5AndErrorList,
      isElementA: (x): x is ErrorPlifal => 'hubblepup' in x,
      accumulatorA: errorPlifalList,
      accumulatorB: data5List,
    });

    type Data6 = {
      estinantName: string;
      geppNameTuple: string[];
    };

    const data6List = data5List.map<Data6>((data) => {
      // eslint-disable-next-line array-callback-return
      const geppNameTuple = data.geppPropertyValueTuple.map((node) => {
        switch (node.type) {
          case AST_NODE_TYPES.Identifier:
            return node.name;
          case AST_NODE_TYPES.MemberExpression:
            return `${node.object.name}_${node.property.name}`;
          case AST_NODE_TYPES.Literal:
            return node.value;
        }
      });

      return {
        estinantName: data.estinantIdentifier,
        geppNameTuple,
      };
    });

    type Data7 = {
      estinantNode: ProgramNode;
      voictentNodeTuple: ProgramNode[];
    };

    const data7List = data6List.map<Data7>(
      ({ estinantName, geppNameTuple }) => {
        const estinantNode: ProgramNode = {
          typeName: ProgramNodeTypeName.Estinant,
          name: estinantName,
        };

        const voictentNodeTuple = geppNameTuple.map((geppName) => {
          const voictentNode: ProgramNode = {
            typeName: ProgramNodeTypeName.Voictent,
            name: geppName,
          };
          return voictentNode;
        });

        return {
          estinantNode,
          voictentNodeTuple,
        };
      },
    );

    const programNodeSet = new Set<ProgramNode>();
    data7List.forEach(({ estinantNode, voictentNodeTuple }) => {
      programNodeSet.add(estinantNode);
      voictentNodeTuple.forEach((node) => programNodeSet.add(node));
    });

    const relationships = data7List.flatMap<ProgramNodeRelationship>(
      ({ estinantNode, voictentNodeTuple }) => {
        const nextRelationships =
          voictentNodeTuple.map<ProgramNodeRelationship>((voictentNode) => {
            const relationship: ProgramNodeRelationship = {
              from: voictentNode,
              to: estinantNode,
            };

            return relationship;
          });

        return nextRelationships;
      },
    );

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
    .flatMap((x) => x.getPlifalTuple());

  return outputPlifals;
};

export const programFileCEstinant1: Estinant2<InputTuple, OutputTuple, Struss> =
  {
    inputGeppTuple: [PROGRAM_FILE_B_GEPP],
    croard: kodatar,
    tropoig: cacheFiles,
  };

export const programFileCEstinant2: Estinant2<InputTuple, OutputTuple, Struss> =
  {
    inputGeppTuple: [TYPE_SCRIPT_FILE_D2_GEPP],
    croard: kodatar,
    tropoig: cacheFiles,
  };
