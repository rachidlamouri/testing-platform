import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexzornTemplate,
  Complexzorn,
} from '../../../../package-agnostic-utilities/data-structure/zorn';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { SourceTypeName } from './sourceTypeName';

const ESTINANT_SOURCE_ZORN_TEMPLATE = [
  'filePath',
  'estinantName',
] as const satisfies GenericComplexzornTemplate;
type EstinantSourceZornTemplate = typeof ESTINANT_SOURCE_ZORN_TEMPLATE;
class EstinantSourceZorn extends Complexzorn<EstinantSourceZornTemplate> {
  get rawTemplate(): EstinantSourceZornTemplate {
    return ESTINANT_SOURCE_ZORN_TEMPLATE;
  }
}

type EstinantSourceConstructorInput = {
  filePath: string;
  estinantName: string;
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

export const { EstinantSourceInstance } = buildNamedConstructorFunction({
  constructorName: 'EstinantSourceInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'typeName',
    'zorn',
    'estinantName',
    'filePath',
  ] as const satisfies readonly (keyof EstinantSource)[],
})
  .withTypes<EstinantSourceConstructorInput, EstinantSource>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { estinantName, filePath } = input;

      const zorn = new EstinantSourceZorn({
        filePath,
        estinantName,
      });

      return {
        typeName: SourceTypeName.EstinantSource,
        zorn,
        ...input,
      } satisfies EstinantSource;
    },
  })
  .assemble();
