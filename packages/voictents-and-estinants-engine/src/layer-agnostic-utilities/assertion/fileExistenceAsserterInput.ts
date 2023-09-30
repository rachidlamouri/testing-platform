import { FileSourceInstance } from '../../adapted-programs/programmable-units/linting/source/fileSource';
import { LeafSource } from '../../adapted-programs/programmable-units/linting/source/leafSource';
import {
  RequestSource,
  RequestSourceInstance,
} from '../../adapted-programs/programmable-units/linting/source/requestSource';
import { buildNamedConstructorFunction } from '../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../package-agnostic-utilities/datastructure/zorn';
import { SimplifyN } from '../../package-agnostic-utilities/type/simplify';
import { InMemoryOdeshin2ListVoque } from '../voictent/inMemoryOdeshinVoictent2';

const FILE_EXISTENCE_ASSERTER_INPUT_ZORN_TEMPLATE = [
  ['requestor', Zorn2.ANY],
  'filePath',
] as const satisfies GenericZorn2Template;
type FileExistenceAsserterInputZornTemplate =
  typeof FILE_EXISTENCE_ASSERTER_INPUT_ZORN_TEMPLATE;
class FileExistenceAsserterInputZorn extends Zorn2<FileExistenceAsserterInputZornTemplate> {
  get rawTemplate(): FileExistenceAsserterInputZornTemplate {
    return FILE_EXISTENCE_ASSERTER_INPUT_ZORN_TEMPLATE;
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
      zorn: FileExistenceAsserterInputZorn;
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
      'zorn',
      'filePath',
      'requestSource',
    ] as const satisfies readonly (keyof FileExistenceAsserterInput)[],
  })
    .withTypes<
      FileExistenceAsserterInputConstructorInput,
      FileExistenceAsserterInput
    >({
      typeCheckErrorMesssages: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { filePath, requestor } = input;

        const zorn = new FileExistenceAsserterInputZorn({
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
          zorn,
          ...input,
          requestSource,
        } satisfies FileExistenceAsserterInput;
      },
    })
    .assemble();

export const FILE_EXISTENCE_ASSERTER_INPUT_GEPP =
  'file-existence-asserter-input';

type FileExistenceAsserterInputGepp = typeof FILE_EXISTENCE_ASSERTER_INPUT_GEPP;

export type FileExistenceAsserterInputVoque = InMemoryOdeshin2ListVoque<
  FileExistenceAsserterInputGepp,
  FileExistenceAsserterInput
>;
