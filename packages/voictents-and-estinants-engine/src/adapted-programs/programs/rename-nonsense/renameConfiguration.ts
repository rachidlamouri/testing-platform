import { posix } from 'path';
import { InMemoryOdeshin2ListVoque } from '../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexzornTemplate,
  Complexzorn,
} from '../../../package-agnostic-utilities/data-structure/zorn';
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';
import { IdentifierNodeLocator } from './identifierNodeLocator';
import { SensibleNameState } from './getSensibleNameState';

const RENAME_CONFIGURATION_ZORN_TEMPLATE = [
  'fileName',
  'oneBasedLineNumber',
  'oneBasedLineOffset',
  'originalName',
  'distinguisher',
] as const satisfies GenericComplexzornTemplate;
type RenameConfigurationZornTemplate =
  typeof RENAME_CONFIGURATION_ZORN_TEMPLATE;
class RenameConfigurationZorn extends Complexzorn<RenameConfigurationZornTemplate> {
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
type RenameConfiguration = SpreadN<
  [
    {
      zorn: RenameConfigurationZorn;
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
    'zorn',
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
    typeCheckErrorMesssages: {
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
        zorn: new RenameConfigurationZorn({
          fileName: identifierLocator.filePath.name.serialized,
          oneBasedLineNumber: `${oneBasedLineNumber}`,
          oneBasedLineOffset: `${oneBasedLineOffset}`,
          originalName,
          distinguisher: identifierLocator.zorn.forMachine,
        }),
        absoluteFilePath,
        ...input,
      };
    },
  })
  .assemble();

export const RENAME_CONFIGURATION_GEPP = 'rename-configuration';

type RenameConfigurationGepp = typeof RENAME_CONFIGURATION_GEPP;

export type RenameConfigurationVoque = InMemoryOdeshin2ListVoque<
  RenameConfigurationGepp,
  RenameConfiguration
>;
