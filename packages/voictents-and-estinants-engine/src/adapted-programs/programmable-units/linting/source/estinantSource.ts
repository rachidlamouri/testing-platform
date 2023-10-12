import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { SourceTypeName } from './sourceTypeName';

const ESTINANT_SOURCE_ZORN_TEMPLATE = [
  'filePath',
  'programmedTransformName',
] as const satisfies GenericComplexIdTemplate;
type EstinantSourceZornTemplate = typeof ESTINANT_SOURCE_ZORN_TEMPLATE;
class EstinantSourceZorn extends ComplexId<EstinantSourceZornTemplate> {
  get rawTemplate(): EstinantSourceZornTemplate {
    return ESTINANT_SOURCE_ZORN_TEMPLATE;
  }
}

type EstinantSourceConstructorInput = {
  filePath: string;
  programmedTransformName: string;
};

/**
 * The information needed to locate an estinant definition
 *
 * @readableName ProgrammedTransformSource
 */
export type EstinantSource = SimplifyN<
  [
    {
      typeName: SourceTypeName.EstinantSource;
      zorn: EstinantSourceZorn;
    },
    EstinantSourceConstructorInput,
  ]
>;

export const { ProgrammedTransformSourceInstance } =
  buildNamedConstructorFunction({
    constructorName: 'ProgrammedTransformSourceInstance' as const,
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'typeName',
      'zorn',
      'programmedTransformName',
      'filePath',
    ] as const satisfies readonly (keyof EstinantSource)[],
  })
    .withTypes<EstinantSourceConstructorInput, EstinantSource>({
      typeCheckErrorMessage: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { programmedTransformName, filePath } = input;

        const zorn = new EstinantSourceZorn({
          filePath,
          programmedTransformName,
        });

        return {
          typeName: SourceTypeName.EstinantSource,
          zorn,
          ...input,
        } satisfies EstinantSource;
      },
    })
    .assemble();
