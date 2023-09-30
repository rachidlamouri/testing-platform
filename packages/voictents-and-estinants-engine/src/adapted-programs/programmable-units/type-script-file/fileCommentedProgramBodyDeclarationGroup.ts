import Case from 'case';
import { InMemoryOdeshin2ListVoque } from '../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
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
import { assertNotUndefined } from '../../../package-agnostic-utilities/nil/assertNotUndefined';
import { hasOneElement } from '../../../package-agnostic-utilities/array/hasOneElement';
import { CommentTagId } from './comment/commentTagId';
import { DescriptiveBlockComment } from './comment/categorized/descriptiveBlockComment';
import { CategorizedComment } from './comment/categorized/categorizedComment';
import { CategorizedCommentTypeName } from './comment/categorized/categorizedCommentTypeName';

enum CanonicalDeclarationState {
  InvalidExplicitCanonicalDeclaration = 'InvalidExplicitCanonicalDeclaration',
  UseExplicitCanonicalDeclaration = 'UseExplicitCanonicalDeclaration',
  UseImplicitCanonicalDeclaration = 'UseImplicitCanonicalDeclaration',
  TooManyExplicitOptions = 'TooManyExplicitOptions',
  TooManyImplicitOptions = 'TooManyImplicitOptions',
  UseImplicitCanonicalVariantDeclaration = 'UseImplicitCanonicalVariantDeclaration',
  TooManyImplicitVariantOptions = 'TooManyImplicitVariantOptions',
  MissingCanonicalDeclaration = 'MissingCanonicalDeclaration',
}

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

export type CanonicalDeclarationLintMetadata = {
  state: CanonicalDeclarationState;
  badStateReason: string | null;
  remediationOptionList: string[] | null;
};

enum CanonicalCommentSource {
  CanonicalDeclaration = 'canonical declaration',
  File = 'file',
}

type CommentSourceStateA = {
  expectedCommentSource: CanonicalCommentSource.CanonicalDeclaration;
  sourceComment: CategorizedComment | null;
};

type CommentSourceStateB = {
  expectedCommentSource: CanonicalCommentSource.File;
  sourceComment: DescriptiveBlockComment;
};

type CommentSourceStateC = {
  expectedCommentSource: null;
  sourceComment: null;
};

type CommentSourceState =
  | CommentSourceStateA
  | CommentSourceStateB
  | CommentSourceStateC;

type CanonicalCommentState = {
  canonicalComment: DescriptiveBlockComment | null;
  badStateReason: string | null;
  remediationList: string[] | null;
};

export type CanonicalCommentLintMetadata = Omit<
  CanonicalCommentState,
  'canonicalComment'
>;

