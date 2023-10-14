import { posix } from 'path';
import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';
import { IdentifierNodeLocator } from './identifierNodeLocator';
import { SensibleNameState } from './getSensibleNameState';

const RENAME_CONFIGURATION_ZORN_TEMPLATE = [
  'fileName',
  'oneBasedLineNumber',
  'oneBasedLineOffset',
  'originalName',
  'distinguisher',
] as const satisfies GenericComplexIdTemplate;
type RenameConfigurationZornTemplate =
  typeof RENAME_CONFIGURATION_ZORN_TEMPLATE;
class RenameConfigurationZorn extends ComplexId<RenameConfigurationZornTemplate> {
  get rawTemplate(): RenameConfigurationZornTemplate {
    return RENAME_CONFIGURATION_ZORN_TEMPLATE;
  }
}

type RenameConfigurationInput = {
  identifierLocator: IdentifierNodeLocator;
  originalName: string;
  casing: string;
  oneBasedLineNumber: number;
  oneBasedLineOffset: number;
  newName: string;
  nameSensibilityState: SensibleNameState;
};

/**
 * The information needed to rename an identifier
 */
export type RenameConfiguration = SpreadN<
  [
    {
      id: RenameConfigurationZorn;
      absoluteFilePath: string;
    },
    RenameConfigurationInput,
  ]
>;

export const { RenameConfigurationInstance } = buildNamedConstructorFunction({
  constructorName: 'RenameConfigurationInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'identifierLocator',
    'id',
    'absoluteFilePath',
    'originalName',
    'casing',
    'oneBasedLineNumber',
    'oneBasedLineOffset',
    'newName',
    'nameSensibilityState',
  ] as const satisfies readonly (keyof RenameConfiguration)[],
})
  .withTypes<RenameConfigurationInput, RenameConfiguration>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const {
        identifierLocator,
        oneBasedLineNumber,
        oneBasedLineOffset,
        originalName,
      } = input;

      const absoluteFilePath = posix.resolve(
        '',
        identifierLocator.filePath.serialized,
      );

      return {
        id: new RenameConfigurationZorn({
          fileName: identifierLocator.filePath.name.serialized,
          oneBasedLineNumber: `${oneBasedLineNumber}`,
          oneBasedLineOffset: `${oneBasedLineOffset}`,
          originalName,
          distinguisher: identifierLocator.id.forMachine,
        }),
        absoluteFilePath,
        ...input,
      };
    },
  })
  .assemble();

export const RENAME_CONFIGURATION_GEPP = 'rename-configuration';

type RenameConfigurationGepp = typeof RENAME_CONFIGURATION_GEPP;

export type RenameConfigurationVoque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    RenameConfigurationGepp,
    RenameConfiguration
  >;
