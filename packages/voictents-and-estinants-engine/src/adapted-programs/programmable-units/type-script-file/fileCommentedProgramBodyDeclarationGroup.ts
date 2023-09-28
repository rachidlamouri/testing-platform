import Case from 'case';
import { InMemoryOdeshin2ListVoque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../package-agnostic-utilities/datastructure/zorn';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';
import {
  CommentedProgramBodyDeclaration,
  IdentifiableCommentedProgramBodyDeclaration,
  isIdentifiableCommentedProgramBodyDeclaration,
} from './commentedProgramBodyDeclaration';
import { hasOneElement } from '../../../package-agnostic-utilities/array/hasOneElement';

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

class IdentifiableCommentedProgramBodyDeclarationListByName extends Map<
  string,
  IdentifiableCommentedProgramBodyDeclaration[]
> {
  constructor(
    sublistEntryList: (readonly [
      key: string,
      value: IdentifiableCommentedProgramBodyDeclaration,
    ])[],
  ) {
    super();

    sublistEntryList.forEach(([name, value]) => {
      this.addToSublist(name, value);
    });
  }

  private normalizeKey(key: string): string {
    const normalizedKey = Case.kebab(key);
    return normalizedKey;
  }

  set(key: string, value: IdentifiableCommentedProgramBodyDeclaration[]): this {
    const normalizedKey = this.normalizeKey(key);
    super.set(normalizedKey, value);
    return this;
  }

  addToSublist(
    key: string,
    value: IdentifiableCommentedProgramBodyDeclaration,
  ): void {
    const sublist = this.get(key) ?? [];
    sublist.push(value);
    this.set(key, sublist);
  }

  get(key: string): IdentifiableCommentedProgramBodyDeclaration[] | undefined {
    const normalizedKey = this.normalizeKey(key);
    const value = super.get(normalizedKey);
    return value;
  }
}

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
      declarationListByIdentifier: IdentifiableCommentedProgramBodyDeclarationListByName;
      canonicalDeclarationList: IdentifiableCommentedProgramBodyDeclaration[];
      derivativeDeclarationList: IdentifiableCommentedProgramBodyDeclaration[];
      canonicalDeclaration: IdentifiableCommentedProgramBodyDeclaration | null;
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
      'declarationListByIdentifier',
      'canonicalDeclarationList',
      'derivativeDeclarationList',
      'canonicalDeclaration',
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

        const declarationListByIdentifier =
          new IdentifiableCommentedProgramBodyDeclarationListByName(
            list
              .filter(isIdentifiableCommentedProgramBodyDeclaration)
              .map((declaration) => {
                return [
                  declaration.identifiableNode.id.name,
                  declaration,
                ] as const;
              }),
          );

        const canonicalDeclarationList = list.filter(
          (
            declaration,
          ): declaration is IdentifiableCommentedProgramBodyDeclaration => {
            return declaration.isCanonical;
          },
        );

        const derivativeDeclarationList = list.filter(
          (
            declaration,
          ): declaration is IdentifiableCommentedProgramBodyDeclaration => {
            return declaration.isDerivative;
          },
        );

        // TODO: handle the case when a file has two canonical declarations or two derivative declarations
        let canonicalDeclaration: IdentifiableCommentedProgramBodyDeclaration | null;
        if (hasOneElement(canonicalDeclarationList)) {
          [canonicalDeclaration] = canonicalDeclarationList;
        } else if (
          canonicalDeclarationList.length === 0 &&
          hasOneElement(derivativeDeclarationList)
        ) {
          [canonicalDeclaration] = derivativeDeclarationList;
        } else {
          canonicalDeclaration = null;
        }

        return {
          zorn,
          filePath,
          list,
          declarationByIdentifier,
          declarationListByIdentifier,
          canonicalDeclarationList,
          derivativeDeclarationList,
          canonicalDeclaration,
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
