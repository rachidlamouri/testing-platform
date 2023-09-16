import { InMemoryOdeshin2ListVoque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../utilities/simplify';
import {
  CommentedProgramBodyDeclaration,
  IdentifiableCommentedProgramBodyDeclaration,
  isIdentifiableCommentedProgramBodyDeclaration,
} from './commentedProgramBodyDeclaration';

const FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_ZORN_TEMPLATE = [
  'filePath',
] as const satisfies GenericZorn2Template;
type FileCommentedProgramBodyDeclarationGroupZornTemplate =
  typeof FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_ZORN_TEMPLATE;
class FileCommentedProgramBodyDeclarationGroupZorn extends Zorn2<FileCommentedProgramBodyDeclarationGroupZornTemplate> {
  get rawTemplate(): FileCommentedProgramBodyDeclarationGroupZornTemplate {
    return FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_ZORN_TEMPLATE;
  }
}

type FileCommentedProgramBodyDeclarationGroupConstructorInput = {
  filePath: string;
  list: CommentedProgramBodyDeclaration[];
};

/**
 * The set of top level declaration AST nodes that may have a comment and may
 * have an identifiable node
 *
 * @todo investigate why we wouldn't only want the ones with an identifiable node
 */
export type FileCommentedProgramBodyDeclarationGroup = SimplifyN<
  [
    {
      zorn: FileCommentedProgramBodyDeclarationGroupZorn;
    },
    FileCommentedProgramBodyDeclarationGroupConstructorInput,
    {
      declarationByIdentifier: Map<
        string,
        IdentifiableCommentedProgramBodyDeclaration
      >;
    },
  ]
>;

export const { FileCommentedProgramBodyDeclarationGroupInstance } =
  buildNamedConstructorFunction({
    constructorName:
      'FileCommentedProgramBodyDeclarationGroupInstance' as const,
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'zorn',
      'filePath',
      'list',
      'declarationByIdentifier',
    ] as const satisfies readonly (keyof FileCommentedProgramBodyDeclarationGroup)[],
  })
    .withTypes<
      FileCommentedProgramBodyDeclarationGroupConstructorInput,
      FileCommentedProgramBodyDeclarationGroup
    >({
      typeCheckErrorMesssages: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { filePath, list } = input;

        const zorn = new FileCommentedProgramBodyDeclarationGroupZorn({
          filePath,
        });

        const declarationByIdentifier = new Map(
          list
            .filter(isIdentifiableCommentedProgramBodyDeclaration)
            .map((declaration) => {
              return [
                declaration.identifiableNode.id.name,
                declaration,
              ] as const;
            }),
        );

        return {
          zorn,
          filePath,
          list,
          declarationByIdentifier,
        } satisfies FileCommentedProgramBodyDeclarationGroup;
      },
    })
    .assemble();

export const FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP =
  'file-commented-program-body-declaration-group';

type FileCommentedProgramBodyDeclarationGroupGepp =
  typeof FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP;

export type FileCommentedProgramBodyDeclarationGroupVoque =
  InMemoryOdeshin2ListVoque<
    FileCommentedProgramBodyDeclarationGroupGepp,
    FileCommentedProgramBodyDeclarationGroup
  >;
