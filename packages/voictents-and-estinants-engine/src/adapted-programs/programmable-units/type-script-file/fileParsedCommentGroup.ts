import { InMemoryOdeshin2ListVoque } from '../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../package-agnostic-utilities/datastructure/zorn';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';
import { CategorizedComment } from './comment/categorized/categorizedComment';
import { DescriptiveBlockComment } from './comment/categorized/descriptiveBlockComment';

const FILE_PARSED_COMMENT_GROUP_ZORN_TEMPLATE = [
  'filePath',
] as const satisfies GenericZorn2Template;
type FileParsedCommentGroupZornTemplate =
  typeof FILE_PARSED_COMMENT_GROUP_ZORN_TEMPLATE;
class FileParsedCommentGroupZorn extends Zorn2<FileParsedCommentGroupZornTemplate> {
  get rawTemplate(): FileParsedCommentGroupZornTemplate {
    return FILE_PARSED_COMMENT_GROUP_ZORN_TEMPLATE;
  }
}

type FileParsedCommentGroupConstructorInput = {
  filePath: string;
  list: CategorizedComment[];
  fileComment: DescriptiveBlockComment | null;
};

/**
 * The categorized set of comments for a TypeScript file
 */
type FileParsedCommentGroup = SimplifyN<
  [
    {
      zorn: FileParsedCommentGroupZorn;
    },
    FileParsedCommentGroupConstructorInput,
  ]
>;

export const { FileParsedCommentGroupInstance } = buildNamedConstructorFunction(
  {
    constructorName: 'FileParsedCommentGroupInstance' as const,
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'zorn',
      'filePath',
      'list',
      'fileComment',
    ] as const satisfies readonly (keyof FileParsedCommentGroup)[],
  },
)
  .withTypes<FileParsedCommentGroupConstructorInput, FileParsedCommentGroup>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { filePath } = input;

      const zorn = new FileParsedCommentGroupZorn({
        filePath,
      });

      return {
        zorn,
        ...input,
      } satisfies FileParsedCommentGroup;
    },
  })
  .assemble();

export const FILE_PARSED_COMMENT_GROUP_GEPP = 'file-parsed-comment-group';

type FileParsedCommentGroupGepp = typeof FILE_PARSED_COMMENT_GROUP_GEPP;

export type FileParsedCommentGroupVoque = InMemoryOdeshin2ListVoque<
  FileParsedCommentGroupGepp,
  FileParsedCommentGroup
>;
