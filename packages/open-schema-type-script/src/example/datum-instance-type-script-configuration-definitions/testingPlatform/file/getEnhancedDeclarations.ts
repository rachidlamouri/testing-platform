// Skip

import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { ExportDeclaration } from './getExportDeclarations';

export type ReferenceTypeName = 'code' | 'type' | 'hybrid';

export type EnhancedDeclaration = {
  typeName: ReferenceTypeName | null;
  identifier: string;
};

export const getEnhancedDeclarations = (
  debugFilePath: string,
  declarations: ExportDeclaration[],
): EnhancedDeclaration[] => {
  const enhancedDeclarations = declarations.flatMap<EnhancedDeclaration>(
    (statement) => {
      if (statement.type === AST_NODE_TYPES.ExportAllDeclaration) {
        if (statement.exported === null) {
          throw Error(`Unhandled scenario: null exported in ${debugFilePath}`);
        }

        return {
          typeName: null,
          identifier: statement.exported.name,
        };
      }

      if (statement.declaration === null) {
        return statement.specifiers.map<EnhancedDeclaration>((specifier) => {
          return {
            typeName: null,
            identifier: specifier.exported.name,
          };
        });
      }

      switch (statement.declaration.type) {
        case AST_NODE_TYPES.TSTypeAliasDeclaration:
          return {
            typeName: 'type',
            identifier: statement.declaration.id.name,
          } satisfies EnhancedDeclaration;
        case AST_NODE_TYPES.TSEnumDeclaration:
        case AST_NODE_TYPES.ClassDeclaration:
          if (statement.declaration.id === null) {
            throw Error(
              `Null identifier for ${statement.declaration.type} in ${debugFilePath}`,
            );
          }

          return {
            typeName: 'hybrid',
            identifier: statement.declaration.id.name,
          } satisfies EnhancedDeclaration;
        case AST_NODE_TYPES.VariableDeclaration: {
          return statement.declaration.declarations
            .filter((x): x is typeof x & { id: TSESTree.Identifier } => {
              return x.id.type === AST_NODE_TYPES.Identifier;
            })
            .map<EnhancedDeclaration>((declaration) => {
              return {
                typeName: 'code',
                identifier: declaration.id.name,
              };
            });
        }
        default:
          throw Error(
            `Unhandled export named declaration declaration type: ${statement.declaration.type} for file: ${debugFilePath}`,
          );
      }
    },
  );

  return enhancedDeclarations;
};
