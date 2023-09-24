import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../../utilities/types/simplify';
import { Directory } from '../../../programmable-units/file/directory';

const BOUNDARY_ZORN_TEMPLATE = [
  'normalizedDisplayName',
] as const satisfies GenericZorn2Template;
type BoundaryZornTemplate = typeof BOUNDARY_ZORN_TEMPLATE;
export class BoundaryZorn extends Zorn2<BoundaryZornTemplate> {
  constructor(displayName: string) {
    const normalizedDisplayName = displayName.replaceAll(/(:|\s+),'-'/g, '');
    super({
      normalizedDisplayName,
    });
  }

  get rawTemplate(): BoundaryZornTemplate {
    return BOUNDARY_ZORN_TEMPLATE;
  }
}

type BoundaryConstructorInput = {
  displayName: string;
  directory: Directory;
};

/**
 * A group of files and directories in the project with some related concerns, or purpose
 */
export type Boundary = SimplifyN<
  [
    {
      zorn: BoundaryZorn;
    },
    BoundaryConstructorInput,
  ]
>;

export const { BoundaryInstance } = buildNamedConstructorFunction({
  constructorName: 'BoundaryInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'displayName',
    'directory',
  ],
} as const)
  .withTypes<BoundaryConstructorInput, Boundary>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { displayName } = input;

      const zorn = new BoundaryZorn(displayName);

      return {
        zorn,
        ...input,
      };
    },
  })
  .assemble();

export const BOUNDARY_GEPP = 'boundary';

type BoundaryGepp = typeof BOUNDARY_GEPP;

export type BoundaryVoque = InMemoryOdeshin2ListVoque<BoundaryGepp, Boundary>;
