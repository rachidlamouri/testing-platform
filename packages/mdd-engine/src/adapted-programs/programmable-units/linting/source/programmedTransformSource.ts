import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { SourceTypeName } from './sourceTypeName';

const PROGRAMMED_TRANSFORM_SOURCE_ID_TEMPLATE = [
  'filePath',
  'programmedTransformName',
] as const satisfies GenericComplexIdTemplate;
type ProgrammedTransformSourceIdTemplate =
  typeof PROGRAMMED_TRANSFORM_SOURCE_ID_TEMPLATE;
class ProgrammedTransformSourceId extends ComplexId<ProgrammedTransformSourceIdTemplate> {
  get rawTemplate(): ProgrammedTransformSourceIdTemplate {
    return PROGRAMMED_TRANSFORM_SOURCE_ID_TEMPLATE;
  }
}

type ProgrammedTransformSourceConstructorInput = {
  filePath: string;
  programmedTransformName: string;
};

/**
 * The information needed to locate a programmed transform definition
 *
 * @readableName ProgrammedTransformSource
 */
export type ProgrammedTransformSource = SimplifyN<
  [
    {
      typeName: SourceTypeName.ProgrammedTransformSource;
      id: ProgrammedTransformSourceId;
    },
    ProgrammedTransformSourceConstructorInput,
  ]
>;

export const { ProgrammedTransformSourceInstance } =
  buildNamedConstructorFunction({
    constructorName: 'ProgrammedTransformSourceInstance' as const,
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'typeName',
      'id',
      'programmedTransformName',
      'filePath',
    ] as const satisfies readonly (keyof ProgrammedTransformSource)[],
  })
    .withTypes<
      ProgrammedTransformSourceConstructorInput,
      ProgrammedTransformSource
    >({
      typeCheckErrorMessage: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { programmedTransformName, filePath } = input;

        const id = new ProgrammedTransformSourceId({
          filePath,
          programmedTransformName,
        });

        return {
          typeName: SourceTypeName.ProgrammedTransformSource,
          id,
          ...input,
        } satisfies ProgrammedTransformSource;
      },
    })
    .assemble();
