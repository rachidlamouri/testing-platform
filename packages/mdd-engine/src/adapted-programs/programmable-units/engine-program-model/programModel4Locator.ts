import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';
import { TypeScriptFile } from '../type-script-file/typeScriptFile';
import { EngineFunctionConfiguration } from './engineFunctionConfiguration';
import { ProgramModel4Id } from './programModel4Id';

type ProgramModel4LocatorConstructorInput = {
  file: TypeScriptFile;
  engineFunctionConfiguration: EngineFunctionConfiguration;
};

/**
 * The information needed to find a program model
 */
type ProgramModel4Locator = SimplifyN<
  [
    {
      id: ProgramModel4Id;
    },
    ProgramModel4LocatorConstructorInput,
  ]
>;

export const { ProgramModel4LocatorInstance } = buildNamedConstructorFunction({
  constructorName: 'ProgramModel4LocatorInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'id',
    'file',
    'engineFunctionConfiguration',
  ] as const satisfies readonly (keyof ProgramModel4Locator)[],
})
  .withTypes<ProgramModel4LocatorConstructorInput, ProgramModel4Locator>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { file } = input;

      const id = new ProgramModel4Id({
        filePath: file.filePath.serialized,
      });

      return {
        id,
        ...input,
      } satisfies ProgramModel4Locator;
    },
  })
  .assemble();

export const PROGRAM_MODEL_4_LOCATOR_COLLECTION_ID = 'program-model-4-locator';

type ProgramModel4LocatorCollectionId =
  typeof PROGRAM_MODEL_4_LOCATOR_COLLECTION_ID;

export type ProgramModel4LocatorStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    ProgramModel4LocatorCollectionId,
    ProgramModel4Locator
  >;