type FileCommentedProgramBodyDeclarationGroupConstructorInput = {
  filePath: string;
  list: CommentedProgramBodyDeclaration[];
  fileComment: DescriptiveBlockComment | null;
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
    Omit<
      FileCommentedProgramBodyDeclarationGroupConstructorInput,
      'fileComment'
    >,
    {
      declarationByIdentifier: Map<
        string,
        IdentifiableCommentedProgramBodyDeclaration
      >;
      declarationListByIdentifier: IdentifiableCommentedProgramBodyDeclarationListByName;
      canonicalDeclarationList: IdentifiableCommentedProgramBodyDeclaration[];
      derivativeDeclarationList: IdentifiableCommentedProgramBodyDeclaration[];
      canonicalDeclaration: IdentifiableCommentedProgramBodyDeclaration | null;
      canonicalDeclarationLintMetadata: CanonicalDeclarationLintMetadata;
      canonicalComment: DescriptiveBlockComment | null;
      canonicalCommentLintMetadata: CanonicalCommentLintMetadata;
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
      'canonicalDeclarationLintMetadata',
      'canonicalComment',
      'canonicalCommentLintMetadata',
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
        const { filePath, list, fileComment } = input;

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

        const explicitCanonicalDeclarationList = list.filter(
          (
            declaration,
          ): declaration is IdentifiableCommentedProgramBodyDeclaration => {
            return (
              declaration.isExplicitlyCanonical &&
              declaration.identifiableNode !== null
            );
          },
        );

        const implicitCanonicalDeclarationList = list.filter(
          (
            declaration,
          ): declaration is IdentifiableCommentedProgramBodyDeclaration => {
            return declaration.isImplicitlyCanonical;
          },
        );

        const implicitCanonicalVariantDeclarationList = list.filter(
          (
            declaration,
          ): declaration is IdentifiableCommentedProgramBodyDeclaration => {
            return declaration.isImplicitCanonicalVariant;
          },
        );

        const hasExplicitCanonicalDeclarationOption =
          explicitCanonicalDeclarationList.length > 0;

        const theExplicitCanonicalDeclaration = hasOneElement(
          explicitCanonicalDeclarationList,
        )
          ? explicitCanonicalDeclarationList[0]
          : null;

        const hasMultipleExplicitCanonicalDeclarationOptions =
          explicitCanonicalDeclarationList.length > 1;

        const hasImplicitCanonicalDeclarationOption =
          implicitCanonicalDeclarationList.length > 0;

        const hasMultipleImplicitCanonicalDeclarationOptions =
          implicitCanonicalDeclarationList.length > 1;

        const hasExactlyOneImplicitCanonicalDeclarationOption =
          hasImplicitCanonicalDeclarationOption &&
          !hasMultipleImplicitCanonicalDeclarationOptions;

        const hasImplicitCanonicalVariantDeclarationOption =
          implicitCanonicalVariantDeclarationList.length > 0;

        const hasMultipleImplicitCanonicalVariantDeclarationOptions =
          implicitCanonicalVariantDeclarationList.length > 1;

        const hasExactlyOneImplicitCanonicalVariantDeclarationOption =
          hasImplicitCanonicalVariantDeclarationOption &&
          !hasMultipleImplicitCanonicalVariantDeclarationOptions;

        let state: CanonicalDeclarationState;
        let badStateReason: string | null;
        let remediationOptionList: string[] | null;
        if (
          theExplicitCanonicalDeclaration !== null &&
          // note: this file is not responsible for the case where there the explicit declaration is the only implicit declaration. It's redundant, but does not change the canonical declaration
          (!hasImplicitCanonicalDeclarationOption ||
            theExplicitCanonicalDeclaration.isImplicitlyCanonical)
        ) {
          state = CanonicalDeclarationState.UseExplicitCanonicalDeclaration;
          badStateReason = null;
          remediationOptionList = null;
        } else if (
          theExplicitCanonicalDeclaration !== null &&
          !theExplicitCanonicalDeclaration.isImplicitlyCanonical &&
          hasImplicitCanonicalDeclarationOption
        ) {
          state = CanonicalDeclarationState.InvalidExplicitCanonicalDeclaration;

          badStateReason =
            'The explicit canonical declaration cannot be a non-implicit canonical declaration when there are implicit canonical declarations available.';
          remediationOptionList = hasMultipleImplicitCanonicalDeclarationOptions
            ? [
                `Designate one of the implicit canonical declarations as the canonical declaration with an @${CommentTagId.ExplicitCanonicalDeclaration} tag.`,
              ]
            : [
                `Remove all @${CommentTagId.ExplicitCanonicalDeclaration} tag, since there is an implicit canonical declaration.`,
              ];
        } else if (
          hasExactlyOneImplicitCanonicalDeclarationOption &&
          !hasExplicitCanonicalDeclarationOption
        ) {
          state = CanonicalDeclarationState.UseImplicitCanonicalDeclaration;
          badStateReason = null;
          remediationOptionList = null;
        } else if (
          hasMultipleExplicitCanonicalDeclarationOptions &&
          !hasExactlyOneImplicitCanonicalDeclarationOption
        ) {
          state = CanonicalDeclarationState.TooManyExplicitOptions;
          badStateReason = `There can only be one explicit canonical declaration if there are no implicit canonical declarations.`;
          remediationOptionList = [
            `Remove @${CommentTagId.ExplicitCanonicalDeclaration} tags until there is only one.`,
          ];
        } else if (
          hasMultipleImplicitCanonicalDeclarationOptions &&
          !hasExplicitCanonicalDeclarationOption
        ) {
          state = CanonicalDeclarationState.TooManyImplicitOptions;
          badStateReason = `There can only be one implicit canonical declaration.`;
          remediationOptionList = [
            `Use the @${CommentTagId.ExplicitCanonicalDeclaration} tag to designate the canonical declaration.`,
          ];
        } else if (hasExactlyOneImplicitCanonicalVariantDeclarationOption) {
          state =
            CanonicalDeclarationState.UseImplicitCanonicalVariantDeclaration;

          badStateReason = null;
          remediationOptionList = null;
        } else if (hasMultipleImplicitCanonicalVariantDeclarationOptions) {
          state = CanonicalDeclarationState.TooManyImplicitVariantOptions;
          badStateReason =
            'There is more than one implicit canonical variant declaration.';
          remediationOptionList = [
            `Use an @${CommentTagId.ExplicitCanonicalDeclaration} tag to designate the canonical declaration`,
            'Add a canonical declaration',
          ];
        } else {
          state = CanonicalDeclarationState.MissingCanonicalDeclaration;
          badStateReason = 'File is missing a canonical declaration';
          remediationOptionList = [
            'Add a canonical declaration',
            `Designate a top level declaration as the canonical declaration with the @${CommentTagId.ExplicitCanonicalDeclaration} tag.`,
            `Add the @${CommentTagId.CanonicalDeclarationExemption} tag to the file comment`,
          ];
        }

        const canonicalDeclaration = (():
          | IdentifiableCommentedProgramBodyDeclaration
          | null
          | undefined => {
          switch (state) {
            case CanonicalDeclarationState.UseExplicitCanonicalDeclaration:
              return explicitCanonicalDeclarationList[0];
            case CanonicalDeclarationState.UseImplicitCanonicalDeclaration:
              return implicitCanonicalDeclarationList[0];
            case CanonicalDeclarationState.UseImplicitCanonicalVariantDeclaration:
              return implicitCanonicalVariantDeclarationList[0];
            case CanonicalDeclarationState.InvalidExplicitCanonicalDeclaration:
            case CanonicalDeclarationState.TooManyExplicitOptions:
            case CanonicalDeclarationState.TooManyImplicitOptions:
            case CanonicalDeclarationState.TooManyImplicitVariantOptions:
            case CanonicalDeclarationState.MissingCanonicalDeclaration:
              return null;
          }
        })();

        // note: if this fails, then the "state" logic above is wrong
        assertNotUndefined(canonicalDeclaration);

        let commentSourceState: CommentSourceState;
        if (canonicalDeclaration !== null) {
          commentSourceState = {
            expectedCommentSource: CanonicalCommentSource.CanonicalDeclaration,
            sourceComment: canonicalDeclaration.comment,
          } satisfies CommentSourceStateA;
        } else if (fileComment !== null) {
          commentSourceState = {
            expectedCommentSource: CanonicalCommentSource.File,
            sourceComment: fileComment,
          } satisfies CommentSourceStateB;
        } else {
          commentSourceState = {
            expectedCommentSource: null,
            sourceComment: null,
          } satisfies CommentSourceStateC;
        }

        const { canonicalComment, ...canonicalCommentLintMetadata } =
          ((): CanonicalCommentState => {
            switch (commentSourceState.expectedCommentSource) {
              case CanonicalCommentSource.CanonicalDeclaration: {
                if (commentSourceState.sourceComment === null) {
                  return {
                    canonicalComment: null,
                    badStateReason:
                      'Canonical declaration is missing a comment.',
                    remediationList: [
                      'Add a comment to the canonical declaration.',
                    ],
                  };
                }

                if (
                  commentSourceState.sourceComment.typeName !==
                  CategorizedCommentTypeName.Descriptive
                ) {
                  return {
                    canonicalComment: null,
                    badStateReason:
                      'Canonical declaration comment must be a jsdoc-like block comment.',
                    remediationList: [
                      'Convert canonical declaration comment to a jsdoc-like block comment.',
                    ],
                  };
                }

                return {
                  canonicalComment: commentSourceState.sourceComment,
                  badStateReason: null,
                  remediationList: null,
                };
              }
              case CanonicalCommentSource.File: {
                return {
                  canonicalComment: commentSourceState.sourceComment,
                  badStateReason: null,
                  remediationList: null,
                };
              }
              case null: {
                return {
                  canonicalComment: null,
                  badStateReason:
                    'Unable to find a source for a canonical comment.',
                  remediationList: [
                    'Add a canonical declaration.',
                    'Add a file comment.',
                  ],
                };
              }
            }
          })();

        return {
          zorn,
          filePath,
          list,
          declarationByIdentifier,
          declarationListByIdentifier,
          canonicalDeclarationList: implicitCanonicalDeclarationList,
          derivativeDeclarationList: implicitCanonicalVariantDeclarationList,
          canonicalDeclaration,
          canonicalDeclarationLintMetadata: {
            state,
            badStateReason,
            remediationOptionList,
          },
          canonicalComment,
          canonicalCommentLintMetadata,
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
