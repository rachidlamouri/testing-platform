import { TSESTree } from '@typescript-eslint/typescript-estree';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { IdentifiableProgramBodyStatementNode } from './getIdentifiableProgramBodyStatementNode';
import { CategorizedComment } from './comment/categorized/categorizedComment';

/**
 * A top level declaration of a file and its associated comment
 *
 * @todo rename this to CommentedProgramBodyStatement
 */
export type CommentedProgramBodyDeclaration<
  TBodyStatement extends TSESTree.ProgramStatement = TSESTree.ProgramStatement,
  TIdentifiableNode extends IdentifiableProgramBodyStatementNode | null = IdentifiableProgramBodyStatementNode | null,
> = {
  isImplicitlyCanonical: boolean;
  isImplicitCanonicalVariant: boolean;
  isExplicitlyCanonical: boolean;
  comment: CategorizedComment | null;
  /** @deprecated in favor of "comment" */
  commentText: string | null;
  bodyStatement: TBodyStatement;
  identifiableNode: TIdentifiableNode;
};

export type IdentifiableCommentedProgramBodyDeclaration =
  CommentedProgramBodyDeclaration<
    TSESTree.ProgramStatement,
    IdentifiableProgramBodyStatementNode
  >;

export const isIdentifiableCommentedProgramBodyDeclaration = (
  declaration: CommentedProgramBodyDeclaration,
): declaration is IdentifiableCommentedProgramBodyDeclaration => {
  return declaration.identifiableNode !== null;
};

export const { CommentedProgramBodyDeclarationInstance } =
  buildNamedConstructorFunction({
    constructorName: 'CommentedProgramBodyDeclarationInstance' as const,
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'isImplicitlyCanonical',
      'isImplicitCanonicalVariant',
      'isExplicitlyCanonical',
      'comment',
      'commentText',
      'bodyStatement',
      'identifiableNode',
    ] as const satisfies readonly (keyof CommentedProgramBodyDeclaration)[],
  })
    .withTypes<
      CommentedProgramBodyDeclaration,
      CommentedProgramBodyDeclaration
    >({
      typeCheckErrorMessage: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => input,
    })
    .assemble();
