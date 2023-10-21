import { FileSourceInstance } from '../../adapted-programs/programmable-units/linting/source/fileSource';
import { LeafSource } from '../../adapted-programs/programmable-units/linting/source/leafSource';
import {
  RequestSource,
  RequestSourceInstance,
} from '../../adapted-programs/programmable-units/linting/source/requestSource';
import { buildNamedConstructorFunction } from '../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../package-agnostic-utilities/type/simplify';
import { InMemoryIdentifiableItem3StreamMetatype } from '../collection/inMemoryIdentifiableItemCollection2';

const FILE_EXISTENCE_ASSERTER_INPUT_ID_TEMPLATE = [
  ['requestor', ComplexId.ANY],
  'filePath',
] as const satisfies GenericComplexIdTemplate;
type FileExistenceAsserterInputIdTemplate =
  typeof FILE_EXISTENCE_ASSERTER_INPUT_ID_TEMPLATE;
class FileExistenceAsserterInputId extends ComplexId<FileExistenceAsserterInputIdTemplate> {
  get rawTemplate(): FileExistenceAsserterInputIdTemplate {
    return FILE_EXISTENCE_ASSERTER_INPUT_ID_TEMPLATE;
  }
}

type FileExistenceAsserterInputConstructorInput = {
  filePath: string;
  /** The thing that wants to know if this file exists */
  requestor: LeafSource;
};

/**
 * The input to the assertFileExists transform
 */
type FileExistenceAsserterInput = SimplifyN<
  [
    {
      id: FileExistenceAsserterInputId;
    },
    Omit<FileExistenceAsserterInputConstructorInput, 'requestor'>,
    {
      requestSource: RequestSource;
    },
  ]
>;

export const { FileExistenceAsserterInputInstance } =
  buildNamedConstructorFunction({
    constructorName: 'FileExistenceAsserterInputInstance' as const,
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'id',
      'filePath',
      'requestSource',
    ] as const satisfies readonly (keyof FileExistenceAsserterInput)[],
  })
    .withTypes<
      FileExistenceAsserterInputConstructorInput,
      FileExistenceAsserterInput
    >({
      typeCheckErrorMessage: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { filePath, requestor } = input;

        const id = new FileExistenceAsserterInputId({
          requestor,
          filePath,
        });

        const requestSource = new RequestSourceInstance({
          requestor,
          requestee: new FileSourceInstance({
            filePath,
          }),
        });

        return {
          id,
          ...input,
          requestSource,
        } satisfies FileExistenceAsserterInput;
      },
    })
    .assemble();

export const FILE_EXISTENCE_ASSERTER_INPUT_COLLECTION_ID =
  'file-existence-asserter-input';

type FileExistenceAsserterInputCollectionId =
  typeof FILE_EXISTENCE_ASSERTER_INPUT_COLLECTION_ID;

export type FileExistenceAsserterInputStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    FileExistenceAsserterInputCollectionId,
    FileExistenceAsserterInput
  >;
